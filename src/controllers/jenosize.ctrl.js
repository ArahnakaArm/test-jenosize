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
        const result = caculateBotPlay(xoArray);

        return res.status(200).send(result);
    } catch (error) {
        const resMessage = {
            resultCode: status.SYSTEM_ERROR.RESULT_CODE,
            developerMessage: status.SYSTEM_ERROR.DEVELOPER_MESSAGE,
        };
        return res.status(500).send(resMessage);
    }
};

function caculateBotPlay(xoArray) {
    const allPositionArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const positionArray = xoArray.map((item) => item.position);
    const availablePosition = allPositionArray.filter((x) => !positionArray.includes(x));

    const botPosition = availablePosition[Math.floor(Math.random() * availablePosition.length)];

    let gameStatus = findWinner(xoArray);

    const insertObj = {
        sign: 'O',
        position: botPosition,
    };

    if (gameStatus === 'Playing') xoArray = [...xoArray, insertObj];

    gameStatus = findWinner(xoArray);

    const result = {
        gameStatus: gameStatus,
        gameProcess: xoArray,
    };

    return result;
}

function findWinner(xoArray) {
    const xSignPositionArray = xoArray.filter((item) => item.sign === 'X').map((item) => item.position);
    const oSignPositionArray = xoArray.filter((item) => item.sign === 'O').map((item) => item.position);
    if (xSignPositionArray.length + oSignPositionArray.length === 9) return 'draw';

    const winConditionArray = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['3', '6', '9'],
        ['1', '5', '9'],
        ['3', '5', '7'],
    ];

    for (let i = 0; i < winConditionArray.length; i++) {
        const isEqualX = winConditionArray[i].every((val) => xSignPositionArray.includes(val));
        const isEqualO = winConditionArray[i].every((val) => oSignPositionArray.includes(val));
        if (isEqualX) {
            return 'Winner is X';
        }
        if (isEqualO) {
            return 'Winner is O';
        }
    }

    return 'Playing';
}
