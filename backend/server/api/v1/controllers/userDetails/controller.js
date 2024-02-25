import Joi from "joi";
import response from "../../../../../assets/response";
import responseMessage from "../../../../../assets/responseMessage";
import apiError from "../../../../helper/apiError";
import { userDetailsServices } from "../../services/userDetails";
const { createDetails, findDetails, updateDetails, findDetailsList } = userDetailsServices;
import status from "../../../../enums/status";
import userType from "../../../../enums/userType";

export class detailController {
    /**
     * @swagger
     * /userDetails/createUserDetails:
     *   post:
     *     tags:
     *       - USER_DETAILS_MANAGEMENT
     *     description: createDetails
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: name
     *         description: name
     *         in: formData
     *         required: true
     *       - name: email
     *         description: email
     *         in: formData
     *         required: true
     *       - name: age
     *         description: age
     *         in: formData
     *         required: true
     *       - name: mobileNumber
     *         description: mobile
     *         in: formData
     *         required: true
     *       - name: work
     *         description: work
     *         in: formData
     *         required: true
     *       - name: address
     *         description: address
     *         in: formData
     *         required: true
     *       - name: description
     *         description: desc
     *         in: formData
     *         required: true          
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async createDetails(req, res, next) {
        const validationSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            age: Joi.string().required(),
            mobile: Joi.string().required().max(10),
            work: Joi.string().required(),
            address: Joi.string().required(),
            desc: Joi.string().required()
        });
        try {
            const { value } = validationSchema.validate(req.body);
            console.log("address>>", value.address)
            const result = await findDetails({ email: value.email, status: { $ne: status.DELETE }, user_role: userType.USER });
            if (result) {
                throw apiError.alreadyExist(responseMessage.ALREADY_EXIST);
            }
            const datares = await createDetails(value);
            return res.json(new response(datares, responseMessage.DATA_SAVED));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    /**
     * @swagger
     * /userDetails/updateUserDetails:
     *   put:
     *     tags:
     *       - USER_DETAILS_MANAGEMENT
     *     description: updateDetails
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: _id
     *         description: _id
     *         in: formData
     *         required: true
     *       - name: name
     *         description: name
     *         in: formData
     *         required: false
     *       - name: email
     *         description: email
     *         in: formData
     *         required: false
     *       - name: age
     *         description: age
     *         in: formData
     *         required: false
     *       - name: mobileNumber
     *         description: mobileNumber
     *         in: formData
     *         required: false
     *       - name: work
     *         description: work
     *         in: formData
     *         required: false
     *       - name: address
     *         description: address
     *         in: formData
     *         required: false
     *       - name: description
     *         description: description
     *         in: formData
     *         required: false          
     *     responses:
     *       200:
     *         description: Returns success message
     */
    async updateDetails(req, res, next) {
        const validationSchema = Joi.object({
            id: Joi.string().required(),
            name: Joi.string().optional(),
            email: Joi.string().optional(),
            age: Joi.string().optional(),
            mobileNumber: Joi.string().optional(),
            work: Joi.string().optional(),
            address: Joi.string().optional(),
            description: Joi.string().optional()
        });
        try {
            const { value } = validationSchema.validate(req.body);
            const detailsres = await findDetails({ _id: value.id, status: { $ne: status.DELETE } });
            if (!detailsres) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            const result = await updateDetails({ _id: detailsres._id }, value);
            return res.json(new response(result, responseMessage.UPDATE_SUCCESS));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    /**
     * @swagger
     * /userDetails/getDetailsList:
     *   get:
     *     tags:
     *       - USER_DETAILS_MANAGEMENT
     *     description: getDetailsList
     *     produces:
     *       - application/json
     *     parameters:
     *       - name: search
     *         description: search
     *         in: query
     *         required: false
     *       - name: page
     *         description: page
     *         in: query
     *         required: false
     *       - name: limit
     *         description: limit
     *         in: query
     *         required: false
     *     responses:
     *       200:
     *         description: Returns success message
     */

    async getDetailsList(req, res, next) {
        const validationSchema = Joi.object({
            search: Joi.string().optional(),
            page: Joi.string().optional(),
            limit: Joi.string().optional()
        })
        try {
            const { value } = validationSchema.validate(req.query);
            // console.log(">>>>>>>>>>>>>",value)
            const result = await findDetailsList(value);
            if (!result) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    /**
      * @swagger
      * /userDetails/viewDetails:
      *   get:
      *     tags:
      *       - USER_DETAILS_MANAGEMENT
      *     description: viewDetails
      *     produces:
      *       - application/json
      *     parameters:
      *       - name: _id
      *         description: _id
      *         in: query
      *         required: true
      *     responses:
      *       200:
      *         description: Returns success message
      */
    async viewDetails(req, res, next) {
        const validationSchema = Joi.object({
            _id: Joi.string().required()
        });

        try {
            const { value } = validationSchema.validate(req.params);
            // console.log(">>>>>>>>>>>>>>>", value)
            const result = await findDetails({ _id: value._id, status: { $ne: status.DELETE } });
            if (!result) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            return res.json(new response(result, responseMessage.DATA_FOUND));
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
    /**
  * @swagger
  * /userDetails/deleteDetails:
  *   put:
  *     tags:
  *       - USER_DETAILS_MANAGEMENT
  *     description: deleteDetails
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: _id
  *         description: _id
  *         in: formData
  *         required: true
  *     responses:
  *       200:
  *         description: Returns success message
  */
    async deleteDetails(req, res, next) {
        const validationSchema = Joi.object({
            _id: Joi.string().required()
        })
        try {
            const { value } = validationSchema.validate(req.params);
            const findRes = await findDetails({ _id: value._id, status: { $ne: status.DELETE } });
            console.log(findRes)
            if (!findRes) {
                throw apiError.notFound(responseMessage.DATA_NOT_FOUND);
            }
            const result = await updateDetails({ _id: findRes._id }, { status: status.DELETE });
            return res.json(new response(result, responseMessage.DELETE_SUCCESS));

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

export default new detailController();