const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
    let filePath;
    let contentType;

    // Determine the file path and content type based on the request URL
    if (req.url === "/") {
        filePath = path.join(__dirname, "index.html");
        contentType = "text/html";
    } else if (req.url === "/style.css") {
        filePath = path.join(__dirname, "style.css");
        contentType = "text/css";
    } else if (req.url === "/camera.js") {
        filePath = path.join(__dirname, "camera.js");
        contentType = "application/javascript";
    } else if (req.url === "/ui.js") {
        filePath = path.join(__dirname, "ui.js");
        contentType = "application/javascript";
    } else if (req.url === "/game.js") {
        filePath = path.join(__dirname, "game.js");
        contentType = "application/javascript";
    } else if (req.url === "/ChangeLog") {
        filePath = path.join(__dirname, "changelog.html");
        contentType = "text/html"; 
    } else if (req.url === "/HowToPlay") {
        filePath = path.join(__dirname, "howtoplay.html");
        contentType = "text/html";
    } else if (req.url === "/favicon.ico") {
        filePath = path.join(__dirname, "favicon.ico");
        contentType = "image/x-icon";
    } else if (req.url === "/bullet.png") {
        filePath = path.join(__dirname, "bullet.png");
        contentType = "image/png";
    } else if (req.url === "/player.png") {
        filePath = path.join(__dirname, "player.png");
        contentType = "image/png";
    } else if (req.url === "/missile.png") {
        filePath = path.join(__dirname, "missile.png");
        contentType = "image/png";
    } else if (req.url === "/background.png") {
        filePath = path.join(__dirname, "background.png");
        contentType = "image/png";
    } else if (req.url === "/background2.png") {
        filePath = path.join(__dirname, "background2.png");
        contentType = "image/png";
    } else if (req.url === "/background3.png") {
        filePath = path.join(__dirname, "background3.png");
        contentType = "image/png";
    } else if (req.url === "/background4.png") {
        filePath = path.join(__dirname, "background4.png");
        contentType = "image/png";
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
        return;
    }

    // Read the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("500 Internal Server Error");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});