import { UserEntity } from "./user.models";

export class UserValue implements UserEntity{
   
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


    constructor(user: UserEntity){
        this.email      = user.email;
        this.password   = user.password;
        this.enabled    = user.enabled;
        this.name       = user.name;
        this.lastname   = user.lastname;
        this.photo      = user.photo;
        this.phone      = user.phone;
        this.isadmin    = user.isadmin;
        this.created_at = user.created_at;
        this.updated_at = user.updated_at;
        this.created_by = user.created_by;
        this.updated_by = user.updated_by;
    }
}
