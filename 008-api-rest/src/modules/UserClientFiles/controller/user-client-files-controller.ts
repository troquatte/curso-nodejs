import fs from 'node:fs';
import path from 'node:path';

import { Request, Response } from 'express';
import mime from 'mime';
import { z } from 'zod';

import { userClientFilesService } from '../service/user-client-files-service';

// Enum
import { EZod } from 'enum/zod.enum';
import { EStatusErrors } from 'enum/status-errors.enum';
import { ECrud } from 'enum/crud.enum';

class UserClientFilesController {
  public async create(req: Request, res: Response) {
    const tokenUserId = req.tokenUserId;
    const paramsId = req.params.id;

    const { name, date, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: EStatusErrors.E400,
      });
    }

    try {
      const conditions = ['png', 'jpg', 'jpeg'];
      const fileType = mime.getType(file.originalname);

      const ZClientFileSchema = z.object({
        paramsId: z.string().min(30, { message: `UC_ID ${EZod.REQUIRED}` }),
        name: z.string().min(1, { message: `Nome ${EZod.REQUIRED}` }),
        date: z.string().datetime({ message: `Data ${EZod.REQUIRED}` }),
        file: z
          .any()
          .refine(() => conditions.some((ext) => fileType?.includes(ext)), {
            message: `Upload aceita apenas: ${conditions}`,
          }),
      });

      ZClientFileSchema.parse({ paramsId, name, date, file });
    } catch (err: any) {
      const fileUrl = ['assets', 'files', tokenUserId, paramsId];
      if (fs.existsSync(path.resolve(...fileUrl))) {
        fs.rmSync(path.resolve(...fileUrl, file.filename));
      }

      return res.status(400).json({
        message: EStatusErrors.E400,
        error: err.errors,
      });
    }

    try {
      return res.json({
        message: ECrud.CREATE,
        data: await userClientFilesService.create(
          paramsId,
          tokenUserId,
          name,
          date,
          description,
          file.filename,
        ),
      });
    } catch (err: any) {
      return res.status(404).json({
        message: err.message,
      });
    }
  }

  public async read(req: Request, res: Response) {
    const paramsId = req.params.id;
    const tokenUserId = req.tokenUserId;

    try {
      const ZClientFileSchema = z
        .string()
        .min(30, { message: `UCF_ID ${EZod.REQUIRED}` });

      ZClientFileSchema.parse(paramsId);
    } catch (err: any) {
      return res.status(400).json({
        message: EStatusErrors.E400,
        error: err.erros,
      });
    }

    try {
      return res.json({
        message: ECrud.READ,
        data: await userClientFilesService.read(paramsId, tokenUserId),
      });
    } catch (err: any) {
      return res.status(404).json({
        erro: err.message,
      });
    }
  }

  public async listAll(req: Request, res: Response) {
    const paramsId = req.params.id;
    const paramsYear = req.params.year;
    const tokenUserId = req.tokenUserId;

    try {
      const ZClientFileSchema = z.object({
        paramsId: z.string().min(30, { message: `UC_ID ${EZod.REQUIRED}` }),
        paramsYear: z.string().min(4, { message: `Data ${EZod.REQUIRED}` }),
      });

      ZClientFileSchema.parse({ paramsId, paramsYear });
    } catch (err: any) {
      return res.status(400).json({
        message: EStatusErrors.E400,
        error: err.errors,
      });
    }

    try {
      return res.json({
        message: ECrud.READ,
        data: await userClientFilesService.listAll(
          paramsId,
          paramsYear,
          tokenUserId,
        ),
      });
    } catch (err: any) {
      return res.status(404).json({
        error: err.message,
      });
    }
  }

  public async update(req: Request, res: Response) {
    const paramsId = req.params.id;
    const tokenUserId = req.tokenUserId;

    const { id, name, date, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: EStatusErrors.E400,
      });
    }

    try {
      const conditions = ['png', 'jpg', 'jpeg'];
      const fileType = mime.getType(file.originalname);

      const ZClientFileSchema = z.object({
        paramsId: z.string().min(30, { message: `UC_ID ${EZod.REQUIRED}` }),
        id: z.string().min(30, { message: `UCF_ID ${EZod.REQUIRED}` }),
        name: z.string().min(1, { message: `Nome ${EZod.REQUIRED}` }),
        date: z.string().datetime({ message: `Data ${EZod.REQUIRED}` }),
        file: z
          .any()
          .refine(() => conditions.some((ext) => fileType?.includes(ext)), {
            message: `Upload aceita apenas: ${conditions}`,
          }),
      });

      ZClientFileSchema.parse({ paramsId, id, name, date, file });
    } catch (err: any) {
      const fileUrl = ['assets', 'files', tokenUserId, paramsId];

      if (fs.existsSync(path.resolve(...fileUrl))) {
        fs.rmSync(path.resolve(...fileUrl, file.filename));
      }

      return res.status(400).json({
        message: EStatusErrors.E400,
        error: err.errors,
      });
    }

    try {
      return res.json({
        message: ECrud.UPDATE,
        data: await userClientFilesService.update(
          paramsId,
          tokenUserId,
          id,
          name,
          date,
          description,
          file.filename,
        ),
      });
    } catch (error) {}
  }

  public async delete(req: Request, res: Response) {
    const paramsId = req.params.id;
    const tokenUserId = req.tokenUserId;

    try {
      const ZClientFileSchema = z
        .string()
        .min(30, { message: `ID ${EZod.REQUIRED}` });

      ZClientFileSchema.parse(paramsId);
    } catch (err: any) {
      return res.status(400).json({
        message: EStatusErrors.E400,
        error: err.errors,
      });
    }

    try {
      await userClientFilesService.delete(paramsId, tokenUserId);
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

export const userClientFilesController = new UserClientFilesController();
