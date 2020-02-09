import React, { Component } from 'react';
import TestData from './data/AvailableTimeTestData1';
import Day from './Day';
import { Button } from 'react-bootstrap';

import PropTypes from 'prop-types';

var month = new Array(11);
month[0] = 'Jan.';
month[1] = 'Feb.';
month[2] = 'Mar.';
month[3] = 'Apr.';
month[4] = 'May';
month[5] = 'June';
month[6] = 'July';
month[7] = 'Aug.';
month[8] = 'Sept.';
month[9] = 'Oct.';
month[10] = 'Nov.';
month[11] = 'Dec.';

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
    var today = new Date();
    var lastMonth = today.getMonth() - 1;
    var lastMonthYear = today.getFullYear();
    //fixes when we are on the first month
    if (lastMonth < 0) {
      lastMonth = 12;
      lastMonthYear = lastMonthYear - 1;
    }

    var daysInLastMonth = daysInMonth(lastMonth, lastMonthYear);
    var daysInCurrentMonth = daysInMonth(
      today.getMonth() + 1,
      today.getFullYear()
    );
    var firstWeekDay = new Date(
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-01'
    ).getDay();
    var lastMonthDisplayDays = daysInLastMonth - firstWeekDay;
    let calendarDisplay = [];
    //calendarDisplay.push(<Example />);
    var todayStyle = {
      backgroundColor: '#EAEAEA'
    };
    var availiableTimesList = TestData;
    availiableTimesList.map((availableTime, index) => {
      var ymd = availableTime.starttime.split('-');
      var d = ymd[2].split(' ')[0];
      availableTime.date = ymd[0] + '-' + ymd[1] + '-' + d;
      availableTime.className = 'event bg-info';
      return null;
    });
    //42 days to give us 6 weeks
    var dayObjectArray = new Array(42);
    for (var i = 0; i < 42; ++i) {
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
      const day = number;
      const index = i;
      var tmp;
      var availableTimesList = [];
      availableTimesListArray[index] = [];
      var date = year + '-';
      if (monthNumber < 10) {
        date += '0';
      }
      date += monthNumber + 1 + '-';
      if (day < 10) {
        date += '0';
      }
      date += day;
      dayObjectArray[index].selectedMonth = outside;
      dayObjectArray[index].date = date;
      dayObjectArray[index].isToday = isToday;
      dayObjectArray[index].availableTimesList = [];
      availiableTimesList.map((availableTime, index) => {
        if (dayObjectArray[index].date === availableTime.date) {
          dayObjectArray[index].availableTimesList.push(availableTime);
        }
        return null;
      });
      if (outside) {
        tmp = this.state.availableTimesList;
        tmp.map((availableTime, index) => {
          var date = year + '-';
          if (monthNumber < 10) {
            date += '0';
          }
          date += monthNumber + 1 + '-';
          if (day < 10) {
            date += '0';
          }
          date += day;
          if (availableTime.date === date) {
            availableTimesListArray[index].push(availableTime);
          }
          return null;
        });
        calendarDisplay.push(
          <Day
            key={index}
            index={index}
            className="outside"
            day={day}
            month={month[monthNumber]}
            year={year}
            sendAvailableClassName={this.state.childClassName[index]}
            updateColor={this.updateChildClassName.bind(this)}
            availableTimesList={this.state.availableTimesListArray[index]}
          ></Day>
        );
      } else {
        tmp = this.state.availableTimesList;
        tmp.map((availableTime, index) => {
          var date = year + '-';
          if (monthNumber < 10) {
            date += '0';
          }
          date += monthNumber + 1 + '-';
          if (day < 10) {
            date += '0';
          }
          date += day;
          if (availableTime.date === date) {
            availableTimesListArray[index].push(availableTime);
          }
          return null;
        });
        if (isToday) {
          calendarDisplay.push(
            <Day
              key={index}
              index={index}
              className="inside"
              style={todayStyle}
              day={day}
              month={month[monthNumber]}
              year={year}
              sendAvailableClassName={this.state.childClassName[index]}
              updateColor={this.updateChildClassName.bind(this)}
              availableTimesList={availableTimesListArray[index]}
            ></Day>
          );
        } else {
          calendarDisplay.push(
            <Day
              key={index}
              index={index}
              className="inside"
              day={day}
              month={month[monthNumber]}
              year={year}
              sendAvailableClassName={this.state.childClassName[index]}
              updateColor={this.updateChildClassName.bind(this)}
              availableTimesList={availableTimesList}
            ></Day>
          );
        }
      }
    }
    for (
      var i = 0, value = 'event bg-info', size = 42, array = new Array(42);
      i < size;
      i++
    ) {
      array[i] = value;
    }

    this.state = {
      submitAvailableTimes: this.props.sendAvailableTimes,
      childClassName: array,
      availableTimesList: availiableTimesList
    };
  }

  resetChildClassNames() {
    var array = this.state.childClassName;
    for (var i = 0, size = 42; i < size; i++) {
      array[i] = 'event bg-info';
    }
    this.setState(state => ({
      childClassName: array
    }));
  }

  addAvailableTime(index, availableTime) {}
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
    var daysInCurrentMonth = daysInMonth(
      today.getMonth() + 1,
      today.getFullYear()
    );
    var firstWeekDay = new Date(
      today.getFullYear() + '-' + (today.getMonth() + 1) + '-01'
    ).getDay();
    var lastMonthDisplayDays = daysInLastMonth - firstWeekDay;
    let calendarDisplay = [];
    //calendarDisplay.push(<Example />);
    var todayStyle = {
      backgroundColor: '#EAEAEA'
    };
    //42 days to give us 6 weeks
    var availableTimesListArray = new Array(42);
    for (var i = 0; i < 42; ++i) {
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
      const day = number;
      const index = i;
      var tmp;
      var availableTimesList = [];
      availableTimesListArray[index] = [];
      if (outside) {
        tmp = this.state.availableTimesList;
        tmp.map((availableTime, index) => {
          var date = year + '-';
          if (monthNumber < 10) {
            date += '0';
          }
          date += monthNumber + 1 + '-';
          if (day < 10) {
            date += '0';
          }
          date += day;
          if (availableTime.date === date) {
            availableTimesListArray[index].push(availableTime);
          }
          return null;
        });
        calendarDisplay.push(
          <Day
            key={index}
            index={index}
            className="outside"
            day={day}
            month={month[monthNumber]}
            year={year}
            sendAvailableClassName={this.state.childClassName[index]}
            updateColor={this.updateChildClassName.bind(this)}
            availableTimesList={this.state.availableTimesListArray[index]}
          ></Day>
        );
      } else {
        tmp = this.state.availableTimesList;
        tmp.map((availableTime, index) => {
          var date = year + '-';
          if (monthNumber < 10) {
            date += '0';
          }
          date += monthNumber + 1 + '-';
          if (day < 10) {
            date += '0';
          }
          date += day;
          if (availableTime.date === date) {
            availableTimesListArray[index].push(availableTime);
          }
          return null;
        });
        if (isToday) {
          calendarDisplay.push(
            <Day
              key={index}
              index={index}
              className="inside"
              style={todayStyle}
              day={day}
              month={month[monthNumber]}
              year={year}
              sendAvailableClassName={this.state.childClassName[index]}
              updateColor={this.updateChildClassName.bind(this)}
              availableTimesList={availableTimesListArray[index]}
            ></Day>
          );
        } else {
          calendarDisplay.push(
            <Day
              key={index}
              index={index}
              className="inside"
              day={day}
              month={month[monthNumber]}
              year={year}
              sendAvailableClassName={this.state.childClassName[index]}
              updateColor={this.updateChildClassName.bind(this)}
              availableTimesList={availableTimesList}
            ></Day>
          );
        }
      }
    }
    return (
      <div>
        <div className="container py-5">
          <div className="calendar shadow bg-white p-5">
            <div className="d-flex align-items-center">
              <i className="fa fa-calendar fa-3x mr-3"></i>
              <h2
                id="Month"
                className="month font-weight-bold mb-0 text-uppercase"
              >
                {month[today.getMonth()]} {today.getFullYear()} (Calendar 1)
              </h2>
            </div>
            <br></br>
            <ol className="day-names list-unstyled">
              <li key="sun" className="font-weight-bold text-uppercase">
                Sun
              </li>
              <li key="mon" className="font-weight-bold text-uppercase">
                Mon
              </li>
              <li key="tue" className="font-weight-bold text-uppercase">
                Tue
              </li>
              <li key="wed" className="font-weight-bold text-uppercase">
                Wed
              </li>
              <li key="thu" className="font-weight-bold text-uppercase">
                Thu
              </li>
              <li key="fri" className="font-weight-bold text-uppercase">
                Fri
              </li>
              <li key="sat" className="font-weight-bold text-uppercase">
                Sat
              </li>
            </ol>
            <ol id="days" className="days list-unstyled">
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
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  sendAvailableTimes: PropTypes.bool
};
export default Calendar;
