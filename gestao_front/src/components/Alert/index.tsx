import useAlertStore from "#context/alert";
import { Snackbar, Alert } from "@mui/material";

export default function FloatingAlert() {
  const { alertQueue, endCurrentAlert } = useAlertStore((state) => state._component);

  return (
    <Snackbar
      open={!!alertQueue.length}
      autoHideDuration={alertQueue[0]?.duration}
      onClose={endCurrentAlert}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert severity={alertQueue[0]?.type} sx={{ width: "100%" }}>
        {alertQueue[0]?.content}
      </Alert>
    </Snackbar>
  );
}
