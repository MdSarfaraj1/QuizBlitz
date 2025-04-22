const express = require('express');
const router = express.Router();

router.get('/getLeaderboard',(req,res)=>{
    res.send("hi")
});
router.delete('/deleteUser/:id', (req, res) => {
    res.send("hi")
})