import { ChangeDetectionStrategy, Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'conduit-ui-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ui-button.component.html',
  styleUrls: ['./ui-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButtonComponent {
  @Input() label = '';
  @Input() disabled = false;
  @Output() submitClick = new EventEmitter<void>();
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() mode: 'primary' | 'secondary' = 'primary';
}
