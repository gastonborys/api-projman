import { ValidationResult } from "../../shared/interfaces";
import Validator from "validatorjs";

import { ProjectEntity} from "../domain/project.models";
import { ProjectRepository } from "../domain/project.repository";

export class ProjectService{

    constructor(private projectRepository: ProjectRepository){}

    public async create(project: ProjectEntity, register: boolean = false): Promise<ProjectEntity | string>
    { 
        const validation = await this.isValidCreate(project, register);
        
        if (!validation.result)
            return JSON.stringify(validation);

        if (register)
        {
            delete project.isadmin;
            delete project.enabled;
        }

        return await this.projectRepository.create(project);
    }

    public async update(id: string, project: ProjectEntity): Promise<ProjectEntity | string>
    {
        const validation = await this.isValidUpdate(project)

        if (!validation.result)
            return JSON.stringify(validation);

        delete project.password;

        return await this.projectRepository.update(id, project);
    }

    public async get(id: string)
    {
        return await this.projectRepository.get(id);
    }

    public async list()
    {
        return await this.projectRepository.list();
    }

    public async delete(email: string)
    {
        return await this.projectRepository.delete(email);
    }

    // -------------------------------------------------------------- private functions 
    private async isValidCreate(data: ProjectEntity, register: boolean): Promise<ValidationResult>
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

        return isValid;
    }

    private async isValidUpdate(data: ProjectEntity): Promise<ValidationResult>
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

    private async isValidProjectAndPassword(email: string, password: string): Promise<ValidationResult>
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
}
