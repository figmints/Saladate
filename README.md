Saladate
========

JavaScript saladation.

### Basic Usage
HTML

`<form id="some-form">`<br/>
&nbsp;&nbsp;`<label for="name[last]">Last Name <span>*</span></label>`<br/>
&nbsp;&nbsp;`<input saladate="presence" type="text" name="name[last]" />`<br/>
`</form>`

JS

`var someForm = new Saladate.salad('#some-form');`

That's it.

#### To-Do
1. Add the rest of the validators to the validate method.