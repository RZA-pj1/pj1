/**
 * 담당자 : 이승현
 * 함수 설명 : view engine을 ejs로 세팅
 * 기능 설명 : ejs를 사용하기 위한 랜더링 기능 
 */

// 가져오기
const express = require('express') 
const expressLayouts = require('express-ejs-layouts')

const app = express()
const port = 5000

// 정적 파일 - Static Files (정적폴더 호출은 속도를 느리게 만들어서 꼭 라우터 호출 밑에 배치한다.)
app.use(express.static('public')) // 정적 폴더 지정
// app.use('/css', express.static(__dirname + 'public/css'))
// app.use('/js', express.static(__dirname + 'public/js'))
// app.use('/img', express.static(__dirname + 'public/img'))
// app.use(express.static('./public/img'))

// 뷰 설정 - Set Views
// app.set('views', __dirname + './views')
app.use(expressLayouts)
// app.set('layout', './about') ('키', '값')으로 설정을 저장
app.set('layout', './login')  // views/login.ejs를 기본 레이아웃으로 설정하고 <%- body %> 부분에 렌더링 된 html 문자열이 들어감
app.set("layout extractScripts", true) // 렌더링된 html에서 모든 script 태그를 추출해서 <%- script %> 부분에 들어감
app.set('view engine', 'ejs') // Express에서 view엔진을 ejs로 설정
app.engine('html', require('ejs').renderFile)

// app.get('', (req, res) => {
//   res.sendFile(__dirname + '/views/index.html')
// })

// Navigation
app.get('', (req, res) => {   // render 파일명(ejs 확장자는 생략이 가능)
  res.render('login', {content: '로그인'})
})

// app.get('', (req, res) => {
//   res.render('index', { title: 'Home page'})
// })

app.get('/add_user', (req, res) => {
  res.render('add_user', { layout: './add_user'})
})



// 포트 8000에서 수신 대기 중
app.listen(port, () => console.info('Listening on port ${port}'))

// app.set('view engine', 'ejs');  

// app.get("/", function(req, res) { 
//   res.render("home");
// });

// // Default 경로 설정
// app.set('views', __dirname + '/views/ejs'); 

// // ejs view 페이지로 데이터 전달
// app.get("/", function(req, res) { 
//   res.render("home.ejs", {"name": "관리자"});
// });

// 콘텐츠를 제공해야 하는 초기 파일 - initial file which should serve out content
// 이 파일을 실행하려면 Lightsail에서 sudo 노드 앱을 실행하십시오. - run sudo node app on Lightsail to run this file

// const http = require('http');

// const headers = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Origin': 'OPTIONS, POST, GET',
//   'Access-Control-Max-Age': 2592000, // 30 days
// };

// http.createServer((req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   if (req.method === 'OPTIONS') {
//     res.writeHead(204, headers);
//     res.end();
//     return;
//   }
//   if (['GET', 'POST', 'PUT'].indexOf(req.method) > -1) {
//   req.on('data', chunk => {
//     console.log(chunk.toString());
//   });

//   // 서버 연결 성공 시
//   res.writeHead(200, headers);
//   res.end('성공입니다');
//   return;
// }  

// // 서버 연결 실패 시
// res.writeHead(400, headers);
// res.end('${req.method} is not allowed for the request. 응답 없음 ㅅㄱ' );
// }



// ).listen(8000);
