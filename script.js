const allQuestions = [
    { q: "مين فينا بيلبس هدوم الخروج وينام بيها من الكسل؟", a: "أنا طبعاً ملك الانتخة", b: "لأ مستحيل أعمل كدة", popular: "A" },
    { q: "مين فينا بيشم ريحة الأكل من آخر الشارع؟", a: "رادار أكل متحرك", b: "مناخيري تعبانة شوية", popular: "A" },
    { q: "مين فينا لو خد ميكروفون هيغني شعبي؟", a: "هسمعكم أحلى مواويل", b: "صوتي هيجري الناس", popular: "A" },
    { q: "تشرب بيبسي مشبر ولا عصير قصب؟", a: "البيبسي هو الحياة", b: "القصب يكتسح", popular: "B" }
];

let availableQuestions = [...allQuestions];
let currentQuestion = null;
let streak = 0;

function handleAuth() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    if (email.includes("@") && pass.length >= 4) {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('game-container').style.display = 'flex';
        startNewGame();
    } else {
        alert("يا ريس دخل بيانات صح (ايميل وباسورد 4 حروف)");
    }
}

function startNewGame() {
    addMessage("أهلاً بيك يا وحش في 'مين فينا؟'.. 🔥", "bot");
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
        btnA.style.display = "block";
        btnB.style.display = "block";
    }, 1200);
}

function userReply(choice) {
    if(!currentQuestion) return;
    
    addMessage(choice === 'A' ? currentQuestion.a : currentQuestion.b, 'user');
    
    document.getElementById('btn-a').style.display = "none";
    document.getElementById('btn-b').style.display = "none";

    setTimeout(() => {
        if(choice === currentQuestion.popular) {
            streak++;
            addMessage("🔥 صح! الناس زيك.. الاستريك زاد", "bot");
        } else {
            streak = 0;
            addMessage("😅 اختيار غريب.. الاستريك صفر", "bot");
        }
        document.getElementById('streak-count').innerText = streak;
        setTimeout(getNextQuestion, 1500);
    }, 1000);
}

function logout() { location.reload(); }

function toggleAuthMode() {
    const title = document.getElementById('auth-title');
    const btn = document.getElementById('auth-btn');
    title.innerText = title.innerText === "مين فينا؟" ? "حساب جديد" : "مين فينا؟";
    btn.innerText = btn.innerText === "دخول سريع" ? "إنشاء حساب" : "دخول سريع";
}
