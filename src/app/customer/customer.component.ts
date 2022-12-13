import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { Customer, GetCustomersGQL, User } from '../../gql/generated-types';
import { AuthService } from '../auth/auth.service';
import { CustomerService } from './customer.service';

@Component({
  selector: 'customer',
  styleUrls: ['customer.component.scss'],
  templateUrl: 'customer.component.html',
  providers: [CustomerService],
})
export class CustomerComponent {
  customers$: Observable<Customer[]>;
  isAddNew$: Observable<boolean>;
  firstName = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  lastName = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  displayedColumns: string[] = ['firstName', 'lastName'];
  user: User | undefined | null;

  @ViewChild(MatTable) table: MatTable<Customer>;

  constructor(
    private readonly customerService: CustomerService,
    private readonly authService: AuthService,
    private readonly getCustomerGQL: GetCustomersGQL,
  ) {
    this.isAddNew$ = this.customerService.isAddNew$;
    this.customers$ = this.customerService.customers$;
  }

  ngOnInit(): void {
    this.me();
    this.customerService.getCustomers();
  }

  addNew() {
    this.customerService.setAddNew();
  }

  save() {
    if (!this.firstName.value || !this.lastName.value) return;
    this.customerService.createCustomer(
      this.firstName.value,
      this.lastName.value,
    );
    this.customerService.setList();
  }
  cancel() {
    this.customerService.setList();
    this.reset();
  }
  getFirstNameErrorMsg() {
    if (this.firstName.hasError('required')) return '내용을 입력해주세요.';
    if (this.firstName.hasError('minlength')) return '2자 이상 입력해주세요.';

    return '';
  }
  getLastNameErrorMsg() {
    if (this.lastName.hasError('required')) return '내용을 입력해주세요.';
    if (this.lastName.hasError('minlength')) return '2자 이상 입력해주세요.';
    return '';
  }

  logout() {
    this.authService.logout();
  }

  me() {
    this.authService.me().subscribe((res) => {
      this.user = res.data.me;
    });
  }

  reset() {
    this.firstName.setValue('');
    this.lastName.setValue('');
  }
}
