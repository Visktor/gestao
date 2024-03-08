import useConfirmStore from "#context/confirm";
import { Modal, Paper, Box, Button, Typography } from "@mui/material";

export default function ConfirmModal() {
  const { onDeny, onConfirm, content, isOpen, reset, textVariant } =
    useConfirmStore();

  return (
    <Modal
      open={isOpen}
      onClose={() => {
        reset();
      }}
    >
      <Paper
        component={Box}
        variant="outlined"
        p={2}
        gap={2}
        display="flex"
        flexDirection="column"
        sx={{
          top: "50%",
          left: "50%",
          position: "absolute",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box>
          <Typography color="warning" variant={textVariant ?? "body1"}>
            {content}
          </Typography>
        </Box>
        <Box display="flex" width="100%" justifyContent="space-between">
          <Button
            color="error"
            onClick={() => {
              onDeny?.();
              reset();
            }}
          >
            {"DENY"}
          </Button>
          <Button
            color="success"
            onClick={() => {
              onConfirm?.();
              reset();
            }}
          >
            {"CONFIRM"}
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}
