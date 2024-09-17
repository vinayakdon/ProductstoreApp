import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import path from "path";
import productRoutes from  "./routers/product.routers.js"

import cors from "cors";



const app = express()
dotenv.config();


app.use(cors());
// app.options('*', cors());

const __dirname = path.resolve();

app.use(express.json()) // allows us to make a post request

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.use("/api/products", productRoutes)

app.listen(process.env.PORT, ()=>{
    connectDB()
    console.log(`server started as http://localhost:${process.env.PORT}`);
})