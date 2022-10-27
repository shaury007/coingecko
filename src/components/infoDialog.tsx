import React, { useEffect, useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { getCoinDetails } from '../adapters/xhr/coinAdapter';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import parse from 'html-react-parser';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorAlert from './errorAlert';

interface InfoDialogProps {
  open: boolean;
  onClose: () => void;
  coinId: string;
}

// InfoDialog is used to display a particular coin's information in a dialog
const InfoDialog = (props: InfoDialogProps) => {
  const handleClose = () => {
    props.onClose();
  };
  const [info, setInfo] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  //Function to call API to fetch a particular coin's details
  const fetchCoinDetails = async () => {
    try {
      setIsLoading(true);
      setInfo({});
      const response = await getCoinDetails(props.coinId);
      setInfo(response.data);
      setIsLoading(false);
    } catch (err) {
      props.onClose();
      setIsLoading(false);
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
      console.log(err);
    }
  };

  //Executes whenever a different row is clicked
  useEffect(() => {
    props.coinId && fetchCoinDetails();
  }, [props.coinId]);

  //Common function to display all the fields
  const displayField = (label: string, value: any) => {
    return (
      <>
        <Typography variant="subtitle2" fontWeight="bold">
          {label}:
        </Typography>
        <Typography gutterBottom>{value}</Typography>
      </>
    );
  };

  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {isError ? <ErrorAlert /> : ''}
      {!isLoading ? (
        <Dialog onClose={handleClose} open={props.open}>
          <DialogTitle data-testid="dialogTitle">Coin Information</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}>
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <>
              {displayField('Name', info?.name)}
              {displayField('Symbol', info?.symbol)}
              {displayField('Hashing Algorithm', info?.hashing_algorithm || 'N/A')}
              {displayField('Description', parse(`${info?.description?.en}`))}
              {displayField('Market Cap(in EUR)', info?.market_data?.market_cap?.eur || 'N/A')}
              {displayField(
                'Homepage',
                <a href={info?.links?.homepage[0]} target="blank">
                  {info?.links?.homepage[0]}
                </a>
              )}
              {displayField('Genesis Date', info?.genesis_date || 'N/A')}
            </>
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
};

export default InfoDialog;
