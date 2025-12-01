import express from "express";
import dotenv from "dotenv";
import {initDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js"


if(process.env.NODE_ENV=="production") job.start();



dotenv.config();

const app=express();

//middleware
app.use(express.json());

app.use(rateLimiter);

app.use((req,res,next)=>{
    console.log("Hey we hit a req , the method is ",req.method);
    next();
});




const PORT=process.env.PORT || 5001;


app.get("/api/health",(req,res)=>{
    res.status(200).json({
        status:"ok"
    });
});




app.use("/api/transactions",transactionsRoute);



console.log("my port : ",PORT);
initDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("Server is up and running on PORT:",PORT);
});
});





