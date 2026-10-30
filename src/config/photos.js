/**
 * Fotografias de banco (Pexels, licença gratuita para uso comercial). Servem como apoio visual:
 * não retratam profissionais nem instalações da Movi. Créditos completos em docs/CREDITS.md.
 *
 * pos = object-position (foco do enquadramento). patches = retoques para remover marcas comerciais.
 */
export const photos = {
  'hero-avaliacao': {
    alt: 'Fisioterapeuta acompanhando uma pessoa deitada na maca em uma sala clara e acolhedora.',
    pos: '66% 40%',
    // Retoque: cobre uma marca comercial pequena na bermuda (coordenadas em pixels da foto original).
    patches: [{ from: [830, 800], to: [935, 796], size: [112, 72] }],
  },
  'sala-atendimento': {
    alt: 'Fisioterapeuta orienta uma pessoa em um exercício de equilíbrio sobre o piso, em uma sala iluminada.',
    pos: '50% 35%',
    // Retoque: cobre o logotipo estampado na camiseta (coordenadas em pixels da foto original).
    patches: [{ from: [1385, 995], to: [1338, 1106], size: [160, 112] }],
  },
  recepcao: {
    alt: 'Ambiente amplo e claro, com iluminação suave e acabamentos em tons neutros.',
    pos: '50% 50%',
  },
  'area-exercicios': {
    alt: 'Estúdio claro com equipamentos de Pilates e espaço livre para exercícios.',
    pos: '40% 40%',
  },
  musculoesqueletica: {
    alt: 'Pessoa deitada com os braços elevados enquanto a fisioterapeuta apoia o movimento.',
    pos: '50% 50%',
  },
  'pos-cirurgia': {
    alt: 'Detalhe de uma sessão de fisioterapia no joelho, com a perna apoiada na maca.',
    pos: '50% 55%',
  },
  esportiva: {
    alt: 'Pessoa fazendo exercício de alongamento no solo em um espaço de treino iluminado.',
    pos: '50% 45%',
  },
  'pessoa-idosa': {
    alt: 'Mulher de cabelos grisalhos sorrindo, apoiada em uma árvore e segurando um tapete de exercícios.',
    pos: '50% 35%',
  },
  'exercicios-terapeuticos': {
    alt: 'Profissional orienta uma mulher que realiza um exercício com halter.',
    pos: '50% 45%',
  },
  pilates: {
    alt: 'Pessoa realizando um exercício em equipamento de Pilates, com acompanhamento.',
    pos: '50% 50%',
  },
  'equipe-1': {
    alt: 'Fisioterapeuta de uniforme azul-claro realizando um exercício com a perna de um paciente.',
    pos: '50% 45%',
  },
  'equipe-2': {
    alt: 'Fisioterapeuta acompanhando um paciente deitado, em uma sala com luz natural.',
    pos: '50% 40%',
  },
  'equipe-3': {
    alt: 'Fisioterapeuta realizando uma manobra de cuidado em um paciente, em um ambiente claro.',
    pos: '50% 40%',
  },
};
