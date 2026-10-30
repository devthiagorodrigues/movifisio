# Movi Fisioterapia — site institucional

Página única com seis seções (Início, A Movi, Serviços, Equipe, Como funciona, Contato), cabeçalho e rodapé.
HTML estático gerado por um script Node sem dependências em tempo de execução (a única dependência, `sharp`,
é de desenvolvimento e serve para otimizar imagens).

## Executar

Requer Node 20+.

```bash
cd site
npm install          # instala o sharp (apenas para gerar imagens)
npm run images       # gera imagens responsivas (webp + jpg), favicon, ícones e imagem de compartilhamento
npm run build        # gera dist/
npm run dev          # serve dist/ em http://localhost:5173
npm run check        # verifica seções, links, âncoras, imagens, alt e coerência de indexação
```

`npm run all` executa images + build + check. Depois de editar textos ou dados, basta `npm run build`.

## Estrutura

```
site/
  src/config/clinic.js     Dados da clínica (contato, horários, domínio, profissionais, modo)
  src/config/content.js    Textos de cada seção
  src/config/photos.js     Fotografias: texto alternativo, enquadramento, retoques
  src/components/*.js      Um componente por seção + cabeçalho, rodapé e diálogo
  src/lib/                 Helpers de HTML/imagem e regras de SEO
  src/styles/*.css         Tokens da marca, base e componentes
  src/scripts/main.js      Menu móvel, diálogo, acordeões, seletor de serviços
  assets-src/photos/       Fotografias originais (banco de imagens)
  public/brand/            Logos oficiais (SVG com viewBox recortado) e padrão do "m"
  public/video/            Loop mudo da seção A Movi (toca só quando visível, com botão de pausa)
  scripts/                 images, build, serve, check
  docs/                    Campos a substituir, SEO e créditos
```

## Publicar

1. Preencha os campos de `docs/CAMPOS.md` em `src/config/clinic.js`.
2. Para a versão final indexável, siga `docs/SEO.md` (`demoMode: false`, domínio e confirmações).
3. `npm run all` e publique **o conteúdo da pasta `dist/`** em qualquer hospedagem estática
   (Netlify, Vercel, Cloudflare Pages, GitHub Pages, Hostinger etc.). Todos os caminhos são relativos,
   então funciona na raiz do domínio.

## Publicar na Vercel

1. Suba a pasta `site/` em um repositório Git (o `.gitignore` já ignora `node_modules/` e `dist/`).
2. Na Vercel, importe o repositório. Se o `site/` não for a raiz do repositório, defina **Root Directory = `site`**.
3. O `vercel.json` já define: Install `npm install`, Build `npm run all` (gera imagens, compila e verifica) e Output `dist`. Framework Preset: **Other**.
4. Mantenha `demoMode: true` (noindex): a clínica é fictícia e a página não deve ser indexada.
5. Em **Settings > Analytics / Speed Insights**, deixe desligado, para que a política de privacidade continue verdadeira (o site diz que não usa ferramentas de análise).

O `vercel.json` é regerado a cada `npm run build` (cabeçalhos de segurança, CSP e cache).

## Páginas e arquivos de publicação

- `index.html` (as seis seções), `privacidade.html` (política que descreve só o que o site faz) e `404.html`.
- `_headers`: cabeçalhos de segurança (incluindo CSP com o hash do script inline) e cache, no formato Netlify / Cloudflare Pages. Em outros servidores (Apache, Nginx, Vercel), traduza esses cabeçalhos para a configuração do servidor e ative compressão gzip/brotli.
- O build copia para `dist/` só as imagens e arquivos que as páginas realmente usam.

## Comportamentos de interface

- **Cabeçalho:** cápsula flutuante (fixa, a 12 px do topo). O indicador do menu desliza até a seção atual, acompanha o mouse/foco e fica no link clicado durante a rolagem.
- **Hero:** fotografias em tela cheia que se revezam a cada 6,5 s (o novo quadro abre como um arco a partir da base) com aproximação lenta, película roxa da marca e título que entra palavra por palavra. No pé, uma faixa areia com os três diferenciais correndo devagar. No celular (até 699 px) a composição muda: título grande em 3 linhas no topo sobre o roxo, foto em cúpula (arco do "m") subindo do rodapé, texto e botões em largura total sobre a foto. Sem JS ou com movimento reduzido, fica a primeira foto parada e os diferenciais ficam estáticos.
- **Serviços:** os 3 principais em cartões compactos (os demais ficam em `content.js` com `show: false`) e um convite final em formato de cúpula.
- **Perguntas frequentes:** uma aberta por vez.
- **Contato:** mapa do Google incorporado (referência da região), carregado junto com a página.

## Comportamento dos botões de agendamento

- Sem WhatsApp válido em `clinic.contact.whatsapp`: os botões abrem um diálogo acessível (fecha com o botão,
  Escape ou clique fora; o foco volta ao botão que o abriu). Nenhum link fictício é publicado.
- Com WhatsApp válido (somente dígitos, DDI+DDD, ex. `5511912345678`): os botões viram links `wa.me` com a
  mensagem “Olá! Conheci a Movi pelo site e gostaria de saber sobre uma avaliação.” e o diálogo deixa de existir.
