import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'conduit-ui-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-footer.component.html',
  styleUrls: ['./ui-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiFooterComponent {}
