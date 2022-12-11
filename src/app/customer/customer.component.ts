import { Component, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../../gql/generated-types';
import { AuthService } from '../auth/auth.service';
import { Customer } from './customer';
import { CustomerService } from './customer.service';

@Component({
  selector: 'customer',
  styleUrls: ['customer.component.scss'],
  templateUrl: 'customer.component.html',
})
export class CustomerComponent {
  customers: Customer[] = [];
  isAddNew: boolean = false;
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
    private router: Router,
    private readonly customerService: CustomerService,
    private readonly authService: AuthService,
  ) {
    this.customers.push(new Customer('geony', 'han'));
    this.customers.push(new Customer('bora', 'lee'));
    this.customers.push(new Customer('solhee', 'han'));
  }

  ngOnInit(): void {
    this.me();
  }

  toggle() {
    this.isAddNew = !this.isAddNew;
  }
  reset() {
    this.firstName.setValue('');
    this.lastName.setValue('');
  }
  onSubmit() {
    if (!this.firstName.value || !this.lastName.value) return;
    this.customers.push(
      new Customer(this.firstName.value, this.lastName.value),
    );
    this.toggle();
    this.table.renderRows();
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

  async me() {
    this.authService.me().subscribe((result) => {
      this.user = result.data.me;
    });
  }
}
