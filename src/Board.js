import React, {Component} from 'react'
import Cell from './Cell.js'
import DummyCell from './DummyCell.js'
import './board.css'

function generateBomb(){
    let values = [0, 0, 0, 0, 0, 0, -1];
    var idx = Math.floor(Math.random()*values.length);
    return values[idx];
}


class Board extends Component {
    constructor() {
        super();

        this.state = {
            grid_size: 5,
            grid: [],
            bomb_count: 0,
            cell_count: 0,
            lost: false,
            won: false,
            first_click: true,
            first_i: 0,
            first_j: 0
        }

        this.updateBombCount = this.updateBombCount.bind(this)
        this.explodeBomb = this.explodeBomb.bind(this)
        this.updateCellCount = this.updateCellCount.bind(this)
        this.checkWin = this.checkWin.bind(this)
        this.neighbors = this.neighbors.bind(this)
        this.generateBoard = this.generateBoard.bind(this)
        this.fakeBoard = this.fakeBoard.bind(this)
        this.createBoard = this.createBoard.bind(this)
    }

    updateBombCount(dlt){
        this.setState({bomb_count: this.state.bomb_count+dlt}, this.checkWin)
    }

    explodeBomb(){
        if(this.state.lost === false)
            this.setState({ lost: true })
    }

    updateCellCount(){
       this.setState({cell_count: this.state.cell_count-1}, this.checkWin) 
    }

    checkWin(){
        if(this.state.lost === false && this.state.won === false && this.state.cell_count === 0 && this.state.bomb_count === 0)
            this.setState({won: true})
    }

    visibleChain(i, j){
        // Make callback, make it uncover other cells
        let {grid, grid_size} = this.state;
        if(grid[i][j] !== 0) return;

        console.log("Uncover ", i, j) 

        let vi = [1, -1, 0, 0, -1, 1, -1, 1];
        let vj = [0, 0, -1, 1, 1, 1, -1, -1];
        for(let di=0;di<8;di++){
            for(let dj=0;dj<8;dj++){
                let ii = i + vi[di], jj = j + vj[dj]
                if(ii >= 0 && jj >= 0 && ii < grid_size && jj < grid_size){
                    this.visibleChain(ii, jj)
                }
            }
        }
    }

    neighbors(i, j){
        let arr = [], {grid_size} = this.state

        let vi = [1, -1, 0, 0, -1, 1, -1, 1];
        let vj = [0, 0, -1, 1, 1, 1, -1, -1];
        for(let d=0;d<8;d++){
            let ii = i + vi[d]
            let jj = j + vj[d]

            if(ii < 0 || jj < 0 || ii >= grid_size || jj >= grid_size)
                continue
            arr.push({i:ii, j:jj})
        }
        return arr;
    }

    generateBoard(click_i, click_j){
        let n = this.state.grid_size, count = 0;
        let table = new Array(n);
        console.log("GenerateBoard", click_i, click_j)
        let neigh = this.neighbors(click_i, click_j)
        neigh.push({i:click_i, j:click_j})
        console.log("neigh", neigh)
        for (let i = 0;i < n;i++){
            table[i] = new Array(n);
            for (let j = 0;j < n;j++){
                if(neigh.filter(e => e.i === i && e.j === j).length > 0){
                    console.log("Neight ", i, j)
                    table[i][j] = 0;
                }
                else
                    table[i][j] = generateBomb();
                count += (table[i][j] === -1)
            }
        }

        for (let i = 0;i < n;i++){
            for (let j = 0;j < n;j++){
                if(table[i][j] === 0){
                    let nxt = this.neighbors(i, j)
                    for(let it = 0;it < nxt.length;it++){
                        let p = nxt[it]
                        table[i][j] += (table[p.i][p.j] === -1);
                    }
                }
            }
        }
        this.setState(
            {first_click: false, first_i: click_i, first_j: click_j, grid: table, bomb_count: count, cell_count: n*n - count-1}
        )
    }

    createBoard() {
        let table = []
        let {grid_size, grid} = this.state;
        console.log("grid", grid)
        for (let i = 0; i < grid_size; i++) {
            for(let j = 0;j < grid_size;j++){
                let tp = 0
                if(this.state.first_i === i && this.state.first_j === j)
                    tp = 1
                table.push(
                    <Cell type={tp} value={grid[i][j]} updateCellCount={this.updateCellCount} updateBomb={this.updateBombCount} explodeBomb={this.explodeBomb}/>
                )
            }
        }
        return table
    }


    fakeBoard() {
        let table = []
        let {grid_size} = this.state;
        for (let i = 0; i < grid_size; i++) {
            for(let j = 0;j < grid_size;j++){
                table.push(
                    <DummyCell click={this.generateBoard} i={i} j={j} />
                )
            }
        }
        return table
    }

    render() {
        return (
            <div> 
                <h4> Bombs left: {this.state.bomb_count} </h4>
                {this.state.lost && 
                    <h1 align="center" id="youLost"> You lost! </h1>
                }
                {this.state.won && 
                    <h1 align="center" id="youWon"> You Won! </h1>
                }
                <div className={"grid-"+((this.state.lost || this.state.won) ? "disabled" : "container")}>
                    {this.state.first_click ?
                        this.fakeBoard()
                        :
                        this.createBoard()
                    }
                </div>
            </div>
        )
    }
}

export default Board