const axios = require('axios');
const envService = typeof process.env.service === 'string' ? JSON.parse(process.env.service) : process.env.service;
const { placeUrl, key } = envService.googleApi;
const status = require('../utils/enum/status');
const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');

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

        /*  const result = solve24game(numbers, 24); */
        return res.status(200).send(numbers);
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
            console.log(error);
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
                    console.log(error);
                    return res.status(403).send('Unao');
                });
        });
};

exports.renderLogin = async (req, res) => {
    res.render('login.html');
};
