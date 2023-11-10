import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';




const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));





export default function CustomizedSwitches() {
    const [switchChecked, setSwitchChecked] = useState(false);
    useEffect(()=>{
        localStorage.setItem('switch',switchChecked)
    })

    const handleSwitchChange = () => {
      setSwitchChecked(!switchChecked);
      if (!switchChecked) {
        // ทำงานเมื่อ Switch ถูกเปิด
        console.log('Switch is ON');
        // ทำอะไรต่อไป
      } else {
        // ทำงานเมื่อ Switch ถูกปิด
        console.log('Switch is OFF');
        // ทำอะไรต่อไป
      }
    };
  return (
    <FormGroup>
      
      <FormControlLabel
        control={<Android12Switch checked={switchChecked} onChange={handleSwitchChange} />}
        label="แสดงผู้ป่วยทั้งหมด"
      />
    </FormGroup>
  );
}
