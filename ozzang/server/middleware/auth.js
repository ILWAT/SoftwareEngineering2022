const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리를 하는 곳

  // 클라이언트 쿠키에서 토큰 가져오기
  let token = req.cookies.x_auth;

  // 토큰을 복호화 해 userId 찾기
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;

    next(); // middleware 에서 넘어갈 수 있게 next() 추가!
  });

  // 해당 유저가 있으면 인증 OK!

  // 없으면 인증 NO!
};

module.exports = { auth };
