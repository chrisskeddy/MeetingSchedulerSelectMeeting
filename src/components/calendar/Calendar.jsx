import React, { Component } from 'react';
import TestData from './data/AvailableTimeTestData1';
import Day from './Day';
import { Button } from 'react-bootstrap';

import PropTypes from 'prop-types';

var month = new Array(11);
month[0] = 'Jan';
month[1] = 'Feb';
month[2] = 'Mar';
month[3] = 'Apr';
month[4] = 'May';
month[5] = 'June';
month[6] = 'July';
month[7] = 'Aug';
month[8] = 'Sept';
month[9] = 'Oct';
month[10] = 'Nov';
month[11] = 'Dec';

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
    var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), '1');
    /*
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
    var availableTimesList = TestData;
    availableTimesList.map((availableTime, index) => {
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
      let date = year + '-';
      if (monthNumber < 10) {
        date += '0';
      }
      date += monthNumber + 1 + '-';
      if (day < 10) {
        date += '0';
      }
      date += day;
      dayObjectArray[index] = {};
      dayObjectArray[index].selectedMonth = outside;
      dayObjectArray[index].date = date;
      dayObjectArray[index].isToday = isToday;
      dayObjectArray[index].availableTimesList = [];
      //console.log(dayObjectArray[index]);
      availableTimesList.map((availableTime, i) => {
        if (date === availableTime.date) {
          dayObjectArray[index].availableTimesList.push(availableTime);
        }
        return null;
      });
    }
    */
    this.state = {
      firstDayOfMonth: firstDayOfMonth
    };
    var dayObjectArray = this.generateCalendarDates();
    //console.log(dayObjectArray);
    this.state = {
      submitAvailableTimes: this.props.sendAvailableTimes,
      dayObjectArray: dayObjectArray,
      firstDayOfMonth: firstDayOfMonth
    };
  }

  generateCalendarDates() {
    var lastMonth = this.state.firstDayOfMonth.getMonth() - 1;
    var lastMonthYear = this.state.firstDayOfMonth.getFullYear();
    //fixes when we are on the first month
    if (lastMonth < 0) {
      lastMonth = 12;
      lastMonthYear = lastMonthYear - 1;
    }

    var daysInLastMonth = daysInMonth(lastMonth, lastMonthYear);
    var daysInCurrentMonth = daysInMonth(
      this.state.firstDayOfMonth.getMonth() + 1,
      this.state.firstDayOfMonth.getFullYear()
    );
    var firstWeekDay = this.state.firstDayOfMonth.getDay();
    var lastMonthDisplayDays = daysInLastMonth - firstWeekDay;
    var availableTimesList = TestData;
    availableTimesList.map((availableTime, index) => {
      var ymd = availableTime.starttime.split('-');
      var d = ymd[2].split(' ')[0];
      availableTime.date = ymd[0] + '-' + ymd[1] + '-' + d;
      availableTime.className = 'event bg-info';
      return null;
    });
    //42 days to give us 6 weeks
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var dayObjectArray = new Array(42);
    for (var i = 0; i < 42; ++i) {
      var monthNumber = this.state.firstDayOfMonth.getMonth();
      var year = this.state.firstDayOfMonth.getFullYear();
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
        if (new Date(year, monthNumber, number).getTime() === today.getTime()) {
          isToday = true;
        }
      } else if (i - firstWeekDay + 1 <= daysInCurrentMonth) {
        //current month
        number = i - firstWeekDay + 1;
        if (new Date(year, monthNumber, number).getTime() === today.getTime()) {
          isToday = true;
        }
      } else {
        monthNumber = monthNumber + 1 > 11 ? 0 : monthNumber + 1;
        year = monthNumber === 0 ? year + 1 : year;
        //next month
        number = i - firstWeekDay - daysInCurrentMonth + 1;
        outside = true;
        if (new Date(year, monthNumber, number).getTime() === today.getTime()) {
          isToday = true;
        }
      }
      const day = number;
      const index = i;
      let date = year + '-';
      if (monthNumber < 10) {
        date += '0';
      }
      date += monthNumber + 1 + '-';
      if (day < 10) {
        date += '0';
      }
      date += day;
      dayObjectArray[index] = {};
      dayObjectArray[index].selectedMonth = outside;
      dayObjectArray[index].date = date;
      dayObjectArray[index].isToday = isToday;
      dayObjectArray[index].availableTimesList = [];
      //console.log(dayObjectArray[index]);
      availableTimesList.map((availableTime, i) => {
        if (date === availableTime.date) {
          dayObjectArray[index].availableTimesList.push(availableTime);
        }
        return null;
      });
    }
    return dayObjectArray;
  }

  postAvailableTimes() {
    for (var i = 0; i < this.state.dayObjectArray.length; ++i) {
      for (
        var c = 0;
        c < this.state.dayObjectArray[i].availableTimesList.length;
        ++c
      ) {
        if (
          this.state.dayObjectArray[i].availableTimesList[c].className ===
          'event bg-primary'
        ) {
          console.log('i: ' + i + ' c: ' + c);
          const newAvailableTimesList = {
            ...this.state.dayObjectArray[i].availableTimesList[c],
            className: 'event bg-info'
          };
          //this.setState();
          var dayObject = this.state.dayObjectArray[i];
          dayObject.availableTimesList[c] = newAvailableTimesList;
          var newDayObjectArray = this.state.dayObjectArray;
          newDayObjectArray[i] = dayObject;
          this.setState({
            dayObjectArray: newDayObjectArray
          });

          //this.state.dayObjectArray[i].availableTimesList[c] = newAvailableTime;
          console.log(this.state.dayObjectArray[i].availableTimesList[c]);
        }
      }
    }
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

  updateChildClassName(index, className) {
    var tmpArray = this.state.childClassName;
    tmpArray[index] = className;
    this.setState({
      childClassName: tmpArray
    });
  }

  updateAvailableTime(index, id, startTime, endTime) {
    var dayObject = this.state.dayObjectArray[index];
    var found = false;
    for (var i = 0; i < dayObject.availableTimesList.length; ++i) {
      if (dayObject.availableTimesList[i].id === id) {
        found = true;
        dayObject.availableTimesList[i].className = 'event bg-primary';
        dayObject.availableTimesList[i].starttime =
          dayObject.date + ' ' + startTime + ':00';
        dayObject.availableTimesList[i].endtime =
          dayObject.date + ' ' + endTime + ':00';
      }
    }
    if (found === false) {
      var availableTime = {};
      availableTime.id = -1;
      availableTime.className = 'event bg-primary';
      availableTime.date = dayObject.date;
      availableTime.starttime = dayObject.date + ' ' + startTime + ':00';
      availableTime.endtime = dayObject.date + ' ' + endTime + ':00';
      const newAvailableTimesList = [
        ...dayObject.availableTimesList,
        availableTime
      ];
      dayObject.availableTimesList = newAvailableTimesList;
      const newDayObjectArray = this.state.dayObjectArray;
      newDayObjectArray[index] = dayObject;
      this.setState({
        dayObjectArray: newDayObjectArray
      });
      //this.state.dayObjectArray[index] = dayObject;
      //dayObject.availableTimesList.push(availableTime);
    }
    /*
    this.setState({
      dayObjectArray: this.state.dayObjectArray
    });
    */
  }

  render() {
    let calendarDisplay = [];
    for (var x = 0; x < this.state.dayObjectArray.length; ++x) {
      calendarDisplay.push(
        <Day
          key={x}
          index={x}
          date={this.state.dayObjectArray[x].date}
          selectedMonth={this.state.dayObjectArray[x].selectedMonth}
          isToday={this.state.dayObjectArray[x].isToday}
          availableTimesList={this.state.dayObjectArray[x].availableTimesList}
          updateAvailableTime={this.updateAvailableTime.bind(this)}
        ></Day>
      );
    }

    return (
      <div>
        <div className="container py-5">
          <div className="calendar shadow bg-white p-5">
            <h2 className="month font-weight-bold mb-0 text-uppercase text-center">
              <i className="fa fa-calendar fa-1x mr-3"></i>
              Calendar 1
            </h2>
            <h2
              id="Month"
              className="month font-weight-bold mb-0 text-uppercase text-center"
            >
              <i className="fa fa-chevron-left fa-1x mr-5"></i>
              {month[this.state.firstDayOfMonth.getMonth()]}{' '}
              {this.state.firstDayOfMonth.getFullYear()}
              <i className="fa fa-chevron-right fa-1x ml-5"></i>
            </h2>
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
                  onClick={this.postAvailableTimes.bind(this)}
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
