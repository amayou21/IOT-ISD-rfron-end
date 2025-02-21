import { Box, TextField } from "@mui/material";
import React from "react";

function Form() {
  return (
    <div >
      <Box 
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch", } }}
        noValidate
        autoComplete="off"
      >
        {/* duration: 8.322388,
      orig_bytes: 600,
      resp_bytes: 0,
      orig_pkts: 0,
      orig_ip_bytes: 656,
      resp_pkts: 0,
      resp_ip_bytes: 0, */}
        <div >
          <TextField
            id="outlined-number"
            label="duration"
            type="number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            id="outlined-number"
            label="orig bytes"
            type="number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />{" "}
          <TextField
            id="outlined-number"
            label="resp bytes"
            type="number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </div>
        <div>
          <TextField
            id="outlined-number"
            label="orig pkts"
            type="number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            id="outlined-number"
            label="orig ip bytes"
            type="number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            id="outlined-number"
            label="resp pkts"
            type="number"
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
         
        </div>
        <div>
        <TextField
            id="outlined-number"
            label="resp ip bytes"
            type="number"
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
