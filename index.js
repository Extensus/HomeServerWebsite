const express = require('express');
const multer = require('multer');
const app = express();
app.disable("x-powered-by");
const storageFiles = multer.diskStorage({
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
const storageNotes = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'notes')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        // or 
        // uuid, or fieldname
        cb(null, originalname);
    }
})
const uploadFiles = multer({ storageFiles }); // or simply { dest: 'uploads/' }
const uploadNotes = multer({ storageNotes }); // or simply { dest: 'notes/' }
const port = 3000;
const site = `http://localhost:${port}`

app.use(express.static('HTML'))
app.use('/css', express.static(`${__dirname}/HTML/css`))
app.use('/images', express.static(`${__dirname}/HTML/images`))
app.use('/js', express.static(`${__dirname}/HTML/js`))
app.use('/pages', express.static(`${__dirname}/HTML/pages`))

app.set('views', './HTML/pages')
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    res.render(`text`)
});

app.get('/dashboard', async (req, res) => {
    res.render(`dashboard`)
});

app.get('/filedrop', async (req, res) => {
    res.render(`filedrop`)
});

app.get('/notepad', async (req, res) => {
    res.render(`notepad`)
});

app.get('/api', async (req, res) => {
    text = {
        Title: 'Api Response',
        site: 'http://localhost',
        port: `${port}`,
        fullSite: `${site}`,
        query: req.query,
        headers: req.rawHeaders,
        parsedOriginalUrl: req._parsedOriginalUrl,
    };
    return res.json({ text });
});

app.post('/filedrop', uploadFiles.array('uploadDoc'), async (req, res) => {
    //res.redirect('/filedrop');
    res.json({ status: 'OK', uploaded: req.files.length, files: req.files});
});

app.post('/notepad', uploadNotes.array('uploadNotes'), async (req, res) => {
    res.json({ status: 'OK', uploaded: req.files.length, files: req.files});
});

app.listen(port, () => console.info(`App available on ${site}`))