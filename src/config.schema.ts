import * as Joi from "@hapi/joi";

export const configValidationSchema = Joi.object({
    SERVER_HOST: Joi.string().required(),
    SERVER_PORT: Joi.string().default(5432).required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
});