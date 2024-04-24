// 모듈 불러오기 fs
var fs = require("fs");

// fs.readFile를 통하여 파일을 읽을 수 있고, 첫번째 인자에 읽을 파일이름, utf-8로 읽고, data 가져올 수 있음
// https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs 공식 페이지 설명
// 주의 터미널에서 node 실행시 cd nodejs 들어온후 => node fileread.js 실행해야함.
fs.readFile("sample.txt", "utf-8", function (err, data) {
  console.log(data);
});
