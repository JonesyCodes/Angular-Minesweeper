import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { SquareData } from '../square-data';

@Component({
  selector: 'app-grid-squares',
  templateUrl: './grid-squares.component.html',
  styleUrls: ['./grid-squares.component.css']
})
export class GridSquaresComponent {

  @Input() data!: SquareData;

  @Output() squareClickedEvent: EventEmitter<void> = new EventEmitter();
  @Output() squareRightClickedEvent: EventEmitter<void> = new EventEmitter();

  value: string = "";
  content: string = "";
  minePath = 'assets\\Adobe_licensed\\mine_type1.png'

  ngOnInit() {
    this.displayValue();
  }

  //// Calls for update of value on property changes
  ngOnChanges(changes: SimpleChanges) {
    this.displayValue();
  }

  //// Sets value of square based on state property
  displayValue() {
    if (this.data.state == 'hidden')
    {
      this.value = '';
    }
    else if (this.data.state == 'flagged') {
      this.value = 'bi-flag-fill';
    }
    else if (this.data.mine)
    {
      this.content = this.minePath;
    }
    else
    {
      this.value = this.data.adjacentMines == 0 ? `` : `bi-${this.data.adjacentMines}-circle-fill`;
    }
  }

  //// Emits left click event
  squareClicked() {
    if (this.data.state == 'hidden' || this.data.state == 'flagged') {
      this.squareClickedEvent.emit();
    }
  }

  //// Emits right click event
  squareRightClicked(event: { preventDefault: () => void; }) {
    event.preventDefault();

    if (this.data.state == 'hidden' || this.data.state == 'flagged') {
      this.squareRightClickedEvent.emit();
    }
  }
}
