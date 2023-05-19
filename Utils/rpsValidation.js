function whoIsWin(x, y) {
    if (
        (x === "batu" && y === "batu") ||
        (x === "gunting" && y === "gunting") ||
        (x === "kertas" && y === "kertas")
    ) {
        x = "draw";
        y = "draw";
    } else if (
        (x === "batu" && y === "gunting") ||
        (x === "gunting" && y === "kertas") ||
        (x === "kertas" && y === "batu")
    ) {
        x = "win";
        y = "lose";
    } else if (
        (x === "batu" && y === "kertas") ||
        (x === "gunting" && y === "batu") ||
        (x === "kertas" && y === "gunting")
    ) {
        x = "lose";
        y = "win";
    }
    return [x, y];
}

module.exports = {whoIsWin};
