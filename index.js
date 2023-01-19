
const express = require('express');
const cors=require('cors')
const { connection } = require('./Config/db');

const app = express();
app.use(express.json())
app.use(cors());

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