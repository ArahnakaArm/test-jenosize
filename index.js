const port = typeof process.env.PORT === 'string' ? JSON.parse(process.env.PORT) : process.env.PORT;
const app = require('./src/app');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
app.use(cors());
// eslint-disable-next-line node/no-path-concat
app.set('views', __dirname + '/src/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

console.log(`===============================================`);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
