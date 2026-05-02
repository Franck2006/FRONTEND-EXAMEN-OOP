import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { ModelAppInterfaces } from '../../../models/type.model';

@Component({
  selector: 'app-apponitement-pannel',
  imports: [CommonModule],
  templateUrl: './apponitement-pannel.html',
  styleUrl: './apponitement-pannel.css',
})
export class ApponitementPannel implements OnInit {
  constructor(private profile: ProfileService) {}

  ngOnInit(): void {}
}
