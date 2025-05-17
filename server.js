const http = require("http");
const path = require("path");
const fs = require("fs");
const url = require("url");

const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));

const readFile = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + path, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

let requestCount = 0;

// Location of my favicon in the filesystem.
const FAVICON = path.join(__dirname, "public", "favicon.ico");

const server = http.createServer(async (req, res) => {
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
            try {
                const data = await readFile("/pages/me.html");
                res.write(data);
                res.end();
            } catch (error) {
                res.write("some error occured during me-page request");
                res.end();
            }
            break;
        }
        case "/about": {
            try {
                const data = await readFile("/pages/about.html");
                res.write(data);
                res.end();
            } catch (error) {
                res.write("some error occured during about-page request");
                res.end();
            }
            break;
        }
        case "/": {
            await delay(3000);
            res.write("Main page");
            res.end();
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
