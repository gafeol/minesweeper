import React, {Component} from 'react'
import Cell from './Cell.js'
import './board.css'

function generateBomb(){
    let values = [0, 0, 0, 0, 0, 0, -1];
    var idx = Math.floor(Math.random()*values.length);
    return values[idx];
}

class Board extends Component {
    constructor() {
        super();
        let n = 5, count = 0;
        let table = new Array(n);
        for (let i = 0;i < n;i++){
            table[i] = new Array(n);
            for (let j = 0;j < n;j++){
                table[i][j] = generateBomb();
                count += (table[i][j] === -1)
            }
        }


        let vi = [1, -1, 0, 0, -1, 1, -1, 1];
        let vj = [0, 0, -1, 1, 1, 1, -1, -1];
        for (let i = 0;i < n;i++){
            for (let j = 0;j < n;j++){
                if(table[i][j] === 0){
                    for(let d = 0;d < 8;d++){
                        let ii = i + vi[d], jj = j + vj[d];
                        if(ii >= 0 && jj >= 0 && ii < n && jj < n)
                            table[i][j] += (table[ii][jj] === -1);
                    }
                }
            }
        }

        this.state = {
            grid_size: n,
            grid: table,
            bomb_count: count,
            cell_count: n*n - count,
            lost: false,
            won: false
        }

        this.updateBombCount = this.updateBombCount.bind(this)
        this.explodeBomb = this.explodeBomb.bind(this)
        this.updateCellCount = this.updateCellCount.bind(this)
        this.checkWin = this.checkWin.bind(this)
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

    createBoard() {
        let table = []
        let {grid_size, grid} = this.state;
        for (let i = 0; i < grid_size; i++) {
            for(let j = 0;j < grid_size;j++){
                table.push(
                    <Cell value={grid[i][j]} updateCellCount={this.updateCellCount} updateBomb={this.updateBombCount} explodeBomb={this.explodeBomb}/>
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
                    {this.createBoard()}
                </div>
            </div>
        )
    }
}

export default Board