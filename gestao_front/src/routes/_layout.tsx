import { Container, Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <Container
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      overflow="hidden"
      component={Box}
      maxWidth={false}
    >
      <Outlet />
    </Container>
  );
}
