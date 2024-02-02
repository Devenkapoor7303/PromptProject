import "express-async-errors";
import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import PromptRoutes from "./routes/promptRoutes.js";
//public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//Configuration
dotenv.config();

const app = express();

//Middlewares
app.use(express.json());
if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./public")));

//routes
app.use("/api/v1/prompt",PromptRoutes);
app.use("/api/v1",(_,res)=>{
    res.json({
        msg:"API is working"
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "./public", "index.html"))
})

//Error Middleware
app.use(errorHandlerMiddleware);

const server=app.listen(process.env.PORT||5100,()=>{
    console.log("server is running");
});

server.timeout=120000;
