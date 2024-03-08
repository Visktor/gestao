import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  Paper,
  DialogActions,
  DialogTitle,
} from "@mui/material";

interface PopupProps extends DialogProps {
  title: string;
}

export default function Popup(props: PopupProps) {
  return (
    <Dialog {...props}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <Box
          component={Paper}
          variant="outlined"
          p={1}
          display="flex"
          flexDirection="column"
        >
          {Array.isArray(props.children) ? props.children[0] : props.children}
        </Box>
      </DialogContent>
      {Array.isArray(props.children) && !!props.children[1] ? (
        <DialogActions>{props.children[1]}</DialogActions>
      ) : null}
    </Dialog>
  );
}
