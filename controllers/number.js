const Num = require( '../models/number');

module.exports.addNum = async (req, res) => {
    console.log('You called me');
    let num = req.body.value;
    // try {
    //     num = req.value;
    // } catch (e) {
    //     res.status(400).json('Bad request!');
    // }    

    let number = new Num({value: num});
    await number.save(function(err, number){
        if(err) return console.error(err);
        console.log('Successfully inserted ' + number.value);
    })
    res.status(200).json(number)
};

//TODO:
module.exports.getAllNum = async (req, res) => {
    console.log('You called me');
    
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

