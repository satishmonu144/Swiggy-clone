const mongoose = require("mongoose");
const mongoUrl = 'mongodb://127.0.0.1:27017/swiggy'; // Corrected the URL format

const mongodb = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    const fetched_data = await mongoose.connection.db.collection("restaurant");
    fetched_data.find({}).toArray(function (err, data) {
      if (err) console.log(err);
      else console.log(data);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongodb;
