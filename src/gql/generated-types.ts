import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateUserOutput = {
  __typename?: 'CreateUserOutput';
  error?: Maybe<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: CreateUserOutput;
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  getUser: Scalars['Boolean'];
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: {
    __typename?: 'CreateUserOutput';
    ok: boolean;
    error?: string | null;
  };
};

export const CreateUserDocument = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      ok
      error
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CreateUserGQL extends Apollo.Mutation<
  CreateUserMutation,
  CreateUserMutationVariables
> {
  document = CreateUserDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
