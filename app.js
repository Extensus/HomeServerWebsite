const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('HTML'))
app.use('/css', express.static(`${__dirname}/HTML/css`))
app.use('/form', express.static(`${__dirname}/HTML/form`))
app.use('/submit', express.static(`${__dirname}/HTML/form/submit`))
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
        port: `${port}`,
    }
    resContent = JSON.stringify(text)
    res.send(text)
});

app.listen(port, () => console.info(`App available on http://localhost:${port}`))