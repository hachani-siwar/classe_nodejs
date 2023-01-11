import express, { Request, RequestHandler, Response } from "express";
import mongoose from "mongoose";
import Classe from "./classe.model";
import bodyParser from "body-parser";
import cors from "cors";

const app=express();
app.use(bodyParser.json());
app.use(cors());
const uri="mongodb://localhost:27017/Biblio";

mongoose.connect(uri,(err)=>
{
    if(err) console.log(err);
    else console.log("mongo data base connected");
}
);

app.get("/",(_req:Request,resp:Response)=>{
    resp.send("Hello Express");
});

app.get("/classes",(_req:Request,resp:Response)=>
{
    Classe.find((err,classes)=>
   {
    if(err) resp.status(500).send(err)
    else resp.send(classes);
   });
}
);

app.get("/classes/:id",(req:Request,resp:Response)=>
{
   Classe.findById(req.params.id,(err: any,classe: any)=>
   {
    if(err){ resp.status(500).send(err);}
    else {
        
        
    resp.send(classe);
 
    }
   });
});


app.post("/classes",(req:Request,resp:Response)=>
{
    let classe=new Classe(req.body);
    classe.save(err=>{
        if(err) resp.status(500).send(err);
        else resp.send(classe);
    })
});

app.put("/classes/:id",(req:Request,resp:Response)=>
{
    
    Classe.findByIdAndUpdate(req.params.id,req.body,(err : any,classe :any)=>{
        if(err) resp.status(500).send(err);
       
    })
});

app.delete("/classes/:id",(req:Request,resp:Response)=>
{
    
    Classe.findByIdAndDelete(req.params.id,(err:any)=>{
        if(err) resp.status(500).send(err);
       // else resp.send("classe delete");
    })
});

app.get("/pclasses",(req:Request,resp:Response)=>
{ let p:number=parseInt(req.query.page?.toString() || '0');
  let size:number=parseInt(req.query.size?.toString() || '5'); 
   Classe.paginate({},{page:p, limit:size},(err:any,classes: any)=>
   { 
    if(err) resp.status(500).send(err)
    else resp.send(classes);
    
   });
}

);
app.get("/classes-search",(req:Request,resp:Response)=>
{ let p:number=parseInt(req.query.page?.toString() || '0');
  let size:number=parseInt(req.query.size?.toString() || '5'); 
  let kw:string=req.query.kw?.toString() || ""; 
   Classe.paginate({name:{$regex:".*(?i)"+kw+".*"}},{page:p, limit:size},(err,classes)=>
   { 
    if(err) resp.status(500).send(err)
    else resp.send(classes);
   });
}

);



app.listen(8085,()=>{
    console.log("Serve started");
});


