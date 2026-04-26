// الأسئلة
const allQuestions = [
    { q: "طفي النور والجري قبل الضلمة ؟ 🏃‍♂️", a: "أنا بسبق الضلمة", b: "كنت بطير من الرعب", popular: "A" },
    { q: "تمثيل النوم قدام أبوك ؟ 😴", a: "كنت بقوم أكلمه عادي", b: "كنت بقطع النفس خالص", popular: "B" },
    { q: "رجل برا الغطا والعفريت ؟ 🧟‍♂️", a: "أنا ملك الجرأة", b: "الغطا ده أماني الوحيد", popular: "B" },
    { q: "قفل باب الثلاجة براحة ؟ 💡", a: "عارف السر أصلاً!", b: "ضيعت عمري مراقبة", popular: "A" },
    { q: "كلام في المروحة (روبوت) ؟ 🤖", a: "صوتي كروان", b: "كنت بغني للريش", popular: "B" },
    { q: "ملائة السرير وسوبر مان ؟ 🦸‍♂️", a: "طرت بجد والله", b: "اتفتحت من الوقعة", popular: "A" }
];

let availableQuestions = [...allQuestions];
let currentQuestion = null;
let streak = 0;

// --- نظام الحسابات السحابي (LocalStorage) ---
function toggleAuth(isSignup) {
    document.getElementById('auth-title').innerText = isSignup ? "إنشاء حساب جديد" : "تسجيل الدخول";
    document.getElementById('login-section').style.display = isSignup ? "none" : "block";
    document.getElementById('signup-section').style.display = isSignup ? "block" : "none";
}

function handleSignup() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if(!u || !p) return alert("اكتب البيانات كاملة");

    let db = JSON.parse(localStorage.getItem('minFinaUsers')) || {};
    if(db[u]) return alert("الاسم ده محجوز يا ريس");

    db[u] = p;
    localStorage.setItem('minFinaUsers', JSON.stringify(db));
    alert("مبروك! حسابك اتعمل، سجل دخولك بقى");
    toggleAuth(false);
}

function handleLogin() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    let db = JSON.parse(localStorage.getItem('minFinaUsers')) || {};

    if(db[u] && db[u] === p) {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('game-container').style.display = 'flex';
        startGame();
    } else {
        alert("الاسم أو السر غلط.. تأكد إنك عملت حساب أولاً");
    }
}

// --- اللعبة ---
function startGame() {
    addMessage(`يا هلا بيك يا ${document.getElementById('username').value} في "مين فينا؟" ✨`, 'bot');
    setTimeout(getNextQuestion, 1000);
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
    document.getElementById('typing-status').innerText = "بيكتب الآن...";

    setTimeout(() => {
        document.getElementById('typing-status').innerText = "متصل الآن";
        const idx = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[idx];
        availableQuestions.splice(idx, 1);

        addMessage(currentQuestion.q, 'bot');

        const bA = document.getElementById('btn-a');
        const bB = document.getElementById('btn-b');
        bA.innerText = currentQuestion.a;
        bB.innerText = currentQuestion.b;
        bA.style.display = "block";
        bB.style.display = "block";
    }, 800);
}

function userReply(choice) {
    addMessage(choice === 'A' ? currentQuestion.a : currentQuestion.b, 'user');
    document.getElementById('btn-a').style.display = "none";
    document.getElementById('btn-b').style.display = "none";

    // تصويت وهمي
    const pA = choice === 'A' ? Math.floor(Math.random()*20)+70 : Math.floor(Math.random()*20)+10;
    const pB = 100 - pA;

    setTimeout(() => {
        document.getElementById('vote-stats').style.display = "flex";
        document.getElementById('stat-a').innerText = pA;
        document.getElementById('stat-b').innerText = pB;

        if(choice === currentQuestion.popular) {
            streak++;
            addMessage(`🔥 وحش! الـ ${pA}% اختاروا زيك`, 'bot');
        } else {
            streak = 0;
            addMessage(`😅 إجابة نادرة! ${pB}% بس زيك`, 'bot');
        }
        document.getElementById('streak-count').innerText = streak;
        setTimeout(getNextQuestion, 2000);
    }, 1000);
}

function logout() { location.reload(); }
