const Podlet = require('@podium/podlet');
const app = require('express')();

const podlet = new Podlet({
    name: 'footer', // required
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
    res.podiumSend(`<footer> Podlet D: &copy; 2018 - the Podium team</footer>`);
});

app.listen(7004);