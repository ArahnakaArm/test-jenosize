const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
const status = require('../utils/enum/status');
const commonFunc = require('../utils/commongFunc');

exports.findRestaurantValidate = (req, res, next) => {
    const requiredSchema = ['latitude', 'longitude', 'radius'];
    const schema = {
        type: 'object',
        additionalProperties: false,
        required: requiredSchema,
        properties: {
            latitude: {
                type: 'number',
            },
            longitude: {
                type: 'number',
            },
            radius: {
                type: 'number',
            },
        },
    };

    const validateBody = ajv.validate(schema, req.body);
    if (validateBody) {
        next();
    } else {
        return returnInvalid(res);
    }
};

exports.twentyfourGameValidate = (req, res, next) => {
    const requiredSchema = ['numbers'];
    const schema = {
        type: 'object',

        required: requiredSchema,
        properties: {
            numbers: {
                type: 'array',
                items: {
                    type: 'number',
                },
            },
        },
    };

    if (req.body.numbers.length !== 4) {
        return returnInvalid(res);
    }

    const validateBody = ajv.validate(schema, req.body);
    if (validateBody) {
        next();
    } else {
        return returnInvalid(res);
    }
};

exports.xoGameValidate = (req, res, next) => {
    const requiredSchema = ['xoArray'];
    const requiredSchemaObj = ['sign', 'position'];
    const schema = {
        type: 'object',
        required: requiredSchema,
        properties: {
            xoArray: {
                type: 'array',
                items: {
                    type: 'object',
                    required: requiredSchemaObj,
                    properties: {
                        sign: {
                            type: 'string',
                            enum: ['X', 'O'],
                        },
                        position: {
                            type: 'string',
                            enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
                        },
                    },
                },
            },
        },
    };

    const positionArray = req.body.xoArray.map((item) => item.position);
    const isDup = commonFunc.hasDuplicates(positionArray);
    if (isDup) return returnInvalid(res);

    const validateBody = ajv.validate(schema, req.body);
    if (validateBody) {
        next();
    } else {
        return returnInvalid(res);
    }
};
function returnInvalid(res) {
    return res.status(403).send({
        resultDesc: status.MISSING_OR_INVALID_PARAMETER.RESULT_DESC,
        resultCode: status.MISSING_OR_INVALID_PARAMETER.RESULT_CODE,
        resultMessage: status.MISSING_OR_INVALID_PARAMETER.Result_Message,
    });
}
