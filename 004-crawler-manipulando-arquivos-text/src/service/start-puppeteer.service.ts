import fs from 'node:fs';
import path from 'node:path';

import puppeteer, { Page } from 'puppeteer';

// Interface
import { IFileGenerator } from 'interface/file-generator.interface';

class StartPuppeteerService {
  constructor() {}

  public start(url: string): Promise<Page> {
    return new Promise(async (resolve, reject) => {
      const browser = await puppeteer.launch({
        headless: false,
      });

      const page = await browser.newPage();
      const allPages = await browser.pages();
      await allPages[0].close();

      await page.goto(url);

      if (!page) return reject('Configuração não corresponde ao esperado!');

      return resolve(page);
    });
  }

  public fileGenerator(payload: Array<IFileGenerator>, fileName: string) {
    const pathTmp = 'tmp';

    if (!fs.existsSync(path.resolve(pathTmp))) {
      fs.mkdirSync(path.resolve(pathTmp));
      console.log('Pasta Criada com Sucesso');
    }

    const csvRows = payload.map((res: IFileGenerator) => {
      return `${res.link};${res.titulo};${res.data}`;
    });

    const csvContent = `Link;Titulo;Data da Postagem\n${csvRows.join('\n')}`;

    try {
      fs.writeFileSync(`${path.resolve(pathTmp, fileName)}.csv`, csvContent);
      return console.log('Arquivo Criado com Sucesso!');
    } catch (error) {}
  }
}

export const startPuppeteerService = new StartPuppeteerService();
