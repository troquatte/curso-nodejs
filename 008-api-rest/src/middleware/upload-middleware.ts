import fs from 'node:fs';
import multer from 'multer';
import path from 'node:path';
import mime from 'mime';

import { Request } from 'express';

class MiddlewareUpload {
  private _storage: multer.StorageEngine | undefined;
  private _userPath = ['assets', 'files'];

  constructor() {
    this._configureStorage();
  }

  private _configureStorage() {
    this._storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const tokenUserId = req.tokenUserId;
        const paramsId = req.params.id;

        if (
          !file ||
          !fs.existsSync(path.resolve(...this._userPath, tokenUserId, paramsId))
        ) {
          return cb(null, '');
        }

        return cb(null, path.resolve(...this._userPath, tokenUserId, paramsId));
      },
      filename: (req, file, cb) => {
        if (file) {
          const fileName = new Date().getTime();
          const type = mime.getExtension(file.mimetype);
          return cb(null, `${fileName}.${type}`);
        }

        return cb(null, '');
      },
    });
  }

  private _fileFilter() {
    return (
      req: Request,
      file: Express.Multer.File,
      cb: multer.FileFilterCallback,
    ) => cb(null, true);
  }

  get getConfig(): multer.Options {
    return {
      storage: this._storage,
      fileFilter: this._fileFilter(),
    };
  }
}

export const middlewareUpload = new MiddlewareUpload();
