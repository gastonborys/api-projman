import { Request, Response } from "express";
import { ProjectService } from "../../app/project.service";

export class ProjectController{

    constructor( private projectService: ProjectService ){}

    public create   = async (_req: Request, res: Response) =>
    {
        try{
            const newProject   = JSON.parse(_req.body.project);

            const response  = await this.projectService.createProject(newProject);

            if (typeof(response) == "string")
                throw new SyntaxError(response);
                
            return res.status(200).json({
                "request"   : "Projects::create()",
                "response"  : "OK",
                "project"      : response,
            });
        }
        catch(error)
        {
           return res.status(400).json({
                "request"   : "Projects:create()",
                "response"  : "KO",
                "message"   : error instanceof SyntaxError ? String(error) : error,
            });
        }
    };

    public update   = async (req: Request, res: Response) =>
    {
        try {
            const id:string     = req.params.id;

            const projectData      = JSON.parse(req.body.project);

            const response      = await this.projectService.updateProject(id, projectData);

            if (typeof(response) == "string")
                throw new SyntaxError(response);
 
            return res.status(200).json({
                "request"   : "Projects::update()",
                "response"  : "OK",
                "project"      : response,
            });
        }
        catch (error)
        {
            return res.status(400).json({
                "request"   : "Projects:update()",
                "response"  : "KO",
                "message"   : error instanceof SyntaxError ? String(error) : error,
            });
        }
    };

    public changePassword   = async (req: Request, res: Response) =>
    {
        try {
            const email:string      = req.body.email;

            const password:string   = req.body.password;

            const response      = await this.projectService.updatePassword(email, password);

            if (typeof(response) == "string")
                throw new SyntaxError(response);
 
            return res.status(200).json({
                "request"   : "Projects::changePassword()",
                "response"  : "OK",
                "project"      : "Password changed",
            });
        }
        catch (error)
        {
            return res.status(400).json({
                "request"   : "Projects:changePassword()",
                "response"  : "KO",
                "message"   : error instanceof SyntaxError ? String(error) : error,
            });
        }
    };

    public remove   =  async (req: Request, res: Response) =>
    {
        try{
            const id     = req.params.id;

            const response  = await this.projectService.deleteProject(id);

            return res.status(200).json({
                "request"   : "Projects::remove()",
                "response"  : "OK",
                "message"   : response ? `Project ${id} deleted succesfully` : `Project ${id} not found`,
            });

        }
        catch(error)
        {
            return res.status(400).json({
                "request"   : "Projects:remove()",
                "response"  : "KO",
                "message"   : error
            });
        }
    };

    public show     = async (req: Request, res: Response) =>
    {
        try{

            const id        = req.params.id;

            const projectData  = await this.projectService.getProject(id);

            return res.status(200).json({
                "request"   : "Projects::show()",
                "response"  : "OK",
                "project"      : projectData ?? `Project "${id}" not found`,
            });

        }
        catch(error)
        {
            return res.status(400).json({
                "request"   : "Projects:show()",
                "response"  : "KO",
                "message"   : error,
            });
        }
    };

    public list     = async (_req: Request, res: Response) => {

        return res.status(200).json({
            "request"   : "Projects::list()",
            "response"  : "OK",
            "projects"     : await this.projectService.listProjects(),
        });
    };
}
