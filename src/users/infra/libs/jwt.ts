import jwt                      from 'jwt-simple';
import moment                   from 'moment';
import { config } from "../../../config";
import { UserEntity, UserIdentity } from '../../domain/user.models';

export class Jwt{

    private key: string;

    constructor(){
        this.key    = config.jwt.key ?? "here_be_the_key";
    }

    createToken = (user: UserEntity): UserIdentity => {

        let payload: UserIdentity = {
            user        : user._id ?? "",
            name        : user.name ?? "N/A",
            lastname    : user.lastname ??"N/A",
            isadmin     : user.isadmin ?? false,
            email       : user.email ?? "N/D",
            iat         : moment().unix(),
            exp         : moment().add(1440, 'minutes').unix(),
        };

        payload.token   = jwt.encode(payload, this.key, 'HS256');

        return payload;

    }

    checkToken = (token: string): boolean => {
        try {
            const decoded   = jwt.decode(token, this.key);
            if (decoded != null)
                return true;
        }
        catch(error)
        {
            console.log(error);
        }

        return false;
    }

    getIdentity = (token: string): UserIdentity =>{

        return jwt.decode(token, this.key);
    }
}
