
import status from "../../../enums/status";
import userDetailsModel from "../../../models/userDetails";

const userDetailsServices = {
    createDetails: async (insertObj) => {
        return await userDetailsModel.create(insertObj);
    },
    findDetails: async (query) => {
        return await userDetailsModel.findOne(query);
    },
    updateDetails: async (query, updateObj) => {
        return await userDetailsModel.findOneAndUpdate(query, updateObj, { new: true });
    },
    updateDetailsById: async (query, updateObj) => {
        return await userDetailsModel.findByIdUpdate(query, updateObj, { new: true });
    },
    findDetailsList: async (value) => {
        const { search, page, limit } = value;
        // console.log(value);
        let query = { status: { $ne: status.DELETE } };
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
                { mobileNumber: { $regex: search, $options: 'i' } }
            ]
        }
        let options = {
            page: page || 1,
            limit: limit || 10,
            sort: { createdAt: -1 }
        };
        const result = await userDetailsModel.paginate(query, options);
        return result;
    },
}
module.exports = { userDetailsServices };