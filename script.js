// مصفوفة الأسئلة
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

// --- نظام الحسابات (إيميل + سحابة محلية) ---

function toggleAuth(isSignup) {
    const title = document.getElementById('auth-title');
    const loginSec = document.getElementById('login-section');
    const signupSec = document.getElementById('signup-section');
    
    if(isSignup) {
        title.innerText = "إنشاء حساب جديد";
        loginSec.style.display = "none";
        signupSec.style.display = "block";
    } else {
        title.innerText = "تسجيل الدخول";
        loginSec.style.display = "block";
        signupSec.style.display = "none";
    }
}

function handleSignup() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    if(!email.includes("@")) return alert("اكتب بريد إلكتروني صح");
    if(pass.length < 4) return alert("كلمة السر لازم تكون 4 أرقام أو أكتر");

    let users = JSON.parse(localStorage.getItem('min_fina_cloud')) || {};
    if(users[email]) return alert("الإيميل ده متسجل قبل كدة!");

    users[email] = pass;
    localStorage.setItem('min_fina_cloud', JSON.stringify(users));
    alert("تم إنشاء حسابك بنجاح! تقدر تدخل دلوقتي.");
    toggleAuth(false);
}

function handleLogin() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    let users = JSON.parse(localStorage.getItem('min_fina_cloud')) || {};

    if(users[email] && users[email] === pass) {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('game-container').style.display = 'flex';
        startGame();
    } else {
        alert("الإيميل أو كلمة السر غلط.. تأكد إنك عملت حساب الأول");
    }
}

// --- نظام اللعبة ---

function startGame() {
    addMessage("أهلاً بيك في تحدي 'مين فينا؟'.. ✨", "bot");
    setInterval(() => {
        const num = Math.floor(Math.random() * 20) + 1400;
        document.getElementById('fake-online').innerText = num.toLocaleString();
    }, 3000);
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

        // إظهار الزرارين جنب بعض
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
        setTimeout(getNextQuestion, 2500);
    }, 1000);
}

function logout() { location.reload(); }
