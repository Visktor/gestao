import { Box, Button } from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

type RouteInfo = { label: string; color: string; path: string };

function RouteButton({ label, color, path }: RouteInfo) {
  const navigate = useNavigate();
  return (
    <Button
      focusRipple={false}
      variant="outlined"
      sx={{
        bgcolor: color,
        height: 300,
        width: 400,
        color: "white",
      }}
      onClick={() => {
        navigate(path);
      }}
    >
      {label}
    </Button>
  );
}

export default function Home() {
  const routesToList = useMemo(
    () => [
      { label: "Users", color: "#cfd3f3", path: "/users" },
      { label: "Branches", color: "#c12f34", path: "/branches" },
      { label: "Roles", color: "#b4fa24", path: "/roles" },
    ],
    [],
  );

  return (
    <Box display="flex" gap={2} m={1}>
      {routesToList.map((route, idx) => {
        return <RouteButton {...route} key={idx} />;
      })}
    </Box>
  );
}
