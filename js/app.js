$(function(){
	console.log("**** Inside App.js*****");

	var addressFields=1, phonenumberfields=1;
	var contact;
	var address;
	
	/*Cloning the phone number field*/
	$('#phonenumberbtn').click(function(event){
		event.preventDefault();
		$('#phonenumbergrp').append($('#phonenumbergrp').children('#phonenumber').first().clone().val(''));
		phonenumberfields++;
	});

	$('#addressbtn').click(function(event){
		event.preventDefault();
		addressFields++;
		var $addressFieldsetClone = $('#addressgrp').children('fieldset').first().clone();
		$addressFieldsetClone.children().each(function(){
			   $('#addressgrp').append($('<fieldset></fieldset>').append($(this)));
		});		
	});

	$('#contactform').validate({
        rules: {            
            lastname: {
                minlength: 3,
                maxlength: 15,
                required: true
            },
            firstname: {
                minlength: 3,
                maxlength: 15,
                required: true
            },
            email: {
	            required: true,
	            email: true
        	}
        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element){
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });

	$('#contactform').on('submit',function(event){
		event.preventDefault();
		var firstname , lastname, email;
		
		firstname = $('#firstname').val(); lastname = $('#lastname').val(); email = $('#email').val();
		if(!firstname || !lastname || !email)return false;

		var phoneNumbersInput = $('input[name=phonenumber]');console.log(phoneNumbersInput.length);
		var phonenumber = [];
		
		var addressInput = $('input[name=addressinput]');console.log(addressInput[0], addressInput[4]);
		var addressfieldset =[];

		if(phoneNumbersInput.length){
			phoneNumbersInput.each(function(){
				if($(this).val()){
					phonenumber.push($(this).val());
					console.log($(this).val());
				}
			});
		}

		if(addressInput.length){
			for(var i=0;i<addressInput.length;i=i+3){
				addressfieldset.push(addressInput.slice(i,i+3));
			}
			console.log(addressfieldset[0],addressfieldset[1]);
		}

		var contact=[];
		var address=[];

		var street, city,state;
		addressfieldset.forEach(function(addr){		
			street="",city="", state="";
			addr.each(function(i,addrfield){
				if(i==0){
					street =  addrfield.value;
				}
				else if(i==1){
					city = addrfield.value;
				}
				else if(i==2){
					state = addrfield.value;
				}
			});
			address.push({
				"street":street,
				"city":city,
				"state":state
			});
		});

		contact.push({
			"firstname"    : firstname,
			"lastname"     : lastname,
			"email"        : email,
			"phonenumbers" : phonenumber,
			"addresses"    : address
		});
		console.log(JSON.stringify(contact));
	});

	

});