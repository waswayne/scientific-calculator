document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display"); //get the display screen
    const buttons = document.querySelectorAll(".buttons button"); //get al buutons
// event listening for all buttons
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            let value = this.innerText; //get button text
            let lastChar = display.value.slice(-1);  // Get last entered character

            //clear the screen
            if (value === "C") {
                display.value = "";

                //remove last char
            } else if (value === "⌫") {
                display.value = display.value.slice(0, -1);
            } 
            
            //calc whem = is pressed
            else if (value === "=") {
                try {
                    let expression = display.value
                        .replace(/×/g, "*")
                        .replace(/÷/g, "/")
                        .replace(/\^/g, "**")  
                        .replace(/π/g, "Math.PI")
                        .replace(/e/g, "Math.E")
                        .replace(/√(\d+)/g, "Math.sqrt($1)")
                        .replace(/sin\(/g, "Math.sin((Math.PI/180)*")
                        .replace(/cos\(/g, "Math.cos((Math.PI/180)*")
                        .replace(/tan\(/g, "Math.tan((Math.PI/180)*")
                        .replace(/log/g, "Math.log10")
                        .replace(/ln/g, "Math.log");

                    display.value = eval(expression); //evaluate and display result
                } catch (error) {
                    display.value = "Error"; //errpr if display is invallid
                }
            }

            else {
                if ("+-×÷".includes(value) && "+-×÷".includes(lastChar)) return;

                let parts = display.value.split(/[\+\-\×\÷]/);
                let lastNumber = parts[parts.length - 1];

                if (value === "." && lastNumber.includes(".")) return;

                display.value += value; //add valid button to display
            }
        });
    });


    //allow keyboad support
    document.addEventListener("keydown", function (event) {
        let key = event.key;
        let allowedKeys = "0123456789+-*/()."; //only allowed keys

        //id it valid key, add to display
        if (allowedKeys.includes(key)) {
            display.value += key.replace("*", "×").replace("/", "÷");
        }
        
        //if Enter key is pressed, trigger =
        else if (key === "Enter") {
            event.preventDefault();
            document.querySelector(".equals").click();
        } 
        
        //if Backspace is pressed, trigger ⌫
        else if (key === "Backspace") {
            document.querySelector(".backspace").click();
        } 
        
        //block all others keys(A-Z, Space and others)
        else {
            event.preventDefault();
        }
    });
});

