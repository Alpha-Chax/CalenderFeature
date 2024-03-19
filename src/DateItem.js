import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

class DateItem extends React.PureComponent {
    render() {
      const {
        date,
        today,
        selectedStartDate,
        selectedEndDate,
        handleDatePress,
      } = this.props;
  
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
  
      const startDate = selectedStartDate ? new Date(selectedStartDate) : null;
      const endDate = selectedEndDate ? new Date(selectedEndDate) : null;
  
      const isStartDate = startDate && date.getTime() === startDate.getTime();
      const isEndDate = endDate && date.getTime() === endDate.getTime();
      const isSelected = startDate && endDate && date >= startDate && date <= endDate;
      const isBetween = startDate && endDate && date > startDate && date < endDate;
      const isDisabled = !isToday && date < today;
  
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
          onPress={() => handleDatePress(date)}
          disabled={isDisabled}
        >
          <Text style={[styles.dateText, (isStartDate || isEndDate) && { color: 'white' }]}>
            {date.getDate()}
          </Text>
        </TouchableOpacity>
      );
    }
  }
  
  export default DateItem;