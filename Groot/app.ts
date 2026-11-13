import { express, app } from "./server/server";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import DBconnection from "./config/DBconnection";
// import {redisConnect} from "./config/redis"
import multer from "multer";
// import {ipBlocker} from "./middleware/system/requestLimiter"

import userRoute from "./routes/system/user"
import adminRoute from "./routes/system/admin"

//DB connection
DBconnection();

//Redis Connection
// redisConnect


// morgan middleware
app.use(morgan("dev"));

///body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(express.json());

//cors
app.use(
    cors({
        origin: true,
        exposedHeaders: ["Content-Length", "Bearer"],
    })
);

//Default Route
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Welcome To Backend Server!" });
});


// app.use(ipBlocker)

// redirect to routes
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute)
// app.use("/api/common",commonRoute)


//Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: any) => {
    if (err instanceof multer.MulterError)
        return res.status(400).json({ message: "Multer : " + err.message });
    else if (err instanceof SyntaxError)
        res.status(400).json({ message: "Invalid Data Format" });
    else {
        console.log("499-> ", err);
        return res.status(499).json({ message: err.message });
    }
});

app.use((req: Request, res: Response) => {
    return res.status(404).json({ message: "Endpoint Not Found" });
});

export default app;
