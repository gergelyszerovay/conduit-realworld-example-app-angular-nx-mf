import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'conduit-ui-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-navbar.component.html',
  styleUrls: ['./ui-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiNavbarComponent {}
