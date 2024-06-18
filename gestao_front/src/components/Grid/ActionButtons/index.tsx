import useAlertStore from "#context/alert";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton } from "@mui/material";
import { CustomCellRendererProps } from "ag-grid-react";
import { Unpacked } from "src/@types/util";

export default function DataGridActionButtons<T>({
  rowData,
  onEditClick,
  onDeleteClick,
}: {
  rowData: CustomCellRendererProps<Unpacked<T>>;
  onEditClick: (
    data: Omit<CustomCellRendererProps<Unpacked<T>>, "data"> & {
      data: NonNullable<CustomCellRendererProps<Unpacked<T>>["data"]>;
    },
  ) => void;
  onDeleteClick: (
    data: Omit<CustomCellRendererProps<Unpacked<T>>, "data"> & {
      data: NonNullable<CustomCellRendererProps<Unpacked<T>>["data"]>;
    },
  ) => void;
}) {
  const alertError = useAlertStore((state) => state.alertError);
  type DefinedData = Omit<CustomCellRendererProps<Unpacked<T>>, "data"> & {
    data: NonNullable<CustomCellRendererProps<Unpacked<T>>["data"]>;
  };

  return (
    <Box>
      <IconButton
        title="edit"
        onClick={() => {
          if (!rowData || !rowData.data) {
            alertError("Unexpected error, try again later.");
            return;
          }
          onEditClick(rowData as DefinedData);
        }}
        size="small"
      >
        <FontAwesomeIcon icon={faPenToSquare} color="orange" />
      </IconButton>
      <IconButton
        title="delete"
        onClick={() => {
          if (!rowData || !rowData.data) {
            alertError("Unexpected error, try again later.");
            return;
          }
          onDeleteClick(rowData as DefinedData);
        }}
        size="small"
      >
        <FontAwesomeIcon icon={faTrashCan} color="red" />
      </IconButton>
    </Box>
  );
}
