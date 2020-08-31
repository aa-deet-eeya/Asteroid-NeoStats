import React from "react";
import Submit from "./submit";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      startDate: new Date(),
      endDate: new Date(),
    };
  }

  render() {
    let maxDate = new Date(
      this.state.startDate.getFullYear(),
      this.state.startDate.getMonth()
    );
    maxDate.setDate(this.state.startDate.getDate() + 7);
    return (
      <div className="card text-center card-wrapper">
        <div className="card-body">
          <h2 className="card-title">Asteroid Neo Stats</h2>
          <div className="card-text">
            <div className="dates">
              <div className="startDate">
                <p>Start Date</p>
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  selected={this.state.startDate}
                  onChange={(date) =>
                    this.setState({
                      startDate: date,
                      endDate: date,
                    })
                  }
                />
              </div>
              <br />
              <div className="endDate">
                <p>End Date</p>
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  selected={this.state.endDate}
                  minDate={this.state.startDate}
                  maxDate={maxDate}
                  onChange={(date) => this.setState({ endDate: date })}
                  showDisabledMonthNavigation
                />
              </div>
            </div>
            <Submit
              startDate={this.state.startDate}
              endDate={this.state.endDate}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default main;
