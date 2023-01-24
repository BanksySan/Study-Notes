# HTTP  Cookies & Local Storage

## HTTP

Text-based protocol consisting of a request and a response.

### Request

The request consists of:
1. Method (`GET`, `PUT`, `POST`, etc.)
2. URL
3. HTTP version identifier
4. List of headers in the form `name: value`.

```http request
GET http://www.example.com/ HTTP/1.1
User-Agent: Fiddler
Host: www.example.com
```
### Response
The response consists of:
1. HTTP version
2. Status Code (`200`, `404`, `503`, etc.)
3. Status Message
4. List of headers in the form `name: value`.
5. Optionally, the payload (HTML, git, plain text, JSON, MP3, etc.)

```http request
HTTP/1.1 200 OK
Accept-Ranges: bytes
Age: 552046
Cache-Control: max-age=604800
Content-Type: text/html; charset=UTF-8
Date: Fri, 20 Jan 2023 21:07:50 GMT
Etag: "3147526947+ident"
Expires: Fri, 27 Jan 2023 21:07:50 GMT
Last-Modified: Thu, 17 Oct 2019 07:18:26 GMT
Server: ECS (nyb/1D0C)
Vary: Accept-Encoding
X-Cache: HIT
Content-Length: 1256

<!doctype html>
<html>
<head>
    <title>Example Domain</title>

    <meta charset="utf-8" />
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
    body {
        background-color: #f0f0f2;
        margin: 0;
        padding: 0;
        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        
    }
    div {
        width: 600px;
        margin: 5em auto;
        padding: 2em;
        background-color: #fdfdff;
        border-radius: 0.5em;
        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);
    }
    a:link, a:visited {
        color: #38488f;
        text-decoration: none;
    }
    @media (max-width: 700px) {
        div {
            margin: 0 auto;
            width: auto;
        }
    }
    </style>    
</head>

<body>
<div>
    <h1>Example Domain</h1>
    <p>This domain is for use in illustrative examples in documents. You may use this
    domain in literature without prior coordination or asking for permission.</p>
    <p><a href="https://www.iana.org/domains/example">More information...</a></p>
</div>
</body>
</html>


```

### Cookies

A problem with HTTP is that there was not way to persist information from one request to the next.  Cookies are a way to allow state to persist over multiple HTTP requests.  

Cookies are really just a header that the gives some special treatment to.  The value of the cookie's header is itself a series of key-value pairs plus some metadata.

Virgin call to `https://just-eat.co.uk`.  Notice that there is no `Cookie` header.

```http request
GET https://www.just-eat.co.uk/ HTTP/2.0
accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
accept-encoding: gzip, deflate, br
accept-language: en-US,en;q=0.9
cache-control: no-cache
pragma: no-cache
sec-ch-ua: "Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
sec-fetch-dest: document
sec-fetch-mode: navigate
sec-fetch-site: none
sec-fetch-user: ?1
upgrade-insecure-requests: 1
user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.55
Host: www.just-eat.co.uk
```

This is the response, notice the series of `set-cookie` headers.  

```http response
HTTP/2.0 200 OK
cf-cache-status: DYNAMIC
cf-ray: 78d25f210979dd4c-LHR
content-type: text/html; charset=utf-8
date: Sat, 21 Jan 2023 19:14:13 GMT
ratelimit-limit: 10
ratelimit-remaining: 9
ratelimit-reset: 1
server: cloudflare
set-cookie: je-full-address-search-enabled=true; expires=Fri, 27 Jan 2023 19:14:13 GMT; path=/
set-cookie: x-je-conversation=1ecbff8a-2f04-49d3-9f91-a67014afd0e9; expires=Sat, 21 Jan 2073 19:14:13 GMT; path=/
set-cookie: je-auser=81188ff2-9210-4faf-b49c-750d8e28dd72; expires=Tue, 04-Feb-2070 23:59:59 GMT; path=/; SameSite=None; Secure
set-cookie: __cf_bm=585KM4IfaZVCK9LGt3kCToTupvpTSXwcIdQd2mPBL9g-1674328453-0-ASlxwvq0BjQLHj58mu4BEjn0fXsvUjTKh3/NJ0a4gCeE0era1vO7nguC3MOhFvNAF3tHt+kyNhKAI5q9ThY9pNU=; path=/; expires=Sat, 21-Jan-23 19:44:13 GMT; domain=.just-eat.co.uk; HttpOnly; Secure; SameSite=None
strict-transport-security: max-age=0
vary: Accept-Encoding
x-frame-options: SAMEORIGIN
x-je-conversation: dd4dfc45-658d-4ba9-9d58-21a9c30af5f4
x-ratelimit-limit-second: 10
x-ratelimit-remaining-second: 9
x-server-name: smartgateway_server_1
Content-Length: 140766
```

These are the the server requesting that the browser save these values and, whenever there's another call to `https://just-eat.co.uk` it should include these values in the request's `cookie` header.

![Edge's F12 Cookie Display](C:\Dev\learning\Study-Notes\http-cookies-and-local-storage\edge-f12-new-cookies.png)

When we look at the next call to the Just Eat domain, this time `https://www.just-eat.co.uk/api/account/details`.

```http request
GET https://www.just-eat.co.uk/api/account/details HTTP/2.0
accept: application/json, text/plain, */*
accept-encoding: gzip, deflate, br
accept-language: en-US,en;q=0.9
cache-control: no-cache
cookie: je-full-address-search-enabled=true; x-je-conversation=1ecbff8a-2f04-49d3-9f91-a67014afd0e9; je-auser=81188ff2-9210-4faf-b49c-750d8e28dd72; __cf_bm=585KM4IfaZVCK9LGt3kCToTupvpTSXwcIdQd2mPBL9g-1674328453-0-ASlxwvq0BjQLHj58mu4BEjn0fXsvUjTKh3/NJ0a4gCeE0era1vO7nguC3MOhFvNAF3tHt+kyNhKAI5q9ThY9pNU=
credentials: same-origin
pragma: no-cache
referer: https://www.just-eat.co.uk/
sec-ch-ua: "Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
sec-fetch-dest: empty
sec-fetch-mode: cors
sec-fetch-site: same-origin
user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.55
Host: www.just-eat.co.uk
```

We can see the `cookie` header and it's value.  If we split the value by the `;` symbol then we can see the individual cookies.  The keys and values are split with the `=` symbol.

| Key                              | Value                                                        |
| -------------------------------- | ------------------------------------------------------------ |
| `je-full-address-search-enabled` | `true`                                                       |
| `x-je-conversation`              | `1ecbff8a-2f04-49d3-9f91-a67014afd0e9`                       |
| `je-auser`                       | `81188ff2-9210-4faf-b49c-750d8e28dd72`                       |
| `je-auser`                       | `585KM4IfaZVCK9LGt3kCToTupvpTSXwcIdQd2mPBL9g-1674328453-0-ASlxwvq0BjQLHj58mu4BEjn0fXsvUjTKh3/NJ0a4gCeE0era1vO7nguC3MOhFvNAF3tHt+kyNhKAI5q9ThY9pNU=` |

We can also set cookies from the client side, using JavaScript.  There used to be security concerns because malicious code could edit cookies, which was addressed by the introduction of a HTTP only property which effectively prevented JavaScript from reading or changing a cookie marked HTTP meaning that it was purely for persisting a value provided by the server between HTTP requests and responses.

## Local Storage

Local browser storage is a function provided by the browser and has nothing to do with HTTP.  It gets around some problems that cookies have and had with security, expiration, and size limits.  They also allow more complicated storage, if needed, including a relational database supporting SQL.

The downside of local storage compared to cookies is mainly that cookies are a very well established and defined (in [HTTP State Management Mechanism](https://datatracker.ietf.org/doc/html/rfc6265)) whereas browser local storage is a relatively new technology and has differing support over browsers and versions.

Local storage is accessed via scripts in the web page (probably JavaScript, but other web languages are emerging).  
