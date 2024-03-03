import { Box, Button, IconButton, useTheme, Tooltip } from "@mui/material";
import { ReactElement, ReactNode, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Unpacked } from "src/@types/util";

type IconConfig = {
  icon: IconProp;
  name?: string;
  tooltip?: string;
};

type Names = (string | IconConfig)[];

export default function Tabs({
  names,
  children,
  useContained,
  useIndicator,
}: {
  names: Names;
  children: ReactNode[];
  useContained?: boolean;
  useIndicator?: boolean;
}) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  function scrollLeft() {
    const currentScroll = parentRef.current!.scrollLeft;
    parentRef.current?.scrollTo({
      left: currentScroll - 300,
      behavior: "smooth",
    });
  }

  function scrollRight() {
    const currentScroll = parentRef.current!.scrollLeft;
    parentRef.current?.scrollTo({
      left: currentScroll + 300,
      behavior: "smooth",
    });
  }

  const muiTheme = useTheme();

  const textColors = useMemo(
    () => ({
      selected: useContained ? "#ffffff" : muiTheme.palette.primary.main,
      notSelected: useContained ? "#c4c4c4" : muiTheme.palette.text.disabled,
    }),
    [useContained],
  );

  function isNameString(name: Unpacked<Names>): name is string {
    return typeof name === "string";
  }

  function ButtonParent<U extends boolean>({
    useTooltip,
    children,
    title,
  }: {
    useTooltip: U;
    title?: U extends true ? string : never;
    children: ReactElement;
  }) {
    return useTooltip ? (
      <Tooltip title={title}>{children}</Tooltip>
    ) : (
      <>{children}</>
    );
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        display="flex"
        width="100%"
        minHeight={45}
        gap={2}
        bgcolor={useContained ? "primary.main" : undefined}
      >
        <Box
          width={"35px"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          position={"sticky"}
        >
          <IconButton
            onClick={() => {
              scrollLeft();
            }}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              size={"xs"}
              color={useContained ? "white" : muiTheme.palette.primary.main}
            />
          </IconButton>
        </Box>
        <Box
          flex={1}
          display="flex"
          alignItems="center"
          overflow="hidden"
          ref={parentRef}
        >
          {children.map((_, idx) => {
            const name = names[idx];
            const isString = isNameString(name);
            const buttonLabel = isNameString(name)
              ? name
              : name.name
                ? name.name
                : undefined;

            const isSelected = idx === selectedTab;
            return (
              <ButtonParent
                key={idx}
                useTooltip={!isString}
                title={isString ? undefined : name.tooltip}
              >
                <Button
                  disableRipple
                  startIcon={
                    isString ? undefined : <FontAwesomeIcon icon={name.icon} />
                  }
                  disableElevation
                  onClick={() => {
                    setSelectedTab(idx);
                  }}
                  variant={useContained ? "contained" : "text"}
                  sx={{
                    height: "100%",
                    boxShadow: "none",
                    flexGrow: 1,
                    minWidth: "min-content",
                    minHeight: "min-content",
                    color: textColors[isSelected ? "selected" : "notSelected"],
                    borderBottom:
                      isSelected && useIndicator
                        ? `3px solid ${
                            textColors[isSelected ? "selected" : "notSelected"]
                          }`
                        : `3px solid transparent`,
                    borderRadius: 0,
                    bgcolor:
                      useContained && isSelected
                        ? muiTheme.palette.primary.dark
                        : undefined,
                  }}
                >
                  {buttonLabel}
                </Button>
              </ButtonParent>
            );
          })}
        </Box>
        <Box
          width={"35px"}
          display="flex"
          justifyContent="center"
          alignItems="center"
          position={"sticky"}
        >
          <IconButton
            onClick={() => {
              scrollRight();
            }}
          >
            <FontAwesomeIcon
              icon={faChevronRight}
              size={"xs"}
              color={useContained ? "white" : muiTheme.palette.primary.main}
            />
          </IconButton>
        </Box>
      </Box>
      <Box>{children[selectedTab]}</Box>
    </Box>
  );
}
