import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity } from "react-native";

const HighlightedCalendar = () => {
  const today = new Date();
  const startMonth = new Date();
  const numMonthsToRender = 13; // Render one full year
  const [visibleMonths, setVisibleMonths] = useState(
    generateMonthData(startMonth, numMonthsToRender)
  );

  function generateMonthData(startMonth, numMonths) {
    const months = [];
    const highlightedDates = {
      "April 2024": ["2024-04-01", "2024-04-05", "2024-04-10", "2024-04-15", "2024-04-20", "2024-04-25"],
      "May 2024": ["2024-05-01", "2024-05-05", "2024-05-10", "2024-05-15", "2024-05-20", "2024-05-25"],
      "June 2024": ["2024-06-01", "2024-06-05", "2024-06-10", "2024-06-15", "2024-06-20", "2024-06-25"],
      "July 2024": ["2024-07-01", "2024-07-05", "2024-07-10", "2024-07-15", "2024-07-20", "2024-07-25"],
      "August 2024": ["2024-08-01", "2024-08-05", "2024-08-10", "2024-08-15", "2024-08-20", "2024-08-25"],
      "September 2024": ["2024-09-01", "2024-09-05", "2024-09-10", "2024-09-15", "2024-09-20", "2024-09-25"],
      "October 2024": ["2024-10-01", "2024-10-05", "2024-10-10", "2024-10-15", "2024-10-20", "2024-10-25"],
    };

    let currentDate = new Date(startMonth);

    for (let i = 0; i < numMonths; i++) {
      currentDate.setDate(1);
      const monthData = {
        month: `${currentDate.toLocaleString("default", {
          month: "long",
        })} ${currentDate.getFullYear()}`,
        days: [],
      };
      const firstDayOfMonth = currentDate.getDay(); // Get the index of the first day of the month (0 for Sunday, 1 for Monday, etc.)
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      // Check if highlighted dates exist for the current month
      const highlightedDatesForMonth = highlightedDates[monthData.month] ? highlightedDates[monthData.month].map(date => new Date(date)) : [];

      // Add empty slots for the days before the first day of the month
      for (let j = 0; j < firstDayOfMonth; j++) {
        monthData.days.push({
          date: null,
          key: `empty-${j}`,
        });
      }

      // Add the days of the month
      for (let j = 1; j <= lastDayOfMonth.getDate(); j++) {
        const day = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          j
        );
        const dayISO = day.toISOString();
        monthData.days.push({
          date: dayISO,
          key: dayISO,
          dayOfWeek: day.toLocaleDateString("en-US", { weekday: "short" }), // Get the short name of the day (e.g., Mon, Tue)
          highlighted: highlightedDatesForMonth.some(highlightedDate => isSameDay(highlightedDate, day)), // Check if the date should be highlighted
        });
      }

      months.push(monthData);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return months;
  }

  // Function to check if two dates are the same day
  function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  const showAlert = (date) => {
    Alert.alert("Highlighted Date", `You pressed on ${new Date(date).toDateString()}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleMonths}
        keyExtractor={(item, index) => `month-${index}`}
        renderItem={({ item }) => (
          <View key={`month-${item.month}`} style={styles.monthContainer}>
            <Text style={styles.monthText}>{item.month}</Text>
            <View style={styles.weekdaysRow}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((weekday, index) => (
                <Text key={index} style={styles.weekdayText}>
                  {weekday}
                </Text>
              ))}
            </View>
            <FlatList
              data={item.days}
              keyExtractor={(day) => day.key}
              renderItem={({ item: day }) => (
                <TouchableOpacity
                  onPress={() => day.date && showAlert(day.date)}
                  style={[styles.dateItem, day.highlighted && styles.highlightedDate]}>
                  <Text style={styles.dateText}>
                    {day.date ? new Date(day.date).getDate() : ""}
                  </Text>
                </TouchableOpacity>
              )}
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
    justifyContent: "center",
    alignItems: "center",
  },
  highlightedDate: {
    backgroundColor: "#d2eef9", // Highlighted date color
  },
});

export default HighlightedCalendar;
