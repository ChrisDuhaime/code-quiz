let startButton = document.getElementById('start-button')
let questionBox = document.getElementById('questionBox')
let validateDiv = document.getElementById('validate');
let next = document.getElementById('next');
let globalIndex = 0;
let timerElement = document.getElementById('timeClock');
let timerPaused = false;
let finalTimeScore = 0
let timerInterval;
let outerText = document.getElementById('outerText');
let highScores = '[{"initials":"SPD", "score": 30},{"initials": "CDD", "score": 10},{"initials": "LAH", "score": 45}]';


const quizData = [
    {
        question: 'What does the [] represent in JavaScript?',
        answers: ['String', 'Array', 'Element', 'Function'],
        answer: 1
    },
    {
        question: 'What is an API?',
        answers: ['Application Performance Initiative', 'Article Position Integer', 'Application Programming Interface', 'Application Push'],
        answer: 2
    },
    {
        question: 'CSS is considered the ________ of the Website',
        answers: ['Bones', 'Organs', 'Muscle', 'Skin'],
        answer: 3
    },
    {
        question: 'Which is NOT considered a Primitive Data Type',
        answers: ['Console', 'String', 'Boolean', 'Undefined'],
        answer: 0
    },
    {
        question: 'What does DOM refer to in coding?',
        answers: ['Document Object Model', 'Database Of Management', 'Dominant Variable', 'Dominant Global Scope'],
        answer: 0
    }
];

startButton.addEventListener('click', startGame)

function startGame() {
    // Start Timer
    timerInterval = setInterval(myTimer, 1000);
    // Clear HTML including Start Quiz button
    questionBox.innerHTML = '';
    showNextQuestion();
}

function myTimer() {
    let timerElementInteger = timerElement.innerHTML * 1;

    if ((timerElementInteger > 0) && (timerPaused === false)) {
        timerElement.innerHTML = timerElementInteger - 1;

    } else if (timerPaused === true) {
        stopFunction();
        finalTimeScore = timerElementInteger;
    } else {
        stopFunction()
        enterHighScore();
    }
    console.log(timerElementInteger);
}

function stopFunction() {
    clearInterval(timerInterval);
}

function showNextQuestion() {
    questionBox.innerHTML = '';
    validateDiv.innerHTML = '';
    next.innerHTML = '';
    let currentQuizData = quizData[globalIndex];
    let questionTag = document.createElement('p');
    let questionText = document.createTextNode(currentQuizData.question);
    questionTag.appendChild(questionText);
    questionBox.appendChild(questionTag);
    let answersList = document.createElement('ul');
    answersList.setAttribute('id', 'answersList')
    let answers = currentQuizData.answers;
    let correctAnswerIndex = currentQuizData.answer;

    for (let i = 0; i < answers.length; i++) {
        let currentAnswer = answers[i];
        let li = document.createElement('li');
        li.innerHTML = currentAnswer;
        answersList.appendChild(li);
        if (i === correctAnswerIndex) {
            li.addEventListener('click', showCorrectResponse);
        } else {
            li.addEventListener('click', showIncorrectResponse);
        }
    }
    questionBox.appendChild(answersList)


    // Incremement the global index so that when this function is called again it progresses to next question
    globalIndex++;
}

function showCorrectResponse() {
    validateDiv.innerHTML = '';
    let check = document.createElement('p');
    check.innerHTML = 'Correct!';
    validateDiv.appendChild(check);
    if (globalIndex < 4) {
        var nextButton = document.createElement('button');
        nextButton.addEventListener('click', showNextQuestion);
        nextButton.innerHTML = 'Next Question';
        next.appendChild(nextButton);
    } else {
        timerPaused = true;
        questionBox.innerHTML = '';
        validateDiv.innerHTML = '';
        let finishButton = document.createElement('button');
        finishButton.innerHTML = 'Finish Game';
        finishButton.addEventListener('click', enterHighScore)
        validateDiv.appendChild(finishButton);

    }
}

function showIncorrectResponse() {
    validateDiv.innerHTML = '';
    var check = document.createElement('p');
    check.innerHTML = 'Incorrect!';
    validateDiv.appendChild(check);
    timerElement.innerHTML = timerElement.innerHTML - 10;
}


function enterHighScore() {
    validateDiv.innerHTML = '';
    questionBox.innerHTML = '';
    outerText.innerHTML = '';
    let score = document.createElement('p');
    score.innerHTML = 'Score: ' + finalTimeScore;
    questionBox.appendChild(score);
    let info = document.createElement('p');
    info.innerHTML = 'Please enter your initials';
    questionBox.appendChild(info);
    let initialsInput = document.createElement('input');
    initialsInput.setAttribute('type', 'text');
    initialsInput.setAttribute('id', 'initialsInput');
    questionBox.appendChild(initialsInput);
    let submitInitialsButton = document.createElement('button');
    submitInitialsButton.innerHTML = 'Submit';
    submitInitialsButton.addEventListener('click', storeData);
    questionBox.appendChild(submitInitialsButton);



}

function storeData() {
    let initialsInput = document.getElementById('initialsInput');
    let storedInitials = initialsInput.value + '';
    console.log(storedInitials)
    if (storedInitials !== '') {
        let highScoresArray = JSON.parse(highScores);
        highScoresArray.push({
            initials: storedInitials,
            score: finalTimeScore
        });
        let jArray = JSON.stringify(highScoresArray);
        localStorage.setItem('data', jArray);
        console.log('DATA: ' + localStorage.getItem('data'));
        window.location.href = 'index2.html'
        //The if and else will both lead to index2.html
    } else {
        window.location.href = 'index2.html'

    }

}


