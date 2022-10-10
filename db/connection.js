import mongoose from "mongoose";

const connect1 =  async(database_url)=>{
  
  try{
    const db_option = {
      dbname:"notes"
    }
    await mongoose.connect(database_url,db_option);
    console.log("database connected successfully= :)")

  }catch(err){
    console.log(err);
  }
}

export default connect1;