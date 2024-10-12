const express = require("express");
const { User } = require("./db");
const cors = require('cors');


const app = express();

app.use(express.json())
app.use(cors())

app.post('/signup', async (req, res) => {
    const body = req.body;

    console.log(body);
    console.log('reach')

    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
        return res.json({
            msg: "exists"
        });
    }

    await User.create(body);
    res.json({
        msg: "User created successfully",
        email : body.email
    });
});

app.post('/login', async (req,res) => {
    const body = req.body;

    const existingUser = await User.findOne({email : body.email});
    if(!existingUser) {
        res.json({
            msg : "err"
        })
    }

    res.json({
        msg : "User login",
        firstname : body.firstname 
    })
})





app.listen(3000, () => {
    console.log('Server is running on the port 3000');
})