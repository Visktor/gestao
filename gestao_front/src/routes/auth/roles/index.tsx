import DataGrid from "#components/Grid";
import { RouterOutputs, trpcReact } from "#services/server";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import RolesCreate, { RoleForm } from "./create";
import useConfirmStore from "#context/confirm";
import DataGridActionButtons from "#components/Grid/ActionButtons";
import { Unpacked } from "src/@types/util";
import pgTimeToDate from "#utils/postgres/timeToDate";
import pgMoneyToNumber from "#utils/postgres/moneyToNumber";

export default function RolesList() {
  const { data: roles, refetch } = trpcReact.roles.getAll.useQuery(undefined, {
    initialData: [],
  });

  const [openCreate, setOpenCreate] = useState(false);
  const openConfirm = useConfirmStore((state) => state.setOpen);
  const popupRef = useRef<null | { reset: (data: RoleForm) => void }>(null);

  const deleteRoleCall = trpcReact.roles.delete.useMutation().mutate;

  const editButtonHandler = useCallback((data: Unpacked<typeof roles>) => {
    popupRef.current?.reset({
      ...data,
      salary: pgMoneyToNumber(data.salary),
      shift_start: pgTimeToDate(data.shift_start),
      shift_end: pgTimeToDate(data.shift_end),
    });
    setOpenCreate(true);
  }, []);

  const deleteButtonClickHandler = useCallback(
    (data: Unpacked<typeof roles>) => {
      openConfirm({
        onConfirm: () => {
          deleteRoleCall(data.role_id, {
            onSuccess: () => {
              refetch();
            },
          });
        },
        content: `Do you wish to delete role ${data?.name}?`,
      });
    },
    [],
  );

  return (
    <>
      <Box>
        <DataGrid
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
              field: "salary",
              headerName: "Salary",
            },
            {
              headerName: "Actions",
              cellRenderer: (rowData: any) => {
                return (
                  <DataGridActionButtons<RouterOutputs["roles"]["getAll"]>
                    rowData={rowData}
                    onEditClick={({ data }) => {
                      editButtonHandler(data);
                    }}
                    onDeleteClick={({ data }) => {
                      deleteButtonClickHandler(data);
                    }}
                  />
                );
              },
            },
          ]}
        />
      </Box>
      <RolesCreate
        open={openCreate}
        ref={popupRef}
        onMutated={() => {
          refetch();
        }}
        close={() => {
          setOpenCreate(false);
        }}
      />
    </>
  );
}
