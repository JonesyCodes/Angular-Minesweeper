import { Component, ViewContainerRef, ViewChild, ComponentFactoryResolver, Injector, Input, Output, EventEmitter } from '@angular/core';
import { GameGridComponent } from '../game-grid/game-grid.component';
import { CdTimerComponent } from 'angular-cd-timer';
import { GameGridData } from '../game-grid-data';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.css']
})
export class GameStatusComponent {
  title = 'Status Bar'
  flagCount = 0;
  gridData!: GameGridData;

  @Input() mineCount: number = 3;
  @Input() rowCount: number = 5;
  @Input() columnCount: number = 5;

  @Output() gameMessage: EventEmitter<string> = new EventEmitter();

  @ViewChild('gameTimer', { read: CdTimerComponent, static: true })
  public gameTimer!: CdTimerComponent;

  @ViewChild('placeholder', { read: ViewContainerRef, static: true })
  public placeholder!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver, private injector: Injector, private dialog: MatDialog) { }

// Dialog start
  
      showDialog(win: boolean){
        const dialogRef = this.dialog.open(ModalDialogComponent, {
          disableClose: true,
          data: {
            win: win
          }
        });
      }

  // Dialog end

  ngOnInit() {
    const inputData: GameGridData = { mines: this.mineCount, columns: this.columnCount, rows: this.rowCount, flagOnClick: false };
    this.gridData = inputData;
    this.gameMessage.emit('On PC you can right click to plant flags')
    this.newGame();
    this.gameTimer.format = "ms";
  }

  //// Generate new minefield and clear game message
  newGame() {
    this.placeholder.detach();
    const componentFactory = this.resolver.resolveComponentFactory(GameGridComponent);
    const component = componentFactory.create(this.injector);
    this.placeholder.insert(component.hostView);

    component.instance.data = this.gridData;

    component.instance.gameOverEvent.subscribe((value) => this.gameOver(value));
    component.instance.flagEvent.subscribe((value) => this.changeFlagCount(value));

    this.newTimer();
    this.flagCount = 0;
    this.gameMessage.emit('New mines buried');
  }

  //// Resets timer component
  newTimer() {
    this.gameTimer.reset();
    this.gameTimer.start();
  }

  //// Create game message based on game result
  gameOver(win: boolean) {
    this.gameTimer.stop();

    if (win) {      
      this.gameMessage.emit(`Congrats, you're basically Jeremy Renner! Completed in: ${this.gameTimer.get().minutes}min ${this.gameTimer.get().seconds }s`);
      this.showDialog(win);
    }
    else {
      this.gameMessage.emit(`Go watch The Hurt Locker to survive longer than: ${this.gameTimer.get().minutes}min ${this.gameTimer.get().seconds }s`);
      this.showDialog(win);
    }
  }

  //// Increments flag counter on addition/removal of flag
  changeFlagCount(flagAdded: boolean) {
    if (flagAdded) {
      this.flagCount++;
    }
    else {
      this.flagCount--;
    }
  }

  //// toggle for flag on  left click
  toggleActive() {
    this.gridData.flagOnClick = !this.gridData.flagOnClick;
  }
}
