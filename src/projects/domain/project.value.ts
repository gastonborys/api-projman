import { ProjectEntity } from "./project.models";

export class ProjectValue implements ProjectEntity{
   
    public email        : string;
    public password?    : string;
    public isadmin?     : boolean;
    public enabled?     : boolean;
    public name?        : string;
    public lastname?    : string;
    public photo?       : string;
    public phone?       : string;
    public created_at?  : Date;
    public updated_at?  : Date;
    public created_by?  : string;
    public updated_by?  : string;


    constructor(project: ProjectEntity){
        this.email      = project.email;
        this.password   = project.password;
        this.enabled    = project.enabled;
        this.name       = project.name;
        this.lastname   = project.lastname;
        this.photo      = project.photo;
        this.phone      = project.phone;
        this.isadmin    = project.isadmin;
        this.created_at = project.created_at;
        this.updated_at = project.updated_at;
        this.created_by = project.created_by;
        this.updated_by = project.updated_by;
    }
}
