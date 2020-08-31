import React from 'react'
import closestPIC from '../assets/closest.jpg'
import diameterPIC from '../assets/diameter.jpg'
import fastestPIC from '../assets/fastest.png'

class Card extends React.Component {
    render(){
        const {name, _id , distance, kmps, diameter} = this.props.asteroid
        const {title} = this.props
        let img
        if(title === "Closest Asteroid"){
            img = <img src={closestPIC} className="card-img-top" alt="something"/>
        } else if(title === "Fastest Asteroid") {
            img = <img src={fastestPIC} className="card-img-top" alt="something"/>
        } else {
            img = <img src={diameterPIC} className="card-img-top" alt="something"/>
        }
        return <div className="card statsCard" styles="width: 18rem;">
         {img}   
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
        </div>
        <ul className="list-group list-group-flush">
        <li className="list-group-item">Asteroid ID : {_id}</li>
          <li className="list-group-item">Name : {name}</li>
          <li className="list-group-item">Closest Orbital Distance : {distance} kms</li>
          <li className="list-group-item">Relative Velocity : {kmps} km/h</li>
          <li className="list-group-item">Average Diameter : {diameter} kms</li>
        </ul>
      </div>
    }
}

export default Card