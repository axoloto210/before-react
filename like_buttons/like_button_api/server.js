const http = require('node:http');

const hostname = 'localhost';
const port = 4000;

const CORS_HEADERS = {
    'Access-Control-Allow-Origin':'*',
    'Access-Control-Allow-Methods':'OPTIONS, POST, GET',
    'Access-Control-Allow-Headers': 'Content-Type',
}

let likeCount = 1

const server = http.createServer((req, res) => {

    // プリフライトリクエスト用の処理
    if (req.method === 'OPTIONS') {
        res.writeHead(204, CORS_HEADERS);
        res.end();
        return;
    }

    res.setHeader('Content-Type', 'application/json');
    Object.entries(CORS_HEADERS).forEach(([key, value]) => {
        res.setHeader(key, value);
    });

    // いいねボタンの処理
    if(req.method === 'GET' && req.url.startsWith('/api/like')){
        res.writeHead(200)
        res.end(JSON.stringify({likeCount}))
    }else if(req.method === 'POST', req.url.startsWith('/api/like')){
        likeCount++

        res.writeHead(200)
        res.end(JSON.stringify({likeCount}))
            
    }else{
        res.writeHead(404)
        res.end(JSON.stringify({error: 'Not Found'}))
    }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});