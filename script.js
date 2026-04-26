const allQuestions = [
    { q: "مين فينا بيلبس هدوم الخروج وينام بيها؟", a: "أنا طبعاً ملك الانتخة", b: "لأ مستحيل أعمل كدة", popular: "A" },
    { q: "مين فينا بيشم ريحة الأكل من آخر الشارع؟", a: "رادار أكل متحرك", b: "مناخيري تعبانة", popular: "A" },
    { q: "تشرب بيبسي مشبر ولا عصير قصب؟", a: "البيبسي هو الحياة", b: "القصب يكتسح", popular: "B" }
];

let availableQuestions = [...allQuestions];
let currentQuestion = null;
let streak = 0;

function handleAuth() {
    const email = document.getElementById('email').value;
    if(email.includes("@")) {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('game-container').style.display = 'flex';
        startNewGame();
    } else {
        alert("دخل إيميل صح يا وحش");
    }
}

function startNewGame() {
    addMessage("أهلاً بيك في 'مين فينا'.. جاهز؟", "bot");
    setTimeout(getNextQuestion, 1500);
}

function addMessage(text, type) {
    const chat = document.getElementById('chat-display');
    const b = document.createElement('div');
    b.className = `bubble ${type}`;
    b.innerText = text;
    chat.appendChild(b);
    chat.scrollTop = chat.scrollHeight;
}

function getNextQuestion() {
    if(availableQuestions.length === 0) availableQuestions = [...allQuestions];
    
    document.getElementById('typing-status').innerText = "بيكتب الآن...";
    
    setTimeout(() => {
        document.getElementById('typing-status').innerText = "متصل الآن";
        const idx = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[idx];
        availableQuestions.splice(idx, 1);
        
        addMessage(currentQuestion.q, 'bot');
        
        const btnA = document.getElementById('btn-a');
        const btnB = document.getElementById('btn-b');
        
        btnA.innerText = currentQuestion.a;
        btnB.innerText = currentQuestion.b;
        btnA.style.visibility = "visible";
        btnB.style.visibility = "visible";
    }, 1200);
}

function userReply(choice) {
    if(!currentQuestion) return;
    
    addMessage(choice === 'A' ? currentQuestion.a : currentQuestion.b, 'user');
    
    document.getElementById('btn-a').style.visibility = "hidden";
    document.getElementById('btn-b').style.visibility = "hidden";

    setTimeout(() => {
        if(choice === currentQuestion.popular) {
            streak++;
            addMessage("🔥 صح! الناس زيك..", "bot");
        } else {
            streak = 0;
            addMessage("😅 اختيار غريب..", "bot");
        }
        document.getElementById('streak-count').innerText = streak;
        setTimeout(getNextQuestion, 1500);
    }, 1000);
}

function logout() { location.reload(); }
