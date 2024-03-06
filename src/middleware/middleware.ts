import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const validateCreateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            first_name: Joi.string().trim().required().messages({
                'string.empty': `"First name" cannot be empty`,
                'any.required': `"First name" is required`,
            }),
            last_name: Joi.string().trim().required().messages({
                'string.empty': `"Last name" cannot be empty`,
                'any.required': `"Last name" is required`,
            }),
            email: Joi.string().trim().email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            }).required().messages({
                'string.email': `"Email" must be a valid email address`,
                'string.empty': `"Email" cannot be empty`,
                'any.required': `"Email" is required`,
            }),
            password: Joi.string().min(8).required().messages({
                'string.min': `"Password" should be at least 8 characters long`,
                'string.empty': `"Password" cannot be empty`,
                'any.required': `"Password" is required`,
            }),
            country: Joi.string().trim().required().messages({
                'string.empty': `"Country" cannot be empty`,
                'any.required': `"Country" is required`,
            })
        });

        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (error: any) {
        return res.status(422).json({
            message: error.details.map((err: { message: string }) => err.message.replace(/['"]/g, '')).join(', '),
            success: false
        });
    }
};


const validateLogin = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const loginSchema = Joi.object({

            password: Joi.string().empty().required().messages({
                "string.base": `"password" must be of type "text"`,
                "string.empty": `"password" cannot be empty`,
                "string.required": `"password" is required`,

            }),
            email: Joi.string().email().empty().required().messages({
                "string.base": `"email" must be of type "text"`,
                "string.empty": `"email" cannot be empty`,
                "string.required": `"email" is required`,

            }),
        })

        await loginSchema.validateAsync(req.body, { abortEarly: true })
        next()

    }

    catch (error: any) {

        return res.status(422).json({

            message: error.message,
            success: false
        })

    }
}



export default {
    validateCreateUser,
    validateLogin
    
};
