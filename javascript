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

// نظام التسجيل
function toggleAuthMode() {
    isSignup = !isSignup;
    const signupInputs = document.querySelectorAll('.signup-only');
    signupInputs.forEach(el => el.style.display = isSignup ? 'block' : 'none');
    
    document.getElementById('auth-title').innerText = isSignup ? 'إنشاء حساب جديد' : 'تسجيل الدخول';
    document.getElementById('auth-btn').innerText = isSignup ? 'سجل دلوقتي' : 'دخول سريع';
    document.getElementById('toggle-text').innerHTML = isSignup ? 'عندك حساب؟ <span>ادخل</span>' : 'معندكش حساب؟ <span>سجل دلوقتي</span>';
}

function handleAuth() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    if (email.includes("@") && pass.length >= 4) {
        // تأثير تحميل بسيط
        document.getElementById('auth-btn').innerText = "جاري التحميل...";
        setTimeout(() => {
            document.getElementById('auth-screen').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('auth-screen').style.display = 'none';
                document.getElementById('game-container').style.display = 'flex';
                startNewGame();
            }, 500);
        }, 1000);
    } else {
        alert("يا ريس دخل بيانات صح (ايميل وباسورد أكتر من 4 حروف)");
    }
}

function googleSignIn() {
    handleAuth(); // محاكاة للدخول بجوجل
}

// نظام اللعبة
function startNewGame() {
    addMessage("أهلاً بيك يا بطل في 'مين فينا؟'.. 🔥", "bot");
    setTimeout(() => {
        addMessage("هسألك أسئلة وهشوف تفكيرك زي بقية الناس ولا أنت 'فريد من نوعك'؟ 😂", "bot");
    }, 1000);
    setTimeout(getNextQuestion, 2500);
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
        
        // تحديث الأزرار مع أنيميشن بسيط
        const btnA = document.getElementById('btn-a');
        const btnB = document.getElementById('btn-b');
        btnA.innerText = currentQuestion.a;
        btnB.innerText = currentQuestion.b;
        btnA.style.transform = "scale(1)";
        btnB.style.transform = "scale(1)";
    }, 1500);
}

function userReply(choice) {
    if(!currentQuestion) return;
    
    const userText = choice === 'A' ? currentQuestion.a : currentQuestion.b;
    addMessage(userText, 'user');
    
    // منع الضغط المتكرر
    document.getElementById('btn-a').style.transform = "scale(0.9)";
    document.getElementById('btn-b').style.transform = "scale(0.9)";

    setTimeout(() => {
        if(choice === currentQuestion.popular) {
            streak++;
            addMessage("🔥 الله عليك! اختيار الأغلبية.. الاستريك ولع!", "bot");
        } else {
            streak = 0;
            addMessage("😅 لااااا.. الناس اختارت التاني. الاستريك ضاع!", "bot");
        }
        document.getElementById('streak-count').innerText = streak;
        
        // هز خفيف للاستريك لو زاد
        const sBadge = document.querySelector('.streak-badge');
        sBadge.style.transform = "scale(1.2)";
        setTimeout(() => sBadge.style.transform = "scale(1)", 200);

        setTimeout(getNextQuestion, 2000);
    }, 1000);
}

function logout() {
    if(confirm("عايز تقفل اللعبة؟")) location.reload();
}
