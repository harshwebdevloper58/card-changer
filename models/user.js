const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    
    },
    email:{
        type:String,
    },
    number:{
        type:Number,
    
    },
    password:{
        type:String,

    },
   provider:{
    type:String,
   },
    picture:{
        type:String,
    }
},{ timestamps : true});

const cardSchema = new mongoose.Schema({
    company:{
        type:String,
    },
    category:{
        type:String
    },
        code:{
            type:String,
        },
        offer:{
            type:String,
        },
        brief:{
            type:String,
        },
        expiry:{
            type:String,
        },
        description:{
            type:String,
        },
        redeemProcess:{
            type:String,
        },
        TandC:{
            type:String,
        },
        sellerEmail:{
            type:String,
        },
        isPurchased:{
            type:Boolean,
        },
        purchaseName:{
            type:String,
        },
        purchaseEmail:{
            type:String,
        },
        purchaseNumber:{
            type:Number,
        },
        transectionId:{
            type:String
        }
})
const User = mongoose.model("User",userSchema);
const cardDetails = mongoose.model("cardDetails",cardSchema);
module.exports ={ 
    User,
    cardDetails,
}