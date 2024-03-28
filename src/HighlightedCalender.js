import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, ImageBackground } from "react-native";
import highlightedBackground from '../assets/center_gray.png';
import { generateMonthData, isSameDay } from './utils';

const HighlightedCalendar = () => {

  const today = new Date();
  const startMonth = new Date();
  const numMonthsToRender = 13; // Render one full year
  const [visibleMonths, setVisibleMonths] = useState([]);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  useEffect(() => {
    const monthsData = generateMonthData(startMonth, numMonthsToRender);
    setVisibleMonths(monthsData);
  }, [])

  const showAlert = (date) => {
    Alert.alert("Highlighted Date", `You pressed on ${new Date(date).toDateString()}`);
  };

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
              keyExtractor={(day) => day.key}
              renderItem={({ item: day }) => (
                <TouchableOpacity
                  onPress={() => day.date && showAlert(day.date)}
                  style={[
                    styles.dateItem,
                    day.isLowest && styles.lowestDate,
                    day.highlighted && styles.highlightedDate,
                  ]}
                >
                  {day.isLowest || day.highlighted ? (
                    <ImageBackground
                      source={highlightedBackground}
                      style={styles.backgroundImage}
                      imageStyle={{ borderRadius: 5 }}
                    >
                      <Text style={[styles.dateText, day.isLowest && styles.lowestDateText]}>
                        {day.date ? new Date(day.date).getDate() : ""}
                      </Text>
                      {day.isLowest && <Text style={styles.lowestLabelText}>Lowest</Text>}
                    </ImageBackground>
                  ) : (
                    <Text style={[styles.dateText, day.isLowest && styles.lowestDateText]}>
                      {day.date ? new Date(day.date).getDate() : ""}
                    </Text>
                  )}
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
    justifyContent: "center",
    alignItems: "center",
  },
  highlightedDate: {
    borderWidth: 1,
    borderColor: "#fff",
  },
  lowestDateText: {
    color: "green",
  },
  lowestLabelText: {
    color: "green",
    fontSize: 12,
    fontWeight: "bold",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center"
  },
});

export default HighlightedCalendar;
