// premenne pre reprezentaciu elementov z "realtest.html"
const restartBtn = document.getElementById("restart");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");
const trueBtn = document.getElementById("True");
const falsetBtn = document.getElementById("False");
const userScore = document.getElementById("user-score");
const questionText = document.getElementById("question-text");

// aktualna otazka
let currentQuestion = 0;

// skore - spravna odpoved => skore++
let score = 0;

// otazky a odpovede
let questions = [
    {
        question: "Protocols used in network communications also define: Message encoding, Message delivery options, Message Formatting and Encapsulation, Message Timing, Message Size?",
        answers: [
            {option: "Yes", answer:true},
            {option: "No", answer:false}
        ]
    },
    {
        question: "Message delivery options are unicast, broadcast and ?",
        answers: [
            {option: "Anycast", answer:false},
            {option: "Multicast", answer:true}
        ]
    },
    {
        question: "Optical Fiber is:",
        answers: [
            {option: "Extremely thick", answer:false},
            {option: "Exrtemely thin", answer:true}
        ]
    },
    {
        question: "Fiber-optic cable support bandwidth:",
        answers: [
            {option: "10 Mb/s - 10 Gb/s", answer:false},
            {option: "10 Mb/s - 100 Gb/s", answer:true}
        ]
    },
    {
        question: "Fiber-optic is completely immune to EMI and RFI:",
        answers: [
            {option: "Yes", answer:true},
            {option: "No", answer:false}
        ]
    },
    {
        question: "MAC address table is stored in:",
        answers: [
            {option: "Switch", answer:true},
            {option: "Router", answer:false}
        ]
    },
    {
        question: "Is Cut-Through Switching checking errors?",
        answers: [
            {option: "No", answer:true},
            {option: "Yes", answer:false}
        ]
    }
]

// po stlaceni tlacidla sa zavola prislusna funkcia
restartBtn.addEventListener("click", restart);
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);
submitBtn.addEventListener("click", submit);

// tato funkcia je zavolana hned na pri starte tohto scriptu
function beginQuiz()
{
    // na zaciatku testu je cislo aktualnej otazky 0 => pole
    currentQuestion = 0;

    // vypise sa otazka podla poradia (index otazky je "currentQuestion")
    questionText.innerHTML = questions[currentQuestion].question;

    // ak uzivatel klikne na 1. tlacidlo (vlavo), tak:
    trueBtn.innerHTML = questions[currentQuestion].answers[0].option;
    trueBtn.onclick = () => {
        let ano = 0;
        
        // podmienka zbehne len vtedy, ak je vyraz pravdivivy (tlacidlo ma hodnotu True, nastavenu v poli "questions") 
        if(questions[currentQuestion].answers[ano].answer)
        {
            // ak je skore mensie ako 7, moze sa inkrementovat
            if(score<7)
            {
                score++;
            }
        }
        // ak je cislo otazky mensie ako 6, prejdeme na dalsiu otazku
        if(currentQuestion<6)
        {
            next();
        }
    }
    // ak uzivatel klikne na 2. tlacidlo (vpravo), tak:
    falsetBtn.innerHTML = questions[currentQuestion].answers[1].option;
    falsetBtn.onclick = () => {
        let ano = 1;

        // podmienka zbehne len vtedy, ak je vyraz pravdivivy (tlacidlo ma hodnotu True, nastavenu v poli "questions") 
        if(questions[currentQuestion].answers[ano].answer)
        {
            if(score<7)
            {
                score++;
            }
        }
        if(currentQuestion<6)
        {
            next();
        }
    }
    prevBtn.classList.add("hide");
}

// po spusteni scriptu sa spusti aj tato funkciu
beginQuiz();


function restart()
{
    // tato funkcia restartuje test
    // aktualna otazka bude 0
    currentQuestion = 0;
    prevBtn.classList.remove("hide");
    nextBtn.classList.remove("hide");
    submitBtn.classList.remove("hide");
    trueBtn.classList.remove("hide");
    falsetBtn.classList.remove("hide");
    score = 0;
    userScore.innerHTML = "";
    // a opat sa spusti test
    beginQuiz();
}

function next()
{
    // zvysenie cisla aktualnej otazky
    currentQuestion++;

    // ak je cislo aktualnej otazke vacsie/rovne 6 (posledna otazka)
    if(currentQuestion>=6)
    {
        nextBtn.classList.add("hide");
        prevBtn.classList.remove("hide");
    }
    questionText.innerHTML = questions[currentQuestion].question;
    trueBtn.innerHTML = questions[currentQuestion].answers[0].option;
    trueBtn.onclick = () => {
        let ano = 0;
        if(questions[currentQuestion].answers[ano].answer)
        {
            if(score<7)
            {
                score++;
            }
        }
        if(currentQuestion<6)
        {
            next();
        }
    }
    falsetBtn.innerHTML = questions[currentQuestion].answers[1].option;
    falsetBtn.onclick = () => {
        let ano = 1;
        if(questions[currentQuestion].answers[ano].answer)
        {
            if(score<7)
            {
                score++;
            }
        }
        //userScore.innerHTML = score;
        if(currentQuestion<6)
        {
            next();
        }
    }
    prevBtn.classList.add("hide");
}

function prev()
{
    // znizenia cisla aktualnej otazky
    currentQuestion--;
    // ak sme na prvej otazke, tak
    if(currentQuestion<=0)
    {
        // skryje sa tlacidlo - predchaduajuca otazka
        prevBtn.classList.add("hide");
        // zobrazi sa tlacidlo - dalsia otazka
        nextBtn.classList.remove("hide");
    }
    questionText.innerHTML = questions[currentQuestion].question;
    trueBtn.innerHTML = questions[currentQuestion].answers[0].option;
    trueBtn.onclick = () => {
        let ano = 0;
        if(questions[currentQuestion].answers[ano].answer)
        {
            if(score<7)
            {
                score++;
            }
        }
        if(currentQuestion<6)
        {
            next();
        }
    }
    falsetBtn.innerHTML = questions[currentQuestion].answers[1].option;
    falsetBtn.onclick = () => {
        let ano = 1;
        if(questions[currentQuestion].answers[ano].answer)
        {
            if(score<7)
            {
                score++;
            }
        }
        //userScore.innerHTML = score;
        if(currentQuestion<6)
        {
            next();
        }
    }
    prevBtn.classList.add("hide");
}

// funckia na odovzdavanie testu
function submit()
{
    // skrytie vsetkych tlacidiel
    prevBtn.classList.add("hide");
    nextBtn.classList.add("hide");
    submitBtn.classList.add("hide");
    trueBtn.classList.add("hide");
    falsetBtn.classList.add("hide");
    // vypis skore a kratkej spravy
    userScore.innerHTML = score + "/7";
    if(score == 7) 
    {
        questionText.innerHTML = "YOU ARE INCREDIBLE!"
    }
    if(score >= 4) 
    {
        questionText.innerHTML = "YOU HAVE A SOLID KNOWLEDGE!"
    } 
    else
    {
        questionText.innerHTML = "PFF, GO BACK TO LEARN!"
    }
}


// zdroj - https://www.codingninjas.com/blog/2020/11/03/how-to-create-a-quiz-in-javascript/
