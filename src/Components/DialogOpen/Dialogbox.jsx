// FileUploadDialog.jsx

import React from 'react';
import { Dialog, DialogContent, Button } from '@mui/material';

const FileUploadDialog = ({ open, onClose, onFileSelect }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileSelect(file);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <input type="file" onChange={handleFileChange} />
        <Button onClick={onClose}>Cancel</Button>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadDialog;
