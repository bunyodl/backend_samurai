const http = require("http");
const path = require("path");
const fs = require("fs");
const url = require("url");

let requestCount = 0;

// Location of my favicon in the filesystem.
const FAVICON = path.join(__dirname, "public", "favicon.ico");

const server = http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (req.method === "GET" && pathname === "/favicon.ico") {
        // MIME type of the favicon.
        //
        // .ico = 'image/x-icon' or 'image/vnd.microsoft.icon'
        // .png = 'image/png'
        // .jpg = 'image/jpeg'
        // .jpeg = 'image/jpeg'
        res.setHeader("Content-Type", "image/x-icon");

        // Serve your favicon and finish response.
        //
        // You don't need to call `.end()` yourself because
        // `pipe` will do it automatically.
        fs.createReadStream(FAVICON).pipe(res);
        return;
    }

    switch (req.url) {
        case "/me": {
            res.write("Me");
            res.end();
            break;
        }
        case "/about": {
            res.write("About");
            res.end();
            break;
        }
        case "/": {
            const start = new Date();
            while (new Date() - start < 2000) {
                console.log(new Date() - start);
            }
            setTimeout(() => {
                res.write("Main page");
                res.end();
            }, 2000);
            break;
        }
        default:
            res.write("404 not found");
            res.end();
    }

    // Fix the counter from being updated twice
    if (!req.url.startsWith("/favicon")) {
        requestCount++;
    }

    // res.write(" Node js server " + requestCount);
});

server.listen(3003);
