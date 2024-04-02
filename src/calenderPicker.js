import { useNavigation } from "@react-navigation/native";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ImageBackground } from "react-native";
import startDateIndicator from '../assets/Start.png';
import endDateIndicator from '../assets/End.png';
const CustomCalendar = ({ route }) => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // Get the next date
  const startMonth = new Date();
  const numMonthsToRender = 13; // Render one full year
  const incrementMonths = 3;
  const navigation = useNavigation();

  const [selectedLanguage, setSelectedLanguage] = useState(route.params.language || 'English');
  const [fromCheckIn, setFromCheckIn] = useState(route.params.fromCheckIn || false);
  const [fromCheckOut, setFromCheckOut] = useState(route.params.fromCheckOut || false);

  const ArabicWeekdays = [
    'السبت',
    'الأحد',
    'الاثنين',
    'يوم الثلاثاء',
    'الأربعاء',
    'يوم الخميس',
    'جمعة',
  ]

  const getWeekdayName = (weekdayIndex) => {
    if (selectedLanguage === 'Arabic') {
      return ArabicWeekdays[weekdayIndex];
    } else {
      return new Date(2000, 0, weekdayIndex + 1).toLocaleString('en-us', { weekday: 'long' });
    }
  };

  // Handle pressing the "Departure" button
  const handleDeparturePress = () => {
    setFromCheckIn(true);
    setFromCheckOut(false);
  };

  // Handle pressing the "Return" button
  const handleReturnPress = () => {
    setFromCheckIn(false);
    setFromCheckOut(true);
  };

  const { returnDate, DepartureDate } = route.params || {};
  const [selectedStartDate, setSelectedStartDate] = useState(DepartureDate ? DepartureDate : today.toISOString().substring(0, 10));
  const [selectedEndDate, setSelectedEndDate] = useState(returnDate ? returnDate : tomorrow.toISOString().substring(0, 10));



  const flatListRef = useRef(null);

  const getMonthIndex = (monthName) => {
    const ArabicMonthNames = [
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
    ];

    const EnglishMonthNames = [
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
    ];

    return selectedLanguage === 'Arabic' ? ArabicMonthNames.findIndex(name => name === monthName) : EnglishMonthNames.findIndex(name => name === monthName);
  };

  const generateMonthData = (startMonth, numMonths, selectedLanguage) => {
    const months = [];
    let currentDate = new Date(startMonth);
    const endMonth = new Date(startMonth);
    endMonth.setMonth(endMonth.getMonth() + numMonths);

    // Function to get month name based on language
    const getMonthName = (monthIndex) => {
      const ArabicMonthNames = [
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
      ];

      const EnglishMonthNames = [
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
      ];

      return selectedLanguage === 'Arabic' ? ArabicMonthNames[monthIndex] : EnglishMonthNames[monthIndex];
    };

    while (currentDate < endMonth) {
      const monthData = {
        month: getMonthName(currentDate.getMonth()) + " " + currentDate.getFullYear(), // Concatenate the year
        days: [],
      };

      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      for (let j = 0; j < firstDayOfMonth; j++) {
        monthData.days.push({
          date: null,
          key: `empty-${j}`,
        });
      }

      for (let j = 1; j <= lastDayOfMonth.getDate(); j++) {
        const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), j);
        monthData.days.push({
          date: day.toISOString(),
          key: day.toISOString(),
        });
      }

      months.push(monthData);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return months;
  };

  useEffect(() => {
    if (selectedStartDate) {
      const selectedDate = new Date(selectedStartDate);
      const selectedMonthIndex = visibleMonths.findIndex(month => {
        const [monthName, year] = month.month.split(" ");
        return selectedDate.getMonth() === getMonthIndex(monthName) && selectedDate.getFullYear() === parseInt(year);
      });

      if (selectedMonthIndex !== -1 && flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: selectedMonthIndex, animated: true });
      }
    }
  }, [selectedStartDate]);


  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      const { index } = viewableItems[0];
      if (index + incrementMonths >= visibleMonths.length) {
        // Render more months when approaching the end
        setVisibleMonths((prevVisibleMonths) => [
          ...prevVisibleMonths,
          ...generateMonthData(
            new Date(prevVisibleMonths[prevVisibleMonths.length - 1].month),
            incrementMonths,
            selectedLanguage
          ),
        ]);
      }
    }
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const [visibleMonths, setVisibleMonths] = useState(() =>
    generateMonthData(startMonth, numMonthsToRender, selectedLanguage)
  );


  const getWeekdayOffset = (firstDayOfYear) => {
    const weekdays = selectedLanguage === 'Arabic' ? ArabicWeekdays : ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const firstDayIndex = firstDayOfYear.getDay();
    return weekdays.slice(firstDayIndex).concat(weekdays.slice(0, firstDayIndex));
  };

  const renderDay = useCallback(
    ({ item: { date, key } }) => {
      if (date === null) {
        return <View style={styles.emptyDateItem} />;
      }

      const day = new Date(date);
      const isToday = day.toDateString() === today.toDateString();
      const startDate = selectedStartDate ? new Date(selectedStartDate) : null;
      const endDate = selectedEndDate ? new Date(selectedEndDate) : null;
      const isStartDate = startDate && day.toDateString() === startDate.toDateString();
      const isEndDate = endDate && day.toDateString() === endDate.toDateString();
      const isSelected = startDate && endDate && day >= startDate && day <= endDate;
      const isDisabled = !isToday && day < today;
      const isSelectedPreviously = returnDate && DepartureDate && day >= new Date(returnDate) && day <= new Date(DepartureDate);
      const isBetweenSelectedDates = startDate && endDate && !isSelected && day > startDate && day < endDate;

      return (
        <TouchableOpacity
          style={[
            styles.dateItem,
            isToday && styles.today,
            isSelected && !isStartDate && !isEndDate && styles.between,
            isSelectedPreviously && !isSelected && styles.between,
            isBetweenSelectedDates && { backgroundColor: '#87CEFA' },
            isDisabled && styles.disabled,
          ]}
          onPress={() => handleDatePress(day)}
          disabled={isDisabled}
        >
          {isStartDate && <ImageBackground source={startDateIndicator} style={styles.dateImageStart} />}
          {isEndDate && <ImageBackground source={endDateIndicator} style={styles.dateImageEnd} />}
          <Text style={[styles.dateText, (isStartDate || isEndDate || isSelectedPreviously) && { color: 'white' }]}>
            {day.getDate()}
          </Text>
        </TouchableOpacity>
      );
    },
    [today, selectedStartDate, selectedEndDate, returnDate, DepartureDate, handleDatePress]
  );






  const handleDatePress = (day) => {
    // Get the time zone offset in minutes
    const timeZoneOffset = day.getTimezoneOffset();

    // Adjust the selected date by adding the time zone offset
    const selectedDay = new Date(day.getTime() - timeZoneOffset * 60000);


    const dayISOString = selectedDay.toISOString();

    // If the departure button is active, update the departure date
    if (fromCheckIn) {
      setSelectedStartDate(dayISOString);
      setSelectedEndDate(null);
      setFromCheckOut(true);
      setFromCheckIn(false);
    } else if (fromCheckOut) {
      if (new Date(dayISOString) < new Date(selectedStartDate)) {
        // If the selected return date is before the departure date,
        // update the departure date to the selected return date
        setSelectedStartDate(dayISOString);
        setSelectedEndDate(null);
      } else {
        setSelectedEndDate(dayISOString);
      }
      setFromCheckIn(true);
      setFromCheckOut(false);
    }
  };






  // Fetch the 1st day of the year
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);

  // Calculate the weekdays offset
  const weekdaysOffset = getWeekdayOffset(firstDayOfYear);

  return (
    <View style={styles.container}>
      <View style={styles.mainButtonContainer}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonLabel}>Departure</Text>
          <TouchableOpacity style={[styles.roundedButton, fromCheckIn && styles.selectedButton]} onPress={handleDeparturePress}>
            <Text style={styles.buttonText}>
              {selectedStartDate ? selectedStartDate.substring(0, 10) : "Select"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Text style={styles.buttonLabel}>Return</Text>
          <TouchableOpacity style={[styles.roundedButton, fromCheckOut && styles.selectedButton]} onPress={handleReturnPress}>
            <Text style={styles.buttonText}>
              {selectedEndDate ? selectedEndDate.substring(0, 10) : "Select"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        ref={flatListRef}
        initialNumToRender={2}
        data={visibleMonths}
        keyExtractor={(item, index) => `month-${index}`}
        renderItem={({ item }) => (
          <View key={`month-${item.month}`} style={styles.monthContainer}>
            <Text style={styles.monthText}>{item.month}</Text>
            <View style={styles.weekdaysRow}>
              {weekdaysOffset.map((weekday, index) => (
                <Text key={index} style={styles.weekdayText}>
                  {weekday}
                </Text>
              ))}
            </View>
            <FlatList
              data={item.days}
              keyExtractor={(day) => day.key}
              renderItem={renderDay}
              numColumns={7}
              columnWrapperStyle={{ marginHorizontal: 0, paddingVertical: 0 }}
              showsVerticalScrollIndicator={false}
              shouldItemUpdate={(prev, next) => prev.item.date !== next.item.date}
              getItemLayout={(data, index) => ({
                length: 40, // Height of each item
                offset: 40 * index, // Position of the item
                index,
              })}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 200));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: true });
          });
        }}
      />
      {/* Bottom confirm button------ */}

      {selectedEndDate && (
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate({
                name: 'Home',
                params: {
                  DepartureDate: selectedStartDate ? selectedStartDate.substring(0, 10) : null,
                  returnDate: selectedEndDate ? selectedEndDate.substring(0, 10) : null,
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
              bottom: 15,
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  mainButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  buttonContainer: {
    flex: 0.5,
    flexDirection: "column",
    paddingHorizontal: 10,
  },
  buttonLabel: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: "bold",
    color: "grey",
  },
  roundedButton: {
    backgroundColor: "#949494",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center"
  },
  monthContainer: {
    marginBottom: 20,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#1b4359",
  },
  dateItem: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "transparent",
    color: "navy",
    width: "14.25%",
  },
  disabled: {
    opacity: 0.5,
  },
  start: {
    backgroundColor: "#33a4ea",
    color: "white",
  },
  end: {
    backgroundColor: "#33a4ea",
    color: "white",
  },
  between: {
    backgroundColor: "#ffb0cc",
    color: "#1b4359",
  },
  dateText: {
    color: "#1b4359",
    justifyContent: "center",
    alignItems: "center",
  },
  weekdaysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    marginEnd: 8
  },
  weekdayText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1b4359",
    marginHorizontal: 6
  },
  emptyDateItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "transparent",
    width: 46.5
  },
  selectedButton: {
    backgroundColor: '#053250',
  },
  dateImageStart: {
    position: 'absolute',
    width: "100%",
    height: 40,
  },
  dateImageEnd: {
    position: 'absolute',
    width: "100%",
    height: 40,
  },
});

export default CustomCalendar;
