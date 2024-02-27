import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from '@mui/icons-material/Menu';

function Header() {
  const navItems = ["HOME"];

  return (
    <AppBar position="fixed" style={{height: "60px"}}>
      <Toolbar style={{width: "82%", margin: "0 auto"}}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/889/889199.png"
          alt=""
          width={"70px"}
          style={{ padding: "10px" }}
        />
        <MenuIcon></MenuIcon>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Menu
        </Typography>
        <Box>
          {navItems.map((item) => (
            <Button key={item} sx={{ color: "#fff" }}>
              {item}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
