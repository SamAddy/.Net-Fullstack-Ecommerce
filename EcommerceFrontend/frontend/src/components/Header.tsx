import { AccountCircle, Favorite, Person, Search, ShoppingCart } from '@mui/icons-material'
import { AppBar, Box, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { SearchIconWrapper, StyledInputBase } from '../styles/Component/CustomSearchBar'
import useCustomSelector from '../hooks/useCustomSelector';
import { Link } from 'react-router-dom';
import useAppDispatch from '../hooks/useAppDispatch';
import { logout } from '../redux/reducers/usersReducer';

const settings = ["Profile", "Login"];

const Header = () => {
  const dispatch = useAppDispatch();
  const currentUser = useCustomSelector((state) => state.users.currentUser);
  const [profileMenuAnchor, setProfileMenuAnchor] = React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography 
          variant="h6" 
          sx={{ flexGrow: 1, fontFamily: 'cursive', fontWeight: 'bold', fontSize: '2.0rem' }}
          noWrap
          component="a"
          href="/"
        >
          SHOP WAVES
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <InputBase
            placeholder="Search..."
            sx={{ width: '80%', backgroundColor: 'white', borderRadius: '5px', padding: '5px 10px', marginRight: '8px' }}
          />
        </Box>
        <div>
          {currentUser ? (
            <>
              <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                <Person />
              </IconButton>
              <Menu
                anchorEl={profileMenuAnchor}
                open={Boolean(profileMenuAnchor)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton color="inherit">
              <Link to={'/signin'}>
                <Person />
              </Link>
            </IconButton>
          )}
          <IconButton color="inherit">
            <ShoppingCart />
          </IconButton>
          <IconButton color="inherit">
            <Favorite />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header