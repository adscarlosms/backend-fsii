import jwt from 'jsonwebtoken';


//mantendo as informações de acesso aos dados em variaveis de ambiente é ideal para a segurança
export function assinar(usuario){
 const token = jwt.sign({usuario}, process.env.SEGREDO, {expiresIn: '300s'});
 return token;
}

export function verificarAssinatura(token){
 return jwt.verify(token,  process.env.SEGREDO);
}