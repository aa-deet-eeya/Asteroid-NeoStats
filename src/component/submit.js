import React from "react";
import axios from "axios";
import Modal from "./modal";
class Submit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fastest: null,
      maxDiameter: null,
      minDistance: null,
      averageDiameter: null,
      isLoading: true,
    };
  }
  componentDidUpdate(prevProp) {
    if (prevProp.startDate !== this.props.startDate || prevProp.endDate !== this.props.endDate)
      this.setState({ isLoading: true });
  }
  findStats = (obj) => {
    let asteriods = [];
    for (const dates of Object.entries(obj)) {
      for (const asteroid of Object.entries(dates[1])) {
        const kmps =
          asteroid[1].close_approach_data[0].relative_velocity
            .kilometers_per_hour;
        const diameter =
          (asteroid[1].estimated_diameter.kilometers.estimated_diameter_max +
            asteroid[1].estimated_diameter.kilometers.estimated_diameter_min) /
          2;
        const distance =
          asteroid[1].close_approach_data[0].miss_distance.kilometers;
        asteriods.push({
          _id: asteroid[1].id,
          name: asteroid[1].name,
          distance,
          kmps,
          diameter,
        });
      }
    }
    return {
      fastest: asteriods.reduce((prev, curr) => {
        return Math.round(prev.kmps) > Math.round(curr.kmps) ? prev : curr;
      }),
      maxDiameter: asteriods.reduce((prev, curr) => {
        return Math.round(prev.diameter * 1000) >
          Math.round(curr.diameter * 1000)
          ? prev
          : curr;
      }),
      minDistance: asteriods.reduce((prev, curr) => {
        return Math.round(prev.distance) > Math.round(curr.distance)
          ? curr
          : prev;
      }),
      averageDiameter: asteriods.reduce((prev,curr)=> prev + curr.diameter,0)/asteriods.length
    };
  };

  formatDate = (date) => {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  };

  onClickHandler = (e) => {
    const startDate = this.formatDate(this.props.startDate);
    const endDate = this.formatDate(this.props.endDate);
    axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&detailed=true&api_key=dH20fP9yjcaJwbq4AM8xuYzJa5mN43eY9dOT6sjw`
      )
      .then((res) => res.data)
      .then((data) => {
        const dataSet = data.near_earth_objects;
        const { fastest, maxDiameter, minDistance, averageDiameter } = this.findStats(dataSet);
        //console.log(fastest);
        //console.log(something);
        this.setState({ fastest, maxDiameter, minDistance, averageDiameter ,isLoading: false });
        //console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    //console.log(this.state);
    const modal = (
      <Modal
        isLoading={this.state.isLoading}
        fastest={this.state.fastest}
        maxDiameter={this.state.maxDiameter}
        minDistance={this.state.minDistance}
        averageDiameter={this.state.averageDiameter}
        startDate={this.formatDate(this.props.startDate)}
        endDate={this.formatDate(this.props.endDate)}
      />
    );
    return (
      <div>
        <button
          className="submit"
          data-toggle="modal"
          data-target=".bd-example-modal-lg"
          onClick={this.onClickHandler}
        >
          Submit
        </button>
        {modal}
      </div>
    );
  }
}

export default Submit;
