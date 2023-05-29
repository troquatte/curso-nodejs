import fs from 'node:fs';
import path from 'node:path';

try {
  // Criação de diretorios
  if (!fs.existsSync(path.resolve('tmp'))) {
    console.log(path.resolve('tmp'));
    fs.mkdirSync(path.resolve('tmp'));
  }

  // Criação de arquivos
  const caminhoArquivo = path.resolve('tmp', 'arquivo.txt');
  if (!fs.existsSync(caminhoArquivo)) {
    const content = 'Deu bom na criação do arquivo!';
    fs.writeFileSync(caminhoArquivo, content, 'utf8');
  }

  //Leitura e edição de arquivos
  const meuTextoDoArquivo = fs.readFileSync(caminhoArquivo, 'utf8');
  fs.writeFileSync(caminhoArquivo, `${meuTextoDoArquivo}\ntest`);

  // Renomeando arquivos e pastas
  fs.renameSync(
    path.resolve('tmp', 'nova-pasta-01', 'arquivo-01.txt'),
    path.resolve('tmp', 'nova-pasta-01', 'arquivo-02.txt'),
  );

  // Deletando arquivos e pastas
  fs.unlinkSync(
    path.resolve('tmp', 'nova-pasta-01', 'pode-deletar', 'arquivo.txt'),
  );
  fs.rmdirSync(path.resolve('tmp', 'nova-pasta-01', 'pode-deletar'));

  console.log(
    fs.readdirSync(path.resolve('tmp', 'nova-pasta-01', 'pode-deletar')),
  );

  fs.rmSync(path.resolve('tmp', 'nova-pasta-01', 'pode-deletar'), {
    recursive: true,
  });
} catch (error) {
  console.log(error);
}
