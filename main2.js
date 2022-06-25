const baseURL = 'https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple';
questionHeader = document.getElementById('qsHd');
timeobj = document.getElementById('timer');
answersLabels = document.getElementsByClassName('container');
radios = document.getElementsByName('radio');
nextBTN = document.getElementsByClassName('nxt');
prevBTN = document.getElementsByClassName('pre');
submitBTN = document.getElementsByClassName('submit');
quesNUM = document.getElementById('quesNUM');
grade = document.getElementById('grade');

timeobj.innerText = ('00:00');



let aud = new Audio('beep.mp3');
let secs = 0;
let mins = 0;
let timer = 59;

let score = 0;

let questionNo = 0;
let questionsArr;
let answersArr = [];
fetchQuiz();

/**************** API Questions ****************/
async function fetchQuiz() {
    const response = await fetch(baseURL);
    const data = await response.json();
    console.log(data.results);
    questionsArr = data.results;
    setData(questionsArr[0]);
    quesNUM.innerHTML=(`Question Number : ${questionNo+1}`);
    return data.results;
    
};
///////////////////////////////////////////////////////////////////////////   
function setData(ques) {
    questionHeader.innerText = ques.question;
    var anrs = ques.incorrect_answers;
    anrs[3] = ques.correct_answer;
    // console.log(answersLabels);
    shuffle(anrs);
    for (let index = 0; index < anrs.length; index++) {
        radios[index].checked = false;
        answersLabels[index].innerText = anrs[index];
        if (answersArr[questionNo] != null && answersArr[questionNo] == anrs[index]) {
            radios[index].checked = true;
            quesNUM.innerHTML=(`Question Number : ${questionNo+1}`);
        }
    }
}
///////////////////////////////////////////////////////////////////////////   

submitBTN[0].addEventListener("click", submitExam);

///////////////////////////////////////////////////////////////////////////   
/**************** Next Button ****************/
nextBTN[0].addEventListener("click", function () {
    if (radioSelected()) {

        if (questionNo < questionsArr.length - 1) {
            questionNo++;
            setData(questionsArr[questionNo]);
        }
    } else {
        alert("You have to choose one answer");
    }
    quesNUM.innerHTML=(`Question Number : ${questionNo+1}`);
});

///////////////////////////////////////////////////////////////////////////   
/**************** previous Button ****************/
prevBTN[0].addEventListener("click", function () {
    if (radioSelected()) {

        if (questionNo > 0) {
            questionNo--;
            setData(questionsArr[questionNo+1]);
        }
    } else {
        alert("You have to choose one answer");
    }
    quesNUM.innerHTML=(`Question Number : ${questionNo+1}`);
});
///////////////////////////////////////////////////////////////////////////   

for (let i = 0; i < radios.length; i++) {
    const r = radios[i];
    r.addEventListener('click', function () {
        answersArr[questionNo] = answersLabels[this.value].innerText;
    });
}

///////////////////////////////////////////////////////////////////////////   

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

///////////////////////////////////////////////////////////////////////////   
/**************** submit Button ****************/
function submitExam() {
    
    for (let index = 0; index < questionsArr.length; index++) {
        const ques = questionsArr[index];
        if (ques.correct_answer == answersArr[index]) {
            score++;
        } else {
            console.log(ques.correct_answer);
        }
    }
    if(score > 5)
    {
        grade.style.backgroundColor = "green";
    }
    else{
        grade.style.backgroundColor = "red";
    }
    grade.innerHTML=(`Your Grade : ${score}/10`);
    aud.play();
    setInterval(function(){
        location.href = "/index.html";
    },2000)
}

///////////////////////////////////////////////////////////////////////////   

function radioSelected() {
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return true;
        }

    }
    return false;
}


///////////////////////////////////////////////////////////////////////////   
/**************** Timer adjustment ****************/
timerid = setInterval(function () {
    timeobj.innerText = "0" + mins + " : " + "0" + secs;
    secs++;

    if (secs > 9) {
        timeobj.innerText = "0" + mins + " : " + secs;
        if (secs > 59) {
            secs = 0;
            mins++;
            timeobj.innerText = "0" + mins + " : " + "0" + secs;
        }
    }

    if (secs == timer) {
        console.log('f')
        clearInterval(timerid)
        submitExam();
    }
    
}, 1000)
///////////////////////////////////////////////////////////////////////////   
