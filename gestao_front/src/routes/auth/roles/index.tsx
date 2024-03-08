import DataGrid from "#components/Grid";
import { CustomCellRendererProps } from "ag-grid-react";
import { trpcReact } from "#services/server";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, IconButton } from "@mui/material";
import { useState } from "react";
import RolesCreate from "./create";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import useConfirmStore from "#context/confirm";
import { Unpacked } from "src/@types/util";
import useAlertStore from "#context/alert";
export default function RolesList() {
  const { data: roles, refetch } = trpcReact.roles.getAll.useQuery(undefined, {
    initialData: [],
  });

  const { alertError } = useAlertStore();
  const [openCreate, setOpenCreate] = useState(false);
  const openConfirm = useConfirmStore((state) => state.setOpen);

  const deleteRoleCall = trpcReact.roles.delete.useMutation().mutate;

  return (
    <>
      <Box>
        <DataGrid
          toolbar={[
            () => {
              return (
                <Button
                  variant="contained"
                  startIcon={<FontAwesomeIcon icon={faPlus} />}
                  onClick={() => {
                    setOpenCreate(true);
                  }}
                  title={"Create new user"}
                >
                  {"New"}
                </Button>
              );
            },
          ]}
          rowData={roles}
          columnDefs={[
            {
              field: "role_id",
              headerName: "ID",
            },
            {
              field: "name",
              headerName: "Name",
            },
            {
              field: "shift_start",
              headerName: "Shift Start",
            },
            {
              field: "shift_end",
              headerName: "Shift End",
            },
            {
              headerName: "Actions",
              cellRenderer: ({
                data,
              }: CustomCellRendererProps<Unpacked<typeof roles>>) => {
                return (
                  <Box position="absolute">
                    <IconButton title="edit" onClick={() => {}} size="small">
                      <FontAwesomeIcon icon={faPenToSquare} color="orange" />
                    </IconButton>
                    <IconButton
                      title="delete"
                      onClick={() => {
                        openConfirm({
                          onConfirm: () => {
                            if (!data?.role_id) {
                              alertError(
                                "There's been an error processing your request. Please reload the page and try again.",
                              );
                              return;
                            }
                            deleteRoleCall(data?.role_id, {
                              onSuccess: () => {
                                refetch();
                              },
                            });
                          },
                          content: `Do you wish to delete role ${data?.name}?`,
                        });
                      }}
                      size="small"
                    >
                      <FontAwesomeIcon icon={faTrashCan} color="red" />
                    </IconButton>
                  </Box>
                );
              },
            },
          ]}
        />
      </Box>
      <RolesCreate
        open={openCreate}
        close={() => {
          setOpenCreate(false);
        }}
      />
    </>
  );
}
