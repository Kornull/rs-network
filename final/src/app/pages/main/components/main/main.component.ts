import { Component } from '@angular/core';
import { ProfileComponent } from '../../../profile/components/profile/profile.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ProfileComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
