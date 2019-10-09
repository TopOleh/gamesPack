import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent, PageNotFoundComponent } from './components';

@NgModule({
  declarations: [PageNotFoundComponent, HeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent]
})
export class SharedModule { }
