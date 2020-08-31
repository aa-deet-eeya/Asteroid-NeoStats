import React from "react";
import Card from "./card";

class Modal extends React.Component {
  render() {
    const {
      isLoading,
      fastest,
      minDistance,
      maxDiameter,
      averageDiameter,
      startDate,
      endDate,
    } = this.props;
    return (
      <div
        className="modal fade bd-example-modal-lg"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {isLoading ? (
              <div className="loadingSpinner"></div>
            ) : (
              <div>
                <div className="statsDiv">
                  <Card asteroid={fastest} title="Fastest Asteroid" />
                  <Card asteroid={minDistance} title="Closest Asteroid" />
                  <Card asteroid={maxDiameter} title="Largest Asteroid" />
                </div>
                <div className="diameterInfo">
                  The Average Diameter of asteroids appearing between{" "}
                  {startDate} and {endDate} is {averageDiameter.toFixed(4)} km
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
