import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { HeaderSearchComponent } from './components/header/header-search/header-search.component';
import { CustomButtonComponent } from './components/UI/custom-button/custom-button.component';
import { HeaderUserLoginComponent } from './components/header/header-user-login/header-user-login.component';
import { FilterCardsComponent } from './components/filter-cards/filter-cards.component';
import { FilterListComponent } from './components/filter-cards/filter-list/filter-list.component';

import { CustomButtonStyleDirective } from './directive/custom-button-style.directive';
import { FilterCardsPipe } from './pipes/filter-cards.pipe';
import { SortDatePipe } from './pipes/sort-date.pipe';
import { SortViewPipe } from './pipes/sort-view.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderSearchComponent,
    CustomButtonComponent,
    CustomButtonStyleDirective,
    HeaderUserLoginComponent,
    FilterCardsComponent,
    FilterListComponent,
    FilterCardsPipe,
    SortDatePipe,
    SortViewPipe,
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SearchResultsComponent,
  ],
})
export class AppModule {}
