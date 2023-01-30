import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { LogState } from "ngx-ngrx-component-store-debug-tools";
import { Observable } from "rxjs";

export interface User {
  bio: string;
  email: string;
  image: string;
  token: string;
  username: string;
}

export interface RootState {
  user?: User;
}

const initialRootState: RootState = {
  user: undefined
}

@Injectable({
  providedIn: 'root'
})
@LogState({ logLevel: 'debug' })
export class SharedStore extends ComponentStore<RootState> {
  readonly user$: Observable<User | undefined> = this.select(state => state.user);

  constructor() {
    super(initialRootState);
  }

  setUser = this.updater((state: RootState, user?: User): RootState => {
    return {
      ...state,
      user
    };
  })

}
