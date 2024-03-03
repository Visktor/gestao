import DataGrid from "#components/Grid";
import { trpcReact } from "#services/server";
import { Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import UserUpsertPopup from "./create";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function UsersList() {
  const { data, isPending } = trpcReact.users.getAll.useQuery({
    select: [
      "email",
      "address",
      "user_id",
      "username",
      "first_name",
      "last_name",
    ],
  });

  const [openCreate, setOpenCreate] = useState(false);

  return isPending ? (
    <>
      <CircularProgress />
    </>
  ) : (
    <>
      <Box width={"100%"} height={100}>
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
          columnDefs={[{ field: "email" }, { field: "reports" }]}
          rowData={data ?? []}
        />
      </Box>
      <UserUpsertPopup open={openCreate} close={() => setOpenCreate(false)} />
    </>
  );
}
