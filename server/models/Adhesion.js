import mongoose from "mongoose"; 

// Schema for the Adhesion model
const adhesionSchema = new mongoose.Schema({
  firstName: {
    type:String, 
    required:true, 
  },
  lastName: {
    type:String, 
    required:true, 
  },
  email: {
    type:String, 
    required:true, 
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  typeOfAdhesion: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  transactionId: {
    type: String,
    required: true,
    default: "pending",
  },
  transactionDate: {
    type: Date,
    required: true,
    default: Date.now,
  },  
});

const Adhesion = mongoose.model("Adhesion", adhesionSchema);

export default Adhesion;