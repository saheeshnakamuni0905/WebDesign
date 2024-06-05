var page = document.getElementById('myForm');

page.addEventListener("click", () => {
    console.log("loading page");
})

page.addEventListener("submit", finished);

var phoneReg = /^\(?([0-9]{3})\)?-?([0-9]{3})-?([0-9]{4})$/;
var emailReg = /[a-z0-9._%+-]+@northeastern.edu$/;
var nameReg = /^[a-zA-Z]+$/;
var zipcodeReg = /^\d{5}(-\d{4})?$/;

var isFirstNameValid = false;
var isLastNameValid = false;
var isEmailIdValid = false;
var isPhoneNumberValid = false;
var isStreetAddressValid = false;
var isStateValid = false;
var isZipcodeValid = false;

var commentsFilled = false;
var hear = false;
var drinkcheck = false;
var mrms = false;

const lastN = document.getElementById("lastN");
lastN.addEventListener("input", checkResults);

const phno = document.getElementById("phno");
phno.addEventListener("input", checkResults);

const firstN = document.getElementById("firstN");
firstN.addEventListener("input", checkResults);

const emailId = document.getElementById("emailId");
emailId.addEventListener("input", checkResults);

const state = document.getElementById("state");
state.addEventListener("input", checkResults);

const add1 = document.getElementById("add1");
add1.addEventListener("input", checkResults);

const add2 = document.getElementById("add2");
add2.addEventListener("input",checkResults);

const zipcode = document.getElementById("zipcode");
zipcode.addEventListener("input", checkResults);

const drink = document.getElementById("drinks");
drink.addEventListener("change", function() {
    drinkcheck = this.value !== "none";
    checkValidationStatus();
});

const size = document.getElementById("quantity");
const addInst = document.getElementById("addInst");

document.querySelectorAll('input[name="source"]').forEach(function(checkbox) {
    checkbox.addEventListener("change", function() {
        hear = Array.from(document.querySelectorAll('input[name="source"]:checked')).length > 0;
        checkValidationStatus();
    });
});

comments.addEventListener("input", function() {
    commentsFilled = this.value.trim().length > 0;
    checkValidationStatus();
});

document.querySelectorAll('input[name="title"]').forEach(function(radio) {
    radio.addEventListener("change", function() {
        mrms = true; 
        checkValidationStatus();
    });
});

 
function Salutation(){
    if(document.getElementById("miss").checked){
    const title = "Miss";
}else if(document.getElementById("mr").checked){
    const title = "Mr.";
}else {
    const title = "mrs"
}
}


function checkResults(e){
    var value = e.target.value;
    var type = this.id;
    var em = type+"Error";
    var minLength = 5;
    var maxLength = 32;
    var regexGeneralText = /^[a-zA-Z0-9\s]+$/;
    console.log(`Validating ${type}: ${value}`);

    switch(type){
        case("firstN"):
            if(value.length < minLength || value.length > maxLength || !value.trim().match(nameReg)){
                 document.getElementById(em).style.display = "block";
                 this.style.border = "2px solid red";
                 isFirstNameValid = false;
             }
             else{
                 document.getElementById(em).style.display = "none";
                 this.style.border = "";
                 isFirstNameValid = true;
             }
            break;
        case("lastN"):    
            if(value.length < minLength || value.length > maxLength || !value.trim().match(nameReg)){
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                isLastNameValid = false;
            }
            else {
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                isLastNameValid = true;
            }
            break;
        case("emailId"):
            if(!value.trim().match(emailReg) || value.length < minLength || value.length > maxLength){
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                isEmailIdValid = false;
            }
            else {
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                isEmailIdValid = true;
            }
            break;
        case("phno"):
            if(!value.trim().match(phoneReg)){
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                isPhoneNumberValid = false;
            }
            else{
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                isPhoneNumberValid = true;
            }
            break;
        case "state":
            var regexState = /^[a-zA-Z\s]+$/; 
            if (value.length < minLength || value.length > maxLength || !value.match(regexState)) {
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                isStateValid = false;
            } else {
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                isStateValid = true;
            }
            break;
        case "add1":
            var regexAddress = /^[a-zA-Z0-9\s]+$/; 
            if(value.length < minLength || value.length > maxLength || !value.match(regexAddress)) {
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                isStreetAddressValid = false;
            } else {
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                isStreetAddressValid = true;
            }
            break;
            case "add2":
                var regexAddress = /^[a-zA-Z0-9\s]+$/; 
                if(value.length < minLength || value.length > maxLength || !value.match(regexAddress)) {
                    document.getElementById(em).style.display = "block";
                    this.style.border = "2px solid red";
                    isStreetAddressValid = false;
                } else {
                    document.getElementById(em).style.display = "none";
                    this.style.border = "";
                    isStreetAddressValid = true;
                }
                break;
        case("zipcode"):
            if(!value.trim().match(zipcodeReg)){
                document.getElementById(em).style.display = "block";
                this.style.border = "2px solid red";
                isZipcodeValid = false;
            }
            else {
                document.getElementById(em).style.display = "none";
                this.style.border = "";
                isZipcodeValid = true;
            }    
            break; 
        case "drinks":
            drinkcheck = true;
            break;
        case "hearabt":
            hear = true;
            break;
        case "comments":
            commentsFilled = true;
            break;

    }
    checkValidationStatus();
}

function finished(e){
    e.preventDefault();
    if(isFirstNameValid && isLastNameValid && isEmailIdValid && isPhoneNumberValid && isZipcodeValid && drinkcheck){
        alert('Saved successfully');
        show();
        page.reset();
    }
    else {
        alert("Enter valid data");
    }
}

function show(){
    document.getElementById("endTable").style.display = "block";
    var table = document.getElementById("myTable");
    var row = table.insertRow();
    var record1 = row.insertCell();
    var record2 = row.insertCell();
    var record3 = row.insertCell();
    var record4 = row.insertCell();
    var record5 = row.insertCell();
    var record6 = row.insertCell();
    var record7 = row.insertCell();
    var record9 = row.insertCell();
    var record10 = row.insertCell();
    var record11 = row.insertCell();
    var record12 = row.insertCell();
    var record13 = row.insertCell();
    var record14 = row.insertCell();
    var record15 = row.insertCell();

    if(document.getElementById("miss").checked){
        record1.innerHTML = "Miss";
    }else if(document.getElementById("mr").checked){
        record1.innerHTML = "Mr.";
    }else {
        record1.innerHTML= "mrs"
    }

    record2.innerHTML = firstN.value; 
    record3.innerHTML = lastN.value; 
    record4.innerHTML = emailId.value; 
    record5.innerHTML = phno.value; 
    record6.innerHTML = add1.value; 
    record7.innerHTML = add2.value;  
    record9.innerHTML = state.value; 
    record10.innerHTML = zipcode.value;
    record11.innerHTML = drink.value;
    record12.innerHTML = getSelectedSizeValue();
    record13.innerHTML = addInst.value;

    let boxes = document.querySelectorAll('input[name="source"]:checked');
    let things = [];

    for(i=0; i<boxes.length; i++){
        things.push(boxes[i].value);
    }
    record14.innerHTML = things;
    record15.innerHTML = comments.value;
}

function checkValidationStatus() {
    console.log(`isFirstNameValid: ${isFirstNameValid}, isLastNameValid: ${isLastNameValid}, isEmailIdValid: ${isEmailIdValid}, isPhoneNumberValid: ${isPhoneNumberValid}, isZipcodeValid: ${isZipcodeValid}, drinkcheck: ${drinkcheck}, hear: ${hear}, commentsFilled: ${commentsFilled}`);
    var submitBtn = document.getElementById('submitBtn');
    if (isFirstNameValid && isLastNameValid && isEmailIdValid && isPhoneNumberValid && isZipcodeValid && isStateValid && isStreetAddressValid && drinkcheck && hear && commentsFilled) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

function isSelected(){
    var boxes = document.getElementsByName("quantity");
    var anyChecked = Array.from(boxes).some(checkbox => checkbox.checked);

    if(anyChecked){
        document.getElementById("addInst").style.display = "block";
    } else {
        document.getElementById("addInst").style.display = "none";
    }
}

function drinkCheckbox(){
    var drink = document.getElementById("drinks").value;
    document.getElementById("checkbox").innerHTML = `<input type="checkbox" id="quantityLarge" name="quantity" onchange="isSelected()" value="large"> ${drink} Large Drink ($1 extra)</input><br> 
                                                     <input type="checkbox" id="quantityChoco" name="quantity" onchange="isSelected()" value="choco"> Chocolate($0.75 extra)</input><br>`;

}

function getSelectedSizeValue() {
    var boxes = document.getElementsByName("quantity");
    for(var i = 0; i < boxes.length; i++) {
        if(boxes[i].checked) {
            return boxes[i].value;
        }
    }
    return ''; 
}

