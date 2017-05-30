import React, { Component } from 'react';
import Time from 'react-time';
import DatePicker from 'material-ui/DatePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import injectTapEventPlugin from 'react-tap-event-plugin';
require("../styles/datetime.css");

var now= new Date();
var _this;
const optionsStyle = {
  maxWidth: 255,
  marginRight: 'auto',
};


export default class CreateTask extends Component {
    constructor(props){
        super(props);
        _this = this;
        this.state = {
            name: '',
            rating:"1",
            date:now

        }
    }
    handleNameChange(e){
        _this.setState({
            name:e.target.value,
            rating:_this.state.rating,
            date:_this.state.date
        });
    }
     handleRatingChange(e){
        _this.setState({
            rating:e.target.value,
            name:_this.state.name,
            date:_this.state.date
        });
    }
     handleDueChange(e){
        _this.setState({
            date:e.target.value,
            name:_this.state.name,
            rating:_this.state.rating
        });
    }
    handleSubmit(e){
        //console.log("handle submit reached"+ _this.state.value)
        this.props.addTask(this.state);
        // this.setState({
        //     name: '',
        //     rating:"1",
        //     date:now
        // });
    }
    render() {
        return(
            <div>
                <div>
                    <label>
                        <p>Task Name:</p>
                            <input type="text" placeholder="Task Name" value ={this.state.name} onChange={this.handleNameChange} />
                    </label>
                    <label>
                        <p>Rating:</p>
                        <select name="Rating" onChange={this.handleRatingChange}>
                            <option value="1" selected>1 star</option>
                            <option value="2">2 star</option>
                            <option value="3">3 star</option>
                            <option value="4">4 star</option>
                            <option value="5">5 star</option>
                        </select>
                    </label>
                    <label>
                        <p>Due By:</p>
                        <MuiThemeProvider>
                            <DatePicker defaultDate={now} minDate={now} onChange={this.handleDueChange}/>
                        </MuiThemeProvider>
                    </label>
                    <button onClick={() => this.handleSubmit()}>Submit </button>
                </div>

            </div>
          
        )
    }
}
