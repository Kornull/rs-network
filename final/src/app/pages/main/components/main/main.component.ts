import { Component } from '@angular/core';

import { MainGroupsComponent } from '../main-groups/main-groups.component';
import { MainPeopleComponent } from '../main-people/main-people.component';
import { LoaderComponent } from '../../../../shared';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MainGroupsComponent, MainPeopleComponent, LoaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
