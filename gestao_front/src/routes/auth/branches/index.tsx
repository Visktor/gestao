import DataGrid from "#components/Grid";
import { trpcReact } from "#services/server";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import BranchUpsertPopup from "./create";

export default function BranchesList() {
  const { data } = trpcReact.branches.getAll.useQuery();
  const [openUpsert, setOpenUpsert] = useState<boolean>(false);

  return (
    <>
      {data ? (
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
          ]}
          toolbar={[
            () => {
              return (
                <Button
                  variant="contained"
                  startIcon={<FontAwesomeIcon icon={faPlus} />}
                  onClick={() => {
                    setOpenUpsert(true);
                  }}
                  title={"Create new user"}
                >
                  {"New"}
                </Button>
              );
            },
          ]}
          rowData={data}
        />
      ) : null}
      <BranchUpsertPopup open={openUpsert} close={() => setOpenUpsert(false)} />
    </>
  );
}
