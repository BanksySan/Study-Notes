/**
 * @param requestParams { Object }
 * @param response { IncomingMessage}
 * @param context { Object }
 * @param ee { EventEmitter }
 * @param next { Function }
 */
module.exports.printBody = function printBody(requestParams,
                                              response,
                                              context,
                                              ee,
                                              next) {
    const { body, headers, url } = response;
    console.log('Response', { body, headers, url });
    return next();
}

module.exports.printRequest = function printRequest(requestParams, context, ee, next) {
 return next();
}
