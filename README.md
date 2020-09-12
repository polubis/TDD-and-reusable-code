# Creating form library

## Why ?

There are lots of libraries to handle forms dedicated to frameworks.

`formik`, `reactive-forms`, `redux-forms`, ...etc

There is a problem when we change technologies. We also probably need to change the library for the forms.

Additionally, if we use monorepo or microfe, we would like to have one lib for handling forms.

Our solution should not have any dependencies and have an API that will be easy to use for any framework

We should completely get rid of additional dependencies in the form of references to `React` or other frameworks as it is in the case of `formic`. Our library should be self-sufficient and have a scalable API.

## Naive implementation in React

### Pros

- Easy to iterate through values and map them to components,
- Easy to config,
- Easy to setup initial values,
- Much better than formik - logic is separated from view

### Cons

- Solution connected to React,
- Hard API - working with arrays,
- Hard to use type definitions for values,
- Solution can be used only in hook based forms,
- Hard result model,
- Sticky validation strategy,
- No validation on init,
- Hard to add new features or change model

## List of features in new implementation

- 100% typed model,
- One function to partial, full update,
- Logic is totaly separated from React,
- Fluent model,
- Hard values validation in run time - if f.e someone assigns as init value `string` - change to `number` is not allowed,
- Option to define custom form by adding implementation for core methods,
- Technological independence,
- Immutable based approach

## API Proposal

```ts
interface Register {
  login: string;
  password: string;
  repeatedPassword: string;
}

const requiredValidator = (value: any) => !value;

const form = new Form<Register>(
  new Fields({
    login: new Field(''),
    password: new Field('', [requiredValidator]),
    repeatedPassword: new Field('', [requiredValidator])
  })
);
const { invalid, fields, set } = form;

set({ login: 'piotr', password: 'piotr1994' }); // Easy partial update with type check

console.log(values); // prints { invalid, value }
```