import { useScoreboard } from '@/hooks/use-scoreboard';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const COLORS = {
  teamA: '#FF8C00', // Laranja
  teamB: '#FFD700', // Amarelo
  background: '#121212',
  text: '#FFFFFF',
  timer: '#E0E0E0',
};

export default function ScoreboardScreen() {
  const {
    scoreA,
    scoreB,
    setsA,
    setsB,
    seconds,
    isActive,
    isGameStarted,
    maxScore,
    winner,
    formatTime,
    handleScore,
    handleSet,
    resetGame,
    startGame,
    toggleTimer,
    playAgain,
  } = useScoreboard();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />

      {!isGameStarted && (
        <View style={styles.setupOverlay}>
          <Text style={styles.setupTitle} adjustsFontSizeToFit numberOfLines={1}>
            Placar até quantos pontos?
          </Text>
          <View style={styles.optionsContainer}>
            {[12, 15, 21].map((score) => (
              <TouchableOpacity 
                key={score} 
                style={styles.optionButton} 
                onPress={() => startGame(score)}
              >
                <Text style={styles.optionText}>{score}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {winner && (
        <View style={[styles.winnerOverlay, { backgroundColor: winner === 'A' ? COLORS.teamA : COLORS.teamB }]}>
          <View style={styles.winnerHeader}>
            <Ionicons name="trophy" size={40} color={COLORS.text} style={styles.trophyIcon} />
            <Text style={styles.winnerTitle} adjustsFontSizeToFit numberOfLines={1}>VITÓRIA!</Text>
          </View>
          
          <Text style={styles.winnerTeam}>TIME {winner}</Text>
          
          <View style={styles.finalStats}>
            <Text style={styles.finalScore}>{scoreA} - {scoreB}</Text>
            <Text style={styles.finalTime}>Tempo: {formatTime(seconds)}</Text>
          </View>

          <TouchableOpacity style={styles.playAgainButton} onPress={playAgain}>
            <Text style={styles.playAgainText}>JOGAR NOVAMENTE</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Timer e Controles Superiores */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
          <Ionicons name="refresh-outline" size={30} color={COLORS.text} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.timerContainer} onPress={toggleTimer}>
          <Text style={styles.timerText}>{formatTime(seconds)}</Text>
          <View style={styles.verticalSeparator} />
          <Text style={styles.maxScoreIndicator}>ALVO: {maxScore}</Text>
          <Ionicons 
            name={isActive ? "pause-circle" : "play-circle"} 
            size={24} 
            color={COLORS.timer} 
          />
        </TouchableOpacity>

        <View style={styles.placeholder} />
      </View>

      <View style={styles.scoreboard}>
        {/* Time A */}
        <TouchableOpacity 
          style={[styles.teamSection, { backgroundColor: COLORS.teamA }]}
          onPress={() => handleScore('A', true)}
          onLongPress={() => handleScore('A', false)}
          delayLongPress={400}
          activeOpacity={0.9}
        >
          <View style={styles.setCounterContainer}>
            <View style={styles.setControls}>
              <TouchableOpacity onPress={() => handleSet('A', false)}>
                <Ionicons name="remove-circle-outline" size={20} color={COLORS.text} />
              </TouchableOpacity>
              <Text style={styles.setNumber}>{setsA} SETS</Text>
              <TouchableOpacity onPress={() => handleSet('A', true)}>
                <Ionicons name="add-circle-outline" size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          </View>

          <Text 
            style={styles.scoreText} 
            numberOfLines={1} 
            adjustsFontSizeToFit
          >
            {scoreA}
          </Text>

          <Text style={styles.teamLabel}>TIME A</Text>
        </TouchableOpacity>

        {/* Time B */}
        <TouchableOpacity 
          style={[styles.teamSection, { backgroundColor: COLORS.teamB }]}
          onPress={() => handleScore('B', true)}
          onLongPress={() => handleScore('B', false)}
          delayLongPress={400}
          activeOpacity={0.9}
        >
          <View style={styles.setCounterContainer}>
            <View style={styles.setControls}>
              <TouchableOpacity onPress={() => handleSet('B', false)}>
                <Ionicons name="remove-circle-outline" size={20} color={COLORS.text} />
              </TouchableOpacity>
              <Text style={styles.setNumber}>{setsB} SETS</Text>
              <TouchableOpacity onPress={() => handleSet('B', true)}>
                <Ionicons name="add-circle-outline" size={20} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          </View>

          <Text 
            style={styles.scoreText} 
            numberOfLines={1} 
            adjustsFontSizeToFit
          >
            {scoreB}
          </Text>

          <Text style={styles.teamLabel}>TIME B</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 20,
    gap: 8,
  },
  timerText: {
    color: COLORS.timer,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  verticalSeparator: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 5,
  },
  maxScoreIndicator: {
    color: COLORS.timer,
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
    opacity: 0.7,
  },
  resetButton: {
    padding: 5,
  },
  placeholder: {
    width: 40,
  },
  scoreboard: {
    flex: 1,
    flexDirection: 'row',
  },
  teamSection: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 55, // Espaço para a TopBar reduzida
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  scoreText: {
    flex: 1,
    fontSize: 200, // Aumentado para o adjustsFontSizeToFit ter margem
    fontWeight: '900',
    color: COLORS.text,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 5,
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  teamLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    opacity: 0.8,
    marginTop: 5,
  },
  setCounterContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  setControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  setNumber: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: 'bold',
    minWidth: 60,
    textAlign: 'center',
  },
  setupOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.background,
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setupTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  optionText: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  winnerOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 200,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  winnerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 5,
  },
  trophyIcon: {
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  winnerTitle: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 4,
  },
  winnerTeam: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    opacity: 0.9,
  },
  finalStats: {
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    width: '70%',
    maxWidth: 350,
  },
  finalScore: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: 'bold',
  },
  finalTime: {
    color: COLORS.text,
    fontSize: 14,
    opacity: 0.8,
  },
  playAgainButton: {
    backgroundColor: COLORS.text,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  playAgainText: {
    color: COLORS.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
