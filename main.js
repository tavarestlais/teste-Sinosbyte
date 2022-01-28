const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const listaDeAlunos = [];

const salvarDados = (valor, array) => {
  array.push(valor);
}

const lerDados = (array, posicao) => {
  return array[posicao];
}

const  lerInput = (pergunta) => {
  return new Promise(resolve => readline.question(pergunta, (input) => resolve(input)))
};

const lerAluno = async (num) => {
  const aluno = {
    codigo: '',
    nome: '',
    nota1: '',
    nota2: '',
    media: '',
    aprovado: '',
  };

  aluno.codigo = await lerInput(`Digite o código do ${num}º Aluno: \n`);
  aluno.nome = await lerInput(`Digite o nome do ${num}º Aluno: \n`);
  aluno.nota1 = await lerInput(`Digite a primeira nota do ${num}º Aluno: \n`);
  aluno.nota2 = await lerInput(`Digite a segunda nota do ${num}º Aluno: \n` );  

  aluno.media = (Number(aluno.nota1) + (Number(aluno.nota2) * 2))/3;
  aluno.aprovado = aluno.media >= 6 ? 'SIM' : 'NÃO';

  salvarDados(aluno, listaDeAlunos);
};


const main = async () => {
  console.log(`CADASTRAR ALUNO: \n`);
  let continuar = 'S';
  for(let i = 1; i <= 5 && continuar.toUpperCase() === 'S'; i++){
    await lerAluno(i);
    console.log(`ALUNO ${i} CADASTRADO COM SUCESSO \n`);
    if(i < 5){
      continuar = await lerInput(`Deseja cadastrar um novo aluno? [S/N] \n`); 
    }
    if(continuar.toUpperCase() !== 'S' || i === 5){
      readline.close();
      console.log('\n');
    }
  }

  let aluno;
  for(let i = 0; i < listaDeAlunos.length; i++){
    aluno = lerDados(listaDeAlunos, i);
    console.log(`ALUNO ${i + 1}`);
    console.log(`Cod.: ${aluno.codigo}`);
    console.log(`Nome: ${aluno.nome}`);
    console.log(`Nota 1: ${aluno.nota1}`);
    console.log(`Nota 2: ${aluno.nota2}`);
    console.log(`Média: ${aluno.media}`);
    console.log(`Aprovado: ${aluno.aprovado}`);
    console.log(`\n`);
  }
}

main();









/* 
readline.question('Who are you?', (name) => {
  
  readline.close();
});
*/