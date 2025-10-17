const display = document.getElementById('display');
const modeToggle = document.getElementById('mode-toggle');
const body = document.body;

let isDarkMode = true;

modeToggle.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    body.classList.remove('light');
    body.classList.add('dark');
    modeToggle.textContent = 'Dark Mode';
  } else {
    body.classList.remove('dark');
    body.classList.add('light');
    modeToggle.textContent = 'Light Mode';
  }
});

// Initialize theme
body.classList.add('dark');

let currentInput = '';
let lastResult = null;

// Helper functions
function updateDisplay() {
  display.value = currentInput;
}

function appendNumber(num) {
  currentInput += num;
  updateDisplay();
}

function appendOperator(op) {
  if (currentInput === '') return;
  const lastChar = currentInput.slice(-1);
  if (['+', '-', '*', '/'].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + op;
  } else {
    currentInput += op;
  }
  updateDisplay();
}

function clearAll() {
  currentInput = '';
  updateDisplay();
}

function backspace() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function evaluate() {
  try {
    // Replace scientific functions with Math equivalents
    let expr = currentInput
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/sqrt\(/g, 'Math.sqrt(');
    // Evaluate
    const result = eval(expr);
    lastResult = result;
    currentInput = result.toString();
    updateDisplay();
  } catch (e) {
    currentInput = 'Error';
    updateDisplay();
  }
}

// Button event listeners
document.querySelectorAll('.number').forEach(btn => {
  btn.addEventListener('click', () => {
    appendNumber(btn.dataset.num);
  });
});

document.querySelectorAll('.operator').forEach(btn => {
  btn.addEventListener('click', () => {
    appendOperator(btn.dataset.op);
  });
});

document.querySelectorAll('.func').forEach(btn => {
  btn.addEventListener('click', () => {
    const func = btn.dataset.func;
    if (currentInput === '') return;
    // Wrap current input with function
    currentInput = func + '(' + currentInput + ')';
    updateDisplay();
  });
});

document.querySelector('.clear').addEventListener('click', clearAll);

document.querySelector('.backspace').addEventListener('click', backspace);

document.querySelector('.equals').addEventListener('click', evaluate);

// Additional scientific buttons
document.querySelectorAll('.scientific').forEach(btn => {
  btn.addEventListener('click', () => {
    const func = btn.dataset.func;
    if (currentInput === '') return;
    currentInput = func + '(' + currentInput + ')';
    updateDisplay();
  });
});