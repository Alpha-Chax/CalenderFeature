import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Calendar from 'react-native-calendar-date-range-picker';
import moment from 'moment';

export default function RndateRangePicker() {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Calendar
      SelectedRangeType= {(item)=>{
        console.log('this is called',item);
        startDate: '2024-01-04'
        endDate:'2024-01-09'
      }}
        // subtitle={count => `${count} nights`}
        // monthHeight={350}
        // renderWeekTextComponent={weekdayTitle => {
        //   return (
        //     <Text style={styles.monthTextStyle} key={weekdayTitle}>
        //       {weekdayTitle}
        //     </Text>
        //   );
        // }}
        // renderMonthTextComponent={monthName => {
        //   // console.log('month', monthName);
        //   return (
        //     <Text style={{margin: 10}}>
        //       {`${monthName.locale('ar').format('MMMM')} ${monthName
        //         .clone()
        //         .locale('ar')
        //         .format('YYYY')}`}
        //     </Text>
        //   );
        // }}
        onChangeCb={(item) => {
          return(
            <Text>
              HELLLLLLOOOOOOOO
            </Text>

          )
          console.log('on change pressed',item.startDate.locale('en').format('YYYYMMDD'));
        }}
        

        // renderFooterComponent={(handleDonePressed, daysDifference) => {
        //   console.log(handleDonePressed,'done press', daysDifference, 'days difference');
        //   return (
        //     <View
        //       style={{
        //         borderRadius: 12,
        //         borderWidth: 1,
        //         backgroundColor: '#fff',
        //         width: '100%',
        //         position: 'absolute',
        //         bottom: 10,
        //         justifyContent: 'center',
        //       }}>
        //       <View style={styles.dividerStyle} />
        //       <TouchableOpacity
        //         onPress={() => {
        //           handleDonePressed();
        //         }}>
        //         <Text style={{textAlign: 'center'}}>hello</Text>
        //       </TouchableOpacity>
        //     </View>
        //   );
        // }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthTextStyle: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 18,
  },
  buttonStyle: {
    marginTop: 5,
  },
  dividerStyle: {
    width: '100%',
    height: 1,
  },
});
