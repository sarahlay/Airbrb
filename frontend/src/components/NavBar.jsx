import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';

import { Link, useNavigate } from 'react-router-dom';
import { NavSearchBar, MobileSearch } from '../components/SearchBar';
import { fetchHelper } from '../utils/fetchHelper';
import { StoreContext } from '../utils/store';

import { HOST } from '../utils/host';

const NavMenu = ({ className }) => {
  const context = React.useContext(StoreContext);
  const token = window.localStorage.getItem('token');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    const data = await fetchHelper('POST', `${HOST}/user/auth/logout`, token);
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('email');
    const setEmail = context.email[1];
    setEmail('');
    navigate('/login');
    console.log(data);
  }

  return <>
    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      <div className= {className} >
        <IconButton onClick={handleClick}>
          <MenuIcon />
            &nbsp;
          <AccountCircleIcon />
        </IconButton>
      </div>
    </Box>
    {token === null
      ? <Menu // Not logged in
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            width: 200,
            borderRadius: 5,
            padding: 2,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/login')}>
          <Link to="/" className="Nav-link">Log in</Link>
        </MenuItem>
        <MenuItem onClick={() => navigate('/login')}>
          <Link to="/" className="Nav-link">Sign up</Link>
        </MenuItem>
      </Menu>
      : <Menu // Logged in
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          width: 200,
          borderRadius: 5,
          padding: 2,
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <Link to="/" className="Nav-link">Log out</Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate('/listing/create')}>
          <ListItemIcon>
            <AddBusinessOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Link to="/" className="Nav-link">New Listing</Link>
        </MenuItem>
        <MenuItem onClick={() => navigate('/host/listings')}>
          <ListItemIcon>
            <HomeOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <Link to="/" className="Nav-link">My Listings</Link>
        </MenuItem>
      </Menu>
    }
  </>
}

const NavBar = ({ isHomepage }) => {
  const navigate = useNavigate();
  const [viewport, setViewport] = React.useState(window.innerWidth);
  React.useEffect(() => {
    setViewport(window.innerWidth);
    console.log(viewport);
  }, [window.innerWidth])
  return <>
    {isHomepage
      ? <NavMenu className={'Nav-menu-homepage'} />
      : <div id="Nav-bar">
          <div id="Nav-logo-container" onClick={() => navigate('/')}>
          <img src={Logo} width="60"/><span id="Nav-logo-text"> airbrb</span>
          </div>
          <NavSearchBar />
          <MobileSearch />
          <NavMenu className={'Nav-menu'}/>
        </div>
    }
  </>
}

NavMenu.propTypes = {
  className: PropTypes.string
}

NavBar.propTypes = {
  isHomepage: PropTypes.bool
}

export default NavBar;
