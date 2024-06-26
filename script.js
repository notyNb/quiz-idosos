const questions = [
    {
        question: "Falando sobre computadores, o que é um vírus?",
        answers: ["Aplicativo de compras", "Site proibido", "Uma forma de assistir filmes de graça", "Arquivo malicioso que altera a forma como um computador funciona"],
        correct: "Arquivo malicioso que altera a forma como um computador funciona"
    },
    {
        question: "Como criar uma senha forte para proteger sua conta?",
        answers: ["Colocar ela em um papel e deixar visível a todos", "Incluir seu nome ou nome de alguem próximo", "Colocar letras maiúsculas, minúsculas, numeros e caracteres especiais", "Colocar só letras e numeros"],
        correct: "Colocar letras maiúsculas, minúsculas, numeros e caracteres especiais"
    },
    {
        question: "O que se deve fazer ao receber a notificação de que há um arquivo malicioso em seu computador?",
        answers: ["Continuar usando normalmente", "Reiniciar o computador", "Abrir o quadro de Segurança do Windows e seguir os passos recomendados para remoção do arquivo", "Desligar o computador"],
        correct: "Abrir o quadro de Segurança do Windows e seguir os passos recomendados para remoção do arquivo"

    },
    {
        question: "Como se proteger contra vírus e ameaças?",
        answers: ["Baixando qualquer antivirus na internet", "Utilizando o Windows Defender para verificar sempre a integridade do seu sistema", "Desinstalando tudo", "Comprar um novo computador"],
        correct: "Utilizando o Windows Defender para verificar sempre a integridade do seu sistema"

    },
    {
        question: "O que é Phishing?",
        answers: ["Uma forma de fazer você revelar informações pessoais para roubar seu dinheiro", "Um ataque personalizado direcionado a uma pessoa ou organização específica.", "Usar um telefonema para induzir a vítima a revelar informações pessoais.", "Tentativa de adivinhar a senha testando todas as combinações possíveis até encontrar a correta."],
        correct: "Uma forma de fazer você revelar informações pessoais para roubar seu dinheiro"

    }
];

function loadQuiz() {
    const quizContainer = document.getElementById('quiz-container');
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        
        const questionTitle = document.createElement('h3');
        questionTitle.textContent = q.question;
        questionDiv.appendChild(questionTitle);
        
        const answersDiv = document.createElement('div');
        answersDiv.classList.add('answers');
        
        q.answers.forEach(answer => {
            const answerDiv = document.createElement('div');
            answerDiv.classList.add('answer');
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question${index}`;
            input.value = answer;
            answerDiv.appendChild(input);
            
            const label = document.createElement('label');
            label.textContent = answer;
            answerDiv.appendChild(label);
            
            answerDiv.addEventListener('click', () => {
                document.querySelectorAll(`input[name="question${index}"]`).forEach(radio => {
                    radio.parentElement.classList.remove('selected');
                });
                answerDiv.classList.add('selected');
                input.checked = true;
            });
            
            answersDiv.appendChild(answerDiv);
        });

        questionDiv.appendChild(answersDiv);

        const feedbackDiv = document.createElement('div');
        feedbackDiv.id = `feedback${index}`;
        feedbackDiv.classList.add('feedback');
        questionDiv.appendChild(feedbackDiv);

        quizContainer.appendChild(questionDiv);
    });
}

function checkAnswers() {
    let score = 0;
    questions.forEach((q, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        const feedbackDiv = document.getElementById(`feedback${index}`);
        const answerDivs = document.querySelectorAll(`input[name="question${index}"]`).forEach(radio => {
            const parentDiv = radio.parentElement;
            parentDiv.classList.remove('correct', 'incorrect');
            if (radio.value === q.correct) {
                parentDiv.classList.add('correct');
            } else if (radio.checked) {
                parentDiv.classList.add('incorrect');
            }
        });
        if (selected) {
            if (selected.value === q.correct) {
                score++;
                feedbackDiv.textContent = "Correto!";
                feedbackDiv.style.color = "green";
            } else {
                feedbackDiv.textContent = `Errado. A resposta correta é: ${q.correct}`;
                feedbackDiv.style.color = "red";
            }
        } else {
            feedbackDiv.textContent = `Você não selecionou uma resposta.`;
            feedbackDiv.style.color = "red";
        }
    });
    const resultContainer = document.getElementById('result-container');
    resultContainer.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
}

document.getElementById('submit-btn').addEventListener('click', checkAnswers);

window.onload = loadQuiz;
