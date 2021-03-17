const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.log('UNCAUGHT EXCEPTION 🚧 Shutting down...');
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  process.exit(1);
});
//This is where the env variables are read and
//now accesable to the entire project
//Make sure these variables are read before you set app
//App is dependant on these variables!
dotenv.config({ path: './config.env' });
const app = require('./app');

//LOCAL DATABASE
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Local DB Connection Successful');
  });
// .catch((err) => {
//   // eslint-disable-next-line no-console
//   console.log('MONGO CONNECTION ERROR!!!!');
//   // eslint-disable-next-line no-console
//   console.log(err);
// });

//SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listening on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.log(err.name, err.message);
  // eslint-disable-next-line no-console
  console.log('UNHANDLED REJECTION 🚧 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
