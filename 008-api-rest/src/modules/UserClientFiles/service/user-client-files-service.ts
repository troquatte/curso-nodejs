import fs from 'node:fs';
import path from 'node:path';

import moment from 'moment';
import { prismaConnect } from 'prismaConn';

// Enum
import { EStatusErrors } from 'enum/status-errors.enum';
import { UtilsFileUser } from 'utils/file-utils';

class UserClientFilesService {
  private _fileUrl = ['assets', 'files'];

  public async create(
    paramsId: string,
    tokenUserId: string,
    name: string,
    date: Date,
    description: string,
    file: string,
  ) {
    const findClient = await prismaConnect.userClient.findUnique({
      where: {
        id: paramsId,
      },
    });

    if (!findClient) {
      throw new Error(EStatusErrors.E404);
    }

    const create = await prismaConnect.userClientFiles.create({
      data: {
        name,
        date,
        file,
        description,
        userId: tokenUserId,
        userClientId: paramsId,
      },
    });

    return create;
  }
  public async read(paramsId: string, tokenUserId: string) {
    const findUserClient = await prismaConnect.userClientFiles.findFirst({
      where: {
        id: paramsId,
        userId: tokenUserId,
      },
      include: {
        userClient: {},
      },
    });

    if (!findUserClient) {
      throw new Error(EStatusErrors.E404);
    }

    return findUserClient;
  }
  public async listAll(
    paramsId: string,
    paramsYear: string,
    tokenUserId: string,
  ) {
    const startDate = moment(`${paramsYear}`).startOf('year').format();
    const endDate = moment(`${paramsYear}`).endOf('year').format();

    const findAll = await prismaConnect.userClientFiles.findMany({
      where: {
        userClientId: paramsId,
        userId: tokenUserId,
        date: {
          gt: startDate,
          lt: endDate,
        },
      },
    });

    if (!findAll) {
      throw new Error(EStatusErrors.E404);
    }

    let monthRecords: Array<number> = [];
    let monthCounts: any = {};

    findAll.forEach((record) => {
      const month = record.date.getMonth();
      monthRecords.push(month);
    });

    monthRecords.forEach((month) => {
      if (monthCounts[month]) {
        return monthCounts[month]++;
      }
      return (monthCounts[month] = 1);
    });

    const count = Object.entries(monthCounts).map(([month, total]) => {
      return {
        month: Number(month) + 1,
        total,
      };
    });

    return { count, results: findAll };
  }

  public async update(
    paramsId: string,
    tokenUserId: string,
    id: string,
    name: string,
    date: Date,
    description: string,
    file: string,
  ) {
    const find = await prismaConnect.userClientFiles.findFirst({
      where: {
        id,
        userClientId: paramsId,
        userId: tokenUserId,
      },
    });

    if (!find) {
      throw new Error(EStatusErrors.E404);
    }
    const update = await prismaConnect.userClientFiles.update({
      where: {
        id,
        userClientId: paramsId,
        userId: tokenUserId,
      },
      data: {
        name,
        date,
        description,
        file,
      },
    });

    const fileUrl = ['assets', 'files', tokenUserId, paramsId];
    if (fs.existsSync(path.resolve(...fileUrl))) {
      fs.rmSync(path.resolve(...fileUrl, find.file));
    }

    return update;
  }

  public async delete(paramsId: string, tokenUserId: string) {
    const find = await prismaConnect.userClientFiles.findFirst({
      where: {
        id: paramsId,
        userId: tokenUserId,
      },
    });

    if (!find) {
      throw new Error(EStatusErrors.E404);
    }

    const deleteUserClientFile = await prismaConnect.userClientFiles.delete({
      where: {
        id: paramsId,
        userId: tokenUserId,
      },
    });

    UtilsFileUser.deleteFolderUser([
      deleteUserClientFile.userId,
      deleteUserClientFile.userClientId,
      deleteUserClientFile.file,
    ]);

    return deleteUserClientFile;
  }
}

export const userClientFilesService = new UserClientFilesService();
