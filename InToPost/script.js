'use strict'

const submitButton=document.querySelector('.submit');
const inputText=document.querySelector(".infix-text");

inputText.addEventListener('click',()=>{
    document.querySelector(".res").style.visibility="hidden";
})
submitButton.addEventListener('click',()=>{
if(inputText.value){
    document.querySelector(".result").value = InfixtoPostfix(inputText.value);
    document.querySelector(".res").style.visibility="visible";
}

});

// Fuction  to calculte postfix//////////////////////////

// Created an empty array
let stackarr = [];

// Variable topp initialized with -1
let topp = -1;

// Push function for pushing
// elements inside stack
function push(e) {
	topp++;
	stackarr[topp] = e;
}

// Pop function for returning top element
function pop() {
	if (topp == -1)
		return 0;
	else {
		var popped_ele = stackarr[topp];
		topp--;
		return popped_ele;
	}
}

// Function to check whether the passed
// character is operator or not
function operator(op) {
	if (op == '+' || op == '-' ||
		op == '^' || op == '*' ||
		op == '/' || op == '(' ||
		op == ')') {
		return true;
	}
	else
		return false;
}

// Function to return the precedency of operator
function precedency(pre) {
	if (pre == '@' || pre == '(' || pre == ')') {
		return 1;
	}
	else if (pre == '+' || pre == '-') {
		return 2;
	}
	else if (pre == '/' || pre == '*') {
		return 3;
	}
	else if (pre == '^') {
		return 4;
	}
	else
		return 0;
}

// Function to convert Infix to Postfix
function InfixtoPostfix(infixval) {

	// Postfix array created
	let postfix = [];
	let temp = 0;
	push('@');
	// infixval = document.getElementById("infixvalue").value;

	// Iterate on infix string
	for (let i = 0; i < infixval.length; i++) {
		let el = infixval[i];

		// Checking whether operator or not
		if (operator(el)) {
			if (el == ')') {
				while (stackarr[topp] != "(") {
					postfix[temp++] = pop();
				}
				pop();
			}

			// Checking whether el is ( or not
			else if (el == '(') {
				push(el);
			}

			// Comparing precedency of el and
			// stackarr[topp]
			else if (precedency(el) > precedency(stackarr[topp])) {
				push(el);
			}
			else {
				while (precedency(el) <=
					precedency(stackarr[topp]) && topp > -1) {
					postfix[temp++] = pop();
				}
				push(el);
			}
		}
		else {
			postfix[temp++] = el;
		}
	}

	// Adding character until stackarr[topp] is @
	while (stackarr[topp] != '@') {
		postfix[temp++] = pop();
	}

	// String to store postfix expression
	var st = "";
	for (let i = 0; i < postfix.length; i++)
		st += postfix[i];

	// To print postfix expression in HTML
	return st;
}
