const _ = require('lodash');
const transponderModel = require('../models/transponder')

// Return list of all transponders
exports.list_transponders = async (req, res) => {
    const transponders = await transponderModel.find({});
    try {
        res.send(transponders);
      } catch (error) {
        res.status(500).send(error);
      }
};

// create a new transponder
exports.create_transponder = async (req, res) => {
    try {
        const transponder = new transponderModel(req.body);
        await transponder.save();
        res.status(201).send(transponder);
    } catch(error) {
        res.status(500).send(error);
    }
};

// Delete a transponder
exports.delete_transponder = async (req,res) =>{
    try{
        const transponderId = req.params.transponderId
        await transponderModel.deleteOne({_id: transponderId});
        res.status(204).send("Deleted");
    }catch(error){
        res.status(500).send(error);
    }
}