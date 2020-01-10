import React from 'react';
import RenderCalendar from './RenderCalendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
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


var today = new Date();

function App() {
  return (
    <div>
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
            <RenderCalendar />
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
