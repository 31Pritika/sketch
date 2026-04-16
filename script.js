const setgrid = document.getElementById("setgrid");
const mode = document.querySelector(".stylebuttons");
const output = document.getElementById("gridsize");
const slider = document.getElementById("gridsizerange");
const grid = document.querySelector(".grid");

const intensitymap = new Map();
let currentMode = "rainbow";

// update slider text
function updateGrid(){
    output.textContent = `${slider.value} x ${slider.value}`;
}

slider.addEventListener("input", updateGrid);
updateGrid();

// create grid
function createGrid(size){
    grid.innerHTML = "";
    intensitymap.clear();

    for(let i = 0; i < size; i++){
        const row = document.createElement("div");
        row.classList.add("row");

        for(let j = 0; j < size; j++){
            const cell = document.createElement("div");
            cell.classList.add("cell");

            intensitymap.set(cell, 0);

            cell.addEventListener("click", () => {

                if(currentMode === "black"){
                    cell.style.backgroundColor = "black";
                    intensitymap.set(cell, 1);
                }

                else if(currentMode === "rainbow"){
                    let r = Math.floor(Math.random() * 255);
                    let g = Math.floor(Math.random() * 255);
                    let b = Math.floor(Math.random() * 255);

                    cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                    intensitymap.set(cell, 1);
                }

                else if(currentMode === "erase"){
                    cell.style.backgroundColor = "white";
                    intensitymap.set(cell, 0);
                }

                else if(currentMode === "lighten"){
                    let val = intensitymap.get(cell) || 1;
                    val = Math.max(val - 0.1, 0);
                    intensitymap.set(cell, val);
                    cell.style.backgroundColor = `rgba(0,0,0,${val})`;
                }

                else if(currentMode === "shading"){
                    let val = intensitymap.get(cell) || 0;
                    val = Math.min(val + 0.1, 1);
                    intensitymap.set(cell, val);
                    cell.style.backgroundColor = `rgba(0,0,0,${val})`;
                }
            });

            row.appendChild(cell);
        }

        grid.appendChild(row);
    }
}

// generate grid
setgrid.addEventListener("click", () => {
    createGrid(slider.value);
});

// mode switching + clear
mode.addEventListener("click", (e) => {
    if(!e.target.dataset.value) return;

    if(e.target.dataset.value === "clear"){
        grid.querySelectorAll(".cell").forEach(cell => {
            cell.style.backgroundColor = "white";
            intensitymap.set(cell, 0);
        });
        return;
    }

    currentMode = e.target.dataset.value;
});