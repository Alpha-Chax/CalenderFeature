import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet } from 'react-native';

const Home = ({route }) => {
const navigation = useNavigation();
  const { departureDate, arrivalDate } = route.params || {};
  const today = new Date();
  const initialDepartureDate = today.toISOString().substring(0, 10);
  const tomorrow = new Date(today);
   tomorrow.setDate(tomorrow.getDate() + 1);
  const initialReturnDate = tomorrow.toISOString().substring(0, 10);
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="CalenderPicker"
          onPress={() =>
            navigation.navigate({ name: 'CalenderPicker', 
            params: {
              arrivalDate: arrivalDate || '',
              departureDate: departureDate || '',
            },
            merge : true
            })
          }
        />

        <View style={styles.checkInOutContainer}>
          {/* --------------------CHECK IN---------------- */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate({ name: 'CalenderPicker', 
              params: {
                arrivalDate: arrivalDate || '',
                departureDate: departureDate || '',
                fromCheckIn: true,
                fromCheckOut: false,
              },
              merge : true
              })
            }
            style={styles.checkInOutButton}
          >
            <Text style={styles.buttonText}>
              Departure
            </Text>
            <Text style={styles.buttonText2}>{arrivalDate || initialDepartureDate}</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          {/* -----------------CHECK OUT ---------------- */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate({ name: 'CalenderPicker', 
              params: {
                arrivalDate: arrivalDate || '',
                departureDate: departureDate || '',
                fromCheckOut: true,
                fromCheckIn: false,
              },
              merge : true
              })
            }
            style={styles.checkInOutButton}
          >
            <Text style={styles.buttonText}>
              Return
            </Text>
            <Text style={styles.buttonText2}>{departureDate || initialReturnDate}</Text>
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
    width: 150,
    height: 70,
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
  buttonText2:{
    textAlign: 'center',
    fontSize: 15,
  }
});

export default Home;
