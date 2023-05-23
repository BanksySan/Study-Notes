# Artillery IO Workshop

[Official Documentation](https://www.artillery.io/docs)

## Key Terms

| Term         | Description                                                                                                                                                                 |
|--------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Script       | The YAML file that defines the entire test, including setup and teardown                                                                                                    |
| Virtual User | VU A single instance of an execution of the flow.  Will have its own state and will keep track of, and resend, cookie data.                                                 |
| Phase        | A defined period of VU generation.  VUs may be created at a constant rate or may have a linearly increasing/decreasing rate.                                                |
| Payload      | An imported set of variables from a CSV file which can be referenced later in the script                                                                                    |
| Processor    | A single JavaScript file which contains custom functions &/ `beforeRequest`/`afterResponse` event handlers that can be explicitly invoked.                                  |
| Plug-in      | An npm package.  A plugin has much more functionality than a processor, including total access to the read and modify the test script.                                      |
| Capture      | A mechanism for pulling data from response HTTP headers / bodies.  Only supports a limited number of search options                                                         |
| Variables    | Tokens with variable values.  Can be created in a number of ways and are referenced with double handlebars `"{{ foobar }}`                                                  |
| Environments | Define sets of target URLs, variables and other configuration items.  The environment can be selected with the `--environment` / `-e` arguments when the tests are invoked. |
| Scenario     | A set of actions for a VU to follow.  A VU will execute exactly one scenario, the probability of which scenario to select is controlled by declaring a weight for it.       |

## Things I Don't Know

| Subject | Notes                              |
|---------|------------------------------------|
| Flows   | Why would I use multiple flows?    |
| Flows   | Is VU state carried between flows? |

## Code Examples

### Getting Started

Very basic, introduce the structure and how to execute.

1. Install Artillery CLI
   ```
   npm install -g artillery@latest
   ```
2. Create a YAML file `hello-world.yaml` and fill with:
   ```yaml
   config:
      target: "http://127.0.0.1:3000"
      phases:
      - duration: 1    # Number of seconds to run
        arrivalRate: 10 # Number of users per second
   scenarios:
   - flow:
      - get:
          url: "/echo/hello-world-1"
   - flow:
      - get:
          url: "/echo/hello-world-2"
   ```
3. Create `package.json`
   ```json
   {
      "name": "hello-world",
      "version": "1.0.0",
      "dependencies": {
        "artillery": "^2.0.0-32"
      }
   }
   ```
4. Run `yarn` or `npm`.
5. Run Artillery
   ```angular2html
   artillery run 
   ```

Assuming you have the demo server running on `3000` you should see an output like this:

```none
> hello-world@1.0.0 run
> artillery run hello-world.yaml

Test run id: tntab_7978df7ja5rfx37xgz564dk75mntr_cmfg
Phase started: unnamed (index: 0, duration: 1s) 14:36:45(+0100)

Phase completed: unnamed (index: 0, duration: 1s) 14:36:46(+0100)

--------------------------------------
Metrics for period to: 14:36:50(+0100) (width: 0.591s)
--------------------------------------

http.codes.200: ................................................................ 10
http.request_rate: ............................................................. 10/sec
http.requests: ................................................................. 10
http.response_time:
  min: ......................................................................... 2
  max: ......................................................................... 23
  median: ...................................................................... 3
  p95: ......................................................................... 4
  p99: ......................................................................... 4
http.responses: ................................................................ 10
vusers.completed: .............................................................. 10
vusers.created: ................................................................ 10
vusers.created_by_name.0: ...................................................... 4
vusers.created_by_name.1: ...................................................... 6
vusers.failed: ................................................................. 0
vusers.session_length:
  min: ......................................................................... 24.1
  max: ......................................................................... 58
  median: ...................................................................... 30.3
  p95: ......................................................................... 37.7
  p99: ......................................................................... 37.7


All VUs finished. Total time: 2 seconds

--------------------------------
Summary report @ 14:36:49(+0100)
--------------------------------
```

### Debug output

We can get extended output for debugging by setting a `DEBUG` environment variable.  Whilst this _could_ be set system-wide it's certainly better to restrict its scope to the process.

Setting `DEBUG=http` gives us:

```none
2023-05-17T13:49:09.950Z http request: {
  "url": "http://localhost:3000/echo/hello-world-2",
  "method": "GET",
  "headers": {
    "user-agent": "Artillery (https://artillery.io)"
  }
}
- 2023-05-17T13:49:10.051Z http request: {
  "url": "http://localhost:3000/echo/hello-world-1",
  "method": "GET",
  "headers": {
    "user-agent": "Artillery (https://artillery.io)"
  }
}
2023-05-17T13:49:10.077Z http request: {
  "url": 
…
```


Setting `DEBUG=http:request` will give us the following extra information:

```none
2023-05-17T14:01:04.170Z http:request request start: /echo/hello-world-2
2023-05-17T14:01:04.244Z http:request request start: /echo/hello-world-1
\ 2023-05-17T14:01:04.299Z http:request request start: /echo/hello-world-1
2023-05-17T14:01:04.358Z http:request request start: /echo/hello-world-2
| 2023-05-17T14:01:04.420Z http:request request start: /echo/hello-world-1
2023-05-17T14:01:04.484Z http:request request start: /echo/hello-world-2
/ 2023-05-17T14:01:04.547Z http:request request start: /echo/hello-world-1
2023-05-17T14:01:04.613Z http:request request start: /echo/hello-world-1
…
```

`http:request,http:response`

Setting `DEBUG=http:response` gives us different debugging:

```none
2023-05-17T13:59:11.792Z http:response {
  "x-powered-by": "Express",
  "content-type": "application/json; charset=utf-8",
  "content-length": "27",
  "etag": "W/\"1b-Nn38ADQmhmUaPrWTMGQVkmESUw8\"",
  "date": "Wed, 17 May 2023 13:59:11 GMT",
  "connection": "keep-alive",
  "keep-alive": "timeout=5"
}
2023-05-17T13:59:11.792Z http:response "{\"message\":\"hello-world-1\"}"
2023-05-17T13:59:11.856Z http:response {
  "x-powered-by": "Express",
  "content-type": "application/json; charset=utf-8",
  "content-length": "27",
  "etag": "W/\"1b-JPLNvogWaYfPDb9VegeDJyIditQ\"",
  "date": "Wed, 17 May 2023 13:59:11 GMT",
  "connection": "keep-alive",
  "keep-alive": "timeout=5"
}
2023-05-17T13:59:11.857Z http:response "{\"message\":\"hello-world-2\"}"
\ 2023-05-17T13:59:11.914Z http:response {
  "x-powered-by": "Express",
  "content-type": "application/json; charset=utf-8",
  "content-length": "27",
  "etag": "W/\"1b-JPLNvogWaYfPDb9VegeDJyIditQ\"",
  "date": "Wed, 17 May 2023 13:59:11 GMT",
  "connection": 
…
 ```

We can also just request everything with `DEBUG=http*`:

## Variables

Variables can be declared in the `config` section via several methods; they can be supplied by the commandline in the `--variables` option and can also be created at runtime via scripts, plugins and `capture` instructions.

Consider this script.  

```yaml
config:
  target: http://localhost:3000
  phases:
    - duration: 1
      arrivalRate: 10
  variables:
    staticMessage: "Static message"
    variableMessage:
      - "Message A"
      - "Message B"
      - "Message C"
  payload:
    path: 'messages.csv'
    fields:
      - "Firstname"
      - "Surname"
    skipHeader: true
    order: sequence
scenarios:
  - flow:
      - get:
          url: "/echo/{{ staticMessage }}"
      - get:
          url: "/echo/{{ variableMessage }}"
      - get:
          url: "/echo/{{ Firstname }}"
      - get:
          url: "/echo/{{ Surname }}"
```

Firstly we have the `variables` section.  This allows us to hard code both constants and sets of variables.

> NB:  The use of a constant variable will become apparent when we look at the `environment` section.

We create two variables in this block, `staticMessage` and a set of messages.  We reference these using `{{ … }}` to interpolate them into strings.  The static message will always be the same, but a random value from the `variableMessages` set will be chosen.

We also have a CSV file available:

```csv
Firstname, Surname
Alice, Gumdrops
Bob, Sugarpie
Charlie, Horse
```

The `payload` block declares these and assigns variable names to them.  We've set the `order` to `sequence`, but it can be `random`.  They are referenced in the script in the same way as other variables.

## Environments

Environments let us set many values as needed by individual execution contexts.  We declare environments in the `environments` block.

```yaml
config:
  environments:
    environmentA:
      target: "http://localhost:3000/echo/environmentA"
      variables:
        foo: "bar-a"
    environmentB:
      target: "http://localhost:3000/echo/environmentB"
      variables:
        foo: "bar-b"
  variables:
    bar:
       - "foo-1"
       - "foo-2"
       - "foo-3"
       - "foo-4"
       - "foo-5"
  phases:
    - duration: 1    # Number of seconds to run
      arrivalRate: 10 # Number of users per second
scenarios:
  - flow:
      - get:
          url: "/?foo={{ foo }}"
```
With environments, we can change the `target` URL.  The only other way to achieve this would be with a plug-in altering the script.  Also, note that we can still have common sets of variables outside the `environments` block.

**NB:**  If properties by the same name are declared both inside and outside an environment block, the environment block's variables will win.

## Custom Processor

We have several events we can hook into to trigger custom functions, as well the ability to call an arbitrary function.  These functions are defines in a separate JavaScript file which is referenced by the `processor` element in the `config` section.

```yaml
config:
  target: "http://localhost:3000"
  phases:
    - duration: 1    # Number of seconds to run
      arrivalRate: 1 # Number of users per second
  processor: "custom-processor.js"
scenarios:
  - flow:
      - get:
          url: "/echo/hello-world-1"
          beforeRequest: appendMessage
          afterResponse: captureContentType
      - function: sayMyName
      - log: "Content Type: {{ contentType }}"
```

We've declared the `custom-processor.js` file as our processor.  We've added three invocations:

1. `beforeRequest`
2. `afterResponse`
3. Arbitrary invocation.

The JavaScript file looks like this:

```javascript
/**
 * A demo of a <code>beforeRequest</code> function.  Will append a string to the URL prior to sending to the server.
 *
 * @param requestParams { Object }
 * @param context { Object }
 * @param ee { EventEmitter }
 * @param next { Function }
 */
module.exports.appendMessage = function appendMessage(requestParams, context, ee, next) {
   requestParams.url += '-ps-I-love-you';
   return next();
}

/**
 * A demo of the <code>afterRequest</code> function.  Will extract the <code>content-type</code> header value and store it in the <code>contentType</code> variable.
 * @param requestParams { Object }
 * @param response { IncomingMessage }
 * @param context { Object }
 * @param ee { EventEmitter }
 * @param next { Function }
 * @returns {*}
 */
module.exports.captureContentType = function printContentType(requestParams, response, context, ee, next) {
   context.vars.contentType = response.headers['content-type'];
   return next();
}

/**
 * An arbitrary function that can be called from the script.  Tells you their name.
 *
 * @param context { Object }
 * @param events { EventEmitter }
 * @param next { Function }
 * @returns {*}
 */
module.exports.sayMyName = function sayMyName(context, events, next) {
   console.log('Heisenberg');
   return next();
}
```

Please make note of the different signatures between the `beforeRequest`, `afterResponse` and the arbitrary functions.

**NB:** It might be worth us having an agreed naming convention for the two types of function.

As well as the events demoed here, there are `beforeScenario` and maybe `afterScenario` (dependent on the version of Artillery you're using).  These have the same function signature as the arbitrary function.

## Capture

We often need to extract information from responses so that we can reuse them in future requests.  Artillery has some functionality for doing this built in, but sometimes we need to break into a processor or plug-in.

Captures are performed in a request block in the `flow` section.  They only search the response, not the request.  By default if a capture fails than the VU will be marked as failed, we can change this by adding the `strict: false` statement to the capture block.

> **IMPORTANT** There is a serious [bug](https://github.com/artilleryio/artillery-xml-capture/issues/1) in the `artillery-xml-capture` npm package that XPath capture relies upon.  For this reason, don't use xpath, use Cheerio instead.

> **IMPORTANT** There is a bug in the `regexp` implementation rendering it largely useless.  Currently, the functionality to use groups if broken.  [PR](https://github.com/artilleryio/artillery/pull/1922) submitted to fix so hopefully this is a temporary bug.

> **IMPORTANT** The selector option uses jQuery-ish syntax via Cheerio.  Whilst this can pull out attributes on nodes, and nodes themselves it cannot pull out the text values of a node.  e.g. `<p class="special">Foo</p>` cannot pull `Foo`, only `<p class="special">`.

This leaves us with two of the built-in options left to play with:

1. `headers`
2. `json`

### JSON

```yaml
- get:
    url: "/echo/foo"
    capture:
      - json: "$.message"
        as: message
- log: "Message: {{ message }}"
```

If the call returns:

```json
{"message":"foo"}
```

Then we will log 
```none
Message: foo
```

### Headers

The headers section is the only option that scans the headers, rather than the body.  Its implementation is simple, pass the header key and the value of the headers is returned.

**NB** The header name must be lowercase.

```yaml
- get:
    url: "/headers"
    capture:
      - header: x-foo
        as: xFoo
        strict: false
```

#### Duplicate Header Keys

HTTP allows a header key to be reused.  These are usually parsed as an array of values.  Artillery doesn't support this and seems to just concatenate all the values with a `,` as a delimiter.  This is pretty unrelisable as any header with a `,` would be interpreted as two values.

`Set-Cookie` is a prime example of this.  It's reasonable that we'll want to extract a CSRF token.

We can address all these problems using a custom processor/plug-in instead of the `capture`.

## Plug-ins

[Documentation](https://www.artillery.io/docs/guides/guides/extension-apis#plugins)

These are very powerful and are distributed via npm packages.  A plugin has unfettered access to the entire script (i.e. as defined in the YAML file) for modification.  It can also subscribe to various events in order to catch and emit bespoke metrics. 

The structure of a plugin.

1. It must be a valid npm package.
2. Must have a name starting with `artillery-plugin`.
3. The main file (as defined in `package.json`) must export a `Plugin` function with of the form  `function ArtilleryPluginDemo (script, events)` via the commonJS mechanism (i.e. `module.exports.Plugin = function someFunction(script, events)`).

This means that the bare bones, no-op plugin would look like this:

```javascript
module.exports.Plugin = ArtilleryPluginDemo;

/**
 * A plugin to demonstrate some of the functionality of a plugin.
 * @param script { Object }
 * @param events { EventEmitter }
 * @constructor
 */
function ArtilleryPluginDemo (script, events) {
}

/**
 * OPTIONAL.  Will be called immediately prior to the plugin being unloaded.
 * @param done { Function } This must be called at the end of the function.
 */
ArtilleryPluginDemo.prototype.cleanup = function clean(done) {

   return done();
}
```

The `script` contains the same info as the YAML script.  The `events` object is used to subscript to events.

Adding a plugin to the script involves adding it to the package in the `package.json` and then referencing it in the `plugins` block in the `config` section, arguments are passed as an object:

**NB** Don't include the `artillery-plugin-` prefix to the package name.  e.g. `artillery-plugin-foobar` becomes `foobar`.

```yaml
  plugins:
    demo: {
            message1: "Message 1",
            message2: "Message 2",
    }
```

We access the arguments via the `script` object in the plugin:

```javascript
const arguments = script.config.plugins["plugin-name"];
```

