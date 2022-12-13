import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import {
  CreateCustomerGQL,
  Customer,
  GetCustomersDocument,
  GetCustomersGQL,
} from '../../gql/generated-types';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  isAddNew$: Observable<boolean>;
  customers$: Observable<Customer[]>;
  private isAddNewSubject: BehaviorSubject<boolean>;
  private customersSubject: Subject<Customer[]>;

  constructor(
    private readonly getCustomersGQL: GetCustomersGQL,
    private readonly createCustomerGQL: CreateCustomerGQL,
  ) {
    this.customersSubject = new Subject<Customer[]>();
    this.isAddNewSubject = new BehaviorSubject<boolean>(false);
    this.isAddNew$ = this.isAddNewSubject.asObservable();
    this.customers$ = this.customersSubject.asObservable();
  }

  setAddNew() {
    this.isAddNewSubject.next(true);
  }
  setList() {
    this.isAddNewSubject.next(false);
  }

  createCustomer(firstName: string, lastName: string) {
    this.createCustomerGQL
      .mutate(
        {
          input: {
            firstName,
            lastName,
          },
        },
        {
          refetchQueries: [
            {
              query: GetCustomersDocument,
            },
          ],
        },
      )
      .subscribe({
        next: () => {
          console.log('create customer subscribe');
        },
      });
  }
  getCustomers() {
    this.getCustomersGQL.watch().valueChanges.subscribe({
      next: (res) => {
        this.customersSubject.next(res.data.getCustomers.customers);
        console.log('get customers subscribe');
      },
    });
  }
}
