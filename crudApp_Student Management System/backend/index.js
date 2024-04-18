
let express=require("express")
let app=express()

let devRoute=require("./route/router.js")
const cors = require('cors');
app.use(express.json());

app.use(cors());
app.use("/api",devRoute)
app.listen(8000,()=>{
    console.log("running on 8000")
})