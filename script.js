// --- الداتا الأساسية ---
const allQuestions = [
    { q: "مين فينا بيلبس هدوم الخروج وينام بيها من الكسل؟", a: "أنا طبعاً ملك الانتخة", b: "لأ مستحيل أعمل كدة", popular: "A" },
    { q: "مين فينا بيشم ريحة الأكل من آخر الشارع؟", a: "رادار أكل متحرك", b: "مناخيري تعبانة شوية", popular: "A" },
    { q: "لو قدامك تسافر 'الساحل' ولا 'الريف' هدوء؟", a: "الساحل وشخللة", b: "الريف والروقان", popular: "A" },
    { q: "مين فينا لو خد ميكروفون هيغني شعبي؟", a: "هسمعكم أحلى مواويل", b: "صوتي هيجري الناس", popular: "A" },
    { q: "تشرب بيبسي مشبر ولا عصير قصب؟", a: "البيبسي هو الحياة", b: "القصب يكتسح", popular: "B" }
];

let availableQuestions = [...allQuestions];
let currentQuestion = null;
let streak = 0;
let isSignup = false;

// --- نظام التسجيل (تم التأمين) ---
function toggleAuthMode() {
    isSignup = !isSignup;
    const signupInputs = document.querySelectorAll('.signup-only');
    signupInputs.forEach(el => el.style.display = isSignup ? 'block' : 'none');
    
    // التأكد من وجود العناصر قبل تغيير النص عشان ميعلقش
    const authTitle = document.getElementById('auth-title');
    const authBtn = document.getElementById('auth-btn');
    const toggleText = document.getElementById('toggle-text');

    if (authTitle) authTitle.innerText = isSignup ? 'إنشاء حساب جديد' : 'تسجيل الدخول';
    if (authBtn) authBtn.innerText = isSignup ? 'سجل دلوقتي' : 'دخول سريع';
    if (toggleText) toggleText.innerHTML = isSignup ? 'عندك حساب؟ <span>ادخل</span>' : 'معندكش حساب؟ <span>سجل دلوقتي</span>';
}

function handleAuth() {
    const emailField = document.getElementById('email');
    const passField = document.getElementById('password');
    const authBtn = document.getElementById('auth-btn');

    // لو الحقول مش موجودة أصلاً (غلطة في الـ HTML ID)
    if (!emailField || !passField) {
        console.error("المشكلة في الـ IDs بملف الـ HTML.. مش لاقي email أو password");
        alert("في مشكلة في الصفحة، كلم المبرمج!");
        return;
    }

    const email = emailField.value;
    const pass = passField.value;

    // شرط بسيط للدخول (إيميل فيه @ وباسورد 4 حروف)
    if (email.includes("@") && pass.length >= 4) {
        if (authBtn) authBtn.innerText = "جاري التحميل...";
        
        setTimeout(() => {
            const authScreen = document.getElementById('auth-screen');
            const gameContainer = document.getElementById('game-container');
            
            if (authScreen) authScreen.style.display = 'none';
            if (gameContainer) {
                gameContainer.style.display = 'flex';
                // تصفير المحادثة عشان ميتراكمش رسائل قديمة
                const chatDisplay = document.getElementById('chat-display');
                if (chatDisplay) chatDisplay.innerHTML = "";
                startNewGame();
            }
        }, 800);
    } else {
        alert("دخل بيانات كاملة يا وحش (إيميل صح وباسورد 4 حروف ع الأقل)");
    }
}

// --- نظام اللعبة ---
function startNewGame() {
    addMessage("أهلاً بيك يا بطل في 'مين فينا؟'.. 🔥", "bot");
    setTimeout(() => {
        addMessage("هسألك أسئلة وهشوف تفكيرك زي بقية الناس ولا أنت 'فريد من نوعك'؟ 😂", "bot");
        setTimeout(getNextQuestion, 1500);
    }, 1000);
}

function addMessage(text, type) {
    const chat = document.getElementById('chat-display');
    if (!chat) return;
    
    const b = document.createElement('div');
    b.className = `bubble ${type}`;
    b.innerText = text;
    chat.appendChild(b);
    chat.scrollTop = chat.scrollHeight;
}

function getNextQuestion() {
    if(availableQuestions.length === 0) availableQuestions = [...allQuestions];
    
    const status = document.getElementById('typing-status');
    if (status) status.innerText = "بيكتب الآن...";
    
    setTimeout(() => {
        if (status) status.innerText = "متصل الآن";
        const idx = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[idx];
        availableQuestions.splice(idx, 1);
        
        addMessage(currentQuestion.q, 'bot');
        
        const btnA = document.getElementById('btn-a');
        const btnB = document.getElementById('btn-b');
        
        if (btnA && btnB) {
            btnA.innerText = currentQuestion.a;
            btnB.innerText = currentQuestion.b;
            btnA.style.transform = "scale(1)";
            btnB.style.transform = "scale(1)";
        }
    }, 1200);
}

function userReply(choice) {
    if(!currentQuestion) return;
    
    const userText = choice === 'A' ? currentQuestion.a : currentQuestion.b;
    addMessage(userText, 'user');
    
    // أنيميشن للأزرار
    const btnA = document.getElementById('btn-a');
    const btnB = document.getElementById('btn-b');
    if (btnA) btnA.style.transform = "scale(0.9)";
    if (btnB) btnB.style.transform = "scale(0.9)";

    setTimeout(() => {
        if(choice === currentQuestion.popular) {
            streak++;
            addMessage("🔥 الله عليك! اختيار الأغلبية.. الاستريك ولع!", "bot");
        } else {
            streak = 0;
            addMessage("😅 لااااا.. الناس اختارت التاني. الاستريك ضاع!", "bot");
        }
        
        const streakCount = document.getElementById('streak-count');
        if (streakCount) streakCount.innerText = streak;
        
        setTimeout(getNextQuestion, 1500);
    }, 1000);
}

function logout() {
    if(confirm("عايز تقفل اللعبة؟")) location.reload();
}
