import bcrypt from 'bcrypt';
import { loginService, generateTokenService } from '../services/auth.service.js';


const login = async (req, res) => {
    const body = req.body;

    try{
        const user = await loginService(body);

        if(!user){
            return res.status(404).send({message: "User or Password not found"});
        }

        const passwordIsValid = await bcrypt.compare(body.password, user.password);

        if(!passwordIsValid){
            return res.status(404).send({message: "User or Password not found"});
        }
    
        const token = await generateTokenService(user.id);

        return res.send({token});
    }catch(err){
        return res.status(500).send(err.message);
    }
};

export { login };