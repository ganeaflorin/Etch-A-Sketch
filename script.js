let container = document.querySelector("#container");
// const BACKGROUND_COLOR = "rgb(255, 244, 228)";
const BACKGROUND_COLOR = "#2ccc94";
let isRandomColor = false;
init();

function init() {
    let noRows = 16;
    updateGrid(noRows);
    generateGridElements(noRows);
    rangerEvents();
    resetEvent();
    RGBEvent();
    setBlackColorEvent();
}

function setBlackColorEvent() {
    let blackColor = document.getElementById("black-color");
    blackColor.addEventListener("click", () => isRandomColor = false);
}

function RGBEvent() {
    let rgbBtn = document.getElementById("rgb-color");
    rgbBtn.addEventListener("click", () => isRandomColor = true);
}

function getRandomColor() {
    let r = getRandomNumber(256);
    let g = getRandomNumber(256);
    let b = getRandomNumber(256);
    return `rgb(${r}, ${g}, ${b})`;
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function resetEvent() {
    let resetBtn = document.querySelector("#reset");
    resetBtn.addEventListener("click", function() {
        let squares = Array.from(container.children);
        squares.forEach(square => { square.style.backgroundColor = BACKGROUND_COLOR; })
    });

}

function generateGridElements(noRows) {
    for (let i = 0; i < noRows ** 2; i++) {
        let square = document.createElement("div");
        square.style.border = "1px solid black";
        container.appendChild(square);
    }
    addHoverEvent();
}

function updateGrid(noRows) {
    let gridStringBuilder = "1fr ";
    for (let i = 0; i < noRows - 1; i++)
        gridStringBuilder += "1fr ";
    container.style.gridTemplateColumns = gridStringBuilder;
    container.style.gridTemplateRows = gridStringBuilder;
}

function rangerEvents() {
    let displayedValue = document.getElementById("range-value");
    let ranger = document.getElementById("no-rows");
    showRangerValueChange(ranger, displayedValue);
    changeGridRows(ranger);
}

function showRangerValueChange(ranger, displayedValue) {
    ranger.addEventListener("input", function() {
        displayedValue.textContent = ranger.value + " x " +
            ranger.value;
    });
}

function changeGridRows(ranger) {
    ranger.addEventListener("change", function() {
        updateGrid(ranger.value);
        container.innerHTML = '';
        generateGridElements(ranger.value);
    });
}

function addHoverEvent() {
    let squares = Array.from(container.children);
    squares.forEach(square => square.addEventListener("mouseover", function(e) {
        if (isRandomColor === false)
            e.target.style.background = "black";
        else {
            let color = getRandomColor();
            e.target.style.background = color;
        }
    }));
}