import { Component } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-left-bar',
  imports: [RouterLinkActive, RouterLink],
  templateUrl: './left-bar.html',
  styleUrl: './left-bar.css',
})
export class LeftBar {}
