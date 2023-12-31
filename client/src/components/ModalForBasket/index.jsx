import { Close } from '@mui/icons-material';
import {
  Backdrop,
  Dialog,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spring } from '@react-spring/web';
import { selectCart } from '../../redux/selectors';
import { closeModalBasket } from '../../redux/slices/basketSlice/basketSlice';

function ModalBasket() {
  const { modal, modalText } = useSelector(selectCart);
  // console.log(modal, modalText);

  const dispatch = useDispatch();

  return (
    <Dialog
      open={modal}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      closeAfterTransition
      onClose={() => {
        dispatch(dispatch(closeModalBasket()));
      }}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 2000,
        },
      }}
      sx={{
        textAlign: 'center',
        transition: '1s',
      }}>
      <Close
        sx={{
          position: 'absolute',
          top: { xs: '15px', md: '25px' },
          right: { xs: '15px', md: '25px' },
        }}
        onClick={() => {
          dispatch(closeModalBasket());
        }}
      />
      <DialogTitle
        sx={{ background: '#d3dbe3', fontSize: { sx: '22px', md: '32px' } }}>
        Not enough products
      </DialogTitle>
      <DialogContentText
        sx={{
          margin: '20px',
          padding: '20px',
          fontSize: { sx: '17px', md: '27px' },
        }}>
        {modalText}
      </DialogContentText>
    </Dialog>
  );
}
export default ModalBasket;
