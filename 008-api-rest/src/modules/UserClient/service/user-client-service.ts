import { prismaConnect } from 'prismaConn';

// Utils
import { UtilsFileUser } from 'utils/file-utils';

// Enum
import { EStatusErrors } from 'enum/status-errors.enum';

class UserClientService {
  public async create(
    tokenUserId: string,
    name: string,
    email: string,
    phone: string,
  ) {
    const findUser = await prismaConnect.user.findUnique({
      where: {
        id: tokenUserId,
      },
    });

    if (!findUser) {
      throw new Error(EStatusErrors.E404);
    }

    const create = await prismaConnect.userClient.create({
      data: {
        name,
        email,
        phone,
        userId: tokenUserId,
      },
    });

    UtilsFileUser.createFolderUser([create.userId, create.id]);

    return create;
  }

  public async read(paramsId: string, tokenUserId: string) {
    const findUserClient = await prismaConnect.userClient.findFirst({
      where: {
        id: paramsId,
        userId: tokenUserId,
      },
      include: {
        userClientFiles: {
          select: {
            date: true,
          },
        },
      },
    });

    if (!findUserClient) {
      throw new Error(EStatusErrors.E404);
    }

    let yearRecords: Array<number> = [];
    let yearCouts: any = {};

    findUserClient.userClientFiles.forEach((record) => {
      const year = record.date.getFullYear();
      yearRecords.push(year);
    });

    yearRecords.forEach((year) => {
      if (yearCouts[year]) {
        return yearCouts[year]++;
      }

      yearCouts[year] = 1;
    });

    const userClientParse = JSON.parse(JSON.stringify(findUserClient));
    delete userClientParse.userClientFiles;

    const count = Object.entries(yearCouts).map(([year, total]) => {
      return {
        year,
        total,
      };
    });

    return { ...userClientParse, count };
  }

  public async listAll(
    tokenUserId: string,
    page: number,
    search: string | undefined,
  ) {
    const pageSize = 11;
    const skip = (page - 1) * pageSize;
    let findUser;

    if (!search) {
      findUser = await prismaConnect.user.findMany({
        where: {
          id: tokenUserId,
        },
        include: {
          userClient: {
            skip,
            take: pageSize,
          },
        },
      });
    } else {
      findUser = await prismaConnect.user.findMany({
        where: {
          id: tokenUserId,
        },
        include: {
          userClient: {
            skip,
            take: pageSize,
            where: {
              name: {
                startsWith: search,
                mode: 'insensitive',
              },
            },
          },
        },
      });
    }

    if (!findUser) {
      throw new Error(EStatusErrors.E404);
    }

    const totalCount = await prismaConnect.userClient.count({
      where: {
        userId: tokenUserId,
      },
    });

    const totalPages = Math.ceil(totalCount / pageSize);

    return {
      page,
      pageSize,
      totalCount,
      totalPages,
      client: findUser[0].userClient,
    };
  }

  public async update(
    name: string,
    email: string,
    phone: string,
    paramsId: string,
    tokenUserId: string,
  ) {
    const findUserClient = await prismaConnect.userClient.findFirst({
      where: {
        id: paramsId,
        userId: tokenUserId,
      },
    });

    if (!findUserClient) {
      throw new Error(EStatusErrors.E404);
    }

    const update = await prismaConnect.userClient.update({
      where: {
        id: paramsId,
      },
      data: {
        name,
        email,
        phone,
      },
    });

    return update;
  }

  public async delete(paramsId: string, tokenUserId: string) {
    const findUserClient = await prismaConnect.userClient.findFirst({
      where: {
        id: paramsId,
        userId: tokenUserId,
      },
    });

    if (!findUserClient) {
      throw new Error(EStatusErrors.E404);
    }

    const deletUserClient = await prismaConnect.userClient.delete({
      where: {
        id: paramsId,
      },
    });

    UtilsFileUser.deleteFolderUser([
      deletUserClient.userId,
      deletUserClient.id,
    ]);

    return deletUserClient;
  }
}

export const userClientService = new UserClientService();
