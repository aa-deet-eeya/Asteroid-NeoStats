import React from "react";
import Card from './card'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
class main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      startDate : new Date() ,
      endDate : new Date() ,
    };
  }
  

  render() {
    let maxDate = new Date(
        this.state.startDate.getFullYear(),
        this.state.startDate.getMonth()
    )
    maxDate.setDate(this.state.startDate.getDate()+7)
    return (
      <>
        <h1>Ohhh hello paaji</h1>
        <DatePicker dateFormat="yyyy/MM/dd" selected={this.state.startDate} onChange={date=>this.setState({startDate : date, endDate : date})}/>
        <br />
        <DatePicker 
            dateFormat="yyyy/MM/dd" 
            selected={this.state.endDate}  
            minDate={this.state.startDate}
            maxDate={maxDate}  
            onChange={date=>this.setState({endDate : date})}
            showDisabledMonthNavigation/>
        <Card startDate={this.state.startDate} endDate={this.state.endDate}/>
      </>
    );
  }
}

export default main;
