const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        description: {
            
        },
        date: {

        },
        time: {

        },
        image: {

        },
        comment: {

        },
    }
    )

    // Have a virtual that keeps track of a users sales or post?