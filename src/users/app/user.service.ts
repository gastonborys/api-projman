import { ValidationResult } from "../../shared/interfaces";
import Validator from "validatorjs";
import sha1 from 'js-sha1';

import { UserIdentity, UserEntity} from "../domain/user.models";
import { UserRepository } from "../domain/user.repository";
import { Jwt } from "../infra/libs/jwt";

export class UserService{

    constructor(private userRepository: UserRepository){}

    public async loginUser(email: string, password: string): Promise<UserIdentity | string>
    {
        const userData = await this.userRepository.getCredentials(email);

        if (userData != null)
        { 
            const validation = this.validateCredentials(userData, email, sha1(password));

            if (validation)
            {
                let jwt: Jwt    = new Jwt();

                return jwt.createToken(userData)
            }            
        }

        const validationResult = {
            result: false,
            message: `User / password incorrect or account is disabled`,
        };

        return JSON.stringify(validationResult);
    }

    public async createUser(user: UserEntity, register: boolean = false): Promise<UserEntity | string>
    { 
        const validation = await this.isValidCreate(user, register);
        
        if (!validation.result)
            return JSON.stringify(validation);

        if (register)
        {
            delete user.isadmin;
            delete user.enabled;
        }

        return await this.userRepository.create(user);
    }

    public async updateUser(id: string, user: UserEntity): Promise<UserEntity | string>
    {
        const validation = await this.isValidUpdate(user)

        if (!validation.result)
            return JSON.stringify(validation);

        delete user.password;

        return await this.userRepository.update(id, user);
    }

    public async updatePassword(email: string, password: string): Promise<boolean | string>
    {
        const validation    = await this.isValidUserAndPassword(email, password);

        if (!validation.result)
            return JSON.stringify(validation);

        const data: UserEntity  = {
            email           : email,
            password        : sha1(String(password)),
        };

        const result = await this.userRepository.changePassword(email, data);

        if (typeof(result) == "string")
           return result;
        
        return true;
    }

    public async getUser(id: string)
    {
        return await this.userRepository.getUser(id);
    }

    public async listUsers()
    {
        return await this.userRepository.listUsers();
    }

    public async deleteUser(email: string)
    {
        return await this.userRepository.delete(email);
    }

    public async checkEmail(email: string): Promise<boolean>
    {
        return await this.userRepository.emailExists(email);
    }


    // -------------------------------------------------------------- private functions 
    private async isValidCreate(data: UserEntity, register: boolean): Promise<ValidationResult>
    {
        let isValid: ValidationResult = { result: true };

        let rules: {}
        // setting create rules
        rules           = {
                name        : "required|string",
                lastname    : "string",
                email       : "required|email",
                password    : "required|string|min:6",
                enabled     : "required|boolean",
                isadmin     : "required|boolean",
            };

        // but register == true change rules
        if (register)
        {
            rules       = {
                name        : "required|string",
                lastname    : "string",
                email       : "required|email",
                password    : "required|string|min:6",
            };
        }

        let message     = {
            required    : "Field :attribute is required",
            min         : "Field :attribute necesita como mínimo :min caracteres",
            boolean     : "Field :attribute debe tener un valor booleano [true o false], [1 o 0]",
            email       : "Field :attribute debe ser un email válido",
        }

        let validation   = new Validator(data, rules, message);

        if (validation.fails())
        {
            isValid.result   = false;
            isValid.message  = JSON.stringify(validation.errors.all());
        }
        else
        {
            // checkEmail duplicity
            if (typeof(data.email) == "string")
            {
                if (await this.checkEmail(data.email))
                {
                    isValid.result  = false;
                    isValid.message = "El email especificado ya existe en la base de datos, por favor utilice otro y vuelva a intentar.";
                }
            }
        }

        return isValid;
    }

    private async isValidUpdate(data: UserEntity): Promise<ValidationResult>
    {
        let isValid: ValidationResult = { result: true };
        
        let rules       = {
            email       : "email",
            password    : "string|min:6",
            enabled     : "boolean",
            isadmin     : "boolean",
        };

        let message     = {
            min         : "Field :attribute necesita como mínimo :min caracteres",
            boolean     : "Field :attribute debe tener un valor booleano [true o false], [1 o 0]",
            email       : "Field :attribute debe ser un email válido",
        }

        let validation   = new Validator(data, rules, message);

        if (validation.fails())
        {
            isValid.result   = false;
            isValid.message  = JSON.stringify(validation.errors.all());
        }
        else
        {
            // checkEmail duplicity
            if (typeof(data.email) == "string")
            {
                if (await this.checkEmail(data.email))
                {
                    isValid.result  = false;
                    isValid.message = "El email especificado ya existe en la base de datos, por favor utilice otro y vuelva a intentar.";
                }
            }
        }

        return isValid;
    }

    private async isValidUserAndPassword(email: string, password: string): Promise<ValidationResult>
    {
        let isValid: ValidationResult = { result: true };
        

        let data        = {
            email       : email,
            password    : password,
        };

        let rules       = {
            email       : "email",
            password    : "string|min:6",
        };

        let message     = {
            min         : "Field :attribute necesita como mínimo :min caracteres",
            email       : "Field :attribute debe ser un email válido",
        }

        let validation   = new Validator(data, rules, message);

        if (validation.fails())
        {
            isValid.result   = false;
            isValid.message  = JSON.stringify(validation.errors.all());
        }
        else
        {
            // checkEmail duplicity
            if (!await this.checkEmail(data.email))
            {
                isValid.result  = false;
                isValid.message = "El email especificado no existe en la base de datos";
            }
        }
        
        return isValid;
    }

    private validateCredentials(user: UserEntity, email: string, password: string): boolean
    {
        if (email == user.email && password == user.password && user.enabled == true)
            return true;

        return false;
    }

}
