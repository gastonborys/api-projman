export interface ProjectEntity{
    _id?            : string;
    email           : string;
    password?       : string;
    enabled?        : boolean;
    isadmin?        : boolean;
    name?           : string;
    lastname?       : string;
    photo?          : string;
    phone?          : string;
    created_at?     : Date;
    updated_at?     : Date;
    created_by?     : string;
    updated_by?     : string;
}
