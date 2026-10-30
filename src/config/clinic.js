/**
 * Dados da clínica — ÚNICO lugar para editar informações de contato e identificação.
 *
 * Tudo que estiver vazio ('') simplesmente não aparece no site: nenhum campo
 * vazio ou aviso técnico é exibido aos visitantes.
 *
 * Os itens marcados em `confirmed` ainda precisam de confirmação da clínica.
 * Enquanto `confirmed.<campo>` for false, o campo correspondente NÃO é usado em
 * dados estruturados, mapa ou sitemap (veja src/lib/seo.js).
 */
export const clinic = {
  name: 'Movi Fisioterapia',
  shortName: 'Movi',
  tagline: 'Movimento para viver melhor.',

  /** true = versão de desenvolvimento: noindex, robots.txt bloqueando, sem sitemap. */
  demoMode: true,

  /** Domínio de produção com https, sem barra final. Ex.: 'https://www.movifisioterapia.com.br' */
  domain: '',

  location: {
    region: 'Vila Mariana', // pendente de confirmação
    city: 'São Paulo',
    state: 'SP',
    /** Endereço completo (rua, número, CEP). Ex.: 'Rua Exemplo, 123 — Vila Mariana, São Paulo — SP, 04000-000' */
    address: '',
    /** Mapa da seção Contato: ponto de referência da região (NÃO é o endereço da clínica). Vazio = sem mapa. */
    map: { query: 'Praça Vila Mariana, Rua Vergueiro, 3307, São Paulo', label: 'Praça Vila Mariana' },
  },

  /** Horários sugeridos — pendentes de confirmação. Formato: [rótulo, horário]. */
  hours: [
    { label: 'Segunda a sexta', time: 'das 7h às 20h', schedule: { days: ['Mo', 'Tu', 'We', 'Th', 'Fr'], opens: '07:00', closes: '20:00' } },
    { label: 'Sábado', time: 'das 8h às 13h', schedule: { days: ['Sa'], opens: '08:00', closes: '13:00' } },
  ],

  contact: {
    /** Somente dígitos com DDI e DDD. Ex.: '5511912345678'. Vazio = botões abrem o aviso de agendamento. */
    whatsapp: '',
    whatsappMessage: 'Olá! Conheci a Movi pelo site e gostaria de saber sobre uma avaliação.',
    /** Usuário sem @. Ex.: 'movifisioterapia' */
    instagram: '',
    /** Opcional. Telefone para dados estruturados quando confirmado. */
    phone: '',
    /** Opcional. E-mail para pedidos de privacidade (LGPD); aparece na página de privacidade. */
    privacyEmail: '',
  },

  /** Itens que a clínica ainda precisa confirmar antes da versão indexável. */
  confirmed: {
    region: false,
    hours: false,
    address: false,
    whatsapp: false,
    domain: false,
  },

  /**
   * Profissionais. A seção Equipe mostra a identificação por função.
   * Preencha name / education / registry / photo para exibir os dados reais.
   * `photo`: hoje são fotografias de banco ilustrando o tipo de cuidado (não são os profissionais). Troque por fotos reais. É o nome de um arquivo em assets-src/photos (sem extensão) registrado em src/config/photos.js.
   * Registro profissional: informe apenas dados reais (ex.: 'CREFITO-3/000000-F').
   */
  professionals: [
    {
      role: 'Coordenação clínica e fisioterapia musculoesquelética',
      focus: 'Cuida de quem sente dor ou limitação em músculos e articulações, da avaliação ao acompanhamento.',
      name: '',
      education: '',
      registry: '',
      photo: 'equipe-1',
    },
    {
      role: 'Reabilitação esportiva e recuperação funcional',
      focus: 'Ajuda a voltar à atividade física aos poucos, recuperando a capacidade e a confiança no movimento.',
      name: '',
      education: '',
      registry: '',
      photo: 'equipe-2',
    },
    {
      role: 'Cuidado da pessoa idosa e Pilates',
      focus: 'Trabalha mobilidade e equilíbrio com exercícios adaptados, para manter a autonomia no dia a dia.',
      name: '',
      education: '',
      registry: '',
      photo: 'equipe-3',
    },
  ],

  /** Mensagem do diálogo exibido enquanto o canal de agendamento não está configurado. */
  bookingUnavailable: {
    title: 'Agendamento em breve',
    message: 'O agendamento por aqui ainda não foi ativado. Em breve você poderá pedir a sua avaliação direto pelo site.',
  },

  /** Crédito de desenvolvimento no rodapé: a frase inteira é um link discreto. */
  credit: { prefix: 'Desenvolvido por', label: 'Thiago Labs', url: 'https://thiagolabs.com.br' },
};
