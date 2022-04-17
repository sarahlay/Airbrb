import React from 'react';
import TextField from '@mui/material/TextField';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import DateRangePicker from '@mui/lab/DateRangePicker';
import { StoreContext } from '../utils/store'
import PropTypes from 'prop-types';

function DatePicker () {
  const context = React.useContext(StoreContext);
  const [checkin, setCheckin] = context.checkin;
  const [checkout, setCheckout] = context.checkout;
  const value = [checkin, checkout];
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDateRangePicker
        disablePast
        displayStaticWrapperAs="desktop"
        value={value}
        onChange={(newValue) => {
          setCheckin(newValue[0]);
          setCheckout(newValue[1]);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField color="secondary" {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField color="secondary" {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}

function FormDatePicker ({ className, startText, endText, date1, date2, setDate1, setDate2 }) {
  const value = [date1, date2];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateRangePicker
        disablePast
        startText={startText}
        endText={endText}
        value={value}
        onChange={(newValue) => {
          setDate1(newValue[0]);
          setDate2(newValue[1]);
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField color="secondary" variant="standard" {...startProps} />
            <TextField color="secondary" variant="standard" {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
  );
}

FormDatePicker.propTypes = {
  className: PropTypes.string,
  startText: PropTypes.string,
  endText: PropTypes.string,
  date1: PropTypes.string,
  date2: PropTypes.string,
  setDate1: PropTypes.func,
  setDate2: PropTypes.func
}

export {
  DatePicker,
  FormDatePicker
}
