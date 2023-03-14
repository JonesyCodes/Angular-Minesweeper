export interface SquareData {
  state: 'hidden' | 'revealed' | 'flagged';
  mine: boolean;
  adjacentMines?: number;
  adjacent?: number[];
}
