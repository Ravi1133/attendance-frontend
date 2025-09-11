import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
export default function MenuForClient({data,editClient,seteditClient}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const actionFunc=(status,id)=>{
    setAnchorEl(null);
    changeStatus(status,id)
  }

  return (
    <div className='text-center'>
      <MoreVertIcon
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        className='cursor-pointer'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        
      </MoreVertIcon>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem onClick={()=>actionFunc(data.status,data._id)}>{data.status=="ACTIVE"?"INACTIVE":"ACTIVE"}</MenuItem>
        <MenuItem onClick={()=>{
          seteditClient(data)
          handleClose()
          }}>Edit</MenuItem>
      </Menu>
    </div>
  );
}
