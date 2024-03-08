import DataGrid from "#components/Grid";
import { trpcReact } from "#services/server";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useState } from "react";
import PlansCreate from "./create";

export default function PlansList() {
  const { data: plans, refetch } = trpcReact.plans.getAll.useQuery(undefined, {
    initialData: [],
  });
  const [openCreation, setOpenCreation] = useState(false);

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
                  setOpenCreation(true);
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
        ]}
        rowData={plans}
      />
      <PlansCreate
        open={openCreation}
        close={() => {
          setOpenCreation(false);
        }}
        refetchList={refetch}
      />
    </>
  );
}
