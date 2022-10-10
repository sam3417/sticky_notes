import mongoose from "mongoose";


const notesschema = new mongoose.Schema({
  // user : {
  //   type : mongoose.Schema.Types.ObjectId,
  //   ref : "Userdata",
  // }
  tittle : {type:String , required : true , trim : true},
  notes : {type:String , required : true , trim : true},
  isfav : {type:String , required : false}
})



const notemodel = mongoose.model("notesdata",notesschema);

export default notemodel;