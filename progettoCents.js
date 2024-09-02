
const display = document.getElementById("display");
let check = 0; // number of caracters on calculator display, can't be more than 10
let count = 0; // number of ints submitted for operation (must be two for operation to take place)

//called when user clicks clear 
function clearDisplay(){
    check = 0;
    count = 0;
    display.value="";
}

//called when user clicks on number or operator '+P', value of button is then appended to display
function appendDisplay(input){
    //checking if there is room on calculator display 
    if(count < 10){
        if(input === '+P'){
            // operator symbol can only be added once there is an int submitted and no more than once
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

    // checking if two numbers have been submitted
    if(check!=2){
        return;
    }
    
    const [num1, num2] = display.value.split("+P");
    
    if (isNaN(num1) || isNaN(num2)) {
        throw new Error('Invalid numbers provided');
    }

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

        //setting count to 10 so the result on screen can't be modified, user must clear screen to submit new operation
        count = 10;

    } catch (error) {
        alert('Error connecting to the server');
    }
}


