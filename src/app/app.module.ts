import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OptionsComponent } from './options/options.component';
import { GameComponent } from './game/game.component';
import { GameGridComponent } from './game-grid/game-grid.component';
import { GridSquaresComponent } from './grid-squares/grid-squares.component';
import { GameStatusComponent } from './game-status/game-status.component';
import { CdTimerModule } from 'angular-cd-timer';
import { FormsModule } from '@angular/forms';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';

import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    OptionsComponent,
    GameComponent,
    GameGridComponent,
    GridSquaresComponent,
    GameStatusComponent,
    ModalDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CdTimerModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
