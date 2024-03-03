import {
  Box,
  Dialog,
  DialogContent,
  DialogProps,
  Paper,
  Typography,
} from "@mui/material";

interface PopupProps extends DialogProps {
  title: string;
}

export default function Popup(props: PopupProps) {
  return (
    <Dialog {...props}>
      <Box mx={"auto"} mt={1}>
        <Typography variant="h6" color="primary">
          {props.title}
        </Typography>
      </Box>
      <DialogContent>
        <Box
          component={Paper}
          variant="outlined"
          minHeight={200}
          p={1}
          display="flex"
          flexDirection="column"
        >
          {props.children}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
