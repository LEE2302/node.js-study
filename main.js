// require 요구하다. 노드모듈에서 http를 불러오는것 모듈이란 여러기능들이 모여있는 곳
var http = require("http");
// require 요구하다. 노드모듈에서 fs를 불러오는것
var fs = require("fs");
// require 요구하다. 노드모듈에서 url를 불러오는것
var url = require("url");

var app = http.createServer(function (request, response) {
  // 변수 _url에 request(요청)된 url값을 가져와 저장함
  var _url = request.url;
  //   require하여 가져온 url.parse(_url, true).query; 통하여 요청된 url에서 쿼리스트링을 가져옴.
  var queryData = url.parse(_url, true).query;
  //   queryData값에서 쿼리스트링 키로 값을 가져옴 => 아래와 같은 경우는 ?id=HTML 이라고 했을때 HTML값을 가져옴
  var title = queryData.id;

  if (_url == "/") {
    title = "Welcome";
  }
  if (_url == "/favicon.ico") {
    return response.writeHead(404);
  }
  response.writeHead(200);

  //   fs모듈에서 파일 읽어오는 readFile 불러와서 파일 경로 설정, 유니코드 설정, 콜백함수에서 가져온 데이터 사용
  fs.readFile(`data/${title}`, "utf-8", function (err, data) {
    // 마지막 응답을 보내주는 변수
    var template = `
    <!DOCTYPE html>
  <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8" />
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <ol>
        <li><a href="/?id=HTML">HTML</a></li>
        <li><a href="/?id=CSS">CSS</a></li>
        <li><a href="/?id=JavaScript">JavaScript</a></li>
      </ol>
      <h2>${title}</h2>
      <p>
        ${data}
      </p>
    </body>
  </html>
    `;

    //   응답 코드 => 로컬호스트 포트3000을 열면 해당 코드가 나온다.
    response.end(template);
  });
});
// port3000으로 설정
app.listen(3000);
