import React, { Component } from 'react';
import './App.css';
import Board from './Board.js';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div class='container'>
        <h1 class='text-center'> Minesweeper </h1>
        <Board />
		<div class='d-inline text-center'>
			<a class='btn btn-outline-danger' href='./'> RESTART </a>
		</div>

		<h3 class='mt-5'> Rules: </h3>
		<p>
			Clicking with the left mouse button reveals the content of an unclicked cell. A cell may contain a bomb or a number, indicating the amount of adjacent bombs to that cell.

			A cell that is not in the border of the grid has 8 adjacent cells. Therefore, the number in a cell is always within the range 0 up to 8.
		</p>
		<p>
			Using the right mouse button <span class='flag'> flags </span> a cell as a potential bomb. It is possible to unflag a cell by clicking on it 	
		</p>
		<p>
			In order to win the game you must reveal all <span class='safe'> safe </span> cells and <span class='flag'> flag </span> all cells containing bombs.
			Revealing a bomb ends the game.
		</p>
		<p>
			The map is generated randomly at the moment you make your first click.
			Don't panic, your first click is always safe!
		</p>
		<p>
			Good Luck!
		</p>
      </div>
    );
  }
}

export default App;
