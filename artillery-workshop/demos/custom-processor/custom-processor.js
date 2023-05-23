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
