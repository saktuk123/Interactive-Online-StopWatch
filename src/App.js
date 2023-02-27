import React from "react";

class App extends React.Component {
  state = {
    second: 0,
    minute: 0,
    hour: 0,
    btnDisabled: false,
    interval: "",
    intervalsStorages: [],
  };

  startClicked = () => {
    this.setState({
      btnDisabled: true,
    });
    let timer = setInterval(() => {
      const { second, minute, hour } = this.state;
      if (second === 59) {
        if (minute === 59) {
          this.setState({
            second: 0,
            minute: 0,
            hour: hour + 1,
          });
        } else {
          this.setState({
            second: 0,
            minute: minute + 1,
          });
        }
      } else {
        this.setState({
          second: second + 1,
        });
      }
    }, 1000);
    this.setState({
      interval: timer,
    });
  };

  stopClicked = () => {
    clearInterval(this.state.interval);
    this.setState({
      btnDisabled: false,
    });
  };

  intervalClicked = () => {
    const { hour, minute, second, intervalsStorages } = this.state;
    intervalsStorages.push(`${hour}:${minute}:${second}`);
    this.setState({
      intervalsStorages,
    });
  };

  clearClicked = () => {
    this.stopClicked();
    this.setState({
      second: 0,
      minute: 0,
      hour: 0,
      intervalsStorages: [],
    });
  };

  render() {
    const { second, minute, hour, btnDisabled, intervalsStorages } = this.state;
    return (
      <div>
        <div className="timer-container">
          <h1 className="mb-4">
            <span>Online</span> Stopwatch
          </h1>
          <div className="timer-col">
            <p className="timer-hours">{hour}</p>
            <p className="timer-label">Hours</p>
          </div>

          <div className="timer-col">
            <p className="timer-minute">{minute}</p>
            <p className="timer-label">Minutes</p>
          </div>

          <div className="timer-col">
            <p className="timer-seconds">{second}</p>
            <p className="timer-label">Seconds</p>
          </div>
        </div>

        <div className="timer-container text-center">
          <div className="timer-btn">
            <button
              className="btn btn-success"
              onClick={this.startClicked}
              disabled={btnDisabled}
            >
              Start
            </button>
          </div>
          <div className="timer-btn">
            <button className="btn btn-danger" onClick={this.stopClicked}>
              Stop
            </button>
          </div>
          <div className="timer-btn">
            <button
              className="btn btn-secondary"
              onClick={this.intervalClicked}
              disabled={!btnDisabled}
            >
              Interval
            </button>
          </div>
          <div className="timer-warning">
            <button className="btn btn-warning" onClick={this.clearClicked}>Clear</button>
          </div>
        </div>

        <div className="timer-container-intervals text-center">
          {intervalsStorages.map((item, index) => (
            <p>
              {index + 1}. =&gt; {item}
            </p>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
