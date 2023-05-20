const whoIsWin = (x, y) => {
    if (
        (x === "rock" && y === "rock") ||
        (x === "scissors" && y === "scissors") ||
        (x === "paper" && y === "paper")
    ) {
        return ["draw", "draw"];
    } else if (
        (x === "rock" && y === "scissors") ||
        (x === "scissors" && y === "paper") ||
        (x === "paper" && y === "rock")
    ) {
        return ["win", "lose"];
    } else if (
        (x === "rock" && y === "paper") ||
        (x === "scissors" && y === "rock") ||
        (x === "paper" && y === "scissors")
    ) {
        return ["lose", "win"];
    } else {
        console.error("Salah memasukkan pilihan");
        return ["error", "error"];
    }
};

const getComputerChoice = () => {
    const choices = ["rock", "scissors", "paper"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
};

module.exports = {whoIsWin, getComputerChoice};
