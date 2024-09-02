const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

function isPrime(n){
    // 1 is not a prime number
    if(n<2){
        return false;
    }
    if(n<4){
        return true;
    }

    for(let i=2; i*i<=n; i++){
        if(n%i == 0){
            return false;
        }
    }
    return true;
}

// returns the next prime number that is strictly grater than n
function nextPrime(n){
    n += n%2==0? 1 : 2;
    //checks in increments of two because a prime number cannot be even, so it only checks odd numbers
    while(!isPrime(n)){
        n+=2;
    }
    return n;
}

app.post('/calculate', (req,res)=>{
    let {num1, num2} = req.body;
    if(typeof num1 != 'number' || typeof num2 != 'number' ){
        return res.status(400).json({error:'invalid input'});
    }
    // caluclates entire result by summing the two numbers together as well as the next biggest prime
    let result = num1+num2+nextPrime(Math.max(num1,num2));
    res.json({result});
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
