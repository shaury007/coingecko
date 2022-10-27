import * as React from 'react';
import Alert from '@mui/material/Alert';
import './errorAlert.css';

export default function ErrorAlert() {
  return (
    <Alert severity="error" className="alertPosition">
      Error occured! Please try after some time.
    </Alert>
  );
}
