const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for demo
const mockIncidents = [
  {
    id: '1',
    type: 'microblackout',
    location: 'Hostel A',
    description: 'Lights flickering for 2 seconds',
    priority: 'medium',
    status: 'new',
    timestamp: new Date()
  },
  {
    id: '2',
    type: 'voltage',
    location: 'Academic Block', 
    description: 'Voltage drops during peak hours',
    priority: 'high',
    status: 'assigned',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  }
];

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'VoltGuard Backend API is running!' });
});

// Get all incidents
app.get('/api/incidents', (req, res) => {
  res.json(mockIncidents);
});

// Report new incident
app.post('/api/incidents', (req, res) => {
  const newIncident = {
    id: 'inc_' + Date.now(),
    ...req.body,
    timestamp: new Date(),
    status: 'new'
  };
  
  console.log('📝 New incident reported:', newIncident);
  mockIncidents.unshift(newIncident); // Add to beginning
  
  res.json({ 
    success: true, 
    message: 'Incident reported successfully',
    incident: newIncident 
  });
});

// Get predictions
app.get('/api/predictions', (req, res) => {
  const predictions = [
    {
      id: 'pred_1',
      location: 'Hostel A',
      message: 'High chance of voltage issues based on recent patterns',
      confidence: 0.85,
      type: 'voltage_fluctuation'
    }
  ];
  res.json(predictions);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`⚡ VoltGuard Backend running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
});