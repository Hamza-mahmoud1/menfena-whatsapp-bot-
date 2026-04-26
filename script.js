// الأسئلة من الملف اللي بعته
const allQuestions = [
    { q: "طفي النور والجري قبل الضلمة ؟ 🏃‍♂️", a: "أنا بسبق الضلمة", b: "كنت بطير من الرعب", popular: "A" },
    { q: "تمثيل النوم قدام أبوك ؟ 😴", a: "كنت بقوم أكلمه عادي", b: "كنت بقطع النفس خالص", popular: "B" },
    { q: "رجل برا الغطا والعفريت ؟ 🧟‍♂️", a: "أنا ملك الجرأة", b: "الغطا ده أماني الوحيد", popular: "B" },
    { q: "قفل باب الثلاجة براحة عشان تشوف النور ؟ 💡", a: "عارف السر أصلاً!", b: "ضيعت عمري مراقبة", popular: "A" },
    { q: "كلام في المروحة وهي شغالة (صوت روبوت) ؟ 🤖", a: "صوتي كروان", b: "كنت بغني للريش", popular: "B" },
    { q: "ملائة السرير وسوبر مان ؟ 🦸‍♂️", a: "طرت بجد والله", b: "اتفتحت من الوقعة", popular: "A" },
    { q: "عدم لمس فواصل السيراميك وأنت ماشي ؟ 🏁", a: "مايسترو خطوات", b: "كانت لافا هتموتني", popular: "B" },
    { q: "خوف من شماعة الهدوم بالليل ؟ 🧥", a: "كنت بصاحبها عادي", b: "ركبي كانت بتخبط في بعض", popular: "B" },
    { q: "بلغ اللبانة وشجرة البطن ؟ 🌳", a: "زرعت غابة في بطني", b: "كنت بكتب وصيتي من الخوف", popular: "B" },
    { q: "شرب الشاي في غطا القزازة ؟ ☕", a: "باشا من يومي", b: "برستيج الغلابة", popular: "A" }
];

let availableQuestions = [...allQuestions];
let currentQuestion = null;
let streak = 0;

function handleAuth() {
    const email = document.getElementById('email').value;
    if(email.includes("@")) {
        document.getElementById('auth-screen').style.display = 'none';
        document.getElementById('game-container').style.display = 'flex';
        updateOnlineCount();
        startNewGame();
    } else {
        alert("دخل إيميل صح يا صاحبي");
    }
}

// تحديث عدد اللاعبين الوهمي
function updateOnlineCount() {
    setInterval(() => {
        const base = 1200;
        const random = Math.floor(Math.random() * 100);
        document.getElementById('fake-online').innerText = (base + random).toLocaleString();
    }, 3000);
}

function startNewGame() {
    addMessage("أهلاً بيك في تحدي الـ 500 سؤال (نسخة الرد السريع) ⚡", "bot");
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
        
        const btnA = document.getElementById('btn-a');
        const btnB = document.getElementById('btn-b');
        btnA.innerText = currentQuestion.a;
        btnB.innerText = currentQuestion.b;
        btnA.style.display = "block";
        btnB.style.display = "block";
    }, 800);
}

function userReply(choice) {
    if(!currentQuestion) return;
    
    addMessage(choice === 'A' ? currentQuestion.a : currentQuestion.b, 'user');
    
    document.getElementById('btn-a').style.display = "none";
    document.getElementById('btn-b').style.display = "none";

    // إظهار تصويت وهمي
    const voteA = choice === 'A' ? Math.floor(Math.random() * 20) + 60 : Math.floor(Math.random() * 20) + 20;
    const voteB = 100 - voteA;
    
    setTimeout(() => {
        document.getElementById('vote-stats').style.display = "flex";
        document.getElementById('stat-a').innerText = voteA;
        document.getElementById('stat-b').innerText = voteB;
        
        if(choice === currentQuestion.popular) {
            streak++;
            addMessage(`🔥 وحش! أنت والـ ${voteA}% من الناس رأيكم واحد`, "bot");
        } else {
            streak = 0;
            addMessage(`😅 غريبة! الـ ${voteA}% اختاروا عكسك`, "bot");
        }
        document.getElementById('streak-count').innerText = streak;
        setTimeout(getNextQuestion, 2000);
    }, 1000);
}

function logout() { location.reload(); }
