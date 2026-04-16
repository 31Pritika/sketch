const setgrid = document.getElementById("setgrid");
const mode = document.querySelector(".stylebuttons");
const output = document.querySelector(".gridsize");
const slider = document.getElementById("gridsizerange");
const grid = document.querySelector(".grid");

const intensitymap = new Map();
let currentMode = "rainbow";

function updateGrid(){
    output.textContent `${slider.value} x ${slider.value}`; 
}
setgrid.addEventListener("input", updateGrid);
updateGrid();

function createGrid(size){
    grid.innerHTML = "";
    intensitymap.clear();

    for(let i = 0; i < size; i++)
    {
        const row = document.createElement("div");
        row.classList.add("row");

        for(let j = 0; j < size; j++){
            const cell = document.createElement("div");
            cell.classList.add("cell");

            intensitymap.set(cell, 0);

            cell.addEventListener("click", () =>{
                if (currentMode === "black"){
                    cell.style.backgroundColor = "black";
                }

                else if (currentMode === "rainbow"){
                    let r = Math.floor(Math.random() *255);
                    let g = Math.floor(Math.random() * 255);
                    let b = Math.floor(Math.random() * 255);

                    cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                }

                else if(currentMode === "erase"){
                    cell.style.backgroundColor = "white";
                }
                else if(currentMode === "lighten"){
                    let val = intensitymap.get(Cell) || 1;
                    val = Math.max(val -0.1, 0);
                    intensitymap.set(cell, val);
                    cell.style.backgroundColor= `rgba(0,0,0,${val})`;
                }
            })
        }
    }

}