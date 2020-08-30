import React from "react";
import axios from "axios";
class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fastest: null,
      maxDiameter: null,
      minDistance: null,
      isLoading: true,
    };
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
    //console.log(asteriods);
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
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&detailed=true&api_key=DEMO_KEY`
      )
      .then((res) => res.data)
      .then((data) => {
        const dataSet = data.near_earth_objects;
        const { fastest, maxDiameter, minDistance } = this.findStats(dataSet);
        console.log(fastest);
        //console.log(something);
        this.setState({ fastest, maxDiameter, minDistance, isLoading: false });
        //console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    //console.log(this.formatDate(this.props.startDate))
    //console.log(this.formatDate(this.props.endDate))
    console.log(this.state);
    return (
      <>
        <h1>Hello from Card?</h1>
        <button onClick={this.onClickHandler}>Submit</button>
      </>
    );
  }
}

export default Card;
