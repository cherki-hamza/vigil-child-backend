// server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://hamza:W3XUhG2J0hBbzo9S@clusterhpac.8a0ma.mongodb.net/vigil?retryWrites=true&w=majority&appName=Clusterhpac', {
  /* useNewUrlParser: true,
  useUnifiedTopology: true, */
});

const smsSchema = new mongoose.Schema({
  address: String, // address
  name: String,  // Contact name
  body: String,  // SMS body
  date: Date,    // SMS date
});

const Sms = mongoose.model('Sms', smsSchema);

// Check if SMS already exists
app.post('/api/check-sms-exists', async (req, res) => {
  const { address, body, date } = req.body;
  try {
    const existingSms = await Sms.findOne({ address, body, date });
    if (existingSms) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error checking SMS' });
  }
});

// Save new SMS
app.post('/api/receive-sms', async (req, res) => {
  const { address, name, body, date } = req.body;
  try {
    const newSms = new Sms({ address, name, body, date });
    await newSms.save();
    res.status(200).send('SMS saved to MongoDB');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving SMS');
  }
});

app.get('/api/dev', async (req, res) => {
    res.status(200).send('welcome to node js');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
