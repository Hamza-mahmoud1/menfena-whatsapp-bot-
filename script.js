// مصفوفة الأسئلة
const allQuestions = [
    { q: "طفي النور والجري قبل الضلمة؟ 🏃‍♂️", a: "أنا بسبق الضلمة!", b: "كنت بطير من الرعب", popular: "A" },
    { q: "تمثيل النوم قدام أبوك لما يدخل؟ 😴", a: "كنت بقوم أكلمه عادي", b: "كنت بقطع النفس خالص", popular: "B" },
    { q: "رجل برا الغطا والعفريت بالليل؟ 🧟‍♂️", a: "أنا ملك الجرأة", b: "الغطا ده أماني الوحيد", popular: "B" },
    { q: "قفل باب الثلاجة براحة عشان تشوف النور بيفصل إمتى؟ 💡", a: "كنت بضيع عمري مراقبة", b: "عارف السر أصلاً!", popular: "A" },
    { q: "كلام في المروحة وهي شغالة (صوت روبوت)؟ 🤖", a: "صوتي كان كروان", b: "كنت بغني للريش", popular: "B" },
    { q: "عدم لمس فواصل السيراميك وأنت ماشي؟ 🏁", a: "مايسترو خطوات", b: "كانت لافا هتموتني لو لمستها", popular: "B" },
    { q: "بلغ اللبانة وشجرة البطن؟ 🌳", a: "زرعت غابة في بطني", b: "كنت بكتب وصيتي من الخوف", popular: "B" },
    { q: "ملائة السرير وسوبر مان؟ 🦸‍♂️", a: "طرت بجد والله", b: "اتفتحت من الوقعة", popular: "A" },
    { q: "خوف من شماعة الهدوم بالليل؟ 🧥", a: "كنت بصاحبها عادي", b: "ركبي كانت بتخبط في بعض", popular: "B" },
    { q: "شرب الشاي في غطا القزازة؟ ☕", a: "باشا من يومي", b: "برستيج الغلابة", popular: "A" }
];

let availableQuestions = [...allQuestions];
let currentQuestion = null;
let streak = 0;

// دالة تسجيل الدخول
function handleAuth() {
    const email = document.getElementById('email').value;
    if(email && email.includes("@")) {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('game-container').style.display = 'flex';
        startNewGame();
    } else {
        alert("يا ريس دخل إيميل صح (لازم يكون فيه @)");
    }
}

// بداية اللعبة
function startNewGame() {
    addMessage("أهلاً بيك في تحدي الـ 500 سؤال.. 🔥", "bot");
    setTimeout(getNextQuestion, 1000);
}

// إضافة رسالة للشات
function addMessage(text, type) {
    const chat = document.getElementById('chat-display');
    if(chat) {
        const b = document.createElement('div');
        b.className = `bubble ${type}`;
        b.innerText = text;
        chat.appendChild(b);
        chat.scrollTop = chat.scrollHeight;
    }
}

// سحب السؤال القادم بدون تكرار
function getNextQuestion() {
    if (availableQuestions.length === 0) {
        availableQuestions = [...allQuestions];
        addMessage("خلصنا الأسئلة وهنعيدها تاني عشوائي! 🔄", "bot");
    }
    
    document.getElementById('typing-status').innerText = "بيكتب الآن...";
    
    setTimeout(() => {
        document.getElementById('typing-status').innerText = "متصل الآن";
        const idx = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[idx];
        availableQuestions.splice(idx, 1); 
        
        addMessage(currentQuestion.q, 'bot');
        
        const btnA = document.getElementById('btn-a');
        const btnB = document.getElementById('btn-b');
        if(btnA && btnB) {
            btnA.innerText = currentQuestion.a;
            btnB.innerText = currentQuestion.b;
            btnA.style.display = "block";
            btnB.style.display = "block";
        }
    }, 1000);
}

// رد المستخدم
function userReply(choice) {
    if(!currentQuestion) return;
    
    addMessage(choice === 'A' ? currentQuestion.a : currentQuestion.b, 'user');
    
    document.getElementById('btn-a').style.display = "none";
    document.getElementById('btn-b').style.display = "none";

    setTimeout(() => {
        if(choice === currentQuestion.popular) {
            streak++;
            addMessage("🔥 وحش! رد الأغلبية", "bot");
        } else {
            streak = 0;
            addMessage("😅 رد غريب أوي!", "bot");
        }
        document.getElementById('streak-count').innerText = streak;
        setTimeout(getNextQuestion, 1000);
    }, 800);
}

function logout() { 
    location.reload(); 
}
