import { Box, TextField } from '@mui/material';
import React from 'react';

function Form({ formData, handleFormChange }) {
  return (
    <div>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="duration"
            label="duration"
            type="number"
            value={formData.duration}
            onChange={handleFormChange}
            name="duration"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            id="orig_bytes"
            label="orig bytes"
            type="number"
            value={formData.orig_bytes}
            onChange={handleFormChange}
            name="orig_bytes"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            id="resp_bytes"
            label="resp bytes"
            type="number"
            value={formData.resp_bytes}
            onChange={handleFormChange}
            name="resp_bytes"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </div>
        <div>
          <TextField
            id="orig_pkts"
            label="orig pkts"
            type="number"
            value={formData.orig_pkts}
            onChange={handleFormChange}
            name="orig_pkts"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            id="orig_ip_bytes"
            label="orig ip bytes"
            type="number"
            value={formData.orig_ip_bytes}
            onChange={handleFormChange}
            name="orig_ip_bytes"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            id="resp_pkts"
            label="resp pkts"
            type="number"
            value={formData.resp_pkts}
            onChange={handleFormChange}
            name="resp_pkts"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </div>
        <div>
          <TextField
            id="resp_ip_bytes"
            label="resp ip bytes"
            type="number"
            value={formData.resp_ip_bytes}
            onChange={handleFormChange}
            name="resp_ip_bytes"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </div>
      </Box>
    </div>
  );
}

export default Form;
