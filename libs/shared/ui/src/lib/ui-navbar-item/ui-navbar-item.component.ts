import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'conduit-ui-navbar-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ui-navbar-item.component.html',
  styleUrls: ['./ui-navbar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiNavbarItemComponent {
  @Input() link = '';
  @Input() label = '';
  @Input() exactActive = false;
}
