import React from "react";
import {
  Favorite,
  Person,
  ShoppingCart,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import useCustomSelector from "../hooks/useCustomSelector";
import { Link, useNavigate } from "react-router-dom";
import useAppDispatch from "../hooks/useAppDispatch";
import { logout } from "../redux/reducers/usersReducer";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useCustomSelector((state) => state.users.currentUser);
  const [profileMenuAnchor, setProfileMenuAnchor] =
    React.useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
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

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontFamily: "cursive",
            fontWeight: "bold",
            fontSize: "2.0rem",
          }}
          noWrap
          component="a"
          href="/"
        >
          SHOP WAVE
        </Typography>
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <InputBase
            placeholder="Search..."
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
              {currentUser.role.toLowerCase() == "admin" ? (
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
            <IconButton color="inherit">
              <Link to={"/signin"}>
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
  );
};

export default Header;
