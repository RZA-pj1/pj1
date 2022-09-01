const mongoose = require('mongoose')
const bcrypt=require('bcrypt')
//salt를 이용하여 비밀번호 암호화
//salt를 만들때 10자리인 saltRounds를 만든다.
const saltRounds = 10
//jsonwebtoken
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
//이름지정
  name :{
    type : String,
    maxlength : 50
  },
  //이메일정보
  email:{
     type: String,
     // 공백 제거
     trim: true,
     //유일값
     unique: 1
  },
  password:{
    type: String,
    //비밀번호 4자리보다 적으면 안됩니다.
    minlength: 4
  },
  lastname:{
    type: String,
    maxlength : 50
  },
  // 관리자 및 일반유저 구분
  role:{
    type : Number,
    //관리자로 지정하지 않으면 0
    default: 0
  },
  //그사람의 이미지 지정가능
  image: String,
  // 토큰으로 유효성 관리
  token: { 
    type : String
  },
  // 토큰유효기간
  tokenExp:{
    type : Number
  }
})

userSchema.pre('save',function(next){
  var user=this;
  if(user.isModified('password')){
    //비밀번호 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err)
      //순수하게 넣는 비밀번호 fullnamepassword
      bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
          // Store hash in your password DB.
          if(err) return next(err)
          user.password=hash
          next()
      });
  });
  }else{
    next()
  }
})

userSchema.methods.comparePassword=function(plainPassword, cb){
  //plainPassword 13245 암호화된 비밀번호 같은지 확인
  bcrypt.compare(plainPassword,this.password,function(err,isMatch){
    if(err) return cb(err),
      cb(null,isMatch)
  })
}

userSchema.methods.generateToken = function(cb){
  var user = this
  //jsonwebtoken을 이용하여 token을 생성
  var token = jwt.sign(user._id.toHexString(),'token')
  //user._id+'token' = token
  //->'token'->user._id
  user.token = token
  user.save(function(err,user){
    if(err) return cb(err)
    cb(null,user)
  })
}

userSchema.statics.findByToken= function(token, cb){
  var user=this;
  //user._id+'' == token
  //토큰을 디코드한다.
  jwt.verify(tokken,'token',function(err,decoded){
    //유저아이디를 이용해서 유저를 찾은 다음
    //클라이언트에서 가져온 token과 DB에 보관된 토큰이 같은지 확인
    user.findOne({"_id":decoded,"token":token},function(err,user){
      if(err)return cb(err);
      cb(null,user)
    })
  })
}

  const User = mongoose.model('User', userSchema)

//유저 모델을 다른 곳에서도 사용하기 위해 exports 하기
module.exports = {User}