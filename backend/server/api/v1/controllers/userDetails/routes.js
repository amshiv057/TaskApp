import Express from "express";
import controller from "./controller";
import { validateEmail } from "../../../../helper/middleware";
export default Express.Router()
    .post('/createUserDetails', validateEmail, controller.createDetails)
    .put('/updateUserDetails', validateEmail, controller.updateDetails)
    .get('/getDetailsList', controller.getDetailsList)
    .get('/viewDetails/:_id', controller.viewDetails)
    .put('/deleteDetails/:_id', controller.deleteDetails)