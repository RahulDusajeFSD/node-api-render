import express from 'express'
import {ethers} from 'ethers'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(express.json());

app.get('/testEndpoint', (req, res)=>{
res.json({message: 'The sample endpoint - ' + process.env.CONTRACT_ADDRESS }).status(200);
});


const provider = new ethers.JsonRpcProvider(process.env.INFURA_URL, "sepolia");
//const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractABI = [
"function transfer(address payable _to, uint256 _amount) public payable"
];

// connect to the deployed contract ( on REMIX)

const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

app.post("/transfer", async (req, res) => {
    try {
        const {_to, _amount} = req.body;
        console.log('Sending To - ' + _to + ' Amount - ' + _amount);
        const tx = await contract.transfer(_to, _amount);
        await tx.wait();
        res.status(201).json({message: "Transfer Successful", txHash: tx.hash});

    } catch(error){
        console.log(error);
        res.status(500).json({message: error.message});
    }

});

const port = 3000;
app.listen(port, ()=> console.log(`Server is running at ${port}`));

