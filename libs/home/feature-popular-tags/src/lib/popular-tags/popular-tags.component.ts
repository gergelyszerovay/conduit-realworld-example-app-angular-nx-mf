import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularTagsStore } from './popular-tags.store';
import { LetModule } from '@ngrx/component';
import { defaultHttpRequestErrorMessage, HttpRequestStateErrorPipe } from '@conduit/shared/data-access';

@Component({
  selector: 'conduit-popular-tags',
  standalone: true,
  imports: [CommonModule, LetModule, HttpRequestStateErrorPipe],
  providers: [PopularTagsStore],
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularTagsComponent implements OnInit {
  @Input() tags: string[] = [];
  @Output() tagClick = new EventEmitter<string>();

  defaultHttpRequestErrorMessage = defaultHttpRequestErrorMessage;

  constructor(
    protected popularTagsStore: PopularTagsStore
  ) { }

  ngOnInit(): void {
    this.popularTagsStore.load();
  }
}
