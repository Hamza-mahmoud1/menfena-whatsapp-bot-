function getNextQuestion() {
    if(availableQuestions.length === 0) availableQuestions = [...allQuestions];
    
    const status = document.getElementById('typing-status');
    const btnA = document.getElementById('btn-a');
    const btnB = document.getElementById('btn-b');

    // إخفاء الزراير أثناء ما البوت بيفكر (عشان الواقعية)
    if (btnA) { btnA.classList.remove('show'); btnA.style.visibility = "hidden"; }
    if (btnB) { btnB.classList.remove('show'); btnB.style.visibility = "hidden"; }

    if (status) status.innerText = "بيكتب الآن...";
    
    setTimeout(() => {
        if (status) status.innerText = "متصل الآن";
        const idx = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[idx];
        availableQuestions.splice(idx, 1);
        
        addMessage(currentQuestion.q, 'bot');
        
        // إظهار الزراير بعد ما الرسالة تتبعت
        setTimeout(() => {
            if (btnA && btnB) {
                btnA.innerText = currentQuestion.a;
                btnB.innerText = currentQuestion.b;
                btnA.style.visibility = "visible";
                btnB.style.visibility = "visible";
                btnA.classList.add('show');
                btnB.classList.add('show');
            }
        }, 500); // تأخير نص ثانية بعد الرسالة
    }, 1200);
}

// تعديل بسيط في userReply عشان يخفي الزراير بعد ما تختار
function userReply(choice) {
    if(!currentQuestion) return;
    
    const btnA = document.getElementById('btn-a');
    const btnB = document.getElementById('btn-b');
    
    const userText = choice === 'A' ? currentQuestion.a : currentQuestion.b;
    addMessage(userText, 'user');
    
    // إخفاء الزراير فوراً بعد الإجابة عشان ميدوسش تاني
    if (btnA) btnA.style.visibility = "hidden";
    if (btnB) btnB.style.visibility = "hidden";

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
