import React, {Component} from 'react'

import './cell.css'
import bomb from './bomb.png'

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value,
            clicked: 0
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

        this.setState({ clicked: ct + 1 })
    } 

    render() {
        const {value, clicked} = this.state
        if (clicked == 0)
            return <button className="cell" onContextMenu={(event) => this.clickType(event)} onClick={(event) => this.clickType(event)} > </button>
        else if(clicked == 1){
            if(value == -1)
                return <div><img src={bomb} alt="bomb" /> </div>

            else
                return <button className="cell-clicked"> {value} </button>
        }
        else
            return <button className="cell-marked" onContextMenu={(event) => this.clickType(event)} onClick={(event) => this.clickType(event)}> </button>
    }
}

export default Cell
