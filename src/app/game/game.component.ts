import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, Injector } from '@angular/core';
import { GameStatusComponent } from '../game-status/game-status.component';
import { GameOptionsData } from '../game-options-data';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  title = 'Game'

  gameOptions: GameOptionsData = {
    mineCount: 3,
    rowCount: 5,
    columnCount: 5
  }

  @ViewChild('placeholder', { read: ViewContainerRef, static: true })
  public placeholder!: ViewContainerRef;
  constructor(private resolver: ComponentFactoryResolver, private injector: Injector) { }

  ngOnInit() {
    this.newGameInstance();
    this.displayMessage('Welcome to Angular Minesweeper!');
  }

  //// Creates a new instance of the GameStatusComponent
  newGameInstance() {
    this.placeholder.detach();
    const componentFactory = this.resolver.resolveComponentFactory(GameStatusComponent);
    const component = componentFactory.create(this.injector);
    this.placeholder.insert(component.hostView);

    component.instance.mineCount = this.gameOptions.mineCount;
    component.instance.columnCount = this.gameOptions.columnCount;
    component.instance.rowCount = this.gameOptions.rowCount;
    component.instance.gameMessage.subscribe(message => { this.displayMessage(message) });
  }

  //// Sets gameOptions property 
  setOptions(data: GameOptionsData) {
    this.gameOptions = data;
    this.newGameInstance();
  }

  //// Adds new message to Html 
  displayMessage(message: string) {
    let messageBox = document.getElementById('message');
    let dateTime = new Date();

    messageBox!.insertAdjacentHTML("afterbegin", `<b>${dateTime.toLocaleTimeString()}</b>&emsp;${message}<br/>`);
  }

  //// Clears all messages
  clearMessages() {
    let messageBox = document.getElementById('message');
    messageBox!.innerHTML = "";
  }
}
