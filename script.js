// الأسئلة من ملفك
const allQuestions = [
    { q: "طفي النور والجري قبل الضلمة ؟ 🏃‍♂️", a: "أنا بسبق الضلمة", b: "كنت بطير من الرعب", popular: "A" },
    { q: "تمثيل النوم قدام أبوك ؟ 😴", a: "كنت بقوم أكلمه عادي", b: "كنت بقطع النفس خالص", popular: "B" },
    { q: "رجل برا الغطا والعفريت ؟ 🧟‍♂️", a: "أنا ملك الجرأة", b: "الغطا ده أماني الوحيد", popular: "B" },
    { q: "قفل باب الثلاجة براحة عشان تشوف النور ؟ 💡", a: "عارف السر أصلاً!", b: "ضيعت عمري مراقبة", popular: "A" },
    { q: "كلام في المروحة وهي شغالة (روبوت) ؟ 🤖", a: "صوتي كروان", b: "كنت بغني للريش", popular: "B" },
    { q: "ملائة السرير وسوبر مان ؟ 🦸‍♂️", a: "طرت بجد والله", b: "اتفتحت من الوقعة", popular: "A" }
];

let availableQuestions = [...allQuestions];
let currentQuestion = null;
let streak = 0;

// --- نظام السحابة (Local Storage) ---
function toggleAuth(isSignup) {
    document.getElementById('auth-title').innerText = isSignup ? "إنشاء حساب جديد" : "تسجيل الدخول";
    document.getElementById('auth-buttons').style.display = isSignup ? "none" : "block";
    document.getElementById('signup-buttons').style.display = isSignup ? "block" : "none";
}

function handleSignup() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if(user.length < 3) return alert("الاسم قصير جداً");
    
    let users = JSON.parse(localStorage.getItem('gameUsers')) || {};
    if(users[user]) return alert("المستخدم موجود بالفعل");
    
    users[user] = pass;
    localStorage.setItem('gameUsers', JSON.stringify(users));
    alert("تم إنشاء الحساب بنجاح! سجل دخولك الآن.");
    toggleAuth(false);
}

function handleLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    let users = JSON.parse(localStorage.getItem('gameUsers')) || {};

    if(users[user] && users[user] === pass) {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('game-container').style.display = 'flex';
        startGame();
    } else {
        alert("خطأ في الاسم أو كلمة السر");
    }
}

// --- نظام اللعبة ---
function startGame() {
    addMessage(`أهلاً بك يا ${document.getElementById('username').value} في مين فينا؟ ⚡`, 'bot');
    setTimeout(getNextQuestion, 1200);
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
    if (availableQuestions.length === 0) availableQuestions = [...allQuestions];
    document.getElementById('vote-stats').style.display = "none";
    
    const idx = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[idx];
    availableQuestions.splice(idx, 1);
    
    addMessage(currentQuestion.q, 'bot');
    
    const btnA = document.getElementById('btn-a');
    const btnB = document.getElementById('btn-b');
    
    // إظهار الزرارين مع بعض للتصويت
    btnA.innerText = currentQuestion.a;
    btnB.innerText = currentQuestion.b;
    btnA.style.display = "block";
    btnB.style.display = "block";
}

function userReply(choice) {
    const btnA = document.getElementById('btn-a');
    const btnB = document.getElementById('btn-b');
    
    addMessage(choice === 'A' ? currentQuestion.a : currentQuestion.b, 'user');
    btnA.style.display = "none";
    btnB.style.display = "none";

    // حساب تصويت وهمي
    const percentA = choice === 'A' ? Math.floor(Math.random() * 30) + 60 : Math.floor(Math.random() * 30) + 10;
    const percentB = 100 - percentA;

    setTimeout(() => {
        document.getElementById('vote-stats').style.display = "flex";
        document.getElementById('stat-a').innerText = percentA;
        document.getElementById('stat-b').innerText = percentB;

        if(choice === currentQuestion.popular) {
            streak++;
            addMessage(`🔥 رد الأغلبية! (${percentA}% اختاروا مثلك)`, 'bot');
        } else {
            streak = 0;
            addMessage(`😅 أنت مميز! ${percentB}% فقط اختاروا مثلك`, 'bot');
        }
        document.getElementById('streak-count').innerText = streak;
        setTimeout(getNextQuestion, 2000);
    }, 1000);
}

function logout() { location.reload(); }
