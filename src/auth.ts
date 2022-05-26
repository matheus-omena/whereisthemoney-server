const jwt = require('jsonwebtoken');

export let userSessionId = "";

export function validateToken(req: any, res: any, next: any) {
    let token = req.body.token || req.query.token || req.headers["authorization"]

        if (!token) {
            return res.status(403).send({ message: "Nenhum token fornecido." });
        }

        if (token.startsWith('Bearer '))
            token = token.substring(7, token.length)

        jwt.verify(token, process.env.SECRET, function (err: any, decoded: any) {
            if (err) {
                return res.status(403).send({ message: "Token inválido." });
            } else {
                console.log("decoded", decoded);
                req.decoded = decoded;
                userSessionId = decoded.userId;
                next();
            }
        });    
}