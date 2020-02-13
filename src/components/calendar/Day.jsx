import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
/**
 * AddAvailabelTime:
 *  component that allows selecting specific time and adding it.
 */
class Day extends Component {
  componentDidUpdate() {
    console.log('update:' + this.props.index + ' date:' + this.props.date);
    this.generateAvailableTimesListDivs();
    /*
    if (this.props.availableTimesList !== this.state.availableTimesList) {
      this.setState({
        availableTimesList: this.props.availableTimesList
      });
      this.setState({
        columnData: (
          <>
            {this.state.date.split('-')[2]}
            {this.state.availableTimesListDivs}
          </>
        )
      });
    }
    */
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
        {this.state.day}
        {availableTimesListDivs}
      </>
    );
    /*
      var columnData = (
        <>
          {this.state.day}
          {availableTimesListDivs}
        </>
      );
      if (
        this.state.availableTimesListDivs !== availableTimesListDivs ||
        this.state.columnData !== columnData
      ) {
        this.setState({
          availableTimesListDivs: availableTimesListDivs,
          columnData: columnData
        });
      }
    }
      */
  }

  constructor(props, context) {
    super(props, context);
    var className = 'inside';
    if (this.props.selectedMonth) {
      className = 'outside';
    }
    var style = {};
    if (this.props.isToday) {
      style = {
        backgroundColor: '#EAEAEA'
      };
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.state = {
      className: className,
      startTime: '',
      oldStartTime: '',
      endTime: '',
      oldEndTime: '',
      show: false,
      date: props.date,
      day: props.date.split('-')[2],
      style: style
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
      setTimeout(() => {
        this.generateAvailableTimesListDivs();
        /*
        this.setState({
          oldStartTime: this.state.startTime,
          oldEndTime: this.state.endTime,
          columnData: (
            <>
              {this.props.day}
              <div className={this.props.sendAvailableClassName}>
                {this.state.startTime} -- {this.state.endTime}
              </div>
            </>
          )
        });
        */
      }, 200);
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
          className={this.state.className}
          style={this.state.style}
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
            <Modal.Title id="modalTitle">{this.props.date}</Modal.Title>
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
