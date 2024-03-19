import {
  View,
  Text,
  StyleSheet,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import moment from 'moment';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
const _today = moment().format('YYYY-MM-DD');
console.log('today', _today);
// const _maxDate = moment().add(365, 'days').format(_format);

LocaleConfig.locales['ar'] = {
  monthNames: [
    'كانُون الثانِي',
    'شُباط',
    'آذار',
    'نَيْسان',
    'أَيّار',
    'حَزِيران',
    'تَمُّوز',
    'آب',
    'أَيْلُول',
    'تِشْرِين الْأَوَّل',
    'شهر نوفمبر',
    'كانُون الْأَوَّل',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: [
    'الأحد',
    'الاثنين',
    'يوم الثلاثاء',
    'الأربعاء',
    'يوم الخميس',
    'جمعة',
    'السبت',
  ],
  today: "Aujourd'hui",
};

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan.',
    'Feb.',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul.',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
};

LocaleConfig.defaultLocale = 'ar'

const RnCalender = React.memo(({route, navigation}) => {
  const arrival = route.params?.arrivalDate;
  const departure = route.params?.departureDate;
  const fromCheckout = route.params?.fromCheckout;
  const fromCheckIn = route.params?.fromCheckIn;

  const [navigatedfromCheckout, setNavigatedFromCheckout] =
    useState(fromCheckout);
  const [navigatedfromCheckIn, setNavigatedFromCheckIn] = useState(fromCheckIn);
  const [firstTimeCalled, setFirstTimeCalled] = useState(true);

  const [selectedStartDate, setSelectedStartDate] = useState(arrival);
  const [selectedEndDate, setSelectedEndDate] = useState(departure);
  const [markedDates, setMarkedDates] = useState({});
  // console.log(markedDates, 'marked');
  // const isRtl = I18nManager.isRTL;
  // console.log(isRtl, 'is rtl');
  // LocaleConfig.defaultLocale = isRtl ? 'ar' : 'en';

  useEffect(() => {
    // I18nManager.forceRTL(false);
    if (navigatedfromCheckout || navigatedfromCheckIn) {
      handleSelection(moment(selectedStartDate));
    }
  }, [navigatedfromCheckout, navigatedfromCheckIn, selectedStartDate]); //Change 1

  const handleSelection = day => {
    let newMarkedDates = {};                              //Change 2
    if (navigatedfromCheckIn || navigatedfromCheckout) {
      if (selectedEndDate && selectedStartDate && firstTimeCalled) {
        // console.log('inside if handle date from home');
        const startDate = moment(selectedStartDate);
        const endDate = moment(selectedEndDate);
        const range = getDates(startDate, endDate);
        newMarkedDates = range.reduce((acc, date) => {
          acc[date.format('YYYY-MM-DD')] = {marked: true};
          return acc;
        }, {});
        // setMarkedDates(marked);                          //Change 3
        setSelectedStartDate(selectedStartDate);
        setSelectedEndDate(selectedEndDate);
        setFirstTimeCalled(false);
      } else if (navigatedfromCheckout && !firstTimeCalled) {
        // console.log('iniside condtion from checkout');
        // let selectedDate = moment(day.datestring)
        // let startingDay = moment(selectedStartDate)
        // if (selectedDate.isAfter(startingDay)) {
        //   console.log('inside if of conditon from checkout');
        //   setSelectedStartDate(day.datestring);
        //   setSelectedEndDate(null);
        //   setMarkedDates({[day.dateString]: {startingDay: true, marked: true}});
        // } else {
        // console.log('inside else of conditon from checkout');
        const startDate = moment(selectedStartDate);
        const endDate = moment(day.dateString);
        const range = getDates(startDate, endDate);
        const marked = range.reduce((acc, date) => {
          acc[date.format('YYYY-MM-DD')] = {marked: true};
          return acc;
        }, {});
        setMarkedDates(marked);
        setNavigatedFromCheckout(false);
      } else if (navigatedfromCheckIn) {
        // console.log('iniside condtion from check In >>');
        setSelectedStartDate(day.dateString);
        setSelectedEndDate(null);
        setMarkedDates({[day.dateString]: {startDate: true, marked: true}});
        setNavigatedFromCheckIn(false);
      }
    } else {
      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        // console.log('inside if of handle date selection');
        // If no start date or both start and end dates are selected, set a new start date
        setSelectedStartDate(day.dateString);
        setSelectedEndDate(null);
        setMarkedDates({[day.dateString]: {startDate: true, marked: true}});
      } else {
        let selectDate = moment(day.dateString);
        let selectStartDate = moment(selectedStartDate);
        if (selectDate.isSameOrBefore(selectStartDate)) {
          // console.log('inside else if handle date selection');
          setSelectedStartDate(day.dateString);
          setSelectedEndDate(null);
          setMarkedDates({[day.dateString]: {startDate: true, marked: true}});
        } else {
          // console.log('inside else else handle date selection');
          // If a start date is already selected, set the end date and mark all dates in between
          const startDate = moment(selectedStartDate);
          const endDate = moment(day.dateString);
          const range = getDates(startDate, endDate);

          const marked = range.reduce((acc, date, index, array) => {
            const formattedDate = date.format('YYYY-MM-DD');
            acc[formattedDate] = {marked: true};
            // Check if it's the first date in the range
            if (index === 0) {
              acc[formattedDate].startDate = true;
            }

            // Check if it's the last date in the range
            if (index === array.length - 1) {
              acc[formattedDate].endDate = true;
            }
            return acc;
          }, {});
          setMarkedDates(marked);
          setSelectedEndDate(day.dateString);
        }
      }
    }
  };

  const getDates = (startDate, endDate) => {
    const dates = [];
    let currentDate = startDate.clone();
    while (currentDate.isSameOrBefore(endDate)) {
      dates.push(currentDate);
      currentDate = currentDate.clone().add(1, 'day');
    }
    return dates;
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* return and departure button------ */}
      <View
        style={{
          flexDirection: 'row',
          alignItems:'center',
          justifyContent: 'space-between',
          marginHorizontal:10,
          paddingVertical:10,
          elevation: 0.5,
        }}>
        <View style={{flex:1,}}>
          <Text
            style={{textAlign: 'center', fontWeight: 'bold', marginBottom: 7}}>
            Departure
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 20,
              backgroundColor: selectedStartDate ? '#053250' : '#00adef',
              padding: 10,
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={1}
              style={{textAlign: 'center', fontSize: 14, color: '#fff'}}>
              {selectedStartDate ? selectedStartDate : 'Select Departure Date'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{flex:1,marginStart:8}}>
          <Text
            style={{textAlign: 'center', fontWeight: 'bold', marginBottom: 7}}>
            Return
          </Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 20,
              backgroundColor: selectedEndDate ? '#053250' : '#00adef',
              padding: 10,
              justifyContent: 'center',
            }}>
            <Text
              numberOfLines={1}
              style={{textAlign: 'center', fontSize: 14, color: '#fff'}}>
              {selectedEndDate ? selectedEndDate : 'Select Return Date'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* return and departure button end----*/}

      {/* Calender --------- */}
      <CalendarList
        current={_today}
        marking={true}
        initialNumToRender={1}
       
        dayComponent={(date, index) => {
          console.log(date, "Date --->");
          let dates = date.date.dateString;
          let mindate = dates < _today;
          return (
           
            <TouchableOpacity
            activeOpacity={0.7}
            disabled={mindate}
            onPress={() => {
              handleSelection(date.date);
            }} 
            style={{
              width:51,
              height:35,
              justifyContent:'center',
              alignItems:'center',
              // borderWidth:1,
              // borderColor:'yellow',\\
              backgroundColor: date.marking?.marked
              ? date.marking?.startDate || date.marking?.endDate
                ? '#053250'
                : '#d2edf8'
              : '#fff',
              opacity: mindate ? 0.1 : 1,
              borderTopStartRadius: date.marking?.startDate ? 16 : 0,

              borderBottomStartRadius: date.marking?.startDate ? 16 : 0,

              borderTopEndRadius: date.marking?.endDate ? 16 : 0,

              borderBottomEndRadius: date.marking?.endDate ? 16 : 0,

             
            }}>
            <Text
              style={{
                ...styles.calenderText,
                color: date.marking?.marked ? '#fff' : '#053250',
              }}>
              {date.date.day}
            </Text>
          </TouchableOpacity>
          );
        }}
        markedDates={markedDates}
        horizontal={false}
        pastScrollRange={0}
        futureScrollRange={12}
      />
      {/* Calender end --------- */}

      {/* Bottom confirm button------ */}

      {selectedEndDate && (
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate({
                name: 'Home',
                params: {
                  arrivalDate: selectedStartDate ? selectedStartDate : null,
                  departureDate: selectedEndDate ? selectedEndDate : null,
                },
                merge: true,
              });
            }}
            style={{
              backgroundColor: '#053250',
              borderWidth: 1,
              borderRadius: 20,
              width: 280,
              height: 50,
              zIndex: 10,
              position: 'absolute',
              bottom: 110,
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                color: '#fff',
                fontSize: 15,
              }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom confirm button------ */}
    </View>
  );
});

const styles = StyleSheet.create({
  calenderText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RnCalender;
