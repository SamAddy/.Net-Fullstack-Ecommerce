import { Container, Grid, Link, Typography } from "@mui/material";
import React from "react";
import { linkStyle } from "../styles/Component/Shared";

const footerStyle = {
  backgroundColor: "#2196f3",
  color: "white",
  padding: "2rem 0",
};

const sectionStyle = {
  margin: "1.5rem 0",
};

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} style={sectionStyle}>
            <Typography variant="h6">Shop-Waves</Typography>
            <Typography variant="body2">
              Your one-stop shop for everything.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} style={sectionStyle}>
            <Typography variant="h6">Quick Links</Typography>
            <Link href="/" style={linkStyle}>
              Home
            </Link>
            <br />
            <Link href="/products" style={linkStyle}>
              Products
            </Link>
            <br />
            <Link href="#" style={linkStyle}>
              Categories
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4} style={sectionStyle}>
            <Typography variant="h6">Contact Us</Typography>
            <Typography variant="body2">Spring Onion 123</Typography>
            <Typography variant="body2">SomeWhere, Earth</Typography>
            <Typography variant="body2">Email: shop@mail.com</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} style={sectionStyle}>
            <Typography align="center">
                Copyright © 2023
                <Link href="https://samaddy.github.io/" style={linkStyle}> SamAddy</Link>
            </Typography>
        </Grid>
      </Container>
      
    </footer>
  );
};

export default Footer;
