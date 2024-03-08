import FloatingAlert from "#components/Alert";
import ConfirmModal from "#components/Confirm";
import useThemeStore from "#context/theme";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Box, IconButton, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const { currentTheme, changeTheme } = useThemeStore();
  const theme = useTheme();

  return (
    <Container
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      overflow="hidden"
      component={Box}
      maxWidth={false}
      bgcolor={theme.palette.background.default}
    >
      <FloatingAlert />
      <ConfirmModal />

      <Box width="100%" display="flex" justifyContent="end">
        <IconButton size="small" onClick={() => changeTheme()}>
          <FontAwesomeIcon icon={currentTheme === "dark" ? faSun : faMoon} />
        </IconButton>
      </Box>
      <Outlet />
    </Container>
  );
}
