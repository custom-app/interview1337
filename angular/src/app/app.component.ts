import {ChangeDetectionStrategy, Component} from '@angular/core';
import {User} from './user';
import {AppState} from './store';
import {Store} from '@ngrx/store';
import {selectUser} from './store/user.selectors';
import {updateUserRequest} from './store/user.actions';

@Component({
  selector: 'app-root',
  template: `
    <div>Name: {{user.name}}</div>
    <div>Id: {{user.balance}}</div>
    <button (click)="setName()">Set name "Jason"</button>
    <button (click)="addBalance()">Add balance</button>
    <button (click)="save()">Save</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  user!: User

  constructor(private store: Store<AppState>) {
    this.store.select(selectUser).subscribe(user => {
      this.user = user;
    })
    this.user.name = 'Mask'
    this.user.balance = 0.1
  }

  setName(): void {
    this.user.name = 'Jason'
  }

  save(): void {
    this.store.dispatch(updateUserRequest({data: this.user}))
  }

  addBalance(): void {
    this.user.balance += 0.2
  }
}
