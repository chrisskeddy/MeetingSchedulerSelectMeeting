import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
/**
 * AddAvailabelTime:
 *  component that allows selecting specific time and adding it.
 */
class Day extends Component {
  componentDidUpdate() {
    if (
      this.props.sendAvailableClassName !== this.state.sendAvailableClassName &&
      this.props.startTime !== '' &&
      this.props.endTime !== ''
    ) {
      this.setState({
        sendAvailableClassName: this.props.sendAvailableClassName
      });
      var availableTime = (
        <div className={this.props.sendAvailableClassName}>
          {this.state.startTime} -- {this.state.endTime}
        </div>
      );
      this.setState({
        columnData: (
          <>
            {this.props.day}
            {availableTime}
          </>
        )
      });
    }
  }
  constructor(props, context) {
    super(props, context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.state = {
      show: false,
      columnData: props.day,
      startTime: '',
      endTime: '',
      oldStartTime: '',
      oldEndTime: '',
      sendAvailableClassName: props.sendAvailableClassName
    };
  }
  handleStartTimeChange(event) {
    this.setState({ startTime: event.target.value });
  }
  handleEndTimeChange(event) {
    this.setState({ endTime: event.target.value });
  }
  updateDay() {
    if (this.state.startTime && this.state.endTime) {
      this.props.updateColor(this.props.index, 'event bg-primary');
      this.setState({
        sendAvailableClassName: 'event bg-primary'
      });
      //Add Timeout so parent updates sendAvailableClassName
      setTimeout(() => {
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
          className={this.props.className}
          style={this.props.style}
          key={this.props.month + this.props.day}
          onClick={this.handleShow}
        >
          <div className="date">{this.state.columnData}</div>
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
              {this.props.month} {this.props.day}, {this.props.year}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Add Available Time</h3>
            <p>
              Start Time:&nbsp;
              <input
                type="text"
                key={
                  'start' + this.props.month + this.props.day + this.props.year
                }
                value={this.state.startTime}
                onChange={this.handleStartTimeChange}
              ></input>
            </p>
            <p>
              &nbsp;End Time:&nbsp;
              <input
                type="text"
                key={
                  'end' + this.props.month + this.props.day + this.props.year
                }
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

Day.propTypes = {
  day: PropTypes.number,
  year: PropTypes.number,
  className: PropTypes.string,
  month: PropTypes.string
};

export default Day;
