import * as Haptics from 'expo-haptics';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';

export type Team = 'A' | 'B';

export function useScoreboard() {
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [setsA, setSetsA] = useState(0);
  const [setsB, setSetsB] = useState(0);
  
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [maxScore, setMaxScore] = useState(21);
  const [winner, setWinner] = useState<Team | null>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  useEffect(() => {
    if (winner) return;

    if (scoreA >= maxScore && (scoreA - scoreB) >= 2) {
      setWinner('A');
      setIsActive(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else if (scoreB >= maxScore && (scoreB - scoreA) >= 2) {
      setWinner('B');
      setIsActive(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [scoreA, scoreB, maxScore, winner]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleScore = (team: Team, increment: boolean) => {
    if (winner) return;

    if (increment) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    }

    if (team === 'A') {
      setScoreA((prev) => Math.max(0, increment ? prev + 1 : prev - 1));
    } else {
      setScoreB((prev) => Math.max(0, increment ? prev + 1 : prev - 1));
    }
  };

  const handleSet = (team: Team, increment: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (team === 'A') {
      setSetsA((prev) => Math.max(0, increment ? prev + 1 : prev - 1));
    } else {
      setSetsB((prev) => Math.max(0, increment ? prev + 1 : prev - 1));
    }
  };

  const resetAll = () => {
    setScoreA(0);
    setScoreB(0);
    setSetsA(0);
    setSetsB(0);
    setSeconds(0);
    setIsActive(false);
    setIsGameStarted(false);
    setWinner(null);
  };

  const resetGameWithAlert = () => {
    Alert.alert(
      "Reiniciar Partida",
      "Deseja zerar todo o placar e o cronômetro?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: resetAll }
      ]
    );
  };

  const startGame = (score: number) => {
    setMaxScore(score);
    setIsGameStarted(true);
  };

  const toggleTimer = () => setIsActive(!isActive);

  return {
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
    resetGame: resetGameWithAlert,
    startGame,
    toggleTimer,
    playAgain: resetAll,
  };
}

