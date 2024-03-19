import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";

const CustomCalendar = () => {
  const today = new Date();
  const startMonth = new Date();
  const numMonthsToRender = 13; // Render one full year

  const [visibleMonths, setVisibleMonths] = useState(() =>
    generateMonthData(startMonth, numMonthsToRender)
  );
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  function generateMonthData(startMonth, numMonths) {
    const months = [];
    let currentDate = new Date(startMonth);
    
    for (let i = 0; i < numMonths; i++) { // Adjust loop condition to strictly less than numMonths
      currentDate.setDate(1);
      const monthData = {
        month: `${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getFullYear()}`,
        days: [],
      };
    
      const firstDayOfMonth = currentDate.getDay();
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
    
    return months; // Remove filtering for months beyond the current year
  }
  
  const getWeekdayOffset = (firstDayOfYear) => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const firstDayIndex = firstDayOfYear.getDay(); // 0 for Sunday, 1 for Monday, etc.
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
      const isBetween = startDate && endDate && day > startDate && day < endDate;
      const isDisabled = !isToday && day < today;
  
      return (
        <TouchableOpacity
          style={[
            styles.dateItem,
            isToday && styles.today,
            isStartDate && styles.start,
            isEndDate && styles.end,
            isSelected && !isStartDate && !isEndDate && styles.between,
            isDisabled && styles.disabled,
          ]}
          onPress={() => handleDatePress(day)}
          disabled={isDisabled}
        >
          <Text style={[styles.dateText, (isStartDate || isEndDate) && { color: 'white' }]}>
            {day.getDate()}
          </Text>
        </TouchableOpacity>
      );
    },
    [today, selectedStartDate, selectedEndDate, handleDatePress]
  );
  

  const handleDatePress = (day) => {
    // Get the time zone offset in minutes
    const timeZoneOffset = day.getTimezoneOffset();
  
    // Adjust the selected date by adding the time zone offset
    const selectedDay = new Date(day.getTime() - timeZoneOffset * 60000);
  
    // Convert the adjusted date to ISO string
    const dayISOString = selectedDay.toISOString();
  
    if (!selectedStartDate || dayISOString < selectedStartDate) {
      setSelectedStartDate(dayISOString);
      setSelectedEndDate(null);
    } else if (!selectedEndDate || dayISOString > selectedEndDate) {
      setSelectedEndDate(dayISOString);
    } else {
      setSelectedStartDate(dayISOString);
      setSelectedEndDate(null);
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
          <TouchableOpacity style={styles.roundedButton}>
            <Text style={styles.buttonText}>
              {selectedStartDate ? selectedStartDate.substring(0, 10) : "Select"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Text style={styles.buttonLabel}>Return</Text>
          <TouchableOpacity style={styles.roundedButton}>
            <Text style={styles.buttonText}>
              {selectedEndDate ? selectedEndDate.substring(0, 10) : "Select"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
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
              columnWrapperStyle={{ marginHorizontal: 0, paddingVertical: 0, }}
              showsVerticalScrollIndicator={false}
              shouldItemUpdate={(prev, next) => prev.item.date !== next.item.date}
            />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
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
    backgroundColor: "#33a4ea",
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
    backgroundColor: "#d2eef9",
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
});

export default CustomCalendar;
