const Podlet = require('@podium/podlet');
const app = require('express')();

const podlet = new Podlet({
    name: 'navigation', // required
    version: '1.0.0', // required
    pathname: '/', // required
    manifest: '/manifest.json', // optional, defaults to '/manifest.json'
    content: '/', // optional, defaults to '/'
    development: true, // optional, defaults to false
});

app.use(podlet.middleware());

app.get('/manifest.json', (req, res) => {
    res.json(podlet);
});

app.get('/', (req, res) => {
    res.podiumSend(`
    <div>
        <p> Podlet B: </p>
        <nav>
            <ul>
                <li><a href="/home">home</a></li>
                <li><a href="/blog">blog</a></li>
                <li><a href="/about">about</a></li>
                <li><a href="/contact">contact</a></li>
            </ul>
    </nav>
    </div>`);
});

app.listen(7002);