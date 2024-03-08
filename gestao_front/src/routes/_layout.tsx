import FloatingAlert from "#components/Alert";
import ConfirmModal from "#components/Confirm";
import Sidebar from "#components/SideBar";
import useThemeStore from "#context/theme";
import { faBars, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Box, IconButton, useTheme } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const { currentTheme, changeTheme } = useThemeStore();
  const theme = useTheme();
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflow: "hidden",
        bgcolor: theme.palette.background.default,
      }}
      maxWidth={false}
      disableGutters
    >
      <FloatingAlert />
      <ConfirmModal />
      <Sidebar
        open={openSidebar}
        close={() => {
          setOpenSidebar(false);
        }}
      />

      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        bgcolor={theme.palette.primary.main}
      >
        <IconButton size="small" onClick={() => setOpenSidebar(true)}>
          <FontAwesomeIcon icon={faBars} />
        </IconButton>
        <IconButton size="small" onClick={() => changeTheme()}>
          <FontAwesomeIcon icon={currentTheme === "dark" ? faSun : faMoon} />
        </IconButton>
      </Box>
      <Outlet />
    </Container>
  );
}
