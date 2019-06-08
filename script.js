const numBtn = document.querySelectorAll('.num'),
      operatorBtn = document.querySelectorAll('.operator'),
      clearBtn = document.querySelector('.clear'),
      deleteBtn = document.querySelector('.delete'),
      equalBtn = document.querySelector('.equal'),
      pointBtn = document.querySelector('.point'),
      operationNum = document.querySelector('.operation p'),
      resultNum = document.querySelector('.result p');

let numInputted = '',
    inputtedNumArray = [],
    numOperated = '',
    operatedNumArray = [],
    operatorPressed = '',
    operatorArray = [];

const operators = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
}

function operate(operator, a, b) {

  if (a === '') {
    return b
  }

  if (b === '' && (operator === '*' || operator === '/')) {
    b = 1
  }
    
  a = Number(a)
  b = Number(b)

  switch (operator) {
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
      return a / b;
      break;
    default:
      break;
  }
}

function reset() {
  numInputted = '',
  inputtedNumArray = [],
  numOperated = '',
  operatedNumArray = [],
  operatorPressed = '',
  operatorArray = [];

  operationNum.textContent = '';
  resultNum.textContent = '';
}

numBtn.forEach((el) => {
  el.addEventListener('click', (e) => {
    const lastOperated = operatedNumArray[operatedNumArray.length - 1]

    if (operatorPressed !== '' && numInputted === '') {
      operatorArray.push(operatorPressed)
    }
    
    numInputted += el.textContent

    operationNum.textContent += el.textContent

    if (numOperated !== '' && operatedNumArray.length > 0) {
      numOperated = operate(operatorPressed, lastOperated, numInputted)
    } else if (numOperated !== '' && operatedNumArray.length === 0) {
      numOperated = operate(operatorPressed, numOperated, numInputted)
    }

    resultNum.textContent = numOperated
  })
})

operatorBtn.forEach((el) => {
  el.addEventListener('click', (e) => {
    if (numInputted === '' && operatorPressed === '') return
    operatorPressed = el.getAttribute('value')
    
    if (numOperated === '') {
      numOperated = operate(operatorPressed, numOperated, numInputted)    
    }

    if (numInputted === '' && operatorPressed !== '') {
      operationNum.textContent = operationNum.textContent = operationNum.textContent.substr(0, operationNum.textContent.length - 1) + el.textContent
    } else {
      operationNum.textContent += el.textContent
      inputtedNumArray.push(numInputted)
      operatedNumArray.push(numOperated)
    }

    numInputted = ''
  })
})

pointBtn.addEventListener('click', (e) => {
  if (numInputted === '' || numInputted.includes('.')) return
  numInputted += pointBtn.textContent
  operationNum.textContent += pointBtn.textContent

  resultNum.textContent = numOperated
})

equalBtn.addEventListener('click', (e) => {
  if (numOperated === '') return
  
  const lastResult = numOperated

  reset()

  numInputted += lastResult
  operationNum.textContent = lastResult
})

deleteBtn.addEventListener('click', (e) => {
  if (numInputted.length <= 1 && operatorArray.length === 0) {
    operationNum.textContent = operationNum.textContent.substr(0, operationNum.textContent.length - 1)
    reset()
  }

  const lastOperated = operatedNumArray[operatedNumArray.length - 1]
  const lastInputted = inputtedNumArray[inputtedNumArray.length - 1]
  const lastOperator = operatorArray[operatorArray.length - 1]

  if (numInputted === '' && operatorArray.length > 0) {
    operatorPressed = ''
    numInputted = lastInputted
    
    operationNum.textContent = operationNum.textContent.substr(0, operationNum.textContent.length - 1)
    
    operatedNumArray.splice(-1,1)
    inputtedNumArray.splice(-1,1)
    operatorArray.splice(-1,1)

    operator = lastOperator
  } else if (numInputted !== '') {
    numInputted = numInputted.substr(0, numInputted.length - 1)
    operationNum.textContent = operationNum.textContent.substr(0, operationNum.textContent.length - 1)
    
    numOperated = operate(lastOperator, lastOperated, numInputted)

    resultNum.textContent = numOperated
  }
})

clearBtn.addEventListener('click', (e) => {
  reset()
})