import {ChangeDetectionStrategy, Component} from '@angular/core';
import {User} from './user';
import {AppState} from './store';
import {Store} from '@ngrx/store';
import {selectUser} from './store/user.selectors';
import {updateUserRequest} from './store/user.actions';

/**
 * Initial user
 *{
 *   name: '',
 *   balance: 0,
 *   items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
 * }
 */

@Component({
  selector: 'app-root',
  template: `
    <div>Name: {{user.name}}</div>
    <div>Balance: {{user.balance}}</div>
    <div>Items: {{user.items | json}}</div>
    <button (click)="dropItems()">Drop items 1-10</button>
    <button (click)="addBalance()">Add 0.2 to balance</button>
    <button (click)="save()">Save</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  user!: User
  itemsToDrop: number[] = []

  constructor(private store: Store<AppState>) {
    this.store.select(selectUser).subscribe(user => {
      this.user = user;
    })
    this.user.name = 'Mask'
    this.user.balance = 0.1
  }

  addBalance(): void {
    this.user.balance += 0.2
  }

  dropItems(): void {
    this.itemsToDrop.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
  }

  save(): void {
    this.user.items.filter(item => !this.itemsToDrop.includes(item))
    this.store.dispatch(updateUserRequest({data: this.user}))
  }
}
