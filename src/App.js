import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Box, Button } from '@mui/material';
import Form from './Form';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
function App() {
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async () => {
    const inputData = {
      duration: 70,           // Exceeds the DURATION_THRESHOLD (60), indicating anomalous duration
      orig_bytes: 600,        // Normal value, does not exceed TRAFFIC_THRESHOLD
      resp_bytes: 11110,      // Exceeds TRAFFIC_THRESHOLD (1000), indicating unusual response traffic
      orig_pkts: 11110,       // Exceeds PKTS_THRESHOLD (100), indicating a possible DoS attack
      orig_ip_bytes: 20,      // Normal value, does not exceed PKTS_THRESHOLD
      resp_pkts: 0,           // Normal value
      resp_ip_bytes: 0,       // Normal value
    };
    

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', inputData);
      setPrediction(response.data.prediction);
      console.log(response  );
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <div className="App" style={{ justifyContent: "center", display: "flex" }}>
      <div >
        <div style={{ marginTop: 20 }}>
          {prediction !== null && (
            <p style={{ margin: "px" }}>{prediction === 1 ?  <Alert severity="error">Prediction: Anomaly Detected.</Alert>: <Alert severity="success">Prediction: Normal.</Alert>}</p>
          )}


        </div>

        <h1>IoT Intrusion Detection System</h1>

        <Form />
        <Button sx={{ m: 1 }} onClick={handlePredict} variant="contained">Predict</Button>

        <Box sx={{ minHeight: 352, minWidth: 250 }}>
      <SimpleTreeView>
        <TreeItem itemId="grid" label="Data Grid">
          <TreeItem itemId="grid-community" label="@mui/x-data-grid" />
          <TreeItem itemId="grid-pro" label="@mui/x-data-grid-pro" />
          <TreeItem itemId="grid-premium" label="@mui/x-data-grid-premium" />
        </TreeItem>
        <TreeItem itemId="pickers" label="Date and Time Pickers">
          <TreeItem  itemId="pickers-community" label="@mui/x-date-pickers" />
          <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
        </TreeItem>
        <TreeItem itemId="charts" label="Charts">
          <TreeItem itemId="charts-community" label="@mui/x-charts" />
        </TreeItem>
        <TreeItem itemId="tree-view" label="Tree View">
          <TreeItem itemId="tree-view-community" label="@mui/x-tree-view" />
        </TreeItem>
      </SimpleTreeView>
    </Box>
      </div>

    </div>
  );
}

export default App;