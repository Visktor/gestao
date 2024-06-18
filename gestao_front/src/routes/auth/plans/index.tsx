import DataGrid from "#components/Grid";
import { trpcReact } from "#services/server";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import PlansCreate, { PlanUpsertForm } from "./create";
import DataGridActionButtons from "#components/Grid/ActionButtons";
import { Unpacked } from "src/@types/util";
import pgMoneyToNumber from "#utils/postgres/moneyToNumber";
import useConfirmStore from "#context/confirm";
import useAlertStore from "#context/alert";

export default function PlansList() {
  const { data: plans, refetch } = trpcReact.plans.getAll.useQuery(undefined, {
    initialData: [],
  });
  const [openUpsert, setOpenUpsert] = useState(false);
  const popupRef = useRef<{ reset: (data: PlanUpsertForm) => void }>(null);
  const deletePlanCall = trpcReact.plans.delete.useMutation().mutate;
  const openConfirm = useConfirmStore((state) => state.setOpen);
  const { alertError, alertSuccess } = useAlertStore();

  const deleteClickHandler = useCallback((data: Unpacked<typeof plans>) => {
    openConfirm({
      content: `Do you really wish to delete plan ${data.name}`,
      onConfirm: async () => {
        deletePlanCall(data.plan_id, {
          onSuccess: () => {
            alertSuccess("Plan successfully deleted.");
            refetch();
          },
          onError: () => {
            alertError(
              "There was an error processing your request, try again later.",
            );
          },
        });
      },
    });
  }, []);

  const editClickHandler = useCallback((data: Unpacked<typeof plans>) => {
    popupRef.current!.reset({
      name: data.name,
      branches: data.branches.map(b => b.branch_id),
      duration: String(data.duration),
      monthly_fee: pgMoneyToNumber(data.monthly_fee),
    });
    setOpenUpsert(true);
  }, []);

  return (
    <>
      <DataGrid
        toolbar={[
          () => {
            return (
              <Button
                title="Create new Plan"
                color="inherit"
                onClick={() => {
                  setOpenUpsert(true);
                }}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            );
          },
        ]}
        columnDefs={[
          {
            field: "plan_id",
            headerName: "ID",
          },
          {
            field: "name",
            headerName: "Name",
          },
          {
            field: "duration",
            headerName: "Duration",
          },
          {
            field: "monthly_fee",
            headerName: "Monthly Fee",
          },
          {
            headerName: "Actions",
            pinned: "right",
            cellRenderer: (rowData: any) => (
              <DataGridActionButtons<typeof plans>
                rowData={rowData}
                onEditClick={({ data }) => editClickHandler(data)}
                onDeleteClick={({ data }) => deleteClickHandler(data)}
              />
            ),
          },
        ]}
        rowData={plans}
      />
      <PlansCreate
        ref={popupRef}
        open={openUpsert}
        close={() => {
          setOpenUpsert(false);
        }}
        refetchList={refetch}
      />
    </>
  );
}
