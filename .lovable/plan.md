# Faixa "Instituições e Clínicas Atendidas" na Home

## O que será feito
Uma faixa com os logos reais dos clientes (PUCPR, Prefeitura de Curitiba, OdontoBrasil, Prevenir, Tortuga, JCI Brasil, SiMov, Huck Imports, JS Brasil e demais do site antigo), com a mesma estrutura do site anterior (grade de logos com título), adaptada à identidade "Precisão".

## Posição
Logo após a seção "40 anos", antes de "Sobre a DEKI" — liga a durabilidade à prova social.

## Visual
- Fundo claro (superfície), linhas finas no topo e na base, sem novo bloco escuro.
- Título pequeno no estilo "eyebrow": "Instituições e clínicas atendidas" + frase curta em Playfair.
- Logos em escala de cinza e opacidade reduzida; ao passar o mouse, voltam à cor normal (transição suave).
- Grade fixa e alinhada (2 colunas no celular, 3–4 no tablet, 6 no desktop), células separadas por linhas finas — sem carrossel automático nem letreiro rolando (regra da marca).
- Entrada com o mesmo efeito de revelação discreto já usado nas outras seções, respeitando "reduzir movimento".
- Cada logo com texto alternativo com o nome da instituição.

## Detalhes técnicos
- Extrair os logos do backup HTML enviado (pasta de uploads), salvar em `src/assets/clients/` e enviar para o CDN de assets (`.asset.json`).
- Lista de clientes em `src/data/clients.json` (nome + arquivo).
- Novo componente `ClientsStrip` em `src/routes/index.tsx` (ou `src/components/deki/ClientsStrip.tsx`), filtro via `grayscale opacity-60 hover:grayscale-0 hover:opacity-100`.
- Conferir no celular e desktop via Playwright.
