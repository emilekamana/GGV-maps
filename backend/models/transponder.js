const mongoose = require("mongoose");

// Mongo db schema for a transponder with its attributes
const TransponderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type:Number,
        required: true,
    },
    radius: {
        type: Number,
        required: true,
    },
});

const Transponder = mongoose.model("transponders", TransponderSchema);

module.exports = Transponder;