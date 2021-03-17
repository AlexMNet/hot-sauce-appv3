const dotenv = require('dotenv');
//This is where the env variables are read and
//now accesable to the entire project
//Make sure these variables are read before you set app
//App is dependant on these variables!
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
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
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.log('MONGO CONNECTION ERROR!!!!');
    // eslint-disable-next-line no-console
    console.log(err);
  });

//SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listening on port ${port}...`);
});
