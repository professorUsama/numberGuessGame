"use strict";


// generate random number function
function generateRandomNumber(){
	const randomNumber = parseInt(Math.random() * 100);
	return randomNumber;
}

// validation user number, check the enetred value number or not
function validateUserNumber(number=null){
	if (number < 0 || isNaN(number ) || number === ""){
		errorMessageDisplay("Please enter valid number...");
	}
	else if(number > 100){
		errorMessageDisplay("Please enter number less than 100");
	}
	else{
		errorMessageDisplay(parseInt(number))
		checkUserGuessNumber(parseInt(number));
	}

}

// display error message function, if user did not enter a valid value
function errorMessageDisplay(message){
	const errorMessageHeading2 = document.getElementById('errorMessage');
	if (isNaN(message)){
		errorMessageHeading2.innerHTML = message;
		errorMessageHeading2.style.color = "red";
		errorMessageHeading2.style.display = "block";
		hintMessage.innerHTML = "Please try again...";
	}
	else{
		errorMessageHeading2.style.display = "none";
	}
}


// function match the user guess number
function checkUserGuessNumber(validNumber){
	if(validNumber === randomNumber){
		greetings(validNumber);
		winGame();
	}
	else if(validNumber > randomNumber){
		totalAttempts--;
		previousUserGuess.push(validNumber);
		hintMessage.innerHTML = "Your number greater than random number";
		displayGuess();
		gameOver();
	}
	else if(validNumber < randomNumber){
		totalAttempts--;
		previousUserGuess.push(validNumber);
		hintMessage.innerHTML = "Your number less than random number";
		displayGuess();
		gameOver();
	}
}


// function about to display the user remaining attempts and also display the list of previous guesses on the html page
function displayGuess(){
	displayPreviousGuesses.innerHTML = previousUserGuess;
	displayRemainingAttempts.innerHTML = totalAttempts;
}

// greeting messages will display if user won the game
function greetings(matchNumber){
	let greetingMessage = document.querySelector('#greeting');
	userTotalAttempts.innerHTML = `Your Total Atempts: ${10-totalAttempts}`
	greetingMessage.innerHTML = `Congratulations! Your Guess the Number ${matchNumber} Successfully`;
	greetingMessage.style.color = "green";
}

// if user won the game... this function display message you won the game, after won the user won't be to continue the game
function winGame(){
	submitButton.disabled = true;
	inputTag.disabled = true;
	submitButton.value = "Game Won!"
	submitButton.style.backgroundColor = "green";
	submitButton.style.color = "white";
}

// if user attempts 0, then the game will end, and the user won't be able to play the game
function gameOver(){
	if(totalAttempts < 1){
		submitButton.disabled = true;
		inputTag.disabled = true;
		submitButton.value = "Game Over!";
		submitButton.style.backgroundColor = "red";
		submitButton.style.color = "white";
		hintMessage.innerHTML = "You Lose the Game!";
		hintMessage.style.color = "red";
	}

}

// main execution


// event listener activate if the user submit
// store form in a var
const form = document.querySelector('.form');

// for display if the user number less than or greater than
let hintMessage = document.querySelector('.hint');

// for display the user previous guess
const displayPreviousGuesses = document.querySelector('.guesses');

// for display the remaining user attempts or total attempts
const displayRemainingAttempts = document.querySelector('.attempts');

// for display the total attempts after won the game
const userTotalAttempts = document.querySelector('.totalAttempts');

// submit button 
const submitButton = document.querySelector('#submitButton');

// input tag where the user enter value
const inputTag = document.querySelector('#guessField');

// display message when the start 1st time game
hintMessage.innerHTML = "Please Start the Game";

// call generate random function and store in a memory
const randomNumber = generateRandomNumber();

// store the user previous guess for display or remember
const previousUserGuess = [];

// total game attempts
let totalAttempts = 10;

// listen the form and execute the value if the user submit
form.addEventListener('submit', (event) => {
	// form submit without reloading the page
	event.preventDefault();

	// get and store the user input value 
	let getUserNumber = document.getElementById('guessField').value;

	// function for check the user the entered value valid or not. it may be a text or character or empty
	validateUserNumber(getUserNumber);



	// empty the input field after submit the value
	document.getElementById('guessField').value = '';

});