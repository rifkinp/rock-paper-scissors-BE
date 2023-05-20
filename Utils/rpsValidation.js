// function whoIsWin(x, y) {
//     if (
//         (x === "batu" && y === "batu") ||
//         (x === "gunting" && y === "gunting") ||
//         (x === "kertas" && y === "kertas")
//     ) {
//         x = "draw";
//         y = "draw";
//     } else if (
//         (x === "batu" && y === "gunting") ||
//         (x === "gunting" && y === "kertas") ||
//         (x === "kertas" && y === "batu")
//     ) {
//         x = "win";
//         y = "lose";
//     } else (
//         (x === "batu" && y === "kertas") ||
//         (x === "gunting" && y === "batu") ||
//         (x === "kertas" && y === "gunting")
//     ) {
//         x = "lose";
//         y = "win";
//     }
//     return [x, y];
// }

const whoIsWin = (x, y) => {
    if (
        (x === "batu" && y === "batu") ||
        (x === "gunting" && y === "gunting") ||
        (x === "kertas" && y === "kertas")
    ) {
        return ["draw", "draw"];
    } else if (
        (x === "batu" && y === "gunting") ||
        (x === "gunting" && y === "kertas") ||
        (x === "kertas" && y === "batu")
    ) {
        return ["win", "lose"];
    } else if (
        (x === "batu" && y === "kertas") ||
        (x === "gunting" && y === "batu") ||
        (x === "kertas" && y === "gunting")
    ) {
        return ["lose", "win"];
    } else {
        console.error("Salah memasukkan pilihan");
        return ["error", "error"];
    }
};

const getComputerChoice = () => {
    const choices = ["batu", "gunting", "kertas"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
};

module.exports = {whoIsWin, getComputerChoice};
