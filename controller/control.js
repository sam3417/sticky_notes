import notemodel from "../model/notesschema.js";

class notesclass {
  static createdoc = async(req,res)=>{
    //creating doc
    console.log(req.body)
    try{

      const doc =  new notemodel({
        tittle : req.body.tittle,
        notes : req.body.notes,
        isfav : "no"
      })
      const result = await doc.save();
      res.redirect('/note')

    }catch(err){console.log("this is err="+ err)}
    
  }
  static getdoc = async(req,res)=>{
    try{
      const result  = await notemodel.find();
      res.render("index.ejs",{data:result})
    }catch(err){console.log("this is error = " + err)}
       
  }
  static editdoc = async(req,res)=>{

    try{
      const result  = await notemodel.findById(req.params.id);
      res.render("edit.ejs",{data:result});

    }catch(err){console.log("this is the err = " + err)}

  }
  static updatedoc = async(req,res)=>{

    try{
      // const result = await notemodel.findByIdAndUpdate(req.params.id,req.body)
      // await result.save();
      // res.redirect("/note");

      const result = await notemodel.findById(req.params.id);
      result.tittle= req.body.tittle;
      result.notes= req.body.notes;
      

      const result1 = await result.save();
      res.redirect('/note');

    }catch(err){console.log("this is the err = " + err)}

  }
  // static deletedoc = async(req,res)=>{

  //   try{
  //       const result = await notemodel.findByIdAndDelete(req.params.id);
        
  //       res.redirect("/note")
  //   }catch(err){console.log("this is err" + err)}

  // }
  static deletedoc = async(req,res)=>{
    try{
      const result = await notemodel.findByIdAndDelete(req.params.id)
      res.redirect('/note');
    }catch(err){console.log(err)}
   
  }
  
  static isfavdoc = async(req,res)=>{
    try{
         const result = await notemodel.findById(req.params.id);
        //  console.log(result);
         if(result.isfav=="no")result.isfav="yes";
         else result.isfav="no";

         await result.save();
        //  console.log(result);
         res.redirect('/note')
    }catch(err){console.log("this is error in fav"+ err)}
  }

  static myfavdoc = async(req,res)=>{
    try{
      const result = await notemodel.find({isfav : "yes"});
      res.render("myfav.ejs",{data:result});

    }catch(err){console.log(err)};
   
  }

}

export default notesclass;