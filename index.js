import express from "express";
import 'dotenv/config';
import { rootRouter } from "./src/routes/index.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/v1", rootRouter);

app.get('/', (req,res)=>{
    res.status(200).json({msg:"do it"});
});

// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).send({ message: "Internal Server Error by global error handler" });
// });

app.listen(port, (err)=>{
    if(!err){
        console.log(`shhhhhhhhhhhhhhhhhhhhh it is listening over ${port} using [Express]`);
    }
    else{
        console.error(err);
    }
});