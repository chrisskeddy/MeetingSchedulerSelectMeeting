import React, { Component } from 'react';
import AddAvailableTime from './AddAvailableTime';
import { Button } from 'react-bootstrap';

import PropTypes from 'prop-types';

var month = new Array(11);
month[0] = 'January';
month[1] = 'February';
month[2] = 'March';
month[3] = 'April';
month[4] = 'May';
month[5] = 'June';
month[6] = 'July';
month[7] = 'August';
month[8] = 'September';
month[9] = 'October';
month[10] = 'November';
month[11] = 'December';

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
/**
 * Calendar:
 *    Generates the calendar for the current month
 */
class Calendar extends Component {
  constructor(props, context) {
    super(props, context);
    for (
      var i = 0, value = 'event bg-info', size = 35, array = new Array(35);
      i < size;
      i++
    ) {
      array[i] = value;
    }
    this.state = {
      submitAvailableTimes: this.props.sendAvailableTimes,
      childClassName: array
    };
  }
  resetChildClassNames() {
    var array = this.state.childClassName;
    for (var i = 0, size = 35; i < size; i++) {
      array[i] = 'event bg-info';
    }
    this.setState(state => ({
      childClassName: array
    }));
  }
  updateChildClassName(index, className) {
    var tmpArray = this.state.childClassName;
    tmpArray[index] = className;
    this.setState({
      childClassName: tmpArray
    });
  }
  render() {
    var today = new Date();
    var lastMonth = today.getMonth() - 1;
    var lastMonthYear = today.getFullYear();
    //fixes when we are on the first month
    if (lastMonth < 0) {
      lastMonth = 12;
      lastMonthYear = lastMonthYear - 1;
    }

    var daysInLastMonth = daysInMonth(lastMonth, lastMonthYear);
    var daysInCurrentMonth = daysInMonth(today.getMonth(), today.getFullYear());
    var firstWeekDay = new Date(
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-01'
    ).getDay();
    var lastMonthDisplayDays = daysInLastMonth - firstWeekDay;
    let calendarDisplay = [];
    //calendarDisplay.push(<Example />);
    var todayStyle = {
      backgroundColor: '#EAEAEA'
    };
    //35 days to give us 5 weeks
    for (var i = 0; i < 35; ++i) {
      var monthNumber = today.getMonth();
      var year = today.getFullYear();
      var outside = false;
      var number = 0;
      var isToday = false;
      //Find number to display on calendar and which month it is from
      if (lastMonthDisplayDays + i < daysInLastMonth) {
        monthNumber = monthNumber - 1 < 0 ? 11 : monthNumber - 1;
        year = monthNumber === 11 ? year - 1 : year;
        //previous month
        outside = true;
        number = lastMonthDisplayDays + i + 1;
      } else if (i - firstWeekDay + 1 <= daysInCurrentMonth) {
        //current month
        number = i - firstWeekDay + 1;
        if (i - firstWeekDay + 1 === today.getDate()) {
          isToday = true;
        }
      } else {
        monthNumber = monthNumber + 1 > 11 ? 0 : monthNumber + 1;
        year = monthNumber === 0 ? year + 1 : year;
        //next month
        number = i - firstWeekDay - daysInCurrentMonth + 1;
        outside = true;
      }
      //Create JSX for calendar display
      const val = number;
      const index = i;
      if (outside) {
        calendarDisplay.push(
          <AddAvailableTime
            key={index}
            index={index}
            className="outside"
            day={val}
            month={month[monthNumber]}
            year={year}
            sendAvailableClassName={this.state.childClassName[index]}
            updateColor={this.updateChildClassName.bind(this)}
          ></AddAvailableTime>
        );
      } else {
        if (isToday) {
          calendarDisplay.push(
            <AddAvailableTime
              key={index}
              index={index}
              className="inside"
              style={todayStyle}
              day={val}
              month={month[monthNumber]}
              year={year}
              sendAvailableClassName={this.state.childClassName[index]}
              updateColor={this.updateChildClassName.bind(this)}
            ></AddAvailableTime>
          );
        } else {
          calendarDisplay.push(
            <AddAvailableTime
              key={index}
              index={index}
              className="inside"
              day={val}
              month={month[monthNumber]}
              year={year}
              sendAvailableClassName={this.state.childClassName[index]}
              updateColor={this.updateChildClassName.bind(this)}
            ></AddAvailableTime>
          );
        }
      }
    }
    return (
      <>
        {calendarDisplay}
        <div className="text-center">
          <Button
            onClick={this.resetChildClassNames.bind(this)}
            variant="primary"
            size="lg"
          >
            Submit
          </Button>
        </div>
      </>
    );
  }
}

Calendar.propTypes = {
  sendAvailableTimes: PropTypes.bool
};
export default Calendar;
