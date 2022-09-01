const express = require('express')
const app = express()
const port = 5000
//쿠키에 token저장
const cookieParser=require('cookie-parser');
// bodyParser 가져오기
const bodyParser = require('body-parser');
// 유저 가져오기
const {User} = require('./models/User');
//middleware 가져오기
const {auth} = require('./middleware/auth');
//mongodb uri 가져오기
const config = require('./config/key');

//bodyParser 옵션 주기
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    //  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('몽고 DB 연결중'))
.catch(err => console.log(err))


app.get('/', (req, res)=>res.send('Hello World'))

//회원가입 
app.post('/api/users/register', (req, res) =>{
    // 회원가입 할때 필요한 정보들을 Client에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body)
    //유저 정보들을 저장 
    user.save((err, userinfo)=>{
        if(err) return res.json({
            success: false,err
        })
        return res.status(200).json({
            success: true
        })
    })
})

//로그인
app.post('/api/users/login',(req,res)=>{
    //요청된 email을 데이터베이스에서 있는지 찾기
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message:"제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        //요청된 email이 있다면 비밀번호가 맞는 비밀번호인지 확인
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch)
            return res.json({loginSuccess:false,message:"비밀번호가 틀렸습니다."    })
    
            //비밀번호가 맞다면 토큰생성
            user.creattoken((err,user)=>{
                if(err)return res.status(400).send(err);
                //어디에 token저장할지 정함
                res.cookie("x_auth",user.token)
                .status(200)
                .json({loginSuccess:true,userId:user._id})
            })
        })    
    })
})

app.get('/api/users/auth',auth,(req,res)=>{
    //여기까지 미들웨어를 통과했다면 Authentication이 True이다.
    res.status(200).json({
        _id:req.user._id,
        isAdmin: req.user.role===0?false:true, //rule이 0이면 일반유저 아니면 관리자
        isAuth: true,
        email: req.user.email,
        name: req.user.lastname,
        role: req.user.role,
        image: req.user.image

    })
})

app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate({_id:req.user._id},
        {token:""},
        (err,user)=>{
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success:true
            })
        })

})

app.listen(port, ()=> console.log(`Example app listening on port ${port}!`))