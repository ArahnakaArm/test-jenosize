const mongoose = require('mongoose');
const envService = typeof process.env.service === 'string' ? JSON.parse(process.env.service) : process.env.service;
// eslint-disable-next-line camelcase
const { ip, path, user, pass } = envService.db.default;
// eslint-disable-next-line camelcase

mongoose
    .connect(`mongodb+srv://${user}:${pass}@${ip}/${path}?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Connect to database successful');
    })
    .catch((error) => {
        console.log('Cant connect to database');
        console.error(error);
    });
