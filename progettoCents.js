
const display = document.getElementById("display");
let check = 0;
let count = 0;

//called when user clicks clear 
function clearDisplay(){
    check = 0;
    count = 0;
    display.value="";
}

//called when user clicks on number or operator '+P', value of button is then appended to display
function appendDisplay(input){
    if(count < 10){
        if(input === '+P'){
            if(check > 0 || count == 0){
                return;
            }
            check = 1;
            count ++;
        }
        else if(check == 1){
            check = 2;
        }
        display.value += input;
        count++;
    }
}

// called when user clicks on =, it calculates the result only if two numbers have been given, else it ignores.
async function calculate(){
    if(check<2){
        return;
    }
    
    const [num1, num2] = display.value.split("+P");
    
    //console.log(num1, num2);
    clearDisplay();
    try {
        const response = await fetch('http://localhost:3000/calculate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ num1: parseInt(num1), num2: parseInt(num2) }),
        });
        const data = await response.json();

        if (response.ok) {
            display.value = data.result;
        } else {
            alert(data.error);
        }   

    } catch (error) {
        alert('Error connecting to the server');
    }
}


