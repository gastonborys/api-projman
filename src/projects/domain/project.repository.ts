import { ProjectEntity } from "./project.models";


export interface ProjectRepository {
    
    create(project: ProjectEntity): Promise<ProjectEntity | string>;

    update(id: string, project: ProjectEntity): Promise<ProjectEntity | string>;
    
    delete(id: string): Promise<boolean>;
    
    get(id: string): Promise<ProjectEntity | null>;
    
    list(order?: Object): Promise <ProjectEntity[] | []>;

}
