import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { SearchItemComponent } from './components/search/search-item/search-item.component';
import { HeaderSearchComponent } from './components/header/header-search/header-search.component';
import { CustomButtonComponent } from './components/UI/custom-button/custom-button.component';
import { HeaderUserLoginComponent } from './components/header/header-user-login/header-user-login.component';

import { CustomButtonStyleDirective } from './directive/custom-button-style.directive';
import { FilterCardsComponent } from './components/filter-cards/filter-cards.component';
import { FilterListComponent } from './components/filter-cards/filter-list/filter-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchResultsComponent,
    SearchItemComponent,
    HeaderSearchComponent,
    CustomButtonComponent,
    CustomButtonStyleDirective,
    HeaderUserLoginComponent,
    FilterCardsComponent,
    FilterListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
