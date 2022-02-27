const axios = require('axios');
const envService = typeof process.env.service === 'string' ? JSON.parse(process.env.service) : process.env.service;
const { placeUrl, key } = envService.googleApi;
const status = require('../utils/enum/status');
const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');
const xoGame = require('../utils/xoGame');
const game24 = require('../utils/24Game');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

exports.findRestaurant = async (req, res) => {
    try {
        const body = req.body;
        const { latitude, longitude, radius } = body;
        const response = await axios.get(
            `${placeUrl}?location=${latitude.toString()}%2C${longitude.toString()}&radius=${radius.toString()}&type=restaurant&key=${key}`,
        );
        delete response.data.html_attributions;
        delete response.data.next_page_token;
        return res.status(200).send(response.data);
    } catch (error) {
        const resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
        };
        return res.status(500).send(resMessage);
    }
};

exports.twentyfourGame = async (req, res) => {
    try {
        const body = req.body;
        const { numbers } = body;
        const result = game24.find24(numbers);
        return res.status(200).send(result ? 'YES' : 'NO');
    } catch (error) {
        const resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
        };
        return res.status(500).send(resMessage);
    }
};

exports.login = async (req, res) => {
    const uid = req.body.uid.toString();
    console.log(uid);
    admin
        .auth()
        .getUser(uid)
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
            return res.status(200).send(userRecord.toJSON());
        })
        // eslint-disable-next-line node/handle-callback-err
        .catch((error) => {
            admin
                .auth()
                .getUser(uid)
                .then((userRecord) => {
                    // See the UserRecord reference doc for the contents of userRecord.
                    console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
                    return res.status(200).send(userRecord.toJSON());
                })
                // eslint-disable-next-line node/handle-callback-err
                .catch((error) => {
                    const resMessage = {
                        resultCode: status.UNAUTHORIZED.RESULT_CODE,
                        developerMessage: status.UNAUTHORIZED.DEVELOPER_MESSAGE,
                    };
                    return res.status(403).send(resMessage);
                });
        });
};

exports.renderLogin = async (req, res) => {
    res.render('login.html');
};

exports.xoGame = async (req, res) => {
    try {
        const body = req.body;
        const { xoArray } = body;
        const result = xoGame.caculateBotPlay(xoArray);

        return res.status(200).send(result);
    } catch (error) {
        const resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
        };
        return res.status(500).send(resMessage);
    }
};
