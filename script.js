/*******w***********

    Name: Chelsea Bahsler
    Date: April 24
    Description:
	The JS that's associated with the contact form.

*******************/

/**
 * Handles the submit event of the survey form
 * 
 * @param {*} e A reference to the event object. 
 * @returns True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e){

	hideErrors();

	if(formHasErrors() == true)
	{
		e.preventDefault();
		return false;
	}

	return true;
}

/**
 * Handles the reset event for the form.
 *
 * @param {*} e  A reference to the event object
 * @returns True - allows the reset to happen;
 * 	`		False - prevents the browser from resetting the form.
 */
function resetForm(e){

	if ( confirm('Would you like to reset the form?') ){
		hideErrors();
		document.getElementById("fullName").focus();
		return true;
	}

	e.preventDefault();
	
	return false;	
}

/**
 * Does all the error checking for the form.
 *
 * @returns   True if an error was found; False if no errors were found
 */
function formHasErrors(){

	let errorFlag = false;
	
	let fullName = document.getElementById("fullName");
	let phoneNumber = document.getElementById("phoneNumber");
	let email = document.getElementById("email");

	let fullNameError = document.getElementById("fullName_error");

	// Name validation - Field is required
	if (fullName.value.trim() == "" || fullName.value.trim() == null)
	{			
		fullNameError.style.display = "block";
		showError(fullName);
		errorFlag = true;
	}

	// Regular Expressions - validate field format 
	// Phone Number source: https://ihateregex.io/expr/phone/
	// Email RegExp source: https://ihateregex.io/expr/email/
	let validatePhone = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);
	let validateEmail = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

	// Phone Number validation - validate field format 
	if(fullNameError.style.display == "none" && phoneNumber.value.trim() != "")
	{
		if (!validatePhone.test(phoneNumber.value))
		{
			document.getElementById("phoneNumberformat_error").style.display = "block";
			showError(phoneNumber);
			errorFlag = true;
		}
	}
	
	// Email validation - validate field format
	if(fullNameError.style.display == "none" && email.value.trim() != "")
	{
		if (!validateEmail.test(email.value))
		{
			document.getElementById("emailformat_error").style.display = "block";
			showError(email);
			errorFlag = true;
		}
	}

	return errorFlag;
}

/**
 * This sets focus and highlights text from the retrieved field element.
 * @param {*} field The retrieved element.
 */
function showError(field) {
	field.focus();
	field.select();
}

/**
 * Hides all of the error elements.
 */
function hideErrors(){
	// Get an array of error elements
	let error = document.getElementsByClassName("contact error");

	// Loop through each element in the error array
	for ( let i = 0; i < error.length; i++ ){
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/**
 * Tne load event for the form.
 */
function load(){

	hideErrors();

	// Created event listeners for the submit and reset buttons
	document.getElementById("submit").addEventListener("click", validate);
	document.getElementById("reset").addEventListener("click", resetForm);

}

document.addEventListener("DOMContentLoaded", load);