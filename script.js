hightlight = "highlight";
globalGrid = 5;
globalLevel = 4;
globalResistanceCounter = 0;
globalResistance = 1;

function newApp(grid, level) {
    clearEvent();
    app = new Vue({
        el: '#app',
        data: {
            grid: grid,
            current: [1, 1],
            start: "start",
            end: "end",
            map: "map",
            level: level,
        },
        mounted: function () {
            this.start = this.getRandomitem()
            this.end = this.getRandomitem()
            this.findElement(...this.start).innerHTML = "s";
            this.findElement(...this.end).innerHTML = "e";
            this.current = [this.start[0], this.start[1]];
            this.addClass(...this.current, hightlight);
            this.addClass(...this.end, hightlight);
            this.map = []
            for (i = 0; i < this.level; i++) {
                item = this.getRandomitem();
                this.findElement(...item).innerHTML = "r";
                this.map.push(item);
            }
            console.log(this.map, "map")
            console.log(this.start, "start")
            console.log(this.end, "end")

        },

        methods: {
            clearelment(row, column) {
                this.findElement(row, column).innerHTML = "0"
            },
            clear() {
                this.clearelment(...this.start);
                this.clearelment(...this.end)
                for (i = 0; i < this.level; i++) {
                    this.clearelment(...this.map[i])
                }
            },
            getRandom() {
                min = 1;
                max = this.grid;
                return Math.floor(Math.random() * (+max - +min) + min);
            },
            getRandomitem() {
                return [this.getRandom(), this.getRandom()]
            },
            addClass(row, column, clasname) {
                this.findElement(row, column).classList.add(clasname);
            },
            removeClass(row, column, clasname) {
                this.findElement(row, column).classList.remove(clasname);
            },

            findElement(row, column) {
                return document.getElementById("item_" + row + "_" + column);
            },


            submit(event) {
                after = this.current;
                switch (event.key) {
                    case "ArrowLeft":
                        after = [after[0], after[1] - 1];
                        break;
                    case "ArrowRight":
                        after = [after[0], after[1] + 1];
                        break;
                    case "ArrowUp":
                        after = [after[0] - 1, after[1]];
                        break;
                    case "ArrowDown":
                        after = [after[0] + 1, after[1]];
                        break;
                    default:
                        return;
                }
                if (this.end[0] == after[0] && this.end[1] == after[1]) {
                    alert("game won!");
                    gamewon(true);
                    return;
                }
                for (i = 0; i < this.level; i++) {
                    item = this.map[i];
                    if (after[0] == item[0] && after[1] == item[1]) {
                        alert("game over!!!");
                        gamewon(false);
                        return;
                    }
                }
                this.addClass(...after, hightlight);
                this.removeClass(...this.current, hightlight);
                this.addClass(...this.current, "visited");
                this.current = after;
            }
        }
    })
    return app;

}

app = newApp(globalGrid, globalLevel);


function clearEvent() {
    setTimeout(function () {
        app.clear();
    }, 2000);
}

function gamewon(boolean) {
    destroyGame();
    if (boolean)
        nextLevelLogic();
    app = newApp(globalGrid, globalLevel);
}

document.addEventListener('keydown', function (event) {
    app.submit(event);
    if (event.key.startsWith("Arrow")) {
        event.preventDefault();
    }

});


function nextLevelLogic() {
    globalResistanceCounter++;
    if (globalResistanceCounter == globalResistance) {
        globalResistanceCounter = 0;
        globalLevel++;
        globalGrid++;
    }
}

function destroyGame() {
    var template = `<table>
    <tr v-for="(row, rowindex) in grid">
      <td v-for="(column, columnindex) in grid" :id="'item_' +row+'_'+column" class="grid-item">0</td>
    </tr>
  </table>`;
    app.$destroy();
    document.getElementById("app").innerHTML = template;
}
// infinatily
// setInterval(function () { app.clear(); }, 3000);
//code before the pause

