const Num = require( '../models/number');

module.exports.addNum = async (req, res) => {
    // console.log('You called me');
    let num = req.body.value;
    let c = req.body.colour
    // try {
    //     num = req.value;
    // } catch (e) {
    //     res.status(400).json('Bad request!');
    // }    

    let number = new Num({value: num, colour: c});
    await number.save(function(err, number){
        if(err) return console.error(err);
        console.log('Successfully inserted ' + number.value + ' ' + number.colour);
    })
    res.status(200).json(number)
};

module.exports.getAllNum = async (req, res) => {
    console.log('Getting all numbers');
    
    let numArr = [];
    await Num.find(function(err, result){
        if(err) throw err;
        numArr.push(result);
        res.status(200).json({
            array: numArr
        })
    }).clone().catch(function(err){console.log(err)})
};
//TODO:
module.exports.getNum = async (req, res) => {
    
};
//TODO:
module.exports.deleteNum = async (req, res) => {
    
};

