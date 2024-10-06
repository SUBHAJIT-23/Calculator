let display = document.getElementById('display');
let expression = document.getElementById('express');
let a = '';
let b = '';
let op = '';
let memory = 0;
let resultUsed = false;

function appendToDisplay(value)
{
    if (resultUsed && (value === '+' || value === '-' || value === '×' || value === '÷'))
    {
        b = display.value;
        a = '';
        op = value;
        resultUsed = false;
        expression.value = b + ' ' + op;
        display.value = '';
    }
    else if (value === '+' || value === '-' || value === '×' || value === '÷')
    {
        if (a !== '')
        {
            b = a;
            a = '';
        }
        op = value;
        expression.value = b + ' ' + op;
        display.value = '';
    }
    else
    {
        if (resultUsed)
        {
            clearDisplay();
            resultUsed = false;
        }
        a += value;
        display.value = a;
        expression.value = b + ' ' + op + ' ' + a;
    }
}

function calculate()
{
    let c = 0;
    if (a !== '' && b !== '' && op !== '')
    {
        let x = parseFloat(b);
        let y = parseFloat(a);
        switch (op)
        {
            case '+':
                c = x + y;
                break;
            case '-':
                c = x - y;
                break;
            case '×':
                c = x * y;
                break;
            case '÷':
                if (y === 0)
                {
                    display.value = 'Error';
                    expression.value = b + ' ' + op + ' ' + a + ' = Error';
                    a = '';
                    b = '';
                    op = '';
                    resultUsed = true;
                    return;
                }
                c = x / y;
                break;
        }
        display.value = c;
        expression.value = b + ' ' + op + ' ' + a + ' = ' + c;
        a = c.toString();
        b = '';
        op = '';
        resultUsed = true;
    }
}

function clearDisplay()
{
    a = '';
    b = '';
    op = '';
    display.value = '';
    expression.value = '';
    resultUsed = false;
}

function backspace()
{
    if (a !== '')
    {
        a = a.slice(0, -1);
        display.value = a;
        expression.value = b + ' ' + op + ' ' + a;
    }
}

function percentage()
{
    if (a !== '')
    {
        let original = parseFloat(a);
        a = (original / 100).toString();
        display.value = a;
        expression.value = b + ' ' + op + ' ' + a;
    }
}

function reciprocal()
{
    let original;
    if (a !== '')
    {
        original = parseFloat(a);
    }
    else if (resultUsed)
    {
        original = parseFloat(display.value);
        a = original.toString();
    }
    else
    {
        return;
    }
    if (original === 0)
    {
        display.value = 'Error';
        expression.value = '1/' + original;
        a = '';
        return;
    }
    a = (1 / original).toString();
    display.value = a;
    expression.value = '1/' + original;
}

function square()
{
    let original;
    if (a !== '')
    {
        original = parseFloat(a);
    }
    else if (resultUsed)
    {
        original = parseFloat(display.value);
        a = original.toString();
    }
    else
    {
        return;
    }
    a = Math.pow(original, 2).toString();
    display.value = a;
    expression.value = original + '²';
}

function squareRoot()
{
    let original;
    if (a !== '')
    {
        original = parseFloat(a);
    }
    else if (resultUsed)
    {
        original = parseFloat(display.value);
        a = original.toString();
    }
    else
    {
        return;
    }
    if (original < 0)
    {
        display.value = 'Error';
        expression.value = '√(' + original + ')';
        a = '';
        return;
    }
    a = Math.sqrt(original).toString();
    display.value = a;
    expression.value = '√' + original;
}

function toggleSign()
{
    let original;
    if (a !== '')
    {
        original = parseFloat(a);
    }
    else if (resultUsed)
    {
        original = parseFloat(display.value);
        a = original.toString();
    }
    else
    {
        return;
    }
    a = (-original).toString();
    display.value = a;
    expression.value = '±' + original;
}

function memoryClear()
{
    memory = 0;
}

function memoryRecall()
{
    display.value = memory.toString();
    a = memory.toString();
    expression.value = 'MR : ' + memory.toString();
}

function memoryAdd()
{
    if (a !== '')
    {
        memory += parseFloat(a);
    }
}

function memorySubtract()
{
    if (a !== '')
    {
        memory -= parseFloat(a);
    }
}