import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const LISTENING_PORT = 3000;
app.get('/echo/:message',
    (request, response) => {
        console.dir({
            url: request.url,
            params: request.params,
            query: request.query,
            method: request.method
        });
        response.set({
            'Content-Type': 'application/json',
        });
        response.send(JSON.stringify({message: request.params.message}));
    }
);

app.get('/names', (request, response) => {
    console.dir({
        url: request.url,
        params: request.params,
        query: request.query,
        method: request.method
    });
    response.set({'Content-Type': 'text/html', "X-foo": "bar"});
    response.cookie('foo0', 'bar0', {maxAge: 1000, httpOnly: true});
    response.cookie('foo1', 'bar1', {maxAge: 1000, httpOnly: true});
    response.cookie('foo2', 'bar2', {maxAge: 1000, httpOnly: true});
    response.cookie('foo3', 'bar3', {maxAge: 1000, httpOnly: true});
    response.cookie('foo4', 'bar4', {maxAge: 1000, httpOnly: true});

    response.sendFile(__dirname  + '/names.html');
});

app.get('/headers', (request, response) => {
    console.dir({
        url: request.url,
        params: request.params,
        query: request.query,
        method: request.method
    });
    response.set({'X-Foo': 'Bar'})
    response.set({'X-Bar': [
            'Foo1',
            'Foo2',
            'Foo3',
            'Foo4',
            'Foo5'
        ]})
    response.status(204);
    response.send('');
})

app.listen(LISTENING_PORT, () => console.log('Listening on port 3000'));
