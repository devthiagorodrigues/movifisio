import { esc } from '../lib/html.js';

const month = () => new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

/** Página de privacidade: deixa claro que é um projeto de demonstração e descreve só o que o site realmente faz. */
export function privacyBody(ctx) {
  const { clinic, hasWhatsapp } = ctx;
  const hasMap = Boolean(clinic.location.map && clinic.location.map.query);
  const labs = `<a class="link" href="${esc(clinic.credit.url)}" target="_blank" rel="noopener noreferrer">Thiago Labs<span class="sr-only"> (abre em uma nova aba)</span></a>`;
  const external = ['o Google (mapa)', 'o site da Thiago Labs'];
  if (clinic.contact.instagram) external.unshift('o Instagram');
  return `<div class="container legal">
      <h1 class="legal__title">Política de privacidade</h1>
      <p class="legal__meta">Atualizada em ${esc(month())}.</p>

      <div class="legal__notice">
        <h2 class="legal__h legal__h--first">Sobre este site</h2>
        <p>Este site é um projeto modelo, de demonstração, criado pela ${labs} para mostrar conhecimento e trabalho em desenvolvimento de sites. A ${esc(clinic.name)} é uma empresa fictícia: não existe clínica, e os textos, horários, localização, equipe e fotografias são ilustrativos. As fotos vêm de um banco de imagens gratuito.</p>
      </div>

      <h2 class="legal__h">Não coletamos dados</h2>
      <p>Este site não coleta dados pessoais. Não tem formulários, não pede dados de saúde, não usa cookies próprios e não usa ferramentas de análise, publicidade ou rastreamento.</p>

      <h2 class="legal__h">Hospedagem na Vercel</h2>
      <p>O site está hospedado na Vercel. Para entregar as páginas, a Vercel pode registrar dados técnicos de acesso, como endereço IP, navegador, data e horário, por segurança e para o funcionamento do serviço, conforme a política de privacidade dela. Este projeto não usa esses registros para identificar visitantes.</p>
${
  hasMap
    ? `
      <h2 class="legal__h" id="mapa">Mapa do Google</h2>
      <p>A seção Contato mostra um mapa incorporado do Google Maps, apontando uma referência da região (não é o endereço de uma clínica, porque ela não existe). Ao carregar o mapa, o Google recebe dados da sua navegação, como o endereço IP e informações do navegador, e pode usar cookies, conforme a política de privacidade do Google.</p>
`
    : ''
}
      <h2 class="legal__h">Botões de agendamento</h2>
      <p>${
        hasWhatsapp
          ? 'Os botões de agendamento abrem o WhatsApp com uma mensagem pronta. A partir daí, a conversa segue as regras do WhatsApp.'
          : 'Por ser uma demonstração, os botões de agendamento apenas mostram um aviso e não enviam nenhum dado.'
      }</p>

      <h2 class="legal__h">Links para outros sites</h2>
      <p>Ao clicar em links para ${external.join(' ou ')}, você passa a seguir as regras de privacidade de cada um.</p>

      <h2 class="legal__h">Dúvidas</h2>
      <p>Como este projeto não coleta dados pessoais, não há dados para acessar, corrigir ou excluir. Para falar sobre o projeto, visite o site da ${labs}.</p>
      <p class="legal__back"><a class="btn btn--primary" href="./">Voltar ao site</a></p>
    </div>`;
}

export function notFoundBody() {
  return `<div class="container legal">
      <h1 class="legal__title">Página não encontrada</h1>
      <p>O endereço que você abriu não existe ou mudou de lugar.</p>
      <p class="legal__back"><a class="btn btn--primary" href="./">Ir para o início</a></p>
    </div>`;
}
