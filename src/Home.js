import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

const Home = ({ navigation, route }) => {
  const { departureDate, arrivalDate } = route.params || {};

  return (
    <View style={styles.container}>
      <Text>App</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="RnCalender"
          onPress={() => navigation.navigate('RnCalender')}
        />

        <View style={styles.checkInOutContainer}>
          {/* --------------------CHECK IN---------------- */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RnCalender', {
                arrivalDate: arrivalDate || '',
                departureDate: departureDate || '',
                fromCheckIn: true,
              })
            }
            style={styles.checkInOutButton}
          >
            <Text style={styles.buttonText}>
              Check-In({arrivalDate || ''})
            </Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          {/* -----------------CHECK OUT ---------------- */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RnCalender', {
                departureDate: departureDate || '',
                arrivalDate: arrivalDate || '',
                fromCheckout: true,
              })
            }
            style={styles.checkInOutButton}
          >
            <Text style={styles.buttonText}>
              Check-Out({departureDate || ''})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
  checkInOutContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  checkInOutButton: {
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'lightblue',
    width: 100,
    padding: 10,
    justifyContent: 'center',
  },
  separator: {
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
  },
});

export default Home;
