import React, {Component} from 'react'

import './cell.css'
import bomb from './bomb.png'

const init = 0
const flagged = 3
const visible = 1

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            cellType: 0
        }

        this.clickType = this.clickType.bind(this)
    }
    
    clickType(e) {
        e.preventDefault();
        
        var ct;
        e = e || window.event;

        if ("which" in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
            ct = e.which;
        else if ("button" in e)  // IE, Opera 
            ct = e.button;

        let newCellType = ct + 1;
        
        console.log(newCellType, this.state.cellType)
        if(newCellType === flagged && this.state.cellType === flagged){
            newCellType = init;
        }

        // Flagging bomb
        if(this.state.cellType === init && newCellType == flagged)
            this.props.updateBomb(-1)
        // Unflagging bomb
        if(this.state.cellType === flagged && newCellType == init)
            this.props.updateBomb(1)

        if(newCellType === visible)
            this.props.updateCellCount()

        this.setState({ cellType: newCellType })
    } 

    render() {
        const {value, cellType} = this.state
        if (cellType == init)
            return <button className="cell" onContextMenu={(event) => this.clickType(event)} onClick={(event) => this.clickType(event)} > </button>
        else if(cellType == visible){
            if(value == -1){
                this.props.explodeBomb();
                return <div id="div-bomb"><img src={bomb} alt="bomb" /> </div>
            }

            else
                return <button className="cell-clicked"> {value} </button>
        }
        else
            return <button className="cell-flagged" onContextMenu={(event) => this.clickType(event)} onClick={(event) => this.clickType(event)}> </button>
    }
}

export default Cell
