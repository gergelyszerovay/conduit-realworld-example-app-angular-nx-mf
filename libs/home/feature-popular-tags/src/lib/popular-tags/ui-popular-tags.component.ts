import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'conduit-ui-popular-tags',
  standalone: true,
  imports: [CommonModule],
  providers: [PopularTagsStore],
  templateUrl: './ui-popular-tags.component.html',
  styleUrls: ['./ui-popular-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiPopularTagsComponent {
  @Input() tags: string[] = [];
  @Output() tagClick = new EventEmitter<string>();
}
