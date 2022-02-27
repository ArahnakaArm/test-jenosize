module.exports = Object.freeze({
    SUCCESS: {
        RESULT_DESC: 'Success',
        RESULT_CODE: '20000',
        DEVELOPER_MESSAGE: 'Success',
    },
    MISSING_OR_INVALID_PARAMETER: {
        RESULT_DESC: 'Forbidden',
        RESULT_CODE: '40300',
        Result_Message: 'Missing or invalid parameter',
    },
    SYSTEM_ERROR: {
        RESULT_CODE: '50000',
        DEVELOPER_MESSAGE: 'System error',
    },
    UNAUTHORIZED: {
        RESULT_DESC: 'Unauthorized',
        RESULT_CODE: '40104',
        Result_Message: 'Unauthorized',
    },
});
