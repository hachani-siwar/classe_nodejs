import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

let classeSchema= new mongoose.Schema(
    { 
      name:{type:String, required:true},
      classeGrade:{type:String, required:true}
     

    }
);

classeSchema.plugin(mongoosePaginate);
const Classe=mongoose.model("Classe",classeSchema);
export default Classe;