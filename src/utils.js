// Function to find the dates with lowest amount
export function findLowestAmountDates() {
    var highlightedDates = {
        "April 2024": [
          { date: "2024-04-01", amount: 2456 },
          { date: "2024-04-05", amount: 5956 },
          { date: "2024-04-10", amount: 2456 },
          { date: "2024-04-15", amount: 1406 },
          { date: "2024-04-20", amount: 2400 },
          { date: "2024-04-25", amount: 6497 }
        ],
        "May 2024": [
          { date: "2024-05-01", amount: 3721 },
          { date: "2024-05-03", amount: 4873 },
          { date: "2024-05-04", amount: 9753 },
          { date: "2024-05-05", amount: 1983 },
          { date: "2024-05-10", amount: 5634 },
          { date: "2024-05-11", amount: 5834 },
          { date: "2024-05-15", amount: 2890 },
          { date: "2024-05-20", amount: 4312 },
          { date: "2024-05-25", amount: 5021 }
        ],
        "June 2024": [
          { date: "2024-06-01", amount: 4800 },
          { date: "2024-06-05", amount: 3750 },
          { date: "2024-06-10", amount: 5120 },
          { date: "2024-06-15", amount: 3420 },
          { date: "2024-06-20", amount: 4800 },
          { date: "2024-06-25", amount: 4100 }
        ],
        "July 2024": [
          { date: "2024-07-01", amount: 2800 },
          { date: "2024-07-05", amount: 3200 },
          { date: "2024-07-10", amount: 3600 },
          { date: "2024-07-15", amount: 3800 },
          { date: "2024-07-20", amount: 2950 },
          { date: "2024-07-25", amount: 4800 }
        ],
        "August 2024": [
          { date: "2024-08-01", amount: 5000 },
          { date: "2024-08-05", amount: 2800 },
          { date: "2024-08-10", amount: 4200 },
          { date: "2024-08-15", amount: 3700 },
          { date: "2024-08-20", amount: 5500 },
          { date: "2024-08-25", amount: 4900 }
        ],
        "September 2024": [
          { date: "2024-09-01", amount: 3800 },
          { date: "2024-09-05", amount: 2900 },
          { date: "2024-09-10", amount: 4800 },
          { date: "2024-09-15", amount: 5200 },
          { date: "2024-09-20", amount: 4100 },
          { date: "2024-09-25", amount: 3900 }
        ],
        "October 2024": [
          { date: "2024-10-01", amount: 2456 },
          { date: "2024-10-05", amount: 5956 },
          { date: "2024-10-10", amount: 2456 },
          { date: "2024-10-15", amount: 1406 },
          { date: "2024-10-20", amount: 2400 },
          { date: "2024-10-25", amount: 6497 }
        ],
        "November 2024": [
          { date: "2024-11-01", amount: 3721 },
          { date: "2024-11-05", amount: 1983 },
          { date: "2024-11-10", amount: 5634 },
          { date: "2024-11-15", amount: 2890 },
          { date: "2024-11-20", amount: 4312 },
          { date: "2024-11-25", amount: 5021 }
        ],
        "December 2024": [
          { date: "2024-12-01", amount: 4800 },
          { date: "2024-12-05", amount: 3750 },
          { date: "2024-12-10", amount: 5120 },
          { date: "2024-12-15", amount: 3420 },
          { date: "2024-12-20", amount: 4800 },
          { date: "2024-12-25", amount: 4100 }
        ]
      };
    const lowestAmountDates = {};
  
    for (const month in highlightedDates) {
      let lowestAmountDate = null;
      let lowestAmount = Infinity;
  
      highlightedDates[month].forEach(entry => {
        if (entry.amount < lowestAmount) {
          lowestAmount = entry.amount;
          lowestAmountDate = entry.date;
        }
      });
  
      lowestAmountDates[month] = lowestAmountDate;
    }
  
    return lowestAmountDates;
  }
  
  // Function to generate month data
  export function generateMonthData(startMonth, numMonths) {
    var highlightedDates = {
        "April 2024": [
          { date: "2024-04-01", amount: 2456 },
          { date: "2024-04-05", amount: 5956 },
          { date: "2024-04-10", amount: 2456 },
          { date: "2024-04-15", amount: 1406 },
          { date: "2024-04-20", amount: 2400 },
          { date: "2024-04-25", amount: 6497 }
        ],
        "May 2024": [
          { date: "2024-05-01", amount: 3721 },
          { date: "2024-05-03", amount: 4873 },
          { date: "2024-05-04", amount: 9753 },
          { date: "2024-05-05", amount: 1983 },
          { date: "2024-05-10", amount: 5634 },
          { date: "2024-05-11", amount: 5834 },
          { date: "2024-05-15", amount: 2890 },
          { date: "2024-05-20", amount: 4312 },
          { date: "2024-05-25", amount: 5021 }
        ],
        "June 2024": [
          { date: "2024-06-01", amount: 4800 },
          { date: "2024-06-05", amount: 3750 },
          { date: "2024-06-10", amount: 5120 },
          { date: "2024-06-15", amount: 3420 },
          { date: "2024-06-20", amount: 4800 },
          { date: "2024-06-25", amount: 4100 }
        ],
        "July 2024": [
          { date: "2024-07-01", amount: 2800 },
          { date: "2024-07-05", amount: 3200 },
          { date: "2024-07-10", amount: 3600 },
          { date: "2024-07-15", amount: 3800 },
          { date: "2024-07-20", amount: 2950 },
          { date: "2024-07-25", amount: 4800 }
        ],
        "August 2024": [
          { date: "2024-08-01", amount: 5000 },
          { date: "2024-08-05", amount: 2800 },
          { date: "2024-08-10", amount: 4200 },
          { date: "2024-08-15", amount: 3700 },
          { date: "2024-08-20", amount: 5500 },
          { date: "2024-08-25", amount: 4900 }
        ],
        "September 2024": [
          { date: "2024-09-01", amount: 3800 },
          { date: "2024-09-05", amount: 2900 },
          { date: "2024-09-10", amount: 4800 },
          { date: "2024-09-15", amount: 5200 },
          { date: "2024-09-20", amount: 4100 },
          { date: "2024-09-25", amount: 3900 }
        ],
        "October 2024": [
          { date: "2024-10-01", amount: 2456 },
          { date: "2024-10-05", amount: 5956 },
          { date: "2024-10-10", amount: 2456 },
          { date: "2024-10-15", amount: 1406 },
          { date: "2024-10-20", amount: 2400 },
          { date: "2024-10-25", amount: 6497 }
        ],
        "November 2024": [
          { date: "2024-11-01", amount: 3721 },
          { date: "2024-11-05", amount: 1983 },
          { date: "2024-11-10", amount: 5634 },
          { date: "2024-11-15", amount: 2890 },
          { date: "2024-11-20", amount: 4312 },
          { date: "2024-11-25", amount: 5021 }
        ],
        "December 2024": [
          { date: "2024-12-01", amount: 4800 },
          { date: "2024-12-05", amount: 3750 },
          { date: "2024-12-10", amount: 5120 },
          { date: "2024-12-15", amount: 3420 },
          { date: "2024-12-20", amount: 4800 },
          { date: "2024-12-25", amount: 4100 }
        ]
      };
    const months = []; // Initialize as an array
    const lowestAmountDates = findLowestAmountDates(highlightedDates);
  
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
      const highlightedDatesForMonth = highlightedDates[monthData.month] ? highlightedDates[monthData.month].map(date => new Date(date.date)) : [];
  
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
        const isHighlighted = highlightedDatesForMonth.some(highlightedDate => isSameDay(highlightedDate, day));
        const lowestAmountDateForMonth = lowestAmountDates[monthData.month];
        const isLowest = isSameDay(new Date(lowestAmountDateForMonth), day);
  
        monthData.days.push({
          date: dayISO,
          key: dayISO,
          dayOfWeek: day.toLocaleDateString("en-US", { weekday: "short" }),
          highlighted: isHighlighted,
          isLowest: isLowest,
        });
      }
      months.push(monthData);
      currentDate.setMonth(currentDate.getMonth() + 1);
  
    }
  
    return months;
  }

  
  // Function to check if two dates are the same day
  export function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }


 