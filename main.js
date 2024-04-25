// require 요구하다. 노드모듈에서 http를 불러오는것 모듈이란 여러기능들이 모여있는 곳
var http = require("http");
// require 요구하다. 노드모듈에서 fs를 불러오는것
var fs = require("fs");
// require 요구하다. 노드모듈에서 url를 불러오는것
var url = require("url");

var app = http.createServer(function (request, response) {
  // 중복된 부분 함수로 뺴서 재활용성 활용
  function templateHTML(title, list, body) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8" />
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      ${list}
      ${body}
    </body>
    </html>
  `;
  }
  // 중복된 부분 함수로 뺴서 재활용성 활용
  function templateList(lists) {
    // list 변수에 먼저 <ul>열린 태그를 담고
    var list = "<ul>";
    // 반복문 정지와 파일 이름을 가져올 인덱스
    var i = 0;
    // 반복문 while문 인덱스가 폴더숫자와 같아질때까지 반복
    while (i < lists.length) {
      // list변수에 기존에 열린태그에 이어서 해당 li태그들 할당
      list = list + `<li><a href="/?id=${lists[i]}">${lists[i]}</a></li>`;
      // 인덱스 증가 1번 반복마다 1씩 추가
      i = i + 1;
    }
    // 마지막 ul열린 태그 + li태그들 + ul닫힌 태그
    list = list + "</ul>";
    return list;
  }

  // 변수 _url에 request(요청)된 url값을 가져와 저장함
  var _url = request.url;
  //   require하여 가져온 url.parse(_url, true).query; 통하여 요청된 url에서 쿼리스트링을 가져옴.
  var queryData = url.parse(_url, true).query;
  //   require하여 가져온 url.parse(_url, true).query; 통하여 요청된 url에서 pathname을 가져옴.
  var pathName = url.parse(_url, true).pathname;
  //   조건문 pathName이 아무것도 없다면.
  if (pathName === "/") {
    // 이중 조건문 => pathName
    if (queryData.id === undefined) {
      // 폴더 이름을 가져오는 함수
      fs.readdir("./data", function (error, filelist) {
        var list = templateList(filelist);
        // 제목
        var title = "Welcome";
        // data 설정 => 위에 조건문이 쿼리아이디가 없을때이기 때문에 따로 본문 설정
        var description = "Hello, Node.js";
        // 마지막 응답을 보내주는 변수
        var template = templateHTML(
          title,
          list,
          `<h2>${title}</h2><p>${description}</p>`
        );
        // 응답 헤더로 보내는 응답 코드
        response.writeHead(200);
        //   응답 코드 => 로컬호스트 포트3000을 열면 해당 코드가 나온다.
        response.end(template);
      });
    } else {
      fs.readdir("./data", function (error, filelist) {
        //   fs모듈에서 파일 읽어오는 readFile 불러와서 파일 경로 설정, 유니코드 설정, 콜백함수에서 가져온 데이터 사용
        fs.readFile(
          `data/${queryData.id}`,
          "utf-8",
          function (err, description) {
            var list = templateList(filelist);
            // 제목
            var title = queryData.id;
            // 마지막 응답을 보내주는 변수
            var template = templateHTML(
              title,
              list,
              `<h2>${title}</h2><p>${description}</p>`
            );
            // 응답 헤더로 보내는 응답 코드
            response.writeHead(200);
            //   응답 코드 => 로컬호스트 포트3000을 열면 해당 코드가 나온다.
            response.end(template);
          }
        );
      });
    }
  } else {
    // 응답 헤더로 보내는 응답 코드
    response.writeHead(404);
    //   응답 코드 => 로컬호스트 포트3000을 열면 해당 코드가 나온다.
    response.end("Not Found");
  }
});
// port3000으로 설정
app.listen(3000);
