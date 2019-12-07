import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import * as Hammer from 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { GamesModule } from './games/games.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    // override hammerjs default configuration
    swipe: { direction: Hammer.DIRECTION_ALL }
  } as any;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GamesModule,
    SharedModule,

    // SHOULD BE THE LAST
    AppRoutingModule,

  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
