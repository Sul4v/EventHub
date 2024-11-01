import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { User, Event, JoinRecord } from './db.mjs';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.resolve(__dirname, "public")

app.set('view engine', 'hbs');
app.use(express.static(publicPath))
app.use(express.urlencoded({ extended: false })) // body parsing middleware

// editor page
app.get('/', (request, response) => {
  response.render('index')
})

app.listen(process.env.PORT || 3000);
