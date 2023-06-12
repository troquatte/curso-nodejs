import { Request, Response } from 'express';
import { z } from 'zod';

// Service
import { userService } from '../service/user-service';

// Enum
import { EZod } from 'enum/zod.enum';
import { ECrud } from 'enum/crud.enum';
import { EStatusErrors } from 'enum/status-errors.enum';

class UserController {
  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    try {
      const ZUserSchema = z.object({
        name: z.string().optional(),
        email: z.string().email({ message: `Email ${EZod.REQUIRED}` }),
        password: z.string().min(8, { message: `Senha ${EZod.REQUIRED}` }),
      });
      ZUserSchema.parse({ name, email, password });
    } catch (err: any) {
      return res.status(400).json({
        message: EStatusErrors.E400,
        error: err.errors,
      });
    }

    try {
      return res.json({
        message: ECrud.CREATE,
        data: await userService.create(name, email, password),
      });
    } catch (err: any) {
      return res.status(409).json({
        message: err.message,
      });
    }
  }

  public async read(req: Request, res: Response) {
    const paramsId = req.params.id;

    try {
      const ZUserSchema = z
        .string()
        .min(30, { message: `ID ${EZod.REQUIRED}` });
      ZUserSchema.parse(paramsId);
    } catch (err: any) {
      return res.status(400).json({
        message: EStatusErrors.E400,
        error: err.errors,
      });
    }

    try {
      return res.json({
        message: ECrud.READ,
        data: await userService.read(paramsId),
      });
    } catch (err: any) {
      return res.status(404).json({
        error: err.message,
      });
    }
  }

  public async update(req: Request, res: Response) {
    const paramsId = req.params.id;
    const { name } = req.body;

    try {
      const ZUserSchema = z.object({
        paramsId: z.string().min(30, { message: `ID ${EZod.REQUIRED}` }),
        name: z.string().min(1, { message: `Nome ${EZod.REQUIRED}` }),
      });
      ZUserSchema.parse({ paramsId, name });
    } catch (err: any) {
      return res.status(400).json({
        message: EStatusErrors.E400,
        error: err.errors,
      });
    }

    try {
      return res.json({
        message: ECrud.UPDATE,
        data: await userService.update(paramsId, name),
      });
    } catch (err: any) {
      return res.status(404).json({
        error: err.message,
      });
    }
  }

  public async delete(req: Request, res: Response) {
    const paramsId = req.params.id;

    try {
      const ZUserSchema = z
        .string()
        .min(30, { message: `ID ${EZod.REQUIRED}` });
      ZUserSchema.parse(paramsId);
    } catch (err: any) {
      return res.status(400).json({
        message: EStatusErrors.E400,
        error: err.errors,
      });
    }

    try {
      await userService.delete(paramsId);

      return res.json({
        message: ECrud.DELETE,
      });
    } catch (err: any) {
      return res.status(404).json({
        error: err.message,
      });
    }
  }
}

export const userController = new UserController();
