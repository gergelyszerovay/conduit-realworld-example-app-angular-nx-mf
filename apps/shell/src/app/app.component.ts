import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedStore } from '@conduit/shared/core';
import { AuthFeatureGetUserStore } from '@conduit/auth/feature-get-user'
// import { RootStore } from '@conduit/shared/core';
// import { sharedServices } from '@conduit/shared/core';

@Component({
  selector: 'conduit-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // title = 'shell';
  constructor(
    protected cdRef: ChangeDetectorRef,
    protected sharedStore: SharedStore,
    protected authFeatureGetUserStore: AuthFeatureGetUserStore
    // protected rootStore: RootStore
    ) {
      // sharedServices.rootStore = rootStore;
      // console.log({ sharedServices });
    }

  ngOnInit(): void {
    this.authFeatureGetUserStore.getUser();
  }
}
