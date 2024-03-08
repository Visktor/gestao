import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronDown,
  faChevronUp,
  faCodeBranch,
  faFileContract,
  faUser,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Drawer, ListItemText, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type DrawerItem = {
  path?: string;
  icon: IconProp;
  children?: DrawerItem;
  description?: string;
};

export default function Sidebar({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  const navigate = useNavigate();

  const routes: DrawerItem[] = [
    {
      icon: faUser,
      path: "/users",
      description: "Users",
    },
    {
      icon: faCodeBranch,
      path: "/branches",
      description: "Branches",
    },
    {
      icon: faUserTag,
      path: "/roles",
      description: "Roles",
    },
    {
      icon: faFileContract,
      path: '/plans',
      description: 'Plans'
    }
  ];

  // TODO: implement animation on chevron icon
  return (
    <Drawer anchor="left" open={open} onClose={close}>
      {routes.map((r, idx) => {
        return (
          <SidebarItem
            key={r.icon.toString() + idx}
            {...r}
            navigate={navigate}
          />
        );
      })}
    </Drawer>
  );
}

function SidebarItem({
  icon,
  children,
  path,
  description,
  navigate,
}: DrawerItem & { navigate: (path: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <MenuItem
      sx={{
        display: "flex",
        gap: 2,
      }}
      onClick={() => {
        if (!children && path) {
          navigate(path);
        }

        if (children) {
          setOpen(true);
        }
      }}
    >
      <FontAwesomeIcon icon={icon} />
      <ListItemText primary={description} />
      {children ? (
        <FontAwesomeIcon icon={open ? faChevronDown : faChevronUp} />
      ) : null}
    </MenuItem>
  );
}
