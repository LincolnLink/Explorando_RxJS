const http = require('http');


http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type':'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  const matchURL = /^\/response\/(.+)\/delay\/(\d+)\/?$/;
  // http://localhost:5200/response/{"data": "Hello word"}/delay/1000/

  if(!matchURL.test(req.url)) return res.end();

  const [, response, delay] = matchURL.exec(req.url);
  const jsonRespose = decodeURIComponent(response);

  setTimeout(() => {
    res.write(jsonRespose);
    res.end();
  }, +delay);


}).listen(5200);





