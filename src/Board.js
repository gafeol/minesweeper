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
        let n = 10, count = 0;
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
            bomb_count: count
        }
    }

    createBoard() {
        let table = []
        let {grid_size, grid} = this.state;
        for (let i = 0; i < grid_size; i++) {
            for(let j = 0;j < grid_size;j++){
                table.push(
                    <Cell value={grid[i][j]} />
                )
            }
        }
        return table
    }

    render() {
        return (
            <div> 
                <h4> Bombs left: {this.state.bomb_count} </h4>
                <div className="grid-container">
                    {this.createBoard()}
                </div>
            </div>
        )
    }
}

export default Board