const express = require('express');
const bodyParser = require('body-parser');
const status = require('./utils/enum/status');
/* const db = require('./models/index'); */
const app = express();
const jenosizeRoute = require('../src/routes/jenosize');

app.use(bodyParser.json());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        if (err.type === 'entity.parse.failed') {
            const data = req.body || req.query;
            try {
                JSON.parse(data);
            } catch (error) {
                const message = error.toString().split('\n')[0];
                return res.status(403).send({
                    resultDesc: status.MISSING_OR_INVALID_PARAMETER.RESULT_DESC,
                    resultCode: status.MISSING_OR_INVALID_PARAMETER.RESULT_CODE,
                    resultMessage: status.MISSING_OR_INVALID_PARAMETER.Result_Message,
                });
            }
        } else return res.status(400).send(err);
    }

    next();
});
app.use('/', jenosizeRoute);

module.exports = app;
