import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';

import { FilterCardsPipe } from './pipes/filter-cards.pipe';
import { SortDatePipe } from './pipes/sort-date.pipe';
import { SortViewPipe } from './pipes/sort-view.pipe';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent, FilterCardsPipe, SortDatePipe, SortViewPipe],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    CoreModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SearchResultsComponent,
  ],
})
export class AppModule {}
