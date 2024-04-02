import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { generateMonthData, isSameDay, highlightedDates } from './utils';

const HighlightedCalendar = () => {
  const [visibleMonths, setVisibleMonths] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const highlightedDatesMap = useMemo(() => {
    const highlightedDatesMap = {};

    for (const month in highlightedDates) {
      highlightedDatesMap[month] = new Set(highlightedDates[month].map(entry => entry.date));
    }

    return highlightedDatesMap;
  }, [highlightedDates]);

  useEffect(() => {
    const startMonth = new Date();
    const numMonthsToRender = 13;
    const monthsData = generateMonthData(startMonth, numMonthsToRender, highlightedDatesMap);
    setVisibleMonths(monthsData);
  }, [highlightedDates]);

  const selectDate = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  const renderDateItem = useCallback(({ item: day }) => {
    const isSelected = selectedDate && isSameDay(new Date(selectedDate), new Date(day.date));
    const isHighlighted = day.date && day.highlighted;
  
    const handlePress = () => {
      if (isHighlighted) {
        selectDate(day.date);
      }
    };
  
    return (
      <TouchableOpacity
        onPress={handlePress}
        style={[
          styles.dateItem,
          day.isLowest && styles.lowestDate,
          isHighlighted && styles.highlightedDate,
          isSelected && styles.selectedDate,
        ]}
      >
        <Text style={[styles.dateText, day.isLowest && styles.lowestDateText]}>
          {day.date ? new Date(day.date).getDate() : ""}
        </Text>
        {day.isLowest && <Text style={styles.lowestLabelText}>Lowest</Text>}
      </TouchableOpacity>
    );
  }, [selectDate, selectedDate]);
  

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleMonths}
        initialNumToRender={3}
        keyExtractor={(item, index) => `month-${index}`}
        renderItem={({ item }) => (
          <View key={`month-${item.month}`} style={styles.monthContainer}>
            <Text style={styles.monthText}>{item.month}</Text>
            <View style={styles.weekdaysRow}>
              {weekdays.map((weekday, index) => (
                <Text key={index} style={styles.weekdayText}>
                  {weekday}
                </Text>
              ))}
            </View>
            <FlatList
              data={item.days}
              initialNumToRender={7}
              keyExtractor={(day) => day.key}
              renderItem={renderDateItem}
              numColumns={7}
              columnWrapperStyle={{ marginHorizontal: 0, paddingVertical: 0 }}
              showsVerticalScrollIndicator={false}
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
    backgroundColor: "#fff"
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
  weekdaysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  weekdayText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1b4359",
    width: "14.25%",
    textAlign: "center",
  },
  dateItem: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: "transparent",
    color: "navy",
    width: "14.25%",
  },
  dateText: {
    color: "#1b4359",
  },
  highlightedDate: {
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#d8f0fa", 
    justifyContent: "center",
    alignItems: "center"
  },
  lowestDateText: {
    color: "green",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  lowestLabelText: {
    color: "green",
    fontSize: 11,
    fontWeight: "bold",
  },
  selectedDate: {
    backgroundColor: "lightgreen",
  }
});

export default HighlightedCalendar;
