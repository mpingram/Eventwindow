var express=require('express');
var router=express.Router();

router.post('/', (req,res) => {
    
    console.log(req.body);
    
    // return debug json response to ang
    res.json({
        'msg':'hello from the ~server side~ !'
    });
});

module.exports = router;