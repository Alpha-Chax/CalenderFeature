


import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Calendar from 'react-native-calendar-range-picker';

export default function RnRangePicker({route, navigation}) {
  const arrival = route.params?.arrivalDate;
  const departure = route.params?.departureDate;
  const fromCheckout = route.params?.fromCheckout;

  const [startDates, setStartDates] = useState('');
  const [endDates, setEndDates] = useState('');
  console.log('end date',endDates);
  const CUSTOM_LOCALE = {
    monthNames: [
      'يناير',
      'شهر فبراير',
      'يمشي',
      'أبريل',
      'يمكن',
      'يونيو',
      'يوليو',
      'أغسطس',
      'سبتمبر',
      'اكتوبر',
      'شهر نوفمبر',
      'ديسمبر',
    ],
    dayNames: [
      'الأحد',
      'الاثنين',
      'يوم الثلاثاء',
      'الأربعاء',
      'يوم الخميس',
      'جمعة',
      'السبت',
    ],
  };

  return (
    <View style={{flex: 1}}>
      <Calendar
        locale={CUSTOM_LOCALE}
        style={{
          container: {},
          monthNameText: {
            fontSize: 20,
          },
          dayNameText: {
            fontSize: 13,
          },

          selectedDayTextColor: '#fff',
          selectedDayBackgroundColor: 'blue',
          selectedBetweenDayTextColor: '#000',
          selectedBetweenDayBackgroundTextColor: 'red',
        }}
        pastYearRange={0}
        initialNumToRender={3}
        disabledBeforeToday={true}

        onChange={({startDate, endDate}) => {
          // setStartDates(endDate ? startDate : startDates)
            setEndDates(endDate ? endDate : startDate);
            console.log('end dates>>>>',endDates,'end date',endDate);
        }}
      />
      {endDates && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate({
              name: 'Home',
              params: {
                arrivalDate: startDates,
                departureDate: endDates,
              },
              merge: true,
            });
          }}
          style={{
            backgroundColor: '#fff',
            borderWidth: 1,
            borderRadius: 10,
            width: 200,
            height: 40,
            zIndex: 10,
            position: 'absolute',
            bottom: 10,
            justifyContent: 'center',
            left: 100,
          }}>
          <Text style={{textAlign: 'center', fontSize: 12}}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
