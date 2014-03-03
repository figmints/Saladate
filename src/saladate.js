/*
**
** Proxy through $(jQuery, Zepto)
**
** Basic use:
** var volunteerForm = new Saladate.salad('#application-form #volunteer');
*/


// Saladate
var Saladate = (function() {
	var salad = function(form) {
		this.form = document.querySelector(form);
		this.init();
	};

	// Salad Methods
	salad.prototype = {
		init : function() {
			var self = this;

			// Submit
			$(this.form).on('submit', function() {
				self.error.reset();

				//
				$(self.form).find('input, textarea').each(function(i) {
					self.validate($(this));
				});

				if (self.error.presence !== false) {
					return true;
				} else {
					return false;
				};
			});

			// Global handler
			$('[saladate]').on('blur, keyup', function() {
				self.validate($(this));
			});
		},
		validate : function(el) {
			var self = this;

			switch (el.attr('saladate')) {
				case "ccv":
					if (self.ccv(el.val()) === false) {
						self.error.message(el, "Your ccv number appears to be wrong.");
					} else {
						self.error.reset();
					};
					break;

				case "email":
					if (self.email(el.val()) === false) {
						self.error.message(el, "Please enter your " + $('label[for="' + el.attr('name') + '"]').text() + ".");
					} else {
						self.error.reset();
					};
					break;

				case "presence":
					if (self.presence(el.val()) === false) {
						self.error.message(el, "Please enter your " + $('label[for="' + $(el).attr('name') + '"]').text() + ".");
					} else {
						self.error.reset();
					};
					break;
			};
		},
		ccv : function(ccv) {
			if(ccv.length < 3) {
				return false;
			} else {
				return true;
			}
		},
		country : function(input) {
			if(input === "Country") {
				return false;
			} else {
				return true;
			}
		},
		checked : function(input) {
			if(input.prop('checked') === false) {
				return false;
			} else {
				return true;
			}
		},
		// Validate credit card
		// @type	- Credit card type
		// @ccnum	- Credit card number
		creditCard : function(identifier) {
			var sum     = 0,
					alt     = false,
					i       = identifier.length-1,
					num;

				if (identifier.length < 13 || identifier.length > 19){
						return false;
				};

				while (i >= 0){
						//get the next digit
						num = parseInt(identifier.charAt(i), 10);
						//if it's not a valid number, abort
						if (isNaN(num)){
								return false;
						};
						//if it's an alternate number...
						if (alt) {
								num *= 2;
								if (num > 9){
										num = (num % 10) + 1;
								}
						};
						//flip the alternate bit
						alt = !alt;
						//add to the rest of the sum
						sum += num;
						//go to next digit
						i--;
				};
				//determine if it's valid
				return (sum % 10 == 0);
		},

		// Validate Email
		// @email - Email to validate, pass $('input[name="example"]').val()
		email : function(email) {
				var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return re.test(email);
		},
		error : {

			// Gerates error below input
			// @el 		- Input element to test, using $('input[name="example"]')
			// @message - Message to be displayed
			message : function(el, message) {
				var messageElements = '<div class="error-message"><i></i>' + message + '</div>';
				if (el.is('select')) {
					el.parent().addClass('error');
					if(!el.parent().next().hasClass('error-message')) {
						el.parent().after(messageElements);
					}
				} else if (el.is('input[type="checkbox"]')) {
					if(!el.parent().next().hasClass('error-message')) {
						el.parent().next().after(messageElements);
					}
				} else {
					el.addClass('error');
					if(!el.next().hasClass('error-message')) {
						el.after(messageElements);
					}
				}
				this.presence = true;
			},
			// Are there any errors present?
			// Default is false
			presence : false,

			// Resets all errors
			reset : function() {
				this.presence = false
				$('.error-message').each(function() {
					$(this).remove();
				});
				$('input, .select-wrap').each(function() {
					$(this).removeClass('error');
				});

			}
		},
		forEach: function(array, fn) {
			for (i = 0; i < array.length; i++)
				fn(array[i], i);
		},
		month : function(input) {
			if (input === "MM") {
				return false;
			} else {
				return true;
			}
		},
		password : function(input) {
			if (input.length < 6) {
				return false;
			} else {
				return true;
			}
		},
		passwordConfirm : function(input, input2) {
			if (input !== input2) {
				return false;
			} else {
				return true;
			}
		},
		presence : function(input) {
			if(input === "") {
				return false;
			} else {
				return true;
			}
		},
		state : function(input) {
			if(input === "State") {
				return false;
			} else {
				return true;
			}
		},
		year : function(input) {
			if (input === "YY") {
				return false;
			} else {
				return true;
			}
		},
		zipcode : function(input) {
			if (isNaN(input) === false) {
				if(input.length < 5) {
					return false;
				} else {
					return true;
				}
			} else {
				return false;
			}
		}
	};

	return {
		salad: salad
	};

})();