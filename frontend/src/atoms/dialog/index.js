import React from "react";
import Dialog from "@mui/material/Dialog";
import { bool, element, func, string } from "prop-types";
import { Box } from "@mui/material";

const VenturasDialog = ({
  onClose,
  selectedValue,
  open,
  title,
  children,
  ref,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box>{children}</Box>
    </Dialog>
  );
};

VenturasDialog.propTyps = {
  onClose: func.isRequired,
  selectedValue: func,
  open: bool.isRequired,
  title: string,
  children: element,
};

export default VenturasDialog;
