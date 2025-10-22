import express from 'express'
import {ethers} from 'ethers'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(express.json());

app.get('/testEndpoint', (req, res)=>{
res.json({message: 'The sample endpoint'}).status(200);
});
const port = 3000;
app.listen(port, ()=> console.log(`Server is running at ${port}`));