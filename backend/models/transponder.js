const mongoose = require("mongoose");

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