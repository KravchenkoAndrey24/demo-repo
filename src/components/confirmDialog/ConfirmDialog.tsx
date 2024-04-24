import React, { cloneElement, useMemo, useState, useCallback } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface PropTypes {
  trigger: React.ReactElement;
  headerTitle?: string;
  title?: string;
  text?: React.ReactNode | string;
  confirmText?: string;
  icon?: React.ReactNode;
  confirmIcon?: React.ReactNode;
  cancelText?: string;
  onConfirm: () => void;
  disabled?: boolean;
}

export const ConfirmDialog: React.FC<PropTypes> = ({
  trigger,
  title = 'Are you sure?',
  text,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  disabled = false
}) => {
  const [open, setOpen] = useState(false);

  const clickTrigger = useMemo(() => {
    return cloneElement(trigger, {
      onClick: (e: Event) => {
        e.stopPropagation();
        e.preventDefault();
        if (disabled) {
          return;
        }
        setOpen(true);
      }
    });
  }, [trigger, disabled]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSubmit = useCallback(() => {
    onConfirm();
    handleClose();
  }, [handleClose, onConfirm]);

  return (
    <>
      {clickTrigger}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="text-center">{title}</DialogTitle>
        <DialogContent>{text}</DialogContent>
        <DialogActions className="gap-6">
          <Button fullWidth color="warning" variant="contained" onClick={handleSubmit}>
            {confirmText}
          </Button>
          <Button fullWidth color="info" variant="contained" onClick={handleClose}>
            {cancelText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
