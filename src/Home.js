import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Modal, DevSettings, I18nManager } from 'react-native';

const Home = ({ route }) => {
  const navigation = useNavigation();
  const { returnDate, DepartureDate } = route.params || {};
  const today = new Date();
  const initialDepartureDate = today.toISOString().substring(0, 10);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const initialReturnDate = tomorrow.toISOString().substring(0, 10);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [language, setLanguage] = useState('English'); // State to manage selected language
  const [modalVisible, setModalVisible] = useState(false); // State to manage visibility of the language dropdown

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setModalVisible(false); // Hide the dropdown after selection
    I18nManager.forceRTL(false);
    DevSettings.reload();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="CalenderPicker"
          onPress={() =>
            navigation.navigate({
              name: 'HighlightedCalender',
              params: {
                // DepartureDate: DepartureDate || '',
                // returnDate: returnDate || '',
                language: language, 
              },
              merge: true,
            })
          }
        />

        <View style={styles.checkInOutContainer}>
          {/* --------------------CHECK IN---------------- */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate({
                name: 'CalenderPicker',
                params: {
                  DepartureDate: DepartureDate || '',
                  returnDate: returnDate || '',
                  fromCheckIn: true,
                  fromCheckOut: false,
                  language: language, // Pass selected language as a parameter
                },
                merge: true,
              })
            }
            style={styles.checkInOutButton}>
            <Text style={styles.buttonText}>Departure</Text>
            <Text style={styles.buttonText2}>{DepartureDate || initialDepartureDate}</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          {/* -----------------CHECK OUT ---------------- */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate({
                name: 'CalenderPicker',
                params: {
                  DepartureDate: DepartureDate || '',
                  returnDate: returnDate || '',
                  fromCheckOut: true,
                  fromCheckIn: false,
                  language: language, // Pass selected language as a parameter
                },
                merge: true,
              })
            }
            style={styles.checkInOutButton}>
            <Text style={styles.buttonText}>Return</Text>
            <Text style={styles.buttonText2}>{returnDate || initialReturnDate}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Language Dropdown */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => handleLanguageChange('Arabic')}>
              <Text style={styles.languageText}>Arabic</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleLanguageChange('English')}>
              <Text style={styles.languageText}>English</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Language Button */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.languageButton}>
        <Text>Language - {language}</Text>
      </TouchableOpacity>
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
  buttonText2: {
    textAlign: 'center',
    fontSize: 15,
  },
  languageButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    marginBottom: 230,
    width: 250,
    height: 170,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 45,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  languageText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Home;
