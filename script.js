const numBtn = document.querySelectorAll('.num'),
      operatorBtn = document.querySelectorAll('.operator'),
      clearBtn = document.querySelector('.clear'),
      deleteBtn = document.querySelector('.delete'),
      equalBtn = document.querySelector('.equal'),
      operationNumbers = document.querySelector('.operation p'),
      resultNumbers = document.querySelector('.result p');

let currentNumber = '',
    initialNumber = '',
    accumulator = '',
    operator = '';
    // operationDisplay = '';

function evaluate(a, op, b) {
  switch (op) {
    case '+':
      return a + b;
      break;
    case '-':
      return a - b;
      break;
    case '*':
      return a * b;
      break;
    case '/':
      if (b === 0) {
        return "Can't divide by 0"
      }
      return a / b;
      break;
    default:
      break;
  }
}

numBtn.forEach((el) => {
  el.addEventListener('click', (e) => {
    
    if (el.textContent === '.' && ( currentNumber.includes('.') || currentNumber === '' ) ) {      
      return
    }

    if (operator === '') {
      initialNumber += el.textContent;

      resultNumbers.textContent = initialNumber;
    } else {
      currentNumber += el.textContent;

      if (initialNumber !== '') {
        accumulator = evaluate(Number(initialNumber), operator, Number(currentNumber));
      } else {
        accumulator = evaluate(Number(accumulator), operator, Number(currentNumber));
      }
      
      resultNumbers.textContent = accumulator;
      initialNumber = ''
    }

    // operationDisplay += el.textContent;
    operationNumbers.textContent += el.textContent;

    console.log(accumulator)
    console.log(currentNumber)
    console.log(operator)
  })
})

operatorBtn.forEach((el) => {
  el.addEventListener('click', (e) => {
    if (currentNumber === '' && initialNumber === '' && operator !== '') return

    // operationDisplay += el.textContent
    operationNumbers.textContent += el.textContent;

    operator = el.getAttribute('value');

    currentNumber = ''
    
  })
})

clearBtn.addEventListener('click', (e) => {
  accumulator = '',
  currentNumber = '',
  initialNumber = '',
  operator = '',
  operationDisplay = '';

  operationNumbers.textContent = '';
  resultNumbers.textContent = '';
})

equalBtn.addEventListener('click', (e) => {

  if (initialNumber === '' && accumulator === '') return

  operator = '';

  resultNumbers.textContent = '';

  if (initialNumber !== '' && operator === '') {
    operationNumbers.textContent = initialNumber;
  } else if (accumulator !== '') {
    operationNumbers.textContent = accumulator;
  }

  
  // operationDisplay = '';
})