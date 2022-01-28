# teste-sinosbyte

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

Parte inicial do código, onde uso a biblioteca **Readline** para criar uma interface para capturar o input do usuário.

```
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
```
Foi criado um Array (**listaDeAlunos**) para armazenar os dados que serão transmitidos do objeto **Aluno** (abstração de um banco de dados).

A função **salvarDado**s recebe os dados nos parâmetro **valor** e **array**,  e insere no **array** as informações contidas no parâmetro **valor**. (abstração de salvar no banco de dados).

A função **lerDados** recebe os dados nos parâmetros **array** e **posicao** e retorna o valor daquela posição dentro daquele array.

A função **lerImput** recebe a pergunta que será feita para o usuário e retorna uma **Promise** que será resolvida com a confirmação do input do usuário e retornará o valor deste input.

```
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
```
A função **lerAluno** é uma função genérica para ler o input de todos os dados de um aluno. Define um objeto aluno e de forma assíncrona recebe o valor de cada campo desse objeto vindo do input do usuário, por isso a necessidade de usar **async/await.**

Depois é calculado da média, usando o **Number** para converter a string em número.
Foi usado no campo aprovado um ternário para definir o valor de aprovado.
Por fim, chama a função **salvarDados** para salvar os dados de aluno dentro do array **listaDeAlunos**.

```
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

```
A função principal do programa é a **main**, onde se executa os laços para ler os dados dos alunos, verificar quantos alunos serão inseridos, dando ao usuário a liberdade de registrar quantos alunos quiser desde que seja inferior a 5 alunos.
Nessa função também é exibido os dados dos alunos ao final da inserção dos inputs.
É utilizado **async/await** nessa função para aguardar a resposta do usuário quanto a querer cadastrar ou não um novo aluno e, caso diferente de **S**, já passa para o display dos alunos.
Por fim, após todas as funções serem definidas, a função **main**    é executada.
