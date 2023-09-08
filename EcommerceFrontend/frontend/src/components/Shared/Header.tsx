import React from "react";
import {
  Favorite,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import useCustomSelector from "../../hooks/useCustomSelector";
import { useNavigate } from "react-router-dom";
import useAppDispatch from "../../hooks/useAppDispatch";
import { logout } from "../../redux/reducers/usersReducer";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useCustomSelector((state) => state.users.currentUser);
  const favItemsCount = useCustomSelector((state) => state.favorites.length)
  const cartItemsCount = useCustomSelector((state) => state.cart.items.length);
  const [profileMenuAnchor, setProfileMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleSigin = () => {
    navigate("/signin");
  };
  
  const handleProfile = () => {
    navigate("/profile");
  };

  const handleAdminDashboard = () => {
    navigate("/admin");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleFavorite = () => {
    navigate("/favorite");
  }

  const handleCart = () => {
    navigate("/cart");
  }

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontFamily: "cursive",
            fontWeight: "bold",
            fontSize: "2.0rem",
            textDecoration: 'none',
            color: 'white'
          }}
          noWrap
          component="a"
          href="/"
        >
          SHOP WAVES
        </Typography>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <InputBase
            placeholder="Search..."
            id="search"
            name="search"
            sx={{
              width: "80%",
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "5px 10px",
              marginRight: "8px",
            }}
          />
        </Box>
        <div>
          {currentUser ? (
            <>
              <IconButton color="inherit" onClick={handleProfileMenuOpen}>
                <Person />
              </IconButton>
              {currentUser.role.toLowerCase() === "admin" ? (
                <Menu
                  anchorEl={profileMenuAnchor}
                  open={Boolean(profileMenuAnchor)}
                  onClose={handleProfileMenuClose}
                >
                  <MenuItem onClick={handleAdminDashboard}>
                    Admin Dashboard
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              ) : (
                <Menu
                  anchorEl={profileMenuAnchor}
                  open={Boolean(profileMenuAnchor)}
                  onClose={handleProfileMenuClose}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              )}
            </>
          ) : (
            <IconButton 
              color="inherit"
              onClick={handleSigin}
            >
              <Person />
            </IconButton>
          )}
          <IconButton 
            color="inherit"
            onClick={handleCart}
          >
            <Badge badgeContent={cartItemsCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <IconButton 
            color="inherit"
            onClick={handleFavorite}
          >
            <Badge badgeContent={favItemsCount} color="error">
              <Favorite />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
