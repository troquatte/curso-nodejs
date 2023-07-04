import fs from 'node:fs';
import path from 'node:path';

// Enum
import { EStatusErrors } from 'enum/status-errors.enum';

export class UtilsFileUser {
  private static _userPath = ['assets', 'files'];

  private static _validateFolder(pathArray: string | Array<string>) {
    if (Array.isArray(pathArray)) {
      return fs.existsSync(path.resolve(...this._userPath, ...pathArray));
    }

    return fs.existsSync(path.resolve(...this._userPath, pathArray));
  }

  public static createFolderUser(pathArray: string | Array<string>) {
    if (!this._validateFolder(pathArray)) {
      if (Array.isArray(pathArray)) {
        return fs.mkdirSync(path.resolve(...this._userPath, ...pathArray));
      }

      return fs.mkdirSync(path.resolve(...this._userPath, pathArray));
    }
  }

  public static deleteFolderUser(pathArray: string | Array<string>) {
    if (this._validateFolder(pathArray)) {
      if (Array.isArray(pathArray)) {
        return fs.rmSync(path.resolve(...this._userPath, ...pathArray), {
          recursive: true,
        });
      }
      return fs.rmSync(path.resolve(...this._userPath, pathArray), {
        recursive: true,
      });
    }

    throw new Error(EStatusErrors.E404);
  }
}
