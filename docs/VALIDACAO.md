# Homologação do site da Movi Fisioterapia

> As seções 1 a 6 abaixo descrevem o que foi encontrado **antes** das correções. A seção 0 mostra o estado atual.

Validação feita em 29/10/2026 sobre a versão de desenvolvimento (`dist/`, noindex). Ferramentas: Lighthouse 12 (celular), axe-core, html-validate, inspetor e lint da skill de design, testes de comportamento em Chrome (CDP), varredura de 14 tamanhos de tela, teste sem JavaScript, teste com o WhatsApp configurado em uma cópia, leitura do código e análise do texto (skills `humanizer`, `design-taste-frontend`, `ui-ux-pro-max`, `web-design-guidelines`, `design-is`).

## 0. Status após as correções

Reverificado com os mesmos testes (axe, html-validate, Lighthouse, 320 px a 2560 px, teclado, sem JavaScript, falha do `main.js`, WhatsApp configurado).

| Item da seção 3 | Situação |
| --- | --- |
| 3.1-6 Quebra em 320 px | Corrigido (cartões de serviço e equipe estouravam; cabeçalho também). Sem rolagem horizontal de 320 a 2560 px |
| 3.1-5 LGPD / mapa | Decisão do cliente: o mapa carrega direto (sem clique). A página `privacidade.html` descreve isso e deixa claro que o site é um projeto modelo da Thiago Labs, com empresa fictícia, hospedado na Vercel e sem coleta de dados |
| 3.1-3 Fotos de banco com legenda de instalações | Corrigido: legendas "Recepção / Sala / Área" e o título da galeria foram removidos. Foto da profissional com estetoscópio trocada. **Pendente (cliente):** fotos da equipe continuam de banco |
| 3.1-1, 3.1-2, 3.1-4 Dados não confirmados, WhatsApp, registro profissional | **Pendente (cliente):** não há como corrigir sem os dados reais (ver `CAMPOS.md`). A página de privacidade já se ajusta quando o WhatsApp é configurado |
| 3.2-7 Menu no teclado | Corrigido: o foco vai para o primeiro link ao abrir; Tab percorre os links; Escape fecha e devolve o foco |
| 3.2-8 Animações escondendo conteúdo | Corrigido: o conteúdo só é escondido depois que o JS roda (testado bloqueando o `main.js`: 0 blocos invisíveis). Também reduzi de 18 para 5 blocos animados |
| 3.2-9 Marcação HTML | Corrigido: html-validate sem nenhum aviso nas 3 páginas |
| 3.2-10 Celular deitado / 600 a 699 px | Corrigido: botão visível em 844×390; a composição de celular vale até 599 px |
| 3.2-11 Sem JavaScript | Corrigido: o cabeçalho acompanha a página e não cobre o título |
| 3.2-12 Vídeo | Reduzido de 1,6 MB para 0,9 MB; não carrega com economia de dados ativada |
| 3.2-13 Arquivos mortos | Corrigido: o build só copia o que as páginas usam. `dist/` caiu de 9,0 MB para 4,1 MB |
| 3.2-14 Hospedagem | Preparado: `_headers` (segurança, CSP e cache) e `404.html`. Falta aplicar no servidor escolhido e ativar compressão |
| 3.2-15 e 3.2-16 Foco do mapa e alvo de toque | Corrigido |
| Seção 4.3 do texto (humanizer) | Corrigido nos textos que eu escrevi (rodapé, FAQ, equipe). Os textos do briefing não foram alterados: são decisão do cliente |
| Seção 4.1 visual | Parcial: menos animações de entrada e galeria sem arcos. Mantidos por decisão do cliente: faixa correndo, Hero em tela cheia, cápsula do menu |

Resultados atuais: Lighthouse celular desempenho 95 a 99, acessibilidade 100, boas práticas 100 (SEO 66 só pelo noindex); axe 0 violações; html-validate 0 problemas; 0 erros de console; inspetor de design: 1 falha (título do Hero em 3 linhas no celular, de propósito) e 2 avisos (areia da marca; pouco movimento, consequência de ter reduzido as animações).

---

## 1. Placar

| Verificação | Resultado |
| --- | --- |
| Lighthouse celular: desempenho / acessibilidade / boas práticas | 99 / 100 / 100 |
| Lighthouse SEO | 66, só porque a página está com noindex (esperado em desenvolvimento) |
| LCP / CLS / TBT | 2,1 s (rede lenta simulada) / 0 / 0 ms |
| Peso da página sem o vídeo | 286 KiB; com vídeo, 1,9 MB |
| Erros de console e de rede (HTTP 4xx/5xx) | 0 |
| axe-core, violações | 0 (12 pontos de contraste "a revisar" sobre fotos, conferidos à mão: ver 4.3) |
| Verificador do projeto (links, âncoras, imagens, alt, indexação) | passa |
| html-validate | 4 erros e 6 avisos, todos de marcação (ver 3.9) |
| Inspetor de design | 1 falha conhecida (título do Hero com 3 linhas no celular, de propósito) e 1 aviso (areia da marca) |

## 2. O que funciona (testado)

- Cabeçalho flutuante a 12 px do topo, nav centralizada; o indicador desliza e fica no link clicado durante a rolagem.
- Hero em tela cheia: 4 fotos alternando com abertura em arco, faixa correndo, título palavra por palavra, versão própria para celular.
- Perguntas frequentes: uma aberta por vez, `aria-expanded` correto.
- Diálogo de agendamento: abre, fecha por botão, Escape e clique fora; foco volta ao botão de origem.
- Com WhatsApp configurado (testado em cópia): os 4 botões viram `wa.me` com a mensagem pré-preenchida, `target=_blank` com `rel` seguro, diálogo some, Instagram e endereço aparecem.
- Ano do rodapé atualiza sozinho (testado simulando 2031).
- Mapa do Google carrega e mostra o pino; vídeo toca só quando visível e pausa ao sair.
- Movimento reduzido: sem animação, faixa e fotos paradas, tudo legível.
- Sem JavaScript: conteúdo, primeira foto e faixa estática aparecem; nada fica escondido.
- Ordem de tabulação lógica, foco visível (contorno de 3 px) em todos os controles, link "Pular para o conteúdo".
- Um único H1; hierarquia H1 > H2 > H3 > H4 correta; todas as imagens com `alt` (decorativas com `alt` vazio); imagens com largura e altura.
- Metadados: título (59 caracteres), descrição, Open Graph, favicon, `robots.txt` bloqueando, sem sitemap, canonical ou dados estruturados no modo de desenvolvimento.
- Trava de publicação: com `demoMode:false` sem domínio ou confirmações, o build recusa.

## 3. O que não funciona ou precisa mudar

### 3.1 Bloqueia a publicação

1. **Dados não confirmados aparecem como fatos.** "Vila Mariana", os horários (seg–sex 7h–20h, sáb 8h–13h), o mapa em uma praça e o texto "particular, presencial" são suposições do briefing. Estão no Hero, no Contato, no rodapé e nos metadados.
2. **Nenhum botão de agendar funciona hoje.** Sem WhatsApp, os 4 botões abrem "Agendamento em breve" e a pessoa não tem outro caminho (nem telefone, nem e-mail). É um beco sem saída para quem chega.
3. **Fotos de banco apresentadas como a clínica.** Na seção A Movi, "Recepção", "Sala de atendimento" e "Área de exercícios" legendam fotos de banco (e um vídeo), agora sem o aviso de ilustrativas. Em Equipe, três cargos aparecem com fotos de pessoas de banco, sem nome nem registro. Em Como funciona, a foto mostra uma profissional de jaleco com estetoscópio (aparência de médica), em um site de fisioterapia. Isso pode induzir o visitante ao erro (publicidade enganosa) e deve ser revisto pelo jurídico.
4. **Registro profissional.** A publicidade de serviços de fisioterapia costuma exigir nome e número de registro (CREFITO) do responsável. Confirmar a exigência atual com o conselho e a clínica e prever o campo (já existe em `professionals[].registry`, hoje vazio).
5. **LGPD.** O mapa do Google carrega conteúdo de terceiro e envia dados do visitante ao Google sem aviso, e não há política de privacidade. Opções: carregar o mapa só após um clique, ou usar imagem estática com link, e publicar uma página de privacidade que descreva o que o site realmente faz.
6. **Quebra em 320 px.** A página fica 34 px mais larga que a tela (rolagem horizontal) e o botão de menu fica cortado: o cabeçalho não cabe. O briefing pede boa leitura a partir de 320 px. Meus testes anteriores usaram um emulador que não descia de 326 px, por isso não apareceu.

### 3.2 Importante (corrigir antes de divulgar)

7. **Menu do celular por teclado.** Ao abrir o menu, o foco continua no botão e o Tab pula direto para o Hero: os links ficam inalcançáveis, só voltando com Shift+Tab. O axe não detecta isso; foi achado no teste.
8. **Fragilidade das animações de entrada.** Se o `main.js` falhar ao carregar (rede ruim, bloqueio), 18 de 18 blocos com `.reveal` ficam invisíveis e o site parece vazio. A classe que esconde deveria ser colocada só quando o JavaScript já rodou.
9. **Marcação HTML.** `aria-label` em H1, em lista e em vídeo (não recomendado), `role="region"` em div no lugar de `<section>`. Não afeta a nota do Lighthouse, mas é fácil de limpar.
10. **Celular deitado (844×390).** O Hero usa a versão larga e os botões ficam abaixo da dobra; vale limitar o tamanho do título pela altura da tela. Entre 600 e 699 px usa a composição de celular em tela larga (muito espaço vazio).
11. **Sem JavaScript no celular,** o menu aberto sobrepõe o título do Hero (cabeçalho fixo com a lista de links).
12. **Vídeo de 1,5 MB** baixa sozinho quando o visitante rola até ele, inclusive no 4G. Reduzir a resolução/peso ou usar só o pôster com dados econômicos.
13. **Arquivos mortos no `dist/`:** 717 KB de imagens não usadas (cartões de serviço que foram removidos), 3 SVGs de marca sem uso e CSS sem uso (`.note`, `.profile__media--empty` etc.). O build deveria copiar só o que a página usa.
14. **Itens de hospedagem** (apontados pelo Lighthouse porque o servidor local não faz isso): compressão gzip/brotli, cache longo para `img/`, `assets/` e `video/`, cabeçalhos de segurança (CSP, nosniff, referrer), página 404.
15. **Mapa:** o iframe é recortado no topo para esconder a caixa do próprio Google; funciona, mas depende do desenho interno do Google e pode mudar. O quadro não tem contorno de foco visível.
16. **Alvo de toque:** o link "Início" do menu mede 38×44 px (largura abaixo de 44).

### 3.3 Para a versão indexável (já documentado em `docs/SEO.md`)

Domínio, endereço, `demoMode:false`, confirmações, sitemap, dados estruturados, Search Console. Nada disso foi feito nem declarado como feito.

## 4. "Cara de inteligência artificial"

### 4.1 Visual

| Sinal | Onde | Gravidade |
| --- | --- | --- |
| Tudo em três, simétrico: 3 diferenciais no Hero, 3 serviços, 3 profissionais, 3 passos, 3 ambientes | seções 1 a 5 | Alta. É o sinal mais forte: a página inteira respira em "trios" |
| Movimento demais, sem motivo: fotos com arco + zoom lento + título palavra por palavra + faixa correndo + 18 blocos que "sobem" ao rolar | Hero e todas as seções | Alta. Parece vitrine de efeitos, não de clínica |
| Cápsula flutuante no topo e cantos arredondados/pílulas em quase tudo | cabeçalho, botões, cartões | Média. Está na lista de sinais de 2025 |
| O arco em todo lugar (Hero no celular, ambientes, equipe, Como funciona) | várias seções | Média. A marca tem um arco; repetido vira papel de parede |
| Faixa com as mesmas três frases repetidas 6 vezes | pé do Hero | Média. Enche espaço sem dizer algo novo |
| Banco de imagens genérico: pessoas, luz e enquadramentos de sessões diferentes, iguais às de qualquer clínica | todas as fotos | Alta. O que mais tira a credibilidade |
| Hero centralizado com título, parágrafo e dois botões | Hero | Baixa. É o padrão mais comum |

O que **não** tem cara de IA: sem degradês, sem ícones decorativos, sem sombras empilhadas, sem emojis, uma só família tipográfica (a da marca), sem numeração decorativa (os números dos passos são uma sequência de verdade).

### 4.2 Texto (skill humanizer)

- **Repetição de palavras:** em 628 palavras, "cuidado" aparece 10 vezes, "avaliação" 13, "plano de cuidado" 5 vezes, "você" 11.
- **Pares paralelos e frases de efeito:** "Pessoas que escutam. Profissionais que acompanham.", "Seu movimento tem uma história. Nosso cuidado começa por ela.", "Cuidado para diferentes momentos da sua vida." (sem nada específico da Movi). Esses textos vieram do briefing: são decisão do cliente, mas é onde a "voz de IA" está concentrada.
- **Trios em frases:** "escuta, avaliação individual e acompanhamento" (rodapé), "exames, laudos ou relatórios" (FAQ), "Avalia, monta o plano de cuidado e acompanha" (equipe).
- **Slogan repetido:** o parágrafo do rodapé reaproveita "o que faz parte da sua vida" do texto do Hero.
- **Falta de detalhe concreto:** o texto não cita nada que só esta clínica tenha (nomes, método, equipamento, bairro de verdade, histórias reais). Sem dados reais isso não se resolve escrevendo melhor: precisa de conteúdo do cliente.
- **Pontos limpos:** só 1 travessão ("São Paulo — SP"), nenhuma construção "não é X, é Y", sem promessas de resultado, sem superlativos.

### 4.3 Lente de Dieter Rams (skill design-is)

Fortes: **compreensível** (cada controle se explica), **limpo tecnicamente** (JS de 9 KB, sem fontes externas). Fracos: **discreto** (o movimento disputa a atenção com o conteúdo), **honesto** (fotos de banco com legendas de instalações), **duradouro** (faixa, cápsula e título animado são modas de 2025), **cuidadoso até o detalhe** (320 px, falha de JavaScript, menu por teclado), **enxuto** (vários elementos poderiam sair sem prejuízo). Contraste: texto do Hero sobre foto usa película roxa que garante cerca de 8:1 contra branco; rodapé e links discretos, cerca de 5:1.

## 5. O que não foi possível validar

Safari e Firefox (só Chrome), aparelhos reais, leitor de tela real (VoiceOver/TalkBack), rede móvel real e servidor de hospedagem de verdade (compressão, cache, cabeçalhos), impressão, validação com a clínica e o jurídico. O mapa foi visto carregando, mas o comportamento com bloqueadores de anúncio não foi testado.

## 6. Plano antes de publicar

**A. Código (posso fazer já):** quebra em 320 px; menu por teclado; revelar só quando o JS rodou; marcação do HTML; Hero em celular deitado; limpar `dist/`; peso do vídeo; página 404; mapa sob clique + página de privacidade.
**B. Conteúdo (depende do cliente):** WhatsApp, endereço, horários e região confirmados; nomes, formação e CREFITO da equipe; fotos reais da clínica e da equipe (trocar todas as de banco, ou tirar as legendas de instalações); textos próprios (nomes de técnicas, rotina real, depoimentos com autorização).
**C. Direção:** reduzir movimento (decidir o que fica), tirar a simetria de "três em tudo", usar o arco em duas ou três partes só.
**D. Publicação:** domínio .com.br, `demoMode:false`, sitemap, Search Console, cabeçalhos do servidor.
