import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'react-bootstrap';


function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function Example() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

class DateLabel extends React.Component {
  render() {
    return ReactDOM.createPortal(
      ": " + this.props.date,
      document.querySelector("#modalDate")
    );
  }
}

function openAvailableTimeModel(calendarDateId) {

}

function addAvailableTime(calendarDateId) {

}

/**
 * Generates the calendar and displays it correctly
 */
function RenderCalendar() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
  var firstWeekDay = new Date(today.getFullYear() + "-" + (today.getMonth() + 1) + "-01").getDay();
  var lastMonthDisplayDays = daysInLastMonth - firstWeekDay;
  let calendarDisplay = [];
  //calendarDisplay.push(<Example />);
  var todayStyle = {
    backgroundColor: '#EAEAEA'
  }
  //35 days to give us 5 weeks
  for (var i = 0; i < 35; ++i) {
    var outside = false;
    var number = 0;
    var isToday = false;
    let idname = "li";
    //Find number to display on calendar and which month it is from
    if (lastMonthDisplayDays + i < daysInLastMonth) { //previous month
      idname += "LastMonth";
      outside = true;
      number = lastMonthDisplayDays + i + 1;
    } else if (i - firstWeekDay + 1 <= daysInCurrentMonth) { //current month
      idname += "CurrentMonth";
      number = i - firstWeekDay + 1;
      if (i - firstWeekDay + 1 === today.getDate()) {
        isToday = true;
      }
    } else { //next month
      idname += "NextMonth";
      number = i - firstWeekDay - daysInCurrentMonth + 1;
      outside = true;
    }
    //Create JSX for calendar display
    const val = number;
    if (outside) {
      calendarDisplay.push(<li id={idname + val} key={idname + val} onClick={handleShow} className="outside"><div className="date">{number}</div></li>);
    } else {
      if (isToday) {
        calendarDisplay.push(<li id={idname + val} key={idname + val} onClick={handleShow} style={todayStyle}><div className="date">{number}</div></li>);
      } else {
        calendarDisplay.push(<li id={idname + val} key={idname + val} onClick={handleShow}><div className="date">{number}</div></li>);
      }
    }
  }
  //return calendarDisplay;

  return (
    <>
      <Modal id="myModal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Date: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Add Available Time</h3>
          <p>Start Time:&nbsp;<input type="text" id="startTime"></input></p>
          <p>&nbsp;End Time:&nbsp;<input type="text" id="endTime"></input></p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Add Available
          </Button>
        </Modal.Footer>
      </Modal>
      {calendarDisplay}
    </>
  );
}

export default RenderCalendar;
