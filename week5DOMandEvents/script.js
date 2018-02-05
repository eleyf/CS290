/*
**  eleyf
**  2/4/18
**  cs290 w2018
**  HW Assignment DOM and Events
*/

//create table
//create buttons
//create selected class
//create position variables
//create move functions
//create selected border functions
//create mark cell function

//create table
var table = document.createElement("table");
table.style.borderStyle = "solid";

//create table header
var tableHeader = document.createElement("thead");
var headRow = document.createElement("tr");
for (var i = 0; i < 4; i++) {
    var headCell = document.createElement("th");
    headCell.textContent = "Header " + (i + 1);
    headRow.appendChild(headCell);
}
tableHeader.appendChild(headRow);
table.appendChild(tableHeader);

//create table data cells
for (var row = 1; row < 4; row++) {
    var dataRow = document.createElement("tr");
    for (var col = 1; col < 5; col++) {
        var dataCell = document.createElement("td");
        dataCell.textContent = col + ", " + row;
        dataCell.id = col + ", " + row;
        dataCell.style.textAlign = "center";
        dataCell.style.borderStyle = "ridge";
        dataRow.appendChild(dataCell);
    }
    table.appendChild(dataRow);
}

//create buttons
var buttons = document.createElement("div");
buttons.style.padding = "10px";

var upButton = document.createElement("button");
upButton.textContent = "UP";
upButton.id = "upButtonId";
buttons.appendChild(upButton);

var downButton = document.createElement("button");
downButton.textContent = "DOWN";
downButton.id = "downButtonId";
buttons.appendChild(downButton);

var leftButton = document.createElement("button");
leftButton.textContent = "LEFT";
leftButton.id = "leftButtonId";
buttons.appendChild(leftButton);

var rightButton = document.createElement("button");
rightButton.textContent = "RIGHT";
rightButton.id = "rightButtonId";
buttons.appendChild(rightButton);

var markCellButton = document.createElement("button");
markCellButton.textContent = "MARK CELL";
markCellButton.id = "markCellButtonId";
buttons.appendChild(markCellButton);

//create UI on page
document.body.appendChild(table);
document.body.appendChild(buttons);

//SelectedCell class to track selected cell
function SelectedCell(selectedCol, selectedRow) {

    this.selectedCol = selectedCol;
    this.selectedRow = selectedRow;
    this.cellId = this.selectedCol + ", " + this.selectedRow;

    this.selectCellBorder = function () {
        document.getElementById(this.cellId).style.borderStyle = "solid";
    }

    this.unselectCellBorder = function () {
        document.getElementById(this.cellId).style.borderStyle = "ridge";
    }

    this.moveUp = function () {
        if (this.selectedRow > 1) {
            this.unselectCellBorder();
            this.selectedRow--;
            this.cellId = this.selectedCol + ", " + this.selectedRow;
            this.selectCellBorder();
        }
    }

    this.moveDown = function () {
        if (this.selectedRow < 3) {
            this.unselectCellBorder();
            this.selectedRow++;
            this.cellId = this.selectedCol + ", " + this.selectedRow;
            this.selectCellBorder();
        }
    }

    this.moveLeft = function () {
        if (this.selectedCol > 1) {
            this.unselectCellBorder();
            this.selectedCol--;
            this.cellId = this.selectedCol + ", " + this.selectedRow;
            this.selectCellBorder();
        }
    }

    this.moveRight = function () {
        if (this.selectedCol < 4) {
            this.unselectCellBorder();
            this.selectedCol++;
            this.cellId = this.selectedCol + ", " + this.selectedRow;
            this.selectCellBorder();
        }
    }

    this.highlightCell = function () {
        document.getElementById(this.cellId).style.background = "yellow";
    }

}

//create instance of SelectedCell in position 1, 1
var hotCell = new SelectedCell(1, 1);
hotCell.selectCellBorder();


//add click events to buttons
document.getElementById("upButtonId").addEventListener("click", function () {
    hotCell.moveUp();
});

document.getElementById("downButtonId").addEventListener("click", function () {
    hotCell.moveDown();
});

document.getElementById("leftButtonId").addEventListener("click", function () {
    hotCell.moveLeft();
});

document.getElementById("rightButtonId").addEventListener("click", function () {
    hotCell.moveRight();
});

document.getElementById("markCellButtonId").addEventListener("click", function () {
    hotCell.highlightCell();
});