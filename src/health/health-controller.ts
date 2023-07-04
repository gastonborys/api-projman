import { Request, Response } from "express";

export class HealthController {
  async run(_req: Request, res: Response) {
    res.status(200).send("It Works! en Docker");
  }
}
