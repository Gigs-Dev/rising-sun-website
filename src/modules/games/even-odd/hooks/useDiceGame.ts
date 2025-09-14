import { useState, } from "react";

export const MIN_BET = 10;

export function useDiceGame(initialBalance = 1000000) {
  const [walletBalance, setWalletBalance] = useState(initialBalance);
  const [dice, setDice] = useState<number[]>([0, 0, 0]);
  const [rolling, setRolling] = useState<boolean[]>([false, false, false]);
  const [isRolling, setIsRolling] = useState(false);
  const [userChoice, setUserChoice] = useState<"even" | "odd" | null>(null);
  const [result, setResult] = useState("");
  const [isEven, setIsEven] = useState(false);
  const [betAmount, setBetAmount] = useState(MIN_BET);

  const maxBet = walletBalance;

  const rollDice = () => Math.floor(Math.random() * 6) + 1;

  const handleUserChoice = (choice: "even" | "odd") => {
    if (walletBalance < betAmount) {
      setResult("Insufficient funds! Please add more money");
      return;
    }
    setUserChoice(choice);
    setIsRolling(true);
    setDice([0, 0, 0]);
    setRolling([true, false, false]);
    rollDiceSequentially(0, [], choice);
  };

  const rollDiceSequentially = (index: number, rolledValues: number[], choice: "even" | "odd") => {
    if (index >= 3) {
      checkResult(rolledValues, choice);
      return;
    }
    setTimeout(() => {
      const newNumber = rollDice();
      const newDice = [...rolledValues, newNumber];
      setDice(prev => {
        const updated = [...prev];
        updated[index] = newNumber;
        return updated;
      });
      setRolling(prev => {
        const updated = [...prev];
        updated[index] = false;
        if (index < 2) updated[index + 1] = true;
        return updated;
      });
      rollDiceSequentially(index + 1, newDice, choice);
    }, 800);
  };

  const checkResult = (finalDice: number[], choice: "even" | "odd") => {
    const total = finalDice.reduce((sum, n) => sum + n, 0);
    const even = total % 2 === 0;
    setIsEven(even);

    let newBalance = walletBalance;
    const allSame = finalDice.every(num => num === finalDice[0]);

    if (allSame) {
      setResult("All dice are the same. You lost!");
      newBalance -= betAmount;
    } else if ((even && choice === "even") || (!even && choice === "odd")) {
      setResult(`You won! 🎉 Your winnings: ${betAmount * 2}`);
      newBalance = newBalance - betAmount + betAmount * 2;
    } else {
      setResult("You lost! 😢");
      newBalance -= betAmount;
    }
    setWalletBalance(newBalance);
    setIsRolling(false);
  };

  const resetGame = () => {
    setDice([0, 0, 0]);
    setUserChoice(null);
    setResult("");
    setBetAmount(MIN_BET);
  };

  const rebet = () => {
    if (userChoice) handleUserChoice(userChoice);
  };

  return {
    walletBalance,
    dice,
    rolling,
    isRolling,
    userChoice,
    result,
    isEven,
    betAmount,
    setBetAmount,
    maxBet,
    handleUserChoice,
    resetGame,
    rebet,
  };
}
