const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const cors = require('cors');
const dotenv = require('dotenv');

// Config Env File
dotenv.config();
const port = process.env.PORT;

// Import Routes
const authRoute = require('./routes/AuthenticationRoute');
const profileRoute = require('./routes/ProfileRoute');
const healthRoute = require('./routes/HealthRoute');
const mediaRoute = require('./routes/MediaRoute');
const communityRoute = require('./routes/CommunityRoute');
const actionsRoute = require('./routes/ActionsRoute');
const paymentsRoute = require('./routes/PaymentsRoute');

server.listen(port);
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useCreateIndex: true },
  () => {
    console.log(' ');
    console.log('connected to db!');
    console.log('Running on port ' + port);
    console.log(' ');
  }
);

// Use JSON parser for all non-webhook routes
app.use(
  bodyParser.json({
    limit: '500mb',
    verify: (req, res, buf) => {
      const url = req.originalUrl;
      if (url.startsWith('/api/payments/stripeWebhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);
app.use((req, res, next) => {
  if (req.get('x-amz-sns-message-type')) {
    req.headers['content-type'] = 'application/json';
  }
  next();
});
app.use(bodyParser.json({ limit: '500mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '500mb',
    extended: true,
    // parameterLimit: 50000,
  })
);

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:8081',
  /\.ngrok\.io$/,
  'https://vowsly.com',
  'https://www.vowsly.com',
  'https://api.vowsly.com',
  'api.vowsly.com',
  'http://api.vowsly.com',
];

app.use(cors({ origin: allowedOrigins, credentials: true, limit: '500mb' }));

// Create Route Paths
app.use('/api/auth', authRoute);
app.use('/api/profile', profileRoute);
app.use('/api/healthCheck', healthRoute);
app.use('/api/media', mediaRoute);
app.use('/api/community', communityRoute);
app.use('/api/actions', actionsRoute);
app.use('/api/payments', paymentsRoute);
