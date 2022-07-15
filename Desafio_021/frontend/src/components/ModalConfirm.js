import { CircularProgress, Box, Dialog } from '@material-ui/core';
import React from 'react';

export const ModalConfirm = ({ handleModalConfirm, modalConfirm }) => {
  return (
    <Dialog onClose={handleModalConfirm} open={modalConfirm}>
      <Box
        sx={{
          display: 'flex',
          height: '240px',
          width: '200px',
          padding: '15px',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            fontFamily: 'Open Sans',
          }}
        >
          <CircularProgress
            sx={{
              width: '40px',
              color: '#805AD5',
            }}
            size={100}
          />
          <p>Guardando declaración</p>
        </Box>
      </Box>
    </Dialog>
  );
};
