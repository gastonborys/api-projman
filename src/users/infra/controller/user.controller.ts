import { Request, Response } from "express";
import { UserService } from "../../app/user.service";

export class UserController{

    constructor( private userService: UserService ){}

    public create   = async (_req: Request, res: Response) =>
    {
        try{
            const newUser   = JSON.parse(_req.body.user);

            const response  = await this.userService.createUser(newUser);

            if (typeof(response) == "string")
                throw new SyntaxError(response);
                
            return res.status(200).json({
                "request"   : "Users::create()",
                "response"  : "OK",
                "user"      : response,
            });
        }
        catch(error)
        {
           return res.status(400).json({
                "request"   : "Users:create()",
                "response"  : "KO",
                "message"   : error instanceof SyntaxError ? String(error) : error,
            });
        }
    };

    public update   = async (req: Request, res: Response) =>
    {
        try {
            const id:string     = req.params.id;

            const userData      = JSON.parse(req.body.user);

            const response      = await this.userService.updateUser(id, userData);

            if (typeof(response) == "string")
                throw new SyntaxError(response);
 
            return res.status(200).json({
                "request"   : "Users::update()",
                "response"  : "OK",
                "user"      : response,
            });
        }
        catch (error)
        {
            return res.status(400).json({
                "request"   : "Users:update()",
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

            const response      = await this.userService.updatePassword(email, password);

            if (typeof(response) == "string")
                throw new SyntaxError(response);
 
            return res.status(200).json({
                "request"   : "Users::changePassword()",
                "response"  : "OK",
                "user"      : "Password changed",
            });
        }
        catch (error)
        {
            return res.status(400).json({
                "request"   : "Users:changePassword()",
                "response"  : "KO",
                "message"   : error instanceof SyntaxError ? String(error) : error,
            });
        }
    };

    public remove   =  async (req: Request, res: Response) =>
    {
        try{
            const id     = req.params.id;

            const response  = await this.userService.deleteUser(id);

            return res.status(200).json({
                "request"   : "Users::remove()",
                "response"  : "OK",
                "message"   : response ? `User ${id} deleted succesfully` : `User ${id} not found`,
            });

        }
        catch(error)
        {
            return res.status(400).json({
                "request"   : "Users:remove()",
                "response"  : "KO",
                "message"   : error
            });
        }
    };

    public show     = async (req: Request, res: Response) =>
    {
        try{

            const id        = req.params.id;

            const userData  = await this.userService.getUser(id);

            return res.status(200).json({
                "request"   : "Users::show()",
                "response"  : "OK",
                "user"      : userData ?? `User "${id}" not found`,
            });

        }
        catch(error)
        {
            return res.status(400).json({
                "request"   : "Users:show()",
                "response"  : "KO",
                "message"   : error,
            });
        }
    };

    public list     = async (_req: Request, res: Response) => {

        return res.status(200).json({
            "request"   : "Users::list()",
            "response"  : "OK",
            "users"     : await this.userService.listUsers(),
        });
    };

    public login   = async (req: Request, res: Response) =>
    {
        try{

            const username  = req.body.username;
            const password  = req.body.password;

            const response  = await this.userService.loginUser(username, password);

            if (typeof(response) == "string")
                throw new SyntaxError(response);
                
            return res.status(200).json({
                "request"   : "Users::login()",
                "response"  : "OK",
                "user"      : response,
            });
        }
        catch(error)
        {
           return res.status(400).json({
                "request"   : "Users:login()",
                "response"  : "KO",
                "message"   : error instanceof SyntaxError ? String(error) : error,
            });
        }
    };

    public register   = async (req: Request, res: Response) =>
    {
        try{
            const newUser   = JSON.parse(req.body.user);

            const response  = await this.userService.createUser(newUser, true);

            if (typeof(response) == "string")
                throw new SyntaxError(response);
                
            return res.status(200).json({
                "request"   : "Users::register()",
                "response"  : "OK",
                "user"      : response,
            });
        }
        catch(error)
        {
           return res.status(400).json({
                "request"   : "Users:register()",
                "response"  : "KO",
                "message"   : error instanceof SyntaxError ? String(error) : error,
            });
        }
    };
}
