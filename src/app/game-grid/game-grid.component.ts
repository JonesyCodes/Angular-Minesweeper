import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { SquareData } from '../square-data';
import { GameGridData } from '../game-grid-data';

@Component({
  selector: 'app-game-grid',
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.css']
})
export class GameGridComponent {
  title = 'Minefield'

  @Input() data: GameGridData = {
    mines: 1,
    columns: 5,
    rows: 5,
    flagOnClick: false
  }

  @Output() gameOverEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() flagEvent: EventEmitter<boolean> = new EventEmitter();

  colArray: number[] = [];
  rowArray: number[] = [];
  squares: SquareData[] = [];
  revealedEmpty = 0;
  setColumns: string | undefined;
  gameOver: boolean = false;

  ngOnInit() {
    this.setDimension();
    this.setColumns = `repeat(${this.data.columns}, 50px)`
  }

  //// Generate grid and randomise bomb locations
  setDimension() {
    this.squares = [];
    let totalSquares = this.data.rows * this.data.columns;

    for (let i = 0; i < totalSquares; i++) {

      if (i < this.data.mines) {
        const squareData: SquareData = {
          mine: true,
          state: 'hidden'
        };

        this.squares.push(squareData);
      }
      else {
        const squareData: SquareData = {
          mine: false,
          state: 'hidden'
        };
        this.squares.push(squareData);
      }
    }

    this.squares.sort(() => Math.random() - 0.5);

    let index = 0;

    this.squares.forEach(() => {
      let adjacentSquares: number[] = [];
      if ((index % this.data.columns) - 1 >= 0) { adjacentSquares.push(index - 1) }; // left
      if ((index % this.data.columns) + 1 < this.data.columns) { adjacentSquares.push(index + 1) }; // right
      if (index - this.data.columns >= 0) { adjacentSquares.push(index - this.data.columns) }; // top
      if (index + this.data.columns < totalSquares) { adjacentSquares.push(index + this.data.columns) }; // bottom
      if ((index - this.data.columns) - 1 >= 0 && (index % this.data.columns) - 1 >= 0) { adjacentSquares.push(index - this.data.columns - 1) }; // top left
      if ((index - this.data.columns) + 1 >= 0 && (index % this.data.columns) + 1 < this.data.columns) { adjacentSquares.push(index - this.data.columns + 1) }; // top right
      if ((index + this.data.columns) - 1 < totalSquares && (index % this.data.columns) - 1 >= 0) { adjacentSquares.push(index + this.data.columns - 1) }; // bottom left
      if ((index + this.data.columns) + 1 < totalSquares && (index % this.data.columns) + 1 < this.data.columns) { adjacentSquares.push(index + this.data.columns + 1) }; // bottom right
      this.squares[index].adjacent = adjacentSquares;
      index++;
    })
  }

  //// Recieves Event emitted from square, check adjacent squares for mines, if none found repeat for adjacent squares
  squareClicked(index: number) {
    let square = this.squares[index];
    let adjacentMines = 0;

    if (this.data.flagOnClick) {
      this.squareRightClicked(index);
      return;
    }

    if (square.state != 'hidden') {
      return;
    }

    square.adjacent?.forEach((index: number) => {
      if (this.checkForMine(index)) {        
        adjacentMines++;
      }
    })

    square = { state: 'revealed', mine: square.mine, adjacentMines: adjacentMines, adjacent: square.adjacent };
    this.squares[index] = square;

    if (adjacentMines == 0) {
      square.adjacent ?.forEach((check: number) => {
        if (this.squares[check].state == 'hidden') {
          this.squareClicked(check);
        }
      })
    }

    this.checkForWin(square);
  }

  //// Recieves Event emitted from square, adds/removes flag 
  squareRightClicked(index: number) {
    let square = this.squares[index];

    if (square.state == 'hidden') {
      square = { state: 'flagged', mine: square.mine, adjacentMines: square.adjacentMines, adjacent: square.adjacent };
      this.squares[index] = square;
      this.flagEvent.emit(true);
    }
    else {
      square = { state: 'hidden', mine: square.mine, adjacentMines: square.adjacentMines, adjacent: square.adjacent };
      this.squares[index] = square;
      this.flagEvent.emit(false);
    }
  }

  //// Checks if a square is a mine
  checkForMine(index: number) {
    let square = this.squares[index];

    if (square.mine) {
      return true;
    }
    else {
      return false;
    }
  }

  //// Checks if the win/loss condition has been met
  checkForWin(currentSquare: SquareData) {
    if (currentSquare.mine) {
      this.gameOverEvent.emit(false);
      this.gameOver = true;
    }
    else {
      this.revealedEmpty++;

      if (this.revealedEmpty == this.data.columns * this.data.rows - this.data.mines) {      
        this.gameOverEvent.emit(true);
      }
    }
  }
}
