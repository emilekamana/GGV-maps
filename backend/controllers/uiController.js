const _ = require('lodash');
const transponderModel = require('../models/transponder')
/*
 New controller for rendering the ui to interact with the database 
with all routes redirecting to the homepage
*/

// Return list of all transponders
exports.list_transponders = async (req, res) => {
    const transponders = await transponderModel.find({});
    try {
        res.render("index", {"transponders": transponders});
    } catch (error) {
        res.status(500).send(error);
    }
};


// create a new transponder
exports.create_transponder = async (req, res) => {
    const {name,latitude,longitude,radius} = new transponderModel(req.body);
    try {
        console.log(name);
        const transponder = new transponderModel({
            name,
            latitude,
            longitude,
            radius
        })
        await transponder.save();
        res.redirect("/");
    } catch(error) {
        res.status(500).send(error);
    }
};

// Delete a transponder given its id as parameter
exports.delete_transponder = async (req,res) =>{
    try{
        const transponderId = req.params.transponderId
        await transponderModel.deleteOne({_id: transponderId});
        res.redirect("/");
    }catch(error){
        res.status(500).send(error);
    }
}