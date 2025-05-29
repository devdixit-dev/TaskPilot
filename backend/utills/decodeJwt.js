import jwt from 'jsonwebtoken';

const decodeJwt = (userToken) => {
  if(!userToken) {
    return 'Token not provided'
  }
  const decodedToken = jwt.verify(userToken, process.env.JWT_SECRET);
  return decodedToken;
}

export default decodeJwt;