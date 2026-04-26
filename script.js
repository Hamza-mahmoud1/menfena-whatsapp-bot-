// الأسئلة مستوحاة من ملف الـ PDF اللي بعته
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
    // ملحوظة: يمكنك إضافة الـ 500 سؤال هنا بنفس التنسيق
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
    } else { alert("دخل إيميل صح يا وحش!"); }
}

function startNewGame() {
    addMessage("يا أهلاً بيك في تحدي الـ 500 سؤال.. مش هنكرر سؤال غير لما يخلصوا! 🔥", "bot");
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
    // لو الأسئلة خلصت، بنعيد شحنها من جديد
    if (availableQuestions.length === 0) {
        addMessage("مبروك! خلصت كل الأسئلة.. هنبدأ نعيدهم تاني عشوائي! 🔄", "bot");
        availableQuestions = [...allQuestions];
    }
    
    document.getElementById('typing-status').innerText = "بيكتب الآن...";
    
    setTimeout(() => {
        document.getElementById('typing-status').innerText = "متصل الآن";
        const idx = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[idx];
        
        // حذف السؤال المختار عشان ميتكررش
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
            addMessage("🔥 وحش! أنت زينا بالظبط", "bot");
        } else {
            streak = 0;
            addMessage("😅 لااا.. رد غريب أوي!", "bot");
        }
        document.getElementById('streak-count').innerText = streak;
        setTimeout(getNextQuestion, 1500);
    }, 1000);
}

function logout() { location.reload(); }
