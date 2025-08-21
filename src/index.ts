import express from "express"
import routerUser from "./routers/user";
import routerValidate from "./routers/validate";
import routerDuo from "./routers/duo";
import * as dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || "3000",10);
const API_KEY = process.env.API_KEY;

app.use(express.json());

app.use((req, res, next) => {
    const apiKey = req.headers['api-key'];

    if (apiKey === API_KEY) {
        next();
    } else {
        res.status(401).send('Unauthorized'); 
    }
});


app.use("/user", routerUser);
app.use("/validate", routerValidate);
app.use("/duo", routerDuo);


app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})