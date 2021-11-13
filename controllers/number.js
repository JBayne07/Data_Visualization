const Num = require( '../models/number');

module.exports.add_num = async (req, res) => {
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
module.exports.get_all_num = async (req, res) => {
    let data = [];
    await Num.find({});
    data.push(Num.find({}));
    console.log(data);
};
//TODO:
module.exports.get_num = async (req, res) => {
    
};
//TODO:
module.exports.delete_num = async (req, res) => {
    
};

