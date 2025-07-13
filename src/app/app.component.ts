import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PageFooterComponent } from './components/page-footer/page-footer.component';

@Component({
  selector: 'root',
  imports: [RouterOutlet, PageFooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'to-do-list-springboot-spa';
}
