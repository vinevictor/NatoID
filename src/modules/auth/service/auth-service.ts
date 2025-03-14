import * as jose from "jose";
import { JWTPayload } from "jose";
import { cookies } from "next/headers";

async function openSessionToken(token: string) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  const { payload } = await jose.jwtVerify(token, secret);

  return payload;
}

async function sessionUser(){
  const cookie = (await cookies()).get('session')
  if(!cookie){
    return { error: true, message: "Nenhuma sessão encontrada", data: null }
  }
  const { value } = cookie
  const userSession : JWTPayload = await openSessionToken(value)
  
  return {
    error: false,
    message: "",
    data: userSession
  } 

}

async function createSessionToken(payload = {}) {
  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  const session = await new jose.SignJWT(payload)
  .setProtectedHeader({ alg: "HS256" })
  .setExpirationTime("4h")
  .sign(secret);
  const { exp } = await openSessionToken(session);

  (await cookies()).set('session', session, {
    expires: (exp as number) * 1000,
    path: '/',
    httpOnly: true,
  });

}

async function isSessionValid() {
    const sessionCookie = (await cookies()).get('session')
    
    if(sessionCookie){
        const { value } = sessionCookie
        const { exp } = await openSessionToken(value)
        const currentDate = new Date().getTime()

        return ((exp as number) * 1000) > currentDate
    }

    return false
}

async function destroySession() {
  (await cookies()).delete('session')
}

const AuthService = {
  openSessionToken,
  createSessionToken,
  isSessionValid,
  destroySession,
  sessionUser
};

export default AuthService;
