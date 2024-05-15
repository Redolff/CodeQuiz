//Llamada a la API con las preguntas, respuestas y respuesta correcta.
const getQuestions = async() => {
    const response = await fetch('https://quiz-test-jade.vercel.app/quiz')
    const data = await response.json()
    return data
}

//Elementos del DOM
const questionTextElement = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const feedbackContainer = document.getElementById('feedback-container')
const feedbackTextElement = document.getElementById('feedback-text');
const finalScore = document.getElementById("final-score");
const nextButton = document.getElementById('next-button');

//Variables de estado
let currentQuestionIndex = 0;
let currentPoints = 0;

//Funcion para que cargue la pregunta actual}
const loadQuestion = async() => {
    const data = await getQuestions();
    const currentQuestion = data[currentQuestionIndex];
    questionTextElement.textContent = currentQuestion.question;

    //Limpiar opciones anteriores
    optionsContainer.innerHTML = "";

    //Crear botones para cada opcion de respuesta
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('option');
        button.addEventListener('click', () => checkAnswer(answer));
        optionsContainer.appendChild(button);
    })

    //Ocultar el contenedor
    feedbackContainer.style.display = 'none';
}

// Función para verificar la respuesta seleccionada por el jugador
const checkAnswer = async(selectedAnswer) => {
    const data = await getQuestions();
    const currentQuestion = data[currentQuestionIndex];
    if(selectedAnswer == currentQuestion.correctAnswer){
        feedbackTextElement.textContent = '¡Respuesta correcta!';
        currentPoints++;
    }else{
        feedbackTextElement.textContent = 'Respuesta incorrecta. La respuesta correcta es: '+ currentQuestion.correctAnswer;
    }
    feedbackContainer.style.display = 'block';
}

// Evento para pasar a la siguiente pregunta
nextButton.addEventListener('click', async() => {
    const data = await getQuestions();
    currentQuestionIndex++;
    if(currentQuestionIndex < data.length){
        loadQuestion();
    }else{
        finalScore.textContent = 'Puntaje final: '+ currentPoints;
        alert("Fin del juego");
    }
});

// Cargamos la primera pregunta al cargar la página
loadQuestion();