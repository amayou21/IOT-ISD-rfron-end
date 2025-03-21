import React, { useState } from 'react';
import axios from 'axios';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import Form from './Form';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

function App() {
  const [prediction, setPrediction] = useState(null);
  const [formData, setFormData] = useState({
    duration: '',
    orig_bytes: '',
    resp_bytes: '',
    orig_pkts: '',
    orig_ip_bytes: '',
    resp_pkts: '',
    resp_ip_bytes: '',
  });
  const [responseData, setResponseData] = useState({
    host_name: '',
    ip_address: '',
    location: '',
    message: '',
    anomaly_detection_time: '',
    user_agency: ''
  });
  const [loading, setLoading] = useState(false);

  // Predefined dataset for random data generation
  const randomDataSet = [
    {
      duration: '0.0015',
      orig_bytes: '100',
      resp_bytes: '150',
      orig_pkts: '2',
      orig_ip_bytes: '200',
      resp_pkts: '3',
      resp_ip_bytes: '250',
    },
    {
      duration: '3.0051',
      orig_bytes: '90',
      resp_bytes: '120',
      orig_pkts: '1',
      orig_ip_bytes: '180',
      resp_pkts: '2',
      resp_ip_bytes: '220',
    },
    {
      duration: '5.5001',
      orig_bytes: '300',
      resp_bytes: '320',
      orig_pkts: '5',
      orig_ip_bytes: '480',
      resp_pkts: '6',
      resp_ip_bytes: '500',
    },
  ];

  // Function to set random data
  const generateRandomData = () => {
    const randomEntry = randomDataSet[Math.floor(Math.random() * randomDataSet.length)];
    setFormData({
      duration: randomEntry.duration,
      orig_bytes: randomEntry.orig_bytes,
      resp_bytes: randomEntry.resp_bytes,
      orig_pkts: randomEntry.orig_pkts,
      orig_ip_bytes: randomEntry.orig_ip_bytes,
      resp_pkts: randomEntry.resp_pkts,
      resp_ip_bytes: randomEntry.resp_ip_bytes,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePredict = async () => {
    const inputData = {
      duration: formData.duration,
      orig_bytes: formData.orig_bytes,
      resp_bytes: formData.resp_bytes,
      orig_pkts: formData.orig_pkts,
      orig_ip_bytes: formData.orig_ip_bytes,
      resp_pkts: formData.resp_pkts,
      resp_ip_bytes: formData.resp_ip_bytes,
    };

    setLoading(true); // Start loading spinner

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', inputData);
      setPrediction(response.data.prediction);

      // Simulate loading for 2 seconds
      setTimeout(() => {
        setLoading(false); // Stop loading spinner after 2 seconds
      }, 2000);

      if (response.data.prediction === 1) {
        setResponseData({
          host_name: response.data.host_name,
          ip_address: response.data.ip_address,
          location: response.data.location,
          message: response.data.message,
          anomaly_detection_time: response.data.time,
          user_agency: response.data.user_agency,
        });
      } else {
        setResponseData({
          host_name: '',
          ip_address: '',
          location: '',
          message: '',
          anomaly_detection_time: '',
          user_agency: ''
        });
      }
      console.log(response);
    } catch (error) {
      console.error('Error making prediction:', error);
      setLoading(false); // Stop loading if there's an error
    }
  };

  return (
    <div className="App" style={{ justifyContent: 'center', display: 'flex' }}>
      <div>
        <div style={{ marginTop: 20 }}>
          {prediction !== null && !loading && (
            <p style={{ margin: 'px' }}>
              {prediction === 1 ? (
                <Alert severity="error">Prediction: Anomaly Detected.</Alert>
              ) : (
                <Alert severity="success">Prediction: Normal.</Alert>
              )}
            </p>
          )}
        </div>

        <h1>IoT Intrusion Detection System</h1>

        <Form formData={formData} handleFormChange={handleFormChange} />

        {/* Set Data Button */}
        <Button sx={{ m: 1 }} onClick={generateRandomData} variant="contained">
          Set Random Data
        </Button>

        {/* Predict Button */}
        <Button sx={{ m: 1 }} onClick={handlePredict} variant="contained">
          {loading ? <CircularProgress color="inherit" size={20} disableShrink /> : 'Predict'}
        </Button>

        {/* Conditionally render SimpleTreeView based on anomaly detection */}
        {prediction === 1 && !loading && (
          <Box sx={{ minHeight: 352, minWidth: 250 }}>
            <SimpleTreeView>
              <TreeItem itemId="host-name" label="Host Name">
                <TreeItem itemId="host-name-value" label={responseData.host_name || 'Loading...'} />
              </TreeItem>
              <TreeItem itemId="ip-address" label="IP Address">
                <TreeItem itemId="ip-address-value" label={responseData.ip_address || 'Loading...'} />
              </TreeItem>
              <TreeItem itemId="location" label="Location">
                <TreeItem itemId="location-value" label={responseData.location || 'Loading...'} />
              </TreeItem>
              <TreeItem itemId="message" label="Message">
                <TreeItem itemId="message-value" label={responseData.message || 'Loading...'} />
              </TreeItem>
              <TreeItem itemId="anomaly-detection-time" label="Anomaly Detection Time">
                <TreeItem itemId="anomaly-detection-time-value" label={responseData.anomaly_detection_time || 'Loading...'} />
              </TreeItem>
              <TreeItem itemId="user-agency" label="User Agency">
                <TreeItem itemId="user-agency-value" label={responseData.user_agency || 'Loading...'} />
              </TreeItem>
            </SimpleTreeView>
          </Box>
        )}
      </div>
    </div>
  );
}

export default App;
