Saladate
========

JavaScript saladation.

### Basic Usage
HTML
`<form id="some-form">`
  `<label for="name[last]">Last Name <span>*</span></label>`
  `<input saladate="presence" type="text" name="name[last]" />`
`</form>`

JS

`var someForm = new Saladate.salad('#some-form');`

That's it.

#### To-Do
1. Add the rest of the validators to the validate method.