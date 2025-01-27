import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setTextFilter, setStartDate, setEndDate } from '../../redux/actions/filters';
import { Input } from 'antd';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const Search = Input.Search;
class DipenseListFilters extends React.Component {
  
  constructor(props){ 
    super(props)
    this.state={
        calendarFocused:null
      };
    }
  
  
  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  }

  onFocusChange = (calendarFocused) => {
    this.setState(() => ({ calendarFocused }));
  }

  onTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  };
 
  render() {
    return (
      <div className='search-bar'>
       <Search
        placeholder="recheche dipense(s)"
        value={this.props.filters.text}
        onChange={this.onTextChange}
        style={{width: '27vw'}}
        />
   
        <DateRangePicker
          startDate={this.props.filters.startDate}
          endDate={this.props.filters.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          
          showClearDates={true}
          numberOfMonths={1}
          isOutsideRange={() => false}
          startDateId="start"
          endDateId="end"
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(DipenseListFilters);
