import { Component, Input, EventEmitter, Output } from '@angular/core';
import { GameOptionsData } from '../game-options-data';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent {
  title = 'Game Options'

  @Input() data: GameOptionsData = {
    mineCount: 1,
    columnCount: 1,
    rowCount: 1
  };
  @Output() optionsChangedEvent: EventEmitter<GameOptionsData> = new EventEmitter();

  //// Updates mineCount property on input change
  mineInputChange(event: { target: { value: number; }; }) {
    if (event.target.value < 1) {
      event.target.value = 1;
    }

    this.data.mineCount = Number(event.target.value);
    this.checkParameters();
  }

  //// Updates rowCount property on input change
  rowInputChange(event: { target: { value: number; }; }) {
    if (event.target.value < 1) {
      event.target.value = 1;
    }

    this.data.rowCount = Number(event.target.value);
    this.checkParameters();
  }

  //// Updates columnCount property on input change
  columnInputChange(event: { target: { value: number; }; }) {
    if (event.target.value < 1) {
      event.target.value = 1;
    }

    this.data.columnCount = Number(event.target.value);
    this.checkParameters();
  }

  //// Checks mineCount doesn't exceed total number of squares, reduces to max value
  checkParameters() {
    if (this.data.mineCount > this.data.columnCount * this.data.rowCount) {
      this.data.mineCount = this.data.columnCount * this.data.rowCount;
      (document.getElementById('mineCount') as HTMLInputElement)!.value = `${this.data.mineCount}`;
    }
  }

  //// Emits current selected options
  optionsChanged() {
    const data: GameOptionsData = {
      mineCount: this.data.mineCount,
      columnCount: this.data.columnCount,
      rowCount: this.data.rowCount
    }

    this.optionsChangedEvent.emit(data);
  }
}
