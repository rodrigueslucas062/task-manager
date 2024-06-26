export const placeholders = [
  "Estudar programação",
  "Tirar o lixo",
  "Limpar a casa",
  "Pagar as contas",
  "Ler 10 páginas de um livro",
  "Fazer atividades físicas",
  "Cozinhar uma refeição saudável",
  "Organizar a papelada",
  "Assista a um tutorial de programação",
  "Escrever em um diário por 10 minutos",
  "Fazer uma pausa para meditar",
  "Pesquisar e planejar uma viagem",
  "Aprender uma nova habilidade",
  "Fazer uma caminhada ao ar livre",
  "Assistir a um filme",
  "Iniciar uma série no Netflix",
  "Maratonar um anime",
  "Jogar um novo jogo de vídeo game",
  "Experimentar um novo jogo de tabuleiro",
  "Assistir a um documentário interessante",
  "Explorar podcasts",
  "Organizar uma sessão de RPG de mesa",
  "Jogar uma partida de Magic",
];

export const questions = [
  "O que faremos hoje?",
  "Já terminou aquela série?",
  "Desinstalar League of Legends?",
  "Pronto para jogar?",
  "Hora do lanche?",
  "Novidades?",
  "Pensando em algo novo?",
  "Que tal um filme?",
  "Precisa de ajuda?",
  "E aí?",
  "Quais os planos?",
  "Tudo bem?",
  "Sugestões?",
  "Escolheu um jogo?",
  "Fez progresso?",
  "Hora de descansar?",
  "Como foi o dia?",
  "Fazendo algo interessante?",
  "O que acha?",
];

export const generateRandomPlaceholder = () => {
  const randomIndex = Math.floor(Math.random() * placeholders.length)
  return placeholders[randomIndex]
}

export const generateRandomQuestion = () => {
  const randomIndex = Math.floor(Math.random() * questions.length)
  return questions[randomIndex]
}