var http = require('http'),
    fs = require('fs'),
    url = require('url');

http.createServer(function(req, res){
    
    var path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase();
    var q = url.parse(req.url, true).query;
    
    switch (path) {
        case '':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('Main page!');
            break;
        case '/new':
            fs.writeFile('../resource/textdata.txt', q.email + "\r\n" + q.browser + "\r\n" + q.message + "\r\n" + q.remember + "\r\n" + q.notify, function (err) {
                if (err) throw err;
            }); 
            fs.writeFile('../resource/xmldata.xml', '<?xml version="1.0" encoding="UTF-8"?><item><email><email_key>email</email_key><email_value>' + q.email + '</email_value></email><browser><browser_key>browser</browser_key><browser_value>' + q.browser + '</browser_value></browser><message><message_key>message</message_key><message_value>' + q.message + '</message_value></message><remember><remember_key>remember</remember_key><remember_value>' + q.remember + '</remember_value></remember><notify><notify_key>notify</notify_key><notify_value>' + q.notify + '</notify_value></notify></item>', function (err) {
                if (err) throw err;
            }); 
            break;
        case '/txt':
            fs.readFile('../resource/textdata.txt', function(err, data) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.write(data);
                res.end();
            });
            break;
        case '/xml':
            fs.readFile('../resource/xmldata.xml', function(err, data) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
                res.writeHead(200, {'Content-Type': 'application/xml'});
                res.write(data);
                res.end();
            });
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('Not Found');
    }
}).listen(3000);

console.log('Сервер запущен на localhost:3000; нажмите Ctrl-C для завершения...');