import { body, validationResult } from "express-validator";
import {BadRequestError} from "../errors/customError.js";

const withValidationError=(validateValues)=>{
    return [
        validateValues,
        (req,_,next)=>{
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                const errorMessages = errors.array().map((err) => err.msg);
                throw new BadRequestError(errorMessages);
            }
            next();
        }
    ];
};

export const validatePromptMessage=withValidationError([
    body("messages.*.content").notEmpty().withMessage("Prompt Message is Required")
]);
