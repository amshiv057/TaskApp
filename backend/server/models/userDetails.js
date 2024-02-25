import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate";
import userType from "../enums/userType";
import status from "../enums/status";
const userDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    age: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    work: {
        type: String
    },
    address: {
        type: String
    },
    description: {
        type: String
    },
    user_role: {
        type: String, default: userType.USER
    },
    status: {
        type: String, default: status.ACTIVE
    }
}, { timestamps: true, collection: 'userDetails' }
)
userDetailsSchema.plugin(mongoosePaginate);
userDetailsSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model("userDetails", userDetailsSchema);