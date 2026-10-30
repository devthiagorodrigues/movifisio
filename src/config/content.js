/** Textos do site, organizados por seção. Dados de contato ficam em clinic.js. */

export const nav = [
  { id: 'inicio', label: 'Início' },
  { id: 'a-movi', label: 'A Movi' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'equipe', label: 'Equipe' },
  { id: 'como-funciona', label: 'Como funciona' },
  { id: 'contato', label: 'Contato' },
];

export const cta = {
  header: 'Agendar avaliação',
  hero: 'Agendar uma avaliação',
  heroSecondary: 'Conhecer a Movi',
  contact: 'Agendar pelo WhatsApp',
  faq: 'Falar sobre horários e valores',
};

export const seo = {
  title: 'Movi Fisioterapia | Fisioterapia na Vila Mariana, São Paulo',
  description:
    'Fisioterapia musculoesquelética e recuperação funcional na Vila Mariana, em São Paulo. Atendimento individual, com avaliação e plano de cuidado personalizado.',
};

export const hero = {
  /** Fotografias que se revezam em tela cheia (a primeira é a que carrega com a página). */
  slides: ['hero-avaliacao', 'sala-atendimento', 'esportiva', 'pilates'],
  title: 'Movimento para viver melhor.',
  lead:
    'Cuidado individualizado para ajudar você a recuperar a confiança no movimento e retomar as atividades que fazem parte da sua vida.',
  facts: ['Atendimento individual', 'Plano de cuidado personalizado', 'Acompanhamento da evolução'],
};

/** Vídeo em loop da seção A Movi (arquivo em public/video, pôster em public/img). */
export const video = {
  alt: 'Fisioterapeuta orienta uma pessoa durante um exercício de Pilates em um estúdio iluminado.',
};

export const about = {
  title: 'Seu movimento tem uma história. Nosso cuidado começa por ela.',
  text:
    'Na Movi, cada atendimento começa com escuta. Queremos entender o que está dificultando sua rotina, quais atividades são importantes para você e o que deseja recuperar. A partir dessa conversa e da avaliação fisioterapêutica, construímos um plano de cuidado com objetivos claros e acompanhamento próximo.',
  spaces: [
    { photo: 'recepcao' },
    { video: 'sala-atendimento' },
    { photo: 'area-exercicios' },
  ],
};

/**
 * Serviços: aparecem apenas os que têm `show: true` (os três principais). Os demais continuam
 * aqui, prontos para voltar à página: basta trocar para `show: true` (recomendado no máximo 4).
 */
export const services = {
  title: 'Cuidado para diferentes momentos da sua vida.',
  items: [
    {
      title: 'Fisioterapia musculoesquelética',
      show: true,
      text: 'Acompanhamento de condições que afetam músculos, articulações e a realização dos movimentos.',
      photo: 'musculoesqueletica',
    },
    {
      title: 'Reabilitação após cirurgias',
      show: false,
      text: 'Cuidado voltado à recuperação funcional, respeitando a avaliação e as orientações pertinentes a cada caso.',
      photo: 'pos-cirurgia',
    },
    {
      title: 'Reabilitação esportiva',
      show: true,
      text: 'Acompanhamento para recuperar capacidades e preparar o retorno gradual à atividade física.',
      photo: 'esportiva',
    },
    {
      title: 'Fisioterapia para pessoas idosas',
      show: true,
      text: 'Atenção à mobilidade, ao equilíbrio e às atividades que ajudam a preservar a autonomia.',
      photo: 'pessoa-idosa',
    },
    {
      title: 'Exercícios terapêuticos',
      show: false,
      text: 'Exercícios selecionados conforme a avaliação, as necessidades e os objetivos de cada pessoa.',
      photo: 'exercicios-terapeuticos',
    },
    {
      title: 'Pilates conduzido por fisioterapeuta',
      show: false,
      text: 'Trabalho com movimento e exercícios adaptados aos objetivos individuais.',
      photo: 'pilates',
    },
  ],
};

export const team = {
  title: 'Pessoas que escutam. Profissionais que acompanham.',
};

export const process = {
  title: 'Um caminho claro, desde o primeiro contato.',
  photo: 'exercicios-terapeuticos',
  steps: [
    {
      title: 'Agende sua avaliação',
      text: 'Entre em contato para conhecer os horários e receber as orientações iniciais.',
    },
    {
      title: 'Conte sua história',
      text: 'Na avaliação, conversamos sobre sua rotina, suas dificuldades e seus objetivos.',
    },
    {
      title: 'Acompanhe seu plano de cuidado',
      text: 'Você participa das decisões e recebe orientações ao longo do acompanhamento.',
    },
  ],
  faqTitle: 'Perguntas frequentes',
  faq: [
    {
      q: 'Como funciona a primeira avaliação?',
      a: 'Começamos conversando sobre a sua história e sobre o que você quer voltar a fazer. Depois fazemos a avaliação fisioterapêutica e explicamos o plano que faz sentido para o seu caso.',
    },
    {
      q: 'Preciso levar exames?',
      a: 'Se você já tem exames ou laudos sobre o que está sentindo, traga para a avaliação: ajudam a entender o seu histórico. Se não tem, tudo bem: pode agendar do mesmo jeito.',
    },
    {
      q: 'Quais roupas devo usar?',
      a: 'Vá com roupas confortáveis, que deixem você se mexer e mostrar a região avaliada, como short ou bermuda e camiseta. Um tênis ou outro calçado fechado ajuda nos exercícios.',
    },
    {
      q: 'Quantas sessões vou precisar?',
      a: 'Depende da avaliação e de como você evolui. Frequência e duração são combinadas com você e revistas ao longo do acompanhamento, por isso não existe um número fixo de sessões.',
    },
    {
      q: 'O atendimento é particular?',
      a: 'Sim. O atendimento da Movi é particular, presencial e com horário marcado.',
    },
    {
      q: 'Como consultar horários e valores?',
      a: 'Fale com a gente pelo canal de agendamento. Por lá passamos os horários disponíveis, os valores e o que levar na primeira avaliação.',
      cta: true,
    },
  ],
};

export const contact = {
  title: 'Vamos conversar sobre o seu próximo movimento?',
  lead: 'Conte o que você quer voltar a fazer e a gente encontra um horário bom para a sua primeira avaliação.',
  attendance: 'Particular, presencial e com horário marcado.',
};

export const footer = {
  nav: 'Navegação',
  privacy: 'Política de privacidade',
  about: 'Atendimento individual e com horário marcado, para entender o que você precisa e acompanhar a sua recuperação de perto.',
  hours: 'Horários',
};
