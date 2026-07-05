import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'nav-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-menu.html',
  styleUrl: './nav-menu.css',
})
export class NavMenu {}