const funcButton = document.querySelector('.func-button');

const output = document.querySelector('.output');

function FUNCTION() {
  const h3elem = document.createElement('h3');
  const helloWorld = document.createTextNode('<h3>Hello World!!</h3>');
  h3elem.appendChild(helloWorld);
  h3elem.classList.add('textElem');
  output.appendChild(h3elem);
}

funcButton.addEventListener('click', FUNCTION);

const mainField = document.querySelector('.output-number span');
mainField.textContent = '0';
console.log(mainField.textContent.charAt(1));

const subField = document.querySelector('.output-temp-number span');

const keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '*', '/', '-', '+', '=', 'C', 'CE', 'del'];

keys.forEach((key) => {
  const button = document.querySelector(`.num-key[value='${key}']`);

  button.addEventListener('click', (_) => {
    const textNode = document.createTextNode(key);

    if (key == '.') {
      if (!mainField.textContent.includes('.')) {
        mainField.appendChild(textNode);
      }
    } else if (key == '/' || key == '*' || key == '-' || key == '+' || key == '=') {
      subField.appendChild(document.createTextNode(mainField.textContent));
      subField.appendChild(document.createTextNode(key));

      if (key == '=') {
        let firstChar = 0;
        let numAndOp = [];
        let ops = [];
        // check for what number and operation
        for (let i = 0; i < subField.textContent.length; i++) {
          if (subField.textContent.charAt(i) == '/' || subField.textContent.charAt(i) == '*' || subField.textContent.charAt(i) == '-' || subField.textContent.charAt(i) == '+') {
            ops.push(subField.textContent.charAt(i));
            if (subField.textContent.substring(firstChar, i).includes('.')) {
              numAndOp.push(parseFloat(subField.textContent.substring(firstChar, i)));
            } else {
              numAndOp.push(parseInt(subField.textContent.substring(firstChar, i)));
            }
            numAndOp.push(subField.textContent.charAt(i));
            firstChar = i + 1;
          }
        }
        if (subField.textContent.substring(firstChar, subField.textContent.length - 1).includes('.')) {
          numAndOp.push(parseFloat(subField.textContent.substring(firstChar, subField.textContent.length - 1)));
        } else {
          numAndOp.push(parseInt(subField.textContent.substring(firstChar, subField.textContent.length - 1)));
        }

        // calculating the number
        let total = 0;
        for (let i = 0; i < ops.length; i++) {
          if (numAndOp.includes('*') || numAndOp.includes('/')) {
            if (numAndOp.includes('*')) {
              total = numAndOp[numAndOp.indexOf('*') - 1] * numAndOp[numAndOp.indexOf('*') + 1];
              numAndOp[numAndOp.indexOf('*') - 1] = total;
              numAndOp.splice(numAndOp.indexOf('*'), numAndOp.indexOf('*') + 1);
            }
            if (numAndOp.includes('/')) {
              total = numAndOp[numAndOp.indexOf('/') - 1] / numAndOp[numAndOp.indexOf('/') + 1];
              numAndOp[numAndOp.indexOf('/') - 1] = total;
              numAndOp.splice(numAndOp.indexOf('/'), numAndOp.indexOf('/') + 1);
            }
          } else {
            if (numAndOp.includes('+')) {
              total = numAndOp[numAndOp.indexOf('+') - 1] + numAndOp[numAndOp.indexOf('+') + 1];
              numAndOp[numAndOp.indexOf('+') - 1] = total;
              numAndOp.splice(numAndOp.indexOf('+'), numAndOp.indexOf('+') + 1);
            }
            if (numAndOp.includes('-')) {
              total = numAndOp[numAndOp.indexOf('-') - 1] - numAndOp[numAndOp.indexOf('-') + 1];
              numAndOp[numAndOp.indexOf('-') - 1] = total;
              numAndOp.splice(numAndOp.indexOf('-'), numAndOp.indexOf('-') + 1);
            }
          }
        }
        mainField.textContent = numAndOp[0];
      } else {
        mainField.textContent = '0';
      }
    } else if (key == 'CE' || key == 'C' || key == 'del') {
      if (key == 'CE') {
        mainField.textContent = '0';
      } else if (key == 'C') {
        subField.textContent = '';
        mainField.textContent = '0';
      } else {
        if (mainField.textContent.length > 1) {
          mainField.textContent = mainField.textContent.substring(0, mainField.textContent.length - 1);
        } else {
          mainField.textContent = '0';
        }
      }
    } else {
      if (!subField.textContent.includes('=')) {
        if (mainField.textContent.charAt(0) == '0') {
          if (mainField.textContent.charAt(1) == '') {
            mainField.textContent = '';
          }
          mainField.appendChild(textNode);
        } else {
          mainField.appendChild(textNode);
        }
      } else {
        subField.textContent = '';
        mainField.textContent = '0';
        if (mainField.textContent.charAt(0) == '0') {
          if (mainField.textContent.charAt(1) == '') {
            mainField.textContent = '';
          }
          mainField.appendChild(textNode);
        } else {
          mainField.appendChild(textNode);
        }
      }
    }
  });
});
