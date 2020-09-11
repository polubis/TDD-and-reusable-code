# Creating form library

## Why ?

There are lots of libraries to handle forms dedicated to frameworks.

`formik`, `reactive-forms`, `redux-forms`, ...etc

There is a problem when we change technologies. We also probably need to change the library for the forms.

Additionally, if we use monorepo or microfe, we would like to have one lib for handling forms.

Our solution should not have any dependencies and have an API that will be easy to use for any framework

We should completely get rid of additional dependencies in the form of references to `React` or other frameworks as it is in the case of `formic`. Our library should be self-sufficient and have a scalable API.

## Issues with naive implementation in React
