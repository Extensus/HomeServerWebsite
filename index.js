const express = require('express');
const multer = require('multer');
const app = express();
app.disable("x-powered-by");
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
const upload = multer({ storage }); // or simply { dest: 'uploads/' }
const uploadNote = multer({ storageNotes }); // or simply { dest: 'uploads/' }
const port = 3000;
const site = `http://localhost:${port}`

app.use(express.static('HTML'))
app.use(express.static('notes'))
app.use('/css', express.static(`${__dirname}/HTML/css`))
app.use('/images', express.static(`${__dirname}/HTML/images`))
app.use('/js', express.static(`${__dirname}/HTML/js`))
app.use('/pages', express.static(`${__dirname}/HTML/pages`))
app.use('/uploads', express.static(`${__dirname}/HTML/uploads`))

app.set('views', './HTML/pages')
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    await res.render(`text`)
});

app.get('/dashboard', async (req, res) => {
    await res.render(`dashboard`)
});

app.get('/filedrop', async (req, res) => {
    await res.render(`filedrop`)
});

app.get('/notepad', async (req, res) => {
    await res.render(`notepad`)
});

app.get('/api', async (req, res) => {
    try {
    const text = {
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
    return await res.json({ text });
    }
    catch(err) {

    } finally {
        
    }
});

app.post('/file/drop', upload.array('uploadDoc'), async (req, res) => {
    try {
    await res.redirect('/filedrop');
    } 
    catch(err) {

    } finally {

    }
});

app.post('/filedrop', upload.array('uploadDoc'), async (req, res) => {
    try {
    await res.json({ status: 'OK', uploaded: req.files.length });
    }
    catch(err) {
    
    } finally {

    }
});

app.post('/notes', upload.array('uploadNote'), async (req, res) => {
    try {
    await res.redirect('/notepad')
    }
    catch(err) {

    } finally {

    }
});

app.post('/notepad', upload.array('uploadNote'), async (req, res) => {
    try {
    await res.json({ status: document.status, uploaded: req.files.length });
    }
    catch(err) {

    } finally {
        
    }
});

app.listen(port, () => console.info(`App available on ${site}`))