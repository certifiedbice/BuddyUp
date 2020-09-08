const app = require('./app'),
  { PORT } = require('./config');

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
