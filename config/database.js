const mongoose = require('mongoose')
require('dotenv').config
const DATABASE_URL = process.env.DB_URL

exports.connect = () => {
    mongoose
      .connect(DATABASE_URL, {
     
      })
      .then(() => console.log("DATABSE CONNECTED"))
      .catch((err) => {
        console.log(err);
        console.log("failed to connect DATABASE");
        process.exit(1);
      });
}