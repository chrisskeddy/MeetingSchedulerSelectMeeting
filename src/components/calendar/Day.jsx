import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
/**
 * AddAvailabelTime:
 *  component that allows selecting specific time and adding it.
 */
class Day extends Component {
  static getDerivedStateFromProps(props, state) {
    if (props.date !== state.date) {
      if (props.availableTimesList.length < 1) {
        return {
          startTime: '',
          endTime: '',
          date: props.date
        };
      }
      var startTimeList = props.availableTimesList[0].starttime
        .split(' ')[1]
        .split(':');
      //extract the hour and minute (drop the seconds)
      var startTime = startTimeList[0] + ':' + startTimeList[1];
      var endTimeList = props.availableTimesList[0].endtime
        .split(' ')[1]
        .split(':');
      var endTime = endTimeList[0] + ':' + endTimeList[1];
      return {
        startTime: startTime,
        endTime: endTime,
        oldStartTime: startTime,
        oldEndTime: endTime,
        date: props.date
      };
    }
    return state;
  }

  generateAvailableTimesListDivs() {
    let availableTimesListDivs = [];
    for (var i = 0; i < this.props.availableTimesList.length; ++i) {
      if (i === 2) {
        availableTimesListDivs.push(
          <div
            key={this.props.availableTimesList[i].starttime}
            className="text-center"
          >
            ...
          </div>
        );
        break;
      } else {
        var startTimeList = this.props.availableTimesList[i].starttime
          .split(' ')[1]
          .split(':');
        //extract the hour and minute (drop the seconds)
        var startTime = startTimeList[0] + ':' + startTimeList[1];
        var endTimeList = this.props.availableTimesList[i].endtime
          .split(' ')[1]
          .split(':');
        var endTime = endTimeList[0] + ':' + endTimeList[1];
        availableTimesListDivs.push(
          <div
            key={this.props.availableTimesList[i].starttime}
            className={this.props.availableTimesList[i].className}
          >
            {startTime} -- {endTime}
          </div>
        );
      }
    }
    return (
      <>
        {this.props.date.split('-')[2]}
        {availableTimesListDivs}
      </>
    );
  }

  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.generateAvailableTimesListDivs = this.generateAvailableTimesListDivs.bind(
      this
    );
    this.state = {
      startTime: '',
      oldStartTime: '',
      endTime: '',
      oldEndTime: '',
      show: false,
      day: props.date.split('-')[2],
      style: this.props.isToday ? { backgroundColor: '#EAEAEA' } : {}
    };
    setTimeout(() => {
      this.generateAvailableTimesListDivs();
    }, 200);
  }
  handleStartTimeChange(event) {
    this.setState({ startTime: event.target.value });
  }
  handleEndTimeChange(event) {
    this.setState({ endTime: event.target.value });
  }
  updateDay() {
    if (this.state.startTime && this.state.endTime) {
      var id = -1;
      if (this.props.availableTimesList.length > 0) {
        id = this.props.availableTimesList[0].id;
      }
      this.props.updateAvailableTime(
        this.props.index,
        id,
        this.state.startTime,
        this.state.endTime
      );
      /*
      this.props.updateColor(this.props.index, 'event bg-primary');
      this.setState({
        sendAvailableClassName: 'event bg-primary'
      });
      */
      //Add Timeout so parent updates sendAvailableClassName
      /*
      setTimeout(() => {
        this.generateAvailableTimesListDivs();
      }, 200);
      */
    }
  }
  cancelInput() {
    //use timeout so the user does not see the number flicker
    setTimeout(() => {
      this.setState({
        startTime: this.state.oldStartTime,
        endTime: this.state.oldEndTime
      });
    }, 500);
  }
  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  render() {
    return (
      <>
        <li
          className={this.props.selectedMonth ? 'outside' : 'inside'}
          style={this.props.isToday ? { backgroundColor: '#EAEAEA' } : {}}
          key={this.props.date}
          onClick={this.handleShow}
        >
          <div className="date">{this.generateAvailableTimesListDivs()}</div>
        </li>
        <Modal
          show={this.state.show}
          onHide={() => {
            this.handleClose();
            this.cancelInput();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title id="modalTitle">
              {this.props.date} {this.state.date}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Add Available Time</h3>
            <p>
              Start Time:&nbsp;
              <input
                type="text"
                key={'start' + this.props.date}
                value={this.state.startTime}
                onChange={this.handleStartTimeChange}
              ></input>
            </p>
            <p>
              &nbsp;End Time:&nbsp;
              <input
                type="text"
                key={'end' + this.props.date}
                value={this.state.endTime}
                onChange={this.handleEndTimeChange}
              ></input>
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.handleClose();
                this.cancelInput();
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.handleClose();
                this.updateDay();
              }}
            >
              Add Available
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

/*
Day.propTypes = {
  day: PropTypes.number,
  year: PropTypes.number,
  className: PropTypes.string,
  month: PropTypes.string
};
*/

export default Day;
