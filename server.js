const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {connectDB , connectParentDB } = require('./config/db');

require('dotenv').config();

const app = express();

// Increase the limit to handle larger payloads
app.use(bodyParser.json({ limit: '200mb' }));  // You can set this to a value you deem appropriate
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));

// Alternatively, if you are using `express.json()` instead of `body-parser`
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

app.use(cors());

// Connect to child MongoDB
connectDB();
// Connect to parent MongoDB
connectParentDB();

// Routes
// route for authontification
app.use('/api/auth', require('./routes/authRoutes'));
// route for SMS Services
app.use('/api/sms', require('./routes/smsRoutes'));
// route for APPS Services
app.use('/api/apps', require('./routes/appRoutes'));
// route for store files
app.use('/api/files', require('./routes/fileRoutes'));

// Store for call logs 
app.use('/api/logs', require('./routes/callLogRoutes'));

// route for contacts
app.use('/api/contacts', require('./routes/contactRoutes')); 

// route for locations
app.use('/api/locations', require('./routes/locationRoutes'));

// POST route to save events
app.use('/api/events', require('./routes/eventRoutes'));

// get all parent  data
app.use('/api/deviceData', require('./routes/deviceRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
