import DataGrid from "#components/Grid";
import DataGridActionButtons from "#components/Grid/ActionButtons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import { useCallback, useState } from "react";
import MembersUpsert from "./upsert";
import { trpcReact } from "#services/server";
import { Unpacked } from "src/@types/util";
import useConfirmStore from "#context/confirm";

export default function MembersList() {
  const [openUpsert, setOpenUpsert] = useState(false);
  const { data: members } = trpcReact.members.getAll.useQuery(undefined, {
    initialData: [],
  });
  const openConfirm = useConfirmStore((state) => state.setOpen);

  const deleteMutate = trpcReact.members.delete.useMutation().mutate;

  const confirmDelete = (memberName: string, memberId: string) =>
    openConfirm({
      content: `Are you sure you want do delete member ${memberName}`,
      onConfirm: () => {
        deleteMutate(memberId);
      },
    });

  const handleEditClick = useCallback(
    (data: Unpacked<typeof members>) => {

    },
    [],
  );

  const handleDeleteClick = useCallback((data: Unpacked<typeof members>) => {
    confirmDelete(data.first_name, data.member_id);
  }, []);

  return (
    <>
      <DataGrid
        toolbar={[
          () => {
            return (
              <Button
                title="Create new Member"
                color="inherit"
                onClick={() => setOpenUpsert(true)}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            );
          },
        ]}
        columnDefs={[
          {
            headerName: "Actions",
            pinned: "right",
            cellRenderer: (rowData: any) => (
              <DataGridActionButtons<typeof members>
                rowData={rowData}
                onEditClick={({ data }) => handleEditClick(data)}
                onDeleteClick={({ data }) => handleDeleteClick(data)}
              />
            ),
          },
        ]}
        rowData={members}
      />
      <MembersUpsert
        open={openUpsert}
        close={() => {
          setOpenUpsert(false);
        }}
        onSuccess={() => {
          //TODO
        }}
      />
    </>
  );
}
