// Four basic operations to perform
const sum = (a,b) => a+b;
const subtract= (a,b) => a-b;
const multiplication = (a,b) => a*b;
const divide = (a,b) => a/b;

// Three main variables which the operations revolve around

let firstNumber = null;
let secondNumber = null;
let currentOperators = [];

// solve function for calculations

const solve = (num1,operator,num2) => {
    if(operator === '+'){
        return sum(num1,num2)
    }
    if(operator === '-'){
        return subtract(num1,num2)
    }
    if(operator === 'x'){
        return multiplication(num1,num2)
    }
    if(operator === '/'){
        return divide(num1,num2)
    }
}


// display function to show any text on displayBar

const displayBar = document.querySelector('.displayBar')
const display = (value) => {
    displayBar.textContent = value
}

// store values from DOM to main variables
let displayValue = '';
const numberBtns = document.querySelectorAll('.number')
numberBtns.forEach(item => {
    item.addEventListener('click',(e)=>{
        if(currentOperators.length === 0){
            if(firstNumber === null){
                firstNumber = e.target.textContent
            } else{
                // Check if it already includes a decimal
                if(e.target.textContent === '.' && firstNumber.includes(e.target.textContent)){
                    return
                }
                firstNumber += e.target.textContent
            }
            displayValue = firstNumber
            display(displayValue)
        } 
        else{
            if(secondNumber === null){
                secondNumber = e.target.textContent
            } else{
                // Check if it already includes a decimal
                if(e.target.textContent === '.' && secondNumber.includes(e.target.textContent)){
                    return
                }
                secondNumber += e.target.textContent
            }
            displayValue = secondNumber
            display(displayValue)
        }
    })
})


// storing the operators from DOM to array

const operatorBtns = document.querySelectorAll('.operatorBtn')
console.log(operatorBtns)
operatorBtns.forEach(item => {
    item.addEventListener('click',(e)=>{
        // Dont allow more than 2 operators
        if(currentOperators.length < 2){
            currentOperators.push(e.target.textContent)
        }
        // Multiple operations
        if(currentOperators.length === 2){
            calculate()
            currentOperators.splice(0,1)
        }
    })
})




// finally listening the event on equals sign first
let solution;
const equalsBtn = document.querySelector('.equals');
equalsBtn.addEventListener('click',()=>{
    // Check for any possible errors
    if(firstNumber === false || currentOperators.length === 0){
        display('Invalid calculations')
        return
    }
    calculate()
    currentOperators = []
})



// Clear button logic
const clearBtn = document.querySelector('.clear')
clearBtn.addEventListener('click',()=>{
    display('0')
    firstNumber = ''
    secondNumber = ''
    currentOperators = []

})




// seperate function for clean code
function calculate(){
    // Handle Infinity
    if(currentOperators[0] === '/' && secondNumber === '0'){
        let solution = 'Infinity'
        display(solution)
        firstNumber = ''
        secondNumber = ''
        currentOperators = []
        return
    }
    // Check for decimal values also
    if(firstNumber.includes('.')){
        solution = solve(parseFloat(firstNumber),currentOperators[0],parseInt(secondNumber))
    }
    if(secondNumber.includes('.')){
        solution = solve(parseInt(firstNumber),currentOperators[0],parseFloat(secondNumber))
    }
    // Both integer values
    else{
        solution = solve(parseInt(firstNumber),currentOperators[0],parseInt(secondNumber))
    }
    // Round decimal results to 2 points
    if(!Number.isInteger(solution)){
        solution = solution.toFixed(2)
    }
    display(solution)
    firstNumber = solution.toString()
    secondNumber = ''
}


// backspace button
const backspaceBtn = document.querySelector('.backspace')
backspaceBtn.addEventListener('click',()=>{
    if(displayValue == 0 || solution == 0) return
    if(displayValue === firstNumber){
        displayValue = displayValue.slice(0,-1)
        firstNumber = firstNumber.slice(0,-1)
        display(displayValue)
    } else{
        displayValue = displayValue.slice(0,-1)
        secondNumber = secondNumber.slice(0,-1)
        display(displayValue)
    }
})

// added sound
const allBtns = document.querySelectorAll('button')
const clickSound = document.getElementById('clickSound')
allBtns.forEach(button => {
    button.addEventListener('click',()=>{
        clickSound.play()
    })
})