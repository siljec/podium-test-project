const Layout = require('@podium/layout');
const app = require('express')();

const layout = new Layout({
    name: 'homePage',
    pathname: '/home',
});

const headerClient = layout.client.register({
    name: 'header',
    uri: 'http://localhost:7001/manifest.json',
});
const navigationClient = layout.client.register({
    name: 'navigation',
    uri: 'http://localhost:7002/manifest.json',
});
const contentClient = layout.client.register({
    name: 'content',
    uri: 'http://localhost:7003/manifest.json',
});
const footerClient = layout.client.register({
    name: 'footer',
    uri: 'http://localhost:7004/manifest.json',
});

app.use(layout.pathname(), layout.middleware());

app.get(layout.pathname(), async (req, res) => {
    const incoming = res.locals.podium;

    const [header, navigation, content, footer] = await Promise.all([
        headerClient.fetch(incoming),
        navigationClient.fetch(incoming),
        contentClient.fetch(incoming),
        footerClient.fetch(incoming),
    ]);

    incoming.view.title = 'Podium example - home';

    res.podiumSend(`
      <section>${header}</section>
      <section>${navigation}</section>
      <section>${content}</section>
      <section>${footer}</section>
    `);
});

app.listen(6100);