#8/30
## Node JS

nodemon 설치

- Express 활용
    
    
    ## Express 설치
    
    ```jsx
    npm install express -save
    ```
    
    ## express 활용
    
    ```jsx
    const express = require('express'); 
    const app = express();
    const port = 3000;
    
    app.get('/', (req, res)=>res.send('Hello World'));
    app.listen(port,() => console.log(`listen port ${port}`));
    ```
    
    ## package.json 수정
    
    ```json
    {
      "name": "login-study02",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        **"start": "node index.js",**
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
        "express": "^4.17.1"
      }
    }
    ```
    
    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5cbed90a-c0f6-4f0e-a9b8-b3cf844616c1/_2020-08-29__4.19.29.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5cbed90a-c0f6-4f0e-a9b8-b3cf844616c1/_2020-08-29__4.19.29.png)
    
- body-parser과 회원 가입
    
    ## body-parser install
    
    ```jsx
    npm install body-parser --save
    ```
    
    ## body-parser란
    
    ```jsx
    - 클라이어트에서 오는 정보를 서버에서 분석해서 가져올수 있게 해주는 역할
    ```
    
    ```jsx
    const express = require("express");
    const app = express();
    const port = 7000;
    **const bodyParser = require('body-parser')
    const{UserTest} =require('./models/UesrTest') 
    
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());**
    
    const mongoose = require("mongoose");
    mongoose.connect(
      "mongodb+srv://test_username:0000@cluster0-amulf.mongodb.net/study?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    ).then((()=>console.log('mongoDb 연결 성공  '))).catch(err =>console.log(err))
    
    // app.get("/", (req, res) => res.send("Hello World"));
    
    //회원 가입
    
    app.post('/register', (req,res)=>{
      //회원 가입 할때 필요한 정보들을 client에서 가져오면 
      //그것들을 DB에 보내준다.
    
      const user = new UserTest(req.body)
    
      user.save((err,userInfo)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({
          success: true
        })
      })
      //save는 mongodbd에서 오는 메서드
      //status(200)는 성공 했다는 뜻
    })
    
    app.listen(port, () => console.log(`listen port ${port}`));
    ```
    
    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/039fe42d-bc76-4fc2-b5f7-e18d359514d0/_2020-08-29__7.02.21.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/039fe42d-bc76-4fc2-b5f7-e18d359514d0/_2020-08-29__7.02.21.png)
    
    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b6c3375e-5dc3-4549-95c8-ed8f5651e61b/_2020-08-29__7.02.28.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b6c3375e-5dc3-4549-95c8-ed8f5651e61b/_2020-08-29__7.02.28.png)
    
- nodemon install
    
    ## nodemon 설치
    
    ```jsx
    npm install nodemon --save -dev
    ```
    
    ## scripts 추가
    
    ```json
    {
      "name": "login-study02",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "scripts": {
        "start": "node index.js",
        **"nodemon": "nodemon index.js",**
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
        "body-parser": "^1.19.0",
        "express": "^4.17.1",
        "mongoose": "^5.10.2",
        "nodemon": "^2.0.4"
      }
    }
    ```
    
    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f3f4ccff-627d-44c7-b57a-ccfa69c16230/_2020-08-29__7.05.32.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f3f4ccff-627d-44c7-b57a-ccfa69c16230/_2020-08-29__7.05.32.png)
    
    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b221c970-273d-4a1a-baab-ff4d1528d7b2/_2020-08-29__7.05.48.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/b221c970-273d-4a1a-baab-ff4d1528d7b2/_2020-08-29__7.05.48.png)
    
- 비밀번호 설정 정보 관리
    
    ## 현재 파일 상태
    
    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/39c43375-2500-4dd8-8d28-ee00716ef5d2/_2020-08-29__7.10.53.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/39c43375-2500-4dd8-8d28-ee00716ef5d2/_2020-08-29__7.10.53.png)
    
    - Code
        
        ## dev.js
        
        ```jsx
        module.exports = {
          mongoURI:
            "mongodb+srv://test_username:0000@cluster0-amulf.mongodb.net/study?retryWrites=true&w=majority",
        };
        ```
        
        ## key.js
        
        ```jsx
        if(process.env.NODE_ENV === 'production'){
            module.exports = require('./prod')
        }else{
            module.exports = require('./dev')
        
        *}*
        ```
        
        ## prod.js
        
        ```jsx
        module.exports = {
            mongoURI: process.env.MONGO_URI
        }
        ```
        
        ## index.js
        
        ```jsx
        const express = require("express");
        const app = express();
        const port = 7000;
        **const config = require("./config/key")**
        const bodyParser = require('body-parser')
        const{UserTest} =require('./models/UesrTest') 
        
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
        
        **const mongoose = require("mongoose");
        mongoose
          .connect(
            config.mongoURI,
            {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex: true,
              useFindAndModify: false,
            }
          )**.then((()=>console.log('mongoDb 연결 성공  '))).catch(err =>console.log(err))
        
        // app.get("/", (req, res) => res.send("Hello World"));
        
        //회원 가입
        
        app.post('/register', (req,res)=>{
          //회원 가입 할때 필요한 정보들을 client에서 가져오면 
          //그것들을 DB에 보내준다.
        
          const user = new UserTest(req.body)
        
          user.save((err,userInfo)=>{
            if(err) return res.json({success: false, err})
            return res.status(200).json({
              success: true
            })
          })
          //save는 mongodbd에서 오는 메서드
          //status(200)는 성공 했다는 뜻
        
        })
        
        app.listen(port, () => console.log(`listen port ${port}`));
        ```
        
    
- Bcrypt 설정하기
    
    ## Bcrypt 설치하기
    
    ```jsx
    npm install bcrypt --save
    ```
    
    ```jsx
    const mongoose = require("mongoose");
    **const bcrypt = require("bcrypt");
    const saltRounds = 10;**
    
    const userTestSchema = mongoose.Schema({
      name: {
        type: String,
        maxlength: 50,
      },
      email: {
        type: String,
        trim: true, // 스페이스를 없애주는 역할
        unique: 1, // 똑같은 email이 한번만 쓰이게 해주는 역할
      },
      password: {
        type: String,
        minlength: 5,
      },
      lastname: {
        type: String,
        maxlength: 50,
      },
      role: {
        type: Number,
        default: 0,
      }, // 관리자나 일반인 인것을 구별하는 역할
    
      image: String,
    
      token: {
        type: String,
      },
      // 유효성 관리
    
      tokenExp: {
        type: Number,
      },
      //토큰 유효기간
    });
    
    **userTestSchema.pre("save", function (next) {
      let userTest = this;
    
      if (userTest.isModified("password")) {
        //비번이 변경 될때만 암호화 한다. 
    
        bcrypt.genSalt(saltRounds, function (err, salt) {
          if (err) return next(err);
    
          bcrypt.hash(userTest.password, salt, function (err, hash) {
            if (err) return next(err);
            userTest.password = hash;
            // 성공 했다면 일반 비번을 암호화 된 비번으로 교체해라.
            next();
          });
          // bcrypt.hash(userTest .password) 이렇게 하면 userpsssword 값을 가져온다.
          // 그러기 위해서 let userTest = this;는 필수 이다.
          //hash 는 암호화된 비번이다.
        });
      }
    });
    //mongooes의 메소드  저장하기 전에 작업을 진행해라.**
    
    const UserTest = mongoose.model("UserTest", userTestSchema);
    // 먼저 모델의 이름 || 나중엔 모델 스키마 작성
    // 스카마를 모델로 감싸준다
    
    module.exports = { UserTest };
    // 다른 곳에서도 쓸수 있게 export를 해준다
    ```
    
    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f778f40e-ac58-4e35-9ebe-f9c5da3b27f9/_2020-08-30__4.48.34.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f778f40e-ac58-4e35-9ebe-f9c5da3b27f9/_2020-08-30__4.48.34.png)
    
    ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4245821f-2043-4eba-95cb-534e2c8489e7/_2020-08-30__4.48.46.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4245821f-2043-4eba-95cb-534e2c8489e7/_2020-08-30__4.48.46.png)
    
- 로그인 기능 Part1  with bcrypt - 어렵-
    
    ## index.js
    
    ```jsx
    ...
      app.post("/login", (req, res) => {
        // 요청된 이메일이 db에 있는지 화인
        UserTest.findOne({email:req.body.email}, (err,user)=>{
          if(!user){
            return res.json({
              loginSuccess : false,
              message: "해당하는 유저가 없습니다."
            })
          }
          // 요청된 이메일이 있다면 맞는다면 비번까지 맞는지 확인
          // 이전에 UserTest에서 작업 Line_66
          user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch)
            return res.json({loginSuccess: false, message:"비번이 틀렸습니다."})
    
             // 비밀번호까지 맞다면 토큰을 생성하기
             user.generateToken((err, user)=>{
              //나중에 추가
          })
    
          })
        })
      });
    });
    
    app.listen(port, () => console.log(`listen port ${port}`));
    ```
    
    ## UserTest.js
    
    ```jsx
    ...
    userTestSchema.methods.comparePassword = function(plainPassword,  cb){
        // plainPassword 암호화된 비번 찾은지 찾기
      bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
        cb(null, isMatch)
      })
    }
    ...
    ```
    
- 로그인 기능 Part2 토큰 이용

##aws

###putty

###mongodb 설치
```ubuntu
```
//우분투 버전확인 및 맞는 버전 설치
lsb_release -dc
//공개키 가져오기
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
//몽고DB에 대한 목록파일 만들기
echo "deb [ arch = amd64, amr64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee/etc/apt/sources.list.d/mongodb-org-5.0.list
//로컬 패키지 데이터베이스 다시 로드
sudo apt-get update
//몽고디비 최신버전 설치
sudo apt-get install -y mongodb-org
```
