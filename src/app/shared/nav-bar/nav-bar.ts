import { Component } from '@angular/core';
import { MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-nav-bar',
  imports: [
    MatBadgeModule
  ],

  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {}
