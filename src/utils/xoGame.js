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

module.exports = { caculateBotPlay };
