import DataGrid from "#components/Grid";
import { trpcReact } from "#services/server";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useRef, useState } from "react";
import BranchUpsertPopup, { BranchUpsertForm } from "./create";
import DataGridActionButtons from "#components/Grid/ActionButtons";
import { Unpacked } from "src/@types/util";
import useConfirmStore from "#context/confirm";
import useAlertStore from "#context/alert";

export default function BranchesList() {
  type Branch = NonNullable<Unpacked<typeof branches>>;
  const { data: branches, refetch } = trpcReact.branches.getAll.useQuery();
  const [openUpsert, setOpenUpsert] = useState<boolean>(false);
  const popupRef = useRef<{ reset: (data: Partial<BranchUpsertForm>) => void }>(
    null,
  );
  const openConfirmStore = useConfirmStore((state) => state.setOpen);
  const deleteBranchCall = trpcReact.branches.delete.useMutation().mutate;
  const { alertSuccess, alertError } = useAlertStore();

  const editClickHandler = useCallback((data: Branch) => {
    popupRef.current?.reset({
      name: data.name,
      state: data.state,
      city: data.city,
      street: data.street,
      neighborhood: data.neighborhood,
    });
    setOpenUpsert(true);
  }, []);

  const deleteClickHandler = useCallback((data: Branch) => {
    openConfirmStore({
      content: `Are you sure you want to delete branch ${data?.name}?`,
      onConfirm: () => {
        deleteBranchCall(data.branch_id, {
          onSuccess: () => {
            refetch();
            alertSuccess("Branch successfully deleted.");
          },
          onError: () => {
            alertError(
              "There was an error while processing your request. Please try again later.",
            );
          },
        });
      },
    });
  }, []);

  return (
    <>
      {branches ? (
        <DataGrid
          columnDefs={[
            {
              field: "name",
            },
            {
              field: "city",
            },
            {
              field: "state",
            },
            {
              field: "neighborhood",
            },
            {
              field: "street",
            },
            {
              headerName: "Actions",
              cellRenderer: (rowData: any) => (
                <DataGridActionButtons<typeof branches>
                  rowData={rowData}
                  onEditClick={({ data }) => editClickHandler(data)}
                  onDeleteClick={({ data }) => deleteClickHandler(data)}
                />
              ),
            },
          ]}
          toolbar={[
            () => {
              return (
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => {
                    setOpenUpsert(true);
                  }}
                  title={"Create new branch"}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              );
            },
          ]}
          rowData={branches}
        />
      ) : null}
      <BranchUpsertPopup
        ref={popupRef}
        open={openUpsert}
        onRegistered={() => {
          refetch();
        }}
        close={() => setOpenUpsert(false)}
      />
    </>
  );
}
