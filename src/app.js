require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express.json());
app.use(logger);   // 👈 Add logger here

app.use(express.json());
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
