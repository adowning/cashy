import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  sub: string;
}
function generateAccessToken(userId: string) {
  const token = jwt.sign(
    {
      id: userId,
      sub: userId,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1yr" }
  );
  // console.log('this token: ', token)
  return token;
}
function decodeToken(token: string) {
  const payload = jwt.verify(token, process.env.JWT_SECRET!);
  // console.log('this token: ', payload)
  return payload as JwtPayload;
}
function generateRefreshToken(userId: string) {
  return jwt.sign(
    {
      id: userId,
      sub: userId,
    },
    process.env.JWT_SECRET!,
    // { expiresIn: process.env.REFRESH_TOKEN_EXPIRY! }
    { expiresIn: "7d" }
  );
}

export { generateAccessToken, generateRefreshToken, decodeToken };
