import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

var month = new Array(11);
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}
var today = new Date();

/**
 * Generates the calendar and displays it correctly
 */
function renderCalendar() {
  var lastMonth = today.getMonth() - 1;
  var lastMonthYear = today.getFullYear();
  //fixes when we are on the first month
  if (lastMonth < 0) {
    lastMonth = 12;
    lastMonthYear = lastMonthYear - 1;
  }

  var daysInLastMonth = daysInMonth(lastMonth, lastMonthYear);
  var daysInCurrentMonth = daysInMonth(today.getMonth(), today.getFullYear());
  var firstWeekDay = new Date(today.getFullYear() + "-" + (today.getMonth() + 1) + "-01").getDay();
  var lastMonthDisplayDays = daysInLastMonth - firstWeekDay;
  let calendarDisplay = [];

  var todayStyle = {
    backgroundColor: '#EAEAEA'
  }
  for (var i = 0; i < 35; ++i) {
    var outside = false;
    var number = 0;
    var isToday = false;
    //Find number to display on calendar and which month it is from
    if (lastMonthDisplayDays + i < daysInLastMonth) { //previous month
      outside = true;
      number = lastMonthDisplayDays + i + 1;
    } else if (i - firstWeekDay + 1 <= daysInCurrentMonth) { //current month
      number = i - firstWeekDay + 1;
      if (i - firstWeekDay + 1 === today.getDate()) {
        isToday = true;
      }
    } else { //next month
      number = i - firstWeekDay - daysInCurrentMonth + 1;
      outside = true;
    }
    //Create JSX for calendar display
    if (outside) {
      calendarDisplay.push(<li id={"li" + i} className="outside"><div className="date">{number}</div></li>);
    } else {
      if (isToday) {
        calendarDisplay.push(<li id={"li" + i} style={todayStyle}><div className="date">{number}</div></li>);
      } else {
        calendarDisplay.push(<li id={"li" + i}><div className="date">{number}</div></li>);
      }
    }
  }
  return calendarDisplay;
}
function App() {
  return (
    <div className="container py-5">
      <div className="calendar shadow bg-white p-5">
        <div className="d-flex align-items-center"><i className="fa fa-calendar fa-3x mr-3"></i>
          <h2 id="Month" className="month font-weight-bold mb-0 text-uppercase">{month[today.getMonth()]} {today.getFullYear()}</h2>
        </div>
        <br></br>
        <ol className="day-names list-unstyled">
          <li className="font-weight-bold text-uppercase">Sun</li>
          <li className="font-weight-bold text-uppercase">Mon</li>
          <li className="font-weight-bold text-uppercase">Tue</li>
          <li className="font-weight-bold text-uppercase">Wed</li>
          <li className="font-weight-bold text-uppercase">Thu</li>
          <li className="font-weight-bold text-uppercase">Fri</li>
          <li className="font-weight-bold text-uppercase">Sat</li>
        </ol>
        <ol id="days" className="days list-unstyled">
          {
            renderCalendar()
          }
        </ol>
      </div>
    </div>
  );
}

export default App;
