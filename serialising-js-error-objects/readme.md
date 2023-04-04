# Serialising Error objects in JavaScript

## The Problem

```javascript
const error = new Error('This is an error');

console.log(`message: ${error.message}`);
console.log(`name: ${error.name}`);
console.log(`stack: ${error.stack}`);

console.log(JSON.stringify(error));
```

Notice that the serialised form is just `{}`.  All the information has been lost.

## The Explanation

`JSON.stringify` uses `Object.keys()` to get the properties of the object.  This function requires properties to be enumerable, by default they are.

```javascript
const poco = {foo: 'bar'};
const error = new Error('BANG!');


console.table(Object.getOwnPropertyDescriptor(poco, 'foo'));
console.table(Object.getOwnPropertyDescriptor(error, 'message'));
```

Running this gives the following tables:

**POCO**

| (index)      | Values |
|--------------|--------|
| value        | 'bar'  |
| writable     | true   |
| enumerable   | true   |
| configurable | true   |

**Error**

| (index)      | Values             |
|--------------|--------------------|
| value        | 'This is an error' |
| writable     | true               |
| enumerable   | false              |
| configurable | true               |

Notice that the value for `enumerable` for the POCO is `true`, however for `error` it is `false`.  Because of this we cannot get a list of the keys using a `for..in` loop, using `Object.keys()` or serialise it using `JSON.stringify()`.

```javascript
const error = new Error('Bang!');

console.log (Object.keys(error).length);
```

This prints `0`.

## Some Solutions.

### Manual

If we know the scheme we need to serialise, and so know properties are `Error` objects then we can explicitly replace these with a POCO.

```javascript
const obj = {
    foo: 'bar',
    error: new Error('Bang!')
};

// Replace the `error` with a POCO
const error = obj.error;
obj.error = { message:  error.message, stack: error.stack, name: error.name, cause: error.cause };

console.log(JSON.stringify(obj));
```

This will output:

```JSON
{
  "foo": "bar",
  "error": {
    "message": "Bang!",
    "stack": "Error: Bang!\n    at Object.<anonymous> ...",
    "name": "Error"
  }
}
```

### Monkey-patch Error

Monkey-patching is generally frowned upon.  If you can defend it though then the following _might_ give a possible solution:

```javascript
const error = new Error('Bang!');

Error.prototype.toJSON = function toJSON() {
    return '{"message":"' + this.message + '","name":"' + this.name + '","stack":"' + this.stack + '","message":"' + this.message + '"}';
}
const obj = { foo: 'bar', error: error};
console.log(JSON.stringify(obj));
```

> NB:  This will cause `JSON.stringify` to simply dump ret result of `toJSON` into the correct place in the hierarchy.  It will not do any further processing, for example, if you are formatting the output then this will not be formatted.

### Replacer

There are three arguments that we can supply to `JSON.stringify`, these are:

1. `data`
2. `replacer`
3. `space`

The `data` is the object we want to serialise.  `space` forced the output to be formatted over multiple lines, with the number of spaces used as an indent set to the supplied value.  The less known is `replacer`, this is a function that accepts a `key` and a `value` and allows you to control how individual properties are handled.  We can use this to test is the value is of type `Error` and, if so, convert it to a POCO.

```javascript
const error = new Error('Bang!');

function replacer(key, value) {
    if (value?.constructor.name === 'Error') {
        return {
            name: value.name,
            message: value.message,
            stack: value.stack,
            cause: value.cause,
        };
    }
    return value;
}
const obj = { foo: 'bar', error:error };
console.log(JSON.stringify(obj, replacer, 2));
```

This outputs:

```JSON
{
  "foo": "bar",
  "error": {
    "name": "Error",
    "message": "Bang!",
    "stack": "Error: Bang!\n    at Object.<anonymous> (C:\\Dev\\learning\\Study-Notes\\serialising-error\\the-problem.js:66:16)\n    at Module._compile (node:internal/modules/cjs/loader:1159:14)\n    at Module._extensions..js (node:internal/modules/cjs/loader:1213:10)\n    at Module.load (node:internal/modules/cjs/loader:1037:32)\n    at Module._load (node:internal/modules/cjs/loader:878:12)\n    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:82:12)\n    at node:internal/main/run_main_module:23:47"
  }
}
```

## Conclusion

To me, the obvious solution is the last one, supplying a `replacer` function.  It doesn't pollute global objects via monkey-patching, it supports both single line and multiline formatting.
