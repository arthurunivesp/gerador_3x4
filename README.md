# Gerador de Fotos 3x4 para Impressão A4

Um sistema web simples, funcional e leve para organizar fotos no formato 3x4 em folhas A4, respeitando margens e espaçamentos precisos para facilitar o recorte.

## 🚀 Funcionalidades

- **Processamento em Tempo Real:** As fotos aparecem no grid assim que são selecionadas.
- **Formato Padrão 3x4:** Redimensionamento automático (crop centralizado) para o formato 3x4 retrato.
- **Layout A4 Preciso:**
  - Margens de **2,0 cm** (Superior, Inferior, Esquerda e Direita).
  - Espaçamento de **2 mm** entre as fotos para evitar sobreposição e facilitar o corte.
- **Múltiplas Páginas:** Criação automática de novas páginas A4 ao exceder 30 fotos.
- **Privacidade:** Todo o processamento é feito localmente no seu navegador. Nenhuma foto é enviada para servidores.

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 (Grid Layout e Media Queries para impressão)
- JavaScript (Vanilla JS)

## 📋 Como Usar

1. Faça o download ou clone este repositório.
2. Abra o arquivo `index.html` em seu navegador.
3. Clique em "Selecionar arquivos" e escolha suas fotos.
4. Clique em **Imprimir / PDF**.

### 🖨️ Configurações de Impressão Recomendadas

Para garantir que as medidas saiam exatas:
- **Destino:** Salvar como PDF ou selecionar sua impressora.
- **Páginas:** Tudo.
- **Layout:** Retrato.
- **Tamanho do papel:** A4.
- **Margens:** Selecione **"Nenhuma"** ou **"Mínima"** (o sistema já possui margens internas de 2cm).
- **Escala:** 100% ou Padrão.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---
Desenvolvido por [arthurunivesp](https://github.com/arthurunivesp)
