import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'conduit-ui-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInputComponent {
  @Input() control!: FormControl;
  @Input() label = '';
  @Input() autocomplete = '';
  @Input() type: 'text' | 'password' | 'textarea' = 'text';
  @Input() textareaRows = 8;
}
