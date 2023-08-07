const mongoose = require("mongoose");

const mongodb = async() => {
 await mongoose.connect('mongodb://127.0.0.1:27017/swiggy', {
    useNewUrlParser: true,
   useUnifiedTopology: true,
  })
  .then(async() => {
    console.log("Connected to MongoDB");
    const fetched_data = await mongoose.connection.db.collection("restaurant");
    fetched_data.find({}).toArray(function(err,data)
    {
        if(err) console.log(err);
       else console.log(err);
    })
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
}

module.exports = mongodb;
