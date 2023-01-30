import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'conduit-shared-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-ui.component.html',
  styleUrls: ['./shared-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedUiComponent {
  @Input() testInput = 'abc';
  @Output() testOutput = new EventEmitter<string>();
}
