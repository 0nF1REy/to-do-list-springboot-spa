import { Component } from '@angular/core';
import { ContentComponent } from '../components/content/content.component';
@Component({
  selector: 'home',
  imports: [ContentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
