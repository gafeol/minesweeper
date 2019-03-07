import React, {Component} from 'react'

import './cell.css'

class DummyCell extends Component {
    render() {
        let i = this.props.i
        let j = this.props.j
        return <button className="cell" onClick={() => this.props.click(i, j)} > </button>
    }
}

export default DummyCell
