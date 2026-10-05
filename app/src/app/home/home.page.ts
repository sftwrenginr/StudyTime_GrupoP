import { Component, inject } from '@angular/core';

import { RedService } from '../services/red.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  red = inject(RedService);

  constructor() {}

}
