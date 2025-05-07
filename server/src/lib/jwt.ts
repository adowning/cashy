import { verify, decode, sign } from "jsonwebtoken";

interface JwtPayload {
  id: string;
  sub: string;
}
function generateAccessToken(userId: string) {
  const token = sign(
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
  const payload = verify(token, process.env.JWT_SECRET!);
  // console.log('this token: ', payload)
  return payload as JwtPayload;
}
function generateRefreshToken(userId: string) {
  return sign(
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
