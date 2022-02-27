const port = typeof process.env.PORT === 'string' ? JSON.parse(process.env.PORT) : process.env.PORT;
const app = require('./src/app');
const cors = require('cors');
app.use(cors());
// eslint-disable-next-line node/no-path-concat
app.set('views', __dirname + '/src/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

console.log(`===============================================`);
console.log(`Server Start PORT : ${port}`);
app.listen(process.env.PORT);
