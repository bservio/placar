# 🏐 Placar - Seu Marcador de Vôlei Pessoal

Um aplicativo de placar para vôlei desenvolvido com React Native e Expo. Perfeito para suas partidas de praia, quadra ou até mesmo aquela pelada no final de semana! 🏖️

## 🎯 Sobre o App

O **Placar** é um aplicativo simples, intuitivo e cheio de estilo para marcar seus jogos de vôlei. Com uma interface limpa e cores vibrantes, você pode acompanhar a pontuação de dois times, controlar sets e até mesmo cronometrar sua partida - tudo isso com feedback háptico para uma experiência mais imersiva! 📱

## ⚡ Funcionalidades

### 🎮 Sistema de Pontuação Inteligente
O app implementa as **regras oficiais do vôlei** de forma automática:
- **Regra dos 2 pontos de vantagem**: Quando ambos os times chegam perto do placar máximo (ex: 11-11 com maxScore de 12), o jogo só termina quando um time consegue abrir **2 pontos de vantagem** sobre o adversário. Isso significa que a partida pode continuar até 13-11, 14-12, 15-13... até que alguém consiga essa vantagem! 🏆

### 📊 Recursos Principais
- ✅ **Placar em tempo real** para dois times (Time A e Time B)
- ✅ **Contador de sets** com controles de incremento/decremento
- ✅ **Cronômetro** com play/pause
- ✅ **Escolha de pontuação máxima**: 12, 15, 21 pontos ou um valor customizado
- ✅ **Feedback háptico** ao marcar pontos (vibração no dispositivo)
- ✅ **Tela de vitória** com estatísticas finais
- ✅ **Interface dividida** por cores para fácil identificação dos times

### 🎨 Interface
- Design moderno com tema escuro
- Cores vibrantes para cada time (Laranja e Amarelo)
- Números grandes e fáceis de ler
- Controles intuitivos com toque simples e toque longo

## 🚀 Como Usar

1. **Inicie o jogo**: Escolha a pontuação máxima (12, 15, 21 ou "Outros" para um valor customizado)
2. **Marque pontos**: Toque na área do time para adicionar um ponto, ou mantenha pressionado para remover
3. **Controle os sets**: Use os botões +/- acima do placar para gerenciar os sets
4. **Cronômetro**: Toque no cronômetro no topo para iniciar/pausar
5. **Vitória**: Quando um time vencer, uma tela especial aparecerá com as estatísticas!

## 🛠️ Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado
- Expo CLI (ou Expo Go no seu celular)

### Instalação

1. **Instale as dependências**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento**
   ```bash
   npx expo start
   ```

3. **Escolha como rodar**
   - Pressione `a` para abrir no Android
   - Pressione `i` para abrir no iOS
   - Escaneie o QR code com o app Expo Go no seu celular
   - Pressione `w` para abrir no navegador

## 📱 Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **TypeScript** - Tipagem estática para JavaScript
- **Expo Haptics** - Feedback háptico no dispositivo
- **Expo Router** - Roteamento baseado em arquivos

## 🎯 Regras de Pontuação Implementadas

O sistema segue as regras oficiais do vôlei:

- Um time vence quando:
  1. Atinge ou ultrapassa a pontuação máxima configurada (maxScore)
  2. **E** tem pelo menos 2 pontos de vantagem sobre o adversário

**Exemplo prático:**
- Com maxScore = 12 e placar em 11-11, o jogo continua
- O jogo só termina quando um time consegue 2 pontos de vantagem (ex: 13-11, 14-12, etc.)

Isso garante que não há empate e que sempre há um vencedor claro! 🏅

## 🎮 Controles

- **Toque simples** na área do time: Adiciona 1 ponto
- **Toque longo** na área do time: Remove 1 ponto
- **Botões +/- nos sets**: Incrementa ou decrementa os sets
- **Cronômetro**: Toque para iniciar/pausar
- **Botão de reset**: Reinicia toda a partida (com confirmação)

## 📝 Notas

Este projeto foi criado com [`create-expo-app`](https://www.npmjs.com/package/create-expo-app) e usa [Expo Router](https://docs.expo.dev/router/introduction/) para navegação.

## 🤝 Contribuindo

Sinta-se à vontade para abrir issues ou pull requests! Toda contribuição é bem-vinda! 🎉

---

**Divirta-se marcando seus jogos!** 🏐✨
