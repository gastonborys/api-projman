import mongoose, { Schema } from "mongoose";
import { ProjectEntity } from "../../domain/project.models";

export const ProjectModel = mongoose.model('projects', 
    new Schema<ProjectEntity>({
        email       : { type: String,   index: true },
        password    : { type: String,   select: false},
        enabled     : { type: Boolean,  default: false, index: true },
        isadmin     : { type: Boolean,  default: false, index: true },    
        name        : { type: String,   required: true },
        lastname    : { type: String,   required: true },
        phone       : { type: String,   default: "N/D" },
        created_at  : { type: Date,     default: Date.now() },
        created_by  : { type: String,   default: "register"},
        updated_at  : { type: Date,     default: Date.now()},
        updated_by  : { type: String,   default: "register" },
    })
);
