import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import ButtonGroupChanel from './buttonGroupChanel'
import ButtonGroupPatient from './buttonGroupPatient';

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        
        m: 1,

        
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function Control() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Item><ButtonGroupPatient /></Item>
        <Item><ButtonGroupChanel /></Item>
        
      </Box>
      
    </div>
  );
}
