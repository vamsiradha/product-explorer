const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const STATIC_DIR = 'static';

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, STATIC_DIR, req.url === '/' ? 'index.html' : req.url);
    
    // Default to index.html
    if (req.url === '/' || !fs.existsSync(filePath)) {
        filePath = path.join(__dirname, STATIC_DIR, 'index.html');
    }
    
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }
    
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code == 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Static server running at http://localhost:${PORT}`);
    console.log(`📚 Backend API: http://localhost:3001`);
    console.log(`🔗 Make sure backend is running: cd ../backend && npm run start:dev`);
    console.log(`\n📋 To open in browser:`);
    console.log(`   1. Click "Ports" tab in Codespaces`);
    console.log(`   2. Find port 3000`);
    console.log(`   3. Click the globe 🌐 icon`);
});
