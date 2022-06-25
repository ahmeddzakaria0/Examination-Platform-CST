let name1 = document.getElementById('A1');
let name2 = document.getElementById('Y2');
let name3 = document.getElementById('L3');

let emptyBox = document.getElementById('rectangle');

let startBTN = document.getElementById('startBTN');






name1.addEventListener('click', function () {   
    emptyBox.innerHTML='Ahmed Zakaria';
}) //end of first name function

name2.addEventListener('click', function () {   
    emptyBox.innerHTML='Yahia Aly';
})//end of second name function

name3.addEventListener('click', function () {   
    emptyBox.innerHTML='Asmaa Foaad';
})//end of third name function


startBTN.addEventListener('click' , function (){
    if (emptyBox.textContent.includes('A')) {
        location.href = "/index2.html";
      } else {
       alert("Please Enter Your Name")
      }
   
   
})//end of start btn function 




