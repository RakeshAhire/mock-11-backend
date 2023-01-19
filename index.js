
const express = require('express');
const cors=require('cors')
const { connection } = require('./Config/db');
const { userRoutes } = require('./Routes/user.routes');

const app = express();
app.use(express.json())
app.use(cors());

app.use('/users',userRoutes)

app.get('/',(req,res)=>{
    res.send("Ok")
})

app.listen(8080, async () => {
    try {
        await connection;
        console.log("Connect successfully")
    }
    catch (e) {
        console.log('e: ', e);

    }
    console.log("App listning port 8080")
})