import { Component } from '@angular/core';

import { MainGroupsComponent } from '../main-groups/main-groups.component';
import { MainPeopleComponent } from '../main-people/main-people.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MainGroupsComponent, MainPeopleComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
