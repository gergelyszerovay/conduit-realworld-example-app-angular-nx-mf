import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'conduit-profile-feature-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-feature-profile.component.html',
  styleUrls: ['./profile-feature-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFeatureProfileComponent {}
