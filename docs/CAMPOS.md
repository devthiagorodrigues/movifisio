# Campos a substituir antes de publicar

Tudo está em `src/config/clinic.js`, salvo indicação. Campos vazios não aparecem no site.

| Campo | Situação atual | O que fazer |
| --- | --- | --- |
| `contact.whatsapp` | vazio | Número real, só dígitos com DDI e DDD. Ativa os botões de agendamento. |
| `contact.instagram` | vazio | Usuário sem @. Exibe o link na seção Contato. |
| `location.address` | vazio | Endereço completo. Exibido no Contato e usado nos dados estruturados. |
| `location.region` | “Vila Mariana” (pendente) | Confirmar. Aparece no sobretítulo, no Contato e no rodapé (também em `src/config/content.js` → `hero.kicker`, `seo`). |
| `hours` | 2ª–6ª 7h–20h, sáb. 8h–13h (pendente) | Confirmar horários. |
| `domain` | vazio | Domínio final com https, sem barra final. |
| `confirmed.*` | todos `false` | Marcar `true` somente depois de confirmar cada dado com a clínica. |
| `professionals[].name / education / registry / photo` | vazios | Preencher com dados reais (registro no formato do conselho, ex.: CREFITO). Foto: adicionar o arquivo em `assets-src/photos/`, registrar em `src/config/photos.js` e rodar `npm run images`. |
| `professionals[].role / focus` | descrições por função | Ajustar conforme a equipe real. |
| `contact.privacyEmail` | vazio | E-mail para pedidos de privacidade (LGPD). Aparece na página `privacidade.html` quando preenchido. |
| `contact.phone` | vazio | Opcional; entra nos dados estruturados. |
| `bookingUnavailable` | texto neutro | Só aparece enquanto o WhatsApp não estiver configurado. |
| `src/config/content.js` | textos finais | Revisar com a clínica (serviços, perguntas frequentes). Serviços: hoje aparecem 3 (`show: true`); os outros 3 estão prontos para voltar com `show: true` (máximo recomendado: 4). |
| Fotografias | banco de imagens | Trocar por fotos reais da clínica quando disponíveis (`assets-src/photos/` + `photos.js`). O Hero usa `hero.slides` (`content.js`). Atenção: na seção A Movi, as legendas “Recepção”, “Sala de atendimento” e “Área de exercícios” acompanham fotos de banco; só mantenha as legendas quando as fotos forem da clínica. A equipe também usa fotos de banco (`professionals[].photo`). |
| Mapa (Contato) | Praça Vila Mariana (referência) | `location.map` em `clinic.js`: hoje aponta uma praça da região, não a clínica. Quando houver endereço confirmado, troque a consulta pelo endereço real. |
| Vídeo da seção A Movi | clipe de banco (Pexels) | Trocar `public/video/sala-atendimento.mp4` e o pôster `public/img/sala-poster.*` por material real da clínica (MP4 H.264, até ~2 MB). Texto alternativo em `video.alt` (`src/config/content.js`). |
| Rodapé: crédito | “Desenvolvido por Thiago Labs” | `credit` em `clinic.js`. |

Observação sobre o texto do diálogo: o briefing original pedia “Este é um site demonstrativo…”, mas o
briefing posterior proíbe termos de demonstração no conteúdo público. Foi adotado um texto neutro; para
alterar, edite `bookingUnavailable`.
