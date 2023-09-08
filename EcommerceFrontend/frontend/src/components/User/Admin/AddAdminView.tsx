import React, { useState } from "react";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";

import useAppDispatch from "../../../hooks/useAppDispatch";
import { CreateAdmin } from "../../../redux/reducers/usersReducer";
import { defaultTheme } from "../../../styles/Component/Shared";

const AddAdminView = () => {
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>("info");
  const [alertMessage, setAlertMessage] = useState("");

  const handleSuccess = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");

    setShowAlert(true);
    setAlertSeverity("success");
    setAlertMessage("Admin profile created successfully!");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
        const action = await dispatch(
            CreateAdmin({ firstName, lastName, email, password })
          );
          if (CreateAdmin.fulfilled.match(action)) {
            if (typeof action.payload === "string") {
              setShowAlert(true);
              setAlertSeverity("error");
              setAlertMessage(action.payload);
            } else {
                handleSuccess();
            }
          } else {
            setShowAlert(true);
            setAlertSeverity("error");
            setAlertMessage("Invalid data passed.");
          }
    } catch (error) {
      setShowAlert(true);
      setAlertSeverity("error");
      setAlertMessage("Error occured while creating admin.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component={"main"} maxWidth="xs">
        <CssBaseline />
        <Typography variant="h4" gutterBottom>Add New Admin</Typography>
        {showAlert && <Alert severity={alertSeverity}>{alertMessage}</Alert>}
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2} marginTop={1}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={firstName}
                onChange={(f) => setFirstName(f.target.value)}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(l) => setLastName(l.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(p) => setPassword(p.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Admin User
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddAdminView;
