import { ProjectEntity } from "../../domain/project.models";
import { ProjectRepository } from "../../domain/project.repository";
import { ProjectModel } from "../model/project.schema";

export class MongoRepository implements ProjectRepository {


    constructor(){}
    /*
     * Create Project
     * @param project: ProjectEntity
     * @returns ProjectEntity | null
     */
    public async create(project: ProjectEntity): Promise<ProjectEntity | string> 
    {
        try {
            const newProject   = await ProjectModel.create(project) as ProjectEntity;

            return newProject;
        }
        catch(error)
        {
            console.log(error instanceof Error);
            return JSON.stringify(error);
        }
    }

    /*
     * Update Project
     * @param project: ProjectEntity
     * @returns ProjectEntity | null
     */
    public async update(id: string, project: ProjectEntity): Promise<ProjectEntity | string>
    {
        project.updated_at     = new Date();

        const action        = await ProjectModel.updateOne({_id: id}, project);

        if (action.modifiedCount == 0)
            return `Project ${id} not found`;

        return await ProjectModel.findById({_id: id}) as ProjectEntity;
    }

    /*
     * Delete Project
     * @param email: ProjectEntity
     * @returns boolean
     */
    public async delete(id: string): Promise<boolean>
    {
        const action = await ProjectModel.deleteOne({_id: id});

        return action.deletedCount == 0 ? false : true;
    }

    /*
     * List Projects
     * @returns ok: ProjectEntity[]
     */
    public async listProjects(): Promise<ProjectEntity[] | []> 
    {
        return await ProjectModel.find();
    }

    /*
     *
     * getProject
     * @param email: ProjectEntity
     * @returns ProjectEntity | null
     */
    public async getProject(id: string): Promise<ProjectEntity | null>
    {
        return await ProjectModel.findById(id);
    }

    /*
     * getCredentials
     * @param email: email String
     * @returns ProjectEntity | null
     */
    public async getCredentials(email: string): Promise<ProjectEntity | null> 
    {
        return await ProjectModel.findOne({email: email}).select(["_id", "email", "password", "isadmin", "enabled", "name", "lastname"]) as ProjectEntity;
    }

    /*
     * Update Project Password
     * @param project: ProjectEntity
     * @returns ProjectEntity | null
     */
    public async changePassword(email: string, project: ProjectEntity): Promise<boolean | string>
    {
        project.updated_at     = new Date();

        const action        = await ProjectModel.updateOne({email: email}, project);

        if (action.modifiedCount == 0)
            return `Project ${email} not found`;

        return true;
    }

    /*
     * emailExists
     * @param email: email String
     * @returns boolean
     */
    public async emailExists(email: string): Promise<boolean> 
    {
        return await ProjectModel.findOne({email: email}).countDocuments() > 0 ? true : false;
    }
}

