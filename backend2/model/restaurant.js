const mongoose =require('mongoose')

const {Schema}= mongoose;

const RestaurantSchema = new Schema({
    id:{
        type:Number,
        required:true
    },
   name:{
        type:String,
        required:true

    },
   location:{
        type:String,
        required:true
    },
    owner_id:{
        type:String,
        required:true
    },
    dishes:[{
        name:String,
        price :Number
        
    }]
});


module.exports= mongoose.model('restaurant',RestaurantSchema);