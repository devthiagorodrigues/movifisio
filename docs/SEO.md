# SEO e indexação

## Estado atual: versão de desenvolvimento (`demoMode: true`)

- `<meta name="robots" content="noindex, nofollow">`
- `robots.txt` com `Disallow: /`
- Sem `sitemap.xml`, sem canonical, sem dados estruturados, sem mapa.
- Presentes e já corretos: `<title>`, descrição, Open Graph e Twitter Card (imagem `og.jpg` 1200×630 gerada
  com a logo oficial), favicon derivado da logo (SVG + PNG 32/180/192/512), `lang="pt-BR"`, imagens com
  dimensões explícitas e carregamento tardio abaixo da primeira tela, âncoras estáveis (`#inicio`, `#a-movi`,
  `#servicos`, `#equipe`, `#como-funciona`, `#contato`).

## Procedimento para a versão real indexável

1. Confirmar com a clínica: região, horários, endereço, canal de WhatsApp e domínio.
2. Em `src/config/clinic.js`: preencher `domain`, `location.address`, `contact.*`; marcar `confirmed.*` como `true`; trocar `demoMode` para `false`.
   O build **falha** se `demoMode: false` sem domínio ou sem confirmações (`src/lib/seo.js`).
3. `npm run all`. Com `demoMode: false` o build passa a gerar: `index, follow`, canonical e `og:url`,
   `robots.txt` apontando o sitemap, `sitemap.xml` e dados estruturados `PhysicalTherapy` (somente com
   domínio + endereço confirmado; horários só se `confirmed.hours`).
4. Publicar `dist/` e conferir `https://dominio/robots.txt`.
5. Se for incluir um mapa, usar apenas o endereço real confirmado.

## O que depende de acessos externos (NÃO realizado)

- Registro do domínio .com.br.
- Verificação do domínio e envio do sitemap no Google Search Console.
- Solicitação de indexação, Google Business Profile, ferramentas de análise.

Nada disso foi executado. Também não há promessa de posição no Google.
