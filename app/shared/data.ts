const FORMAS: { [key: string]: { [key: string]: string } } = {
  ["cubo"]: {
    title: "Cubo",
    name: "cubo",
    type: "Sólido",
  },
  ["esfera"]: {
    title: "Esfera",
    name: "esfera",
    type: "Sólido",
  },
};

type QuestionsType = {
  question: String;
  options: {
    [key: string]: string;
  };
  state: boolean;
  answer: string;
};

const QUESTIONS: QuestionsType[] = [
  {
    question: "Qual é a forma geométrica com 4 lados, mas sem ângulos retos?",
    options: {
      ["1"]: "Trapézio",
      ["2"]: "Quadrado",
      ["answer"]: "Losango",
    },
    state: false,
    answer: "",
  },
  {
    question:
      "Qual é a forma geométrica com todos os lados de comprimento igual?",
    options: {
      ["1"]: "Retângulo",
      ["2"]: "Hexágono",
      ["answer"]: "Triângulo",
    },
    state: false,
    answer: "",
  },
  {
    question: "Qual é a forma geométrica que tem um número infinito de lados?",
    options: {
      ["1"]: "Pentágono",
      ["2"]: "Octógono",
      ["answer"]: "Círculo",
    },
    state: false,
    answer: "",
  },
  {
    question: "Qual é o nome da forma geométrica com 5 lados?",
    options: {
      ["1"]: "Quadrado",
      ["2"]: "Trapézio",
      ["answer"]: "Pentágono",
    },
    state: false,
    answer: "",
  },
  {
    question: "Qual é o nome da forma geométrica com 6 lados?",
    options: {
      ["1"]: "Triângulo",
      ["2"]: "Octógono",
      ["answer"]: "Hexágono",
    },
    state: false,
    answer: "",
  },
  {
    question: "Qual é a forma geométrica que possui todos os ângulos retos?",
    options: {
      ["1"]: "Triângulo",
      ["2"]: "Losango",
      ["answer"]: "Quadrado",
    },
    state: false,
    answer: "",
  },
  {
    question: "Qual é o nome da forma geométrica que tem 8 lados?",
    options: {
      ["1"]: "Hexágono",
      ["2"]: "Dodecágono",
      ["answer"]: "Octógono",
    },
    state: false,
    answer: "",
  },
  {
    question: "Qual é o nome da forma geométrica que tem 12 lados?",
    options: {
      ["1"]: "Pentágono",
      ["2"]: "Triângulo",
      ["answer"]: "Dodecágono",
    },
    state: false,
    answer: "",
  },
  {
    question: "Qual é o nome da forma geométrica que tem 7 lados?",
    options: {
      ["1"]: "Pentágono",
      ["2"]: "Octógono",
      ["answer"]: "Heptágono",
    },
    state: false,
    answer: "",
  },
  {
    question: "Qual é o nome da forma geométrica que tem 10 lados?",
    options: {
      ["1"]: "Hexágono",
      ["2"]: "Dodecágono",
      ["answer"]: "Decágono",
    },
    state: false,
    answer: "",
  },
  {
    question: "Qual é a forma geométrica que tem apenas um lado e um ângulo?",
    options: {
      ["1"]: "Linha",
      ["2"]: "Círculo",
      ["answer"]: "Ponto",
    },
    state: false,
    answer: "",
  },
  {
    question: "Qual é a forma geométrica que tem dois lados e dois ângulos?",
    options: {
      ["1"]: "Retângulo",
      ["2"]: "Trapézio",
      ["answer"]: "Triângulo",
    },
    state: false,
    answer: "",
  },
  {
    question: "Qual é o nome da forma geométrica que tem 9 lados?",
    options: {
      ["1"]: "Hexágono",
      ["2"]: "Dodecágono",
      ["answer"]: "Nonágono",
    },
    state: false,
    answer: "",
  },
  {
    question:
      "Qual é a forma geométrica que tem todos os lados de tamanhos diferentes?",
    options: {
      ["1"]: "Losango",
      ["2"]: "Trapézio",
      ["answer"]: "Triângulo",
    },
    state: false,
    answer: "",
  },
  {
    question: "Qual é o nome da forma geométrica que tem 11 lados?",
    options: {
      ["1"]: "Decágono",
      ["2"]: "Dodecágono",
      ["answer"]: "Undecágono",
    },
    state: false,
    answer: "",
  },
  {
    question:
      "Qual é a forma geométrica que tem dois lados paralelos e dois lados de comprimento diferente?",
    options: {
      ["1"]: "Quadrado",
      ["2"]: "Retângulo",
      ["answer"]: "Trapézio",
    },
    state: false,
    answer: "",
  },
  {
    question: "Qual é o nome da forma geométrica que tem 14 lados?",
    options: {
      ["1"]: "Hexágono",
      ["2"]: "Dodecágono",
      ["answer"]: "Tetradecágono",
    },
    state: false,
    answer: "",
  },
  {
    question: "Qual é o nome da forma geométrica que tem 20 lados?",
    options: {
      ["1"]: "Pentágono",
      ["2"]: "Dodecágono",
      ["answer"]: "Icoságono",
    },
    state: false,
    answer: "",
  },
  {
    question: "Qual é a forma geométrica que tem quatro lados e ângulos retos?",
    options: {
      ["1"]: "Trapézio",
      ["2"]: "Losango",
      ["answer"]: "Quadrado",
    },
    state: false,
    answer: "",
  },
];

export { FORMAS, QUESTIONS };
