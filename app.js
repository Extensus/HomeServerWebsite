const express = require('express');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid').v4;
const app = express();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        // or 
        // uuid, or fieldname
        cb(null, originalname);
    }
})
const upload = multer({ storage }); // or simply { dest: 'uploads/' }
const port = 3000;
const site = `http://localhost:${port}`

app.use(express.static('HTML'))
app.use('/css', express.static(`${__dirname}/HTML/css`))
app.use('/images', express.static(`${__dirname}/HTML/images`))
app.use('/js', express.static(`${__dirname}/HTML/js`))
app.use('/pages', express.static(`${__dirname}/HTML/pages`))
app.use('/uploads', express.static(`${__dirname}/HTML/uploads`))

app.set('views', './HTML/pages')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render(`text`)
});

app.get('/dashboard', (req, res) => {
    res.render(`dashboard`)
});

app.get('/filedrop', (req, res) => {
    res.render(`filedrop`)
});

app.get('/notepad', (req, res) => {
    res.render(`notepad`)
});

app.get('/api', (req, res) => {
    text = {
        Title: 'Api Response',
        site: 'http://localhost',
        port: `${port}`,
        fullSite: `${site}`,
        query: req.query,
        params: req.params,
        headers: req.rawHeaders,
        parsedOriginalUrl: req._parsedOriginalUrl,
        parsedQuery: req._parsedOriginalUrl["query"]
    };
    return res.json(text);
});

app.post('/uploads', upload.array('uploadDoc'), (req, res) => {
    res.redirect('/filedrop');
    //res.json({ status: 'OK', uploaded: req.files.length, files: req.files});
});

app.listen(port, () => console.info(`App available on ${site}`))