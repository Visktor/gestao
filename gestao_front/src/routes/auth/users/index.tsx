import DataGrid from "#components/Grid";
import { trpcReact } from "#services/server";
import { Box, Button, CircularProgress } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import UserUpsertPopup, { UserUpsertForm } from "./create";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import DataGridActionButtons from "#components/Grid/ActionButtons";
import { Unpacked } from "src/@types/util";
import useAlertStore from "#context/alert";
import useConfirmStore from "#context/confirm";

export default function UsersList() {
  const {
    data: users,
    isFetched,
    refetch,
  } = trpcReact.users.getAll.useQuery(undefined, {
    initialData: [],
  });

  const [openCreate, setOpenCreate] = useState(false);
  const popupRef = useRef<{ reset: (data: UserUpsertForm) => void } | null>(
    null,
  );
  const { alertSuccess, alertError } = useAlertStore();
  const deleteUserCall = trpcReact.users.deleteOne.useMutation().mutate;
  const openConfirm = useConfirmStore((state) => state.setOpen);

  const editButtonHandler = useCallback(
    ({ data }: { data: Unpacked<typeof users> }) => {
      popupRef.current!.reset(data);
      setOpenCreate(true);
    },
    [],
  );

  const deleteButtonHandler = useCallback(
    ({ data }: { data: Unpacked<typeof users> }) => {
      openConfirm({
        content: `Are you sure you want to delete user ${data.username}`,
        onConfirm: () => {
          deleteUserCall(data.user_id, {
            onSuccess: () => {
              alertSuccess("User was successfully deleted.");
            },
            onError: () => {
              alertError(
                "There was an error processing your request, try again later.",
              );
            },
          });
        },
      });
    },
    [],
  );

  return !isFetched ? (
    <>
      <CircularProgress />
    </>
  ) : (
    <>
      <Box width={"100%"} height={100}>
        <DataGrid<typeof users>
          toolbar={[
            () => {
              return (
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    setOpenCreate(true);
                  }}
                  title={"Create new user"}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              );
            },
          ]}
          columnDefs={[
            { field: "user_id" },
            { field: "username" },
            { field: "email" },
            { field: "address" },
            { field: "first_name", headerName: "First Name" },
            { field: "last_name", headerName: "Last Name" },
            {
              headerName: "Actions",
              pinned: "right",
              cellRenderer: (rowData: any) => (
                <DataGridActionButtons<typeof users>
                  rowData={rowData}
                  onEditClick={editButtonHandler}
                  onDeleteClick={deleteButtonHandler}
                />
              ),
            },
          ]}
          rowData={users ?? []}
        />
      </Box>
      <UserUpsertPopup
        ref={popupRef}
        onSuccess={() => refetch()}
        open={openCreate}
        close={() => setOpenCreate(false)}
      />
    </>
  );
}
