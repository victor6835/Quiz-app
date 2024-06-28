const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonElement = document.getElementById('answer-buttons');

let shuffleQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    console.log('Started')
    startButton.classList.add('hide')
    shuffleQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}
function setNextQuestion() {
    resetState();
    showQuestion(shuffleQuestions[currentQuestionIndex])
}


function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtonElement.appendChild(button)
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide')
    while (answerButtonElement.firstChild) {
        answerButtonElement.removeChild(answerButtonElement.firstChild)
    }
}
function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct)
    Array.from(answerButtonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffleQuestions.length > currentQuestionIndex + 1) {

        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: '莊程富先生會哪些語言?',
        answers: [
            { text: '日文', correct: true },
            { text: '英文', correct: true },
            { text: '中文', correct: true },
            { text: '德文', correct: false }
        ]
    },
    {
        question: '莊程富先生參加過哪個工程師培訓課?',
        answers: [
            { text: 'MIS工程師', correct: false },
            { text: '軟體工程師', correct: false },
            { text: '建築工程師', correct: false },
            { text: '前端工程師', correct: true }
        ]
    },
    {
        question: '莊程富先生的夢想是什麼？',
        answers: [
            { text: '成為一個負責任的男人', correct: true },
            { text: '成為一個兼具語文和資訊科技實力的社會菁英', correct: true },
            { text: '成為一個善用AI加速工作效率的人', correct: true },
            { text: '成為一個具備溝通和技術能力的科技人才', correct: true }
        ]
    }
]