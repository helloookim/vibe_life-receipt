// Global state (currentLang, COUNTRY_DATA, switchLang, formatNumber, calculateAge from shared.js)
let selectedGender = null;
let selectedMeal = 'mixed';
let userData = {};
let lastReceiptData = null;

// Navigation
function startForm() {
    document.getElementById('landing').classList.add('hidden');
    document.getElementById('form').classList.remove('hidden');
}

function goBackToLanding() {
    document.getElementById('form').classList.add('hidden');
    document.getElementById('landing').classList.remove('hidden');
    document.querySelector('.lang-switcher').classList.remove('hidden');
}

function startOver() {
    document.getElementById('result').classList.add('hidden');
    document.getElementById('landing').classList.remove('hidden');
    document.querySelector('.lang-switcher').classList.remove('hidden');
}

// Form interactions
function selectGender(gender) {
    selectedGender = gender;
    const mBtn = document.getElementById('gender-M');
    const fBtn = document.getElementById('gender-F');

    // Reset both buttons to original state
    [mBtn, fBtn].forEach(btn => {
        btn.classList.remove('bg-gray-900', 'text-white', 'border-gray-900');
        btn.classList.add('bg-gray-50', 'text-gray-800', 'border-gray-200');
    });

    // Highlight selected
    const selectedBtn = gender === 'M' ? mBtn : fBtn;
    selectedBtn.classList.remove('bg-gray-50', 'text-gray-800', 'border-gray-200');
    selectedBtn.classList.add('bg-gray-900', 'text-white', 'border-gray-900');

    mBtn.setAttribute('aria-pressed', gender === 'M' ? 'true' : 'false');
    fBtn.setAttribute('aria-pressed', gender === 'F' ? 'true' : 'false');
}

function selectMeal(meal) {
    selectedMeal = meal;
    ['home', 'mixed', 'out'].forEach(type => {
        const btn = document.getElementById(`meal-${type}`);
        btn.classList.remove('btn-gradient', 'border-purple-500');
        btn.classList.add('border-gray-700', 'bg-gray-800');
        btn.setAttribute('aria-pressed', type === meal ? 'true' : 'false');

        if (type === meal) {
            btn.classList.add('btn-gradient', 'border-purple-500');
            btn.classList.remove('border-gray-700', 'bg-gray-800');
        }
    });
}

function toggleOptional() {
    const inputs = document.getElementById('optional-inputs');
    const arrow = document.getElementById('optional-arrow');
    inputs.classList.toggle('hidden');
    arrow.style.transform = inputs.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}

function updateSliderValue(id, value) {
    document.getElementById(`${id}-value`).textContent = value;

    // Special handling for coffee - show daily equivalent
    if (id === 'coffee') {
        const daily = (parseFloat(value) / 7).toFixed(1);
        const dailyElem = document.getElementById('coffee-daily');
        const dailyElemKo = document.getElementById('coffee-daily-ko');
        const dailyElemJa = document.getElementById('coffee-daily-ja');
        const dailyElemEs = document.getElementById('coffee-daily-es');
        if (dailyElem) dailyElem.textContent = daily;
        if (dailyElemKo) dailyElemKo.textContent = daily;
        if (dailyElemJa) dailyElemJa.textContent = daily;
        if (dailyElemEs) dailyElemEs.textContent = daily;
    }
}

function generateReceipt() {
    // Validate required fields
    const birthdate = document.getElementById('birthdate').value;
    const country = document.getElementById('country').value;

    if (!birthdate || !selectedGender) {
        const msg = {
            en: 'Please fill in all required fields',
            ko: '필수 항목을 모두 입력해주세요',
            ja: 'すべての必須フィールドに入力してください',
            es: 'Por favor complete todos los campos requeridos'
        };
        alert(msg[currentLang] || msg.en);
        return;
    }

    // Collect data
    userData = {
        birthdate,
        country,
        gender: selectedGender,
        sleep: parseFloat(document.getElementById('sleep').value),
        coffee: parseInt(document.getElementById('coffee').value) / 7, // Convert weekly to daily
        phone: parseFloat(document.getElementById('phone').value),
        meal: selectedMeal
    };

    // Show loading
    document.getElementById('form').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');
    // Keep language switcher hidden
    document.querySelector('.lang-switcher').classList.add('hidden');

    // Simulate loading time
    setTimeout(() => {
        const receipt = calculateReceiptData(userData);
        lastReceiptData = receipt;
        renderReceipt(receipt);

        // Save data for cross-service integration
        try {
            localStorage.setItem('lifeReceiptData', JSON.stringify({
                birthdate: userData.birthdate,
                country: userData.country,
                gender: userData.gender
            }));
        } catch (e) {}

        document.getElementById('loading').classList.add('hidden');
        document.getElementById('result').classList.remove('hidden');
        // Keep language switcher hidden on result page
        document.querySelector('.lang-switcher').classList.add('hidden');

        // Scroll to top to show the receipt
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
}

function calculateReceiptData(data) {
    const age = calculateAge(data.birthdate);
    const countryInfo = COUNTRY_DATA[data.country];

    // Time calculations (in hours)
    const totalHours = age.days * 24;
    const sleepHours = age.days * data.sleep;
    const sleepYears = sleepHours / (24 * 365.25);

    // Smartphone (became common around 2010, but kids don't use them until ~12)
    const yearsSince2010 = Math.max(0, new Date().getFullYear() - 2010);
    const phoneStartAge = Math.max(12, age.years - yearsSince2010); // Whichever is later
    const smartphoneYears = Math.max(0, age.years - phoneStartAge);
    const phoneDays = smartphoneYears * 365.25;
    const phoneHours = phoneDays * data.phone;
    const phoneYears = phoneHours / (24 * 365.25);

    // Toilet (25 min/day average)
    const toiletHours = age.days * (25 / 60);
    const toiletDays = toiletHours / 24;

    // Eating (1.5 hours/day)
    const eatingHours = age.days * 1.5;
    const eatingYears = eatingHours / (24 * 365.25);

    // Shower (15 min/day)
    const showerHours = age.days * (15 / 60);
    const showerDays = showerHours / 24;

    // Work/Study (realistic calculation)
    // Elementary/High School (6-18): 6 hours/day for 180 days/year
    const schoolYears = Math.min(Math.max(0, age.years - 6), 12);
    const schoolHours = schoolYears * 180 * 6;

    // University (18-22): 4 hours/day for 200 days/year (not everyone attends)
    const universityYears = Math.min(Math.max(0, age.years - 18), 4);
    const universityHours = universityYears * 200 * 4;

    // Work (22+): 8 hours/day for 220 days/year (accounts for unemployment, part-time, etc.)
    const workYears = Math.max(0, age.years - 22);
    const workWorkHours = workYears * 220 * 8;

    const workHours = schoolHours + universityHours + workWorkHours;
    const workYearsCalc = workHours / (24 * 365.25);

    // Commute (only for work/university, 1 hour/day, 150 days/year - not everyone commutes)
    const commuteYears_calc = Math.max(0, age.years - 18);
    const commuteHours = commuteYears_calc * 150 * 1;
    const commuteYears = commuteHours / (24 * 365.25);

    // SNS/YouTube (40% of phone time)
    const snsHours = phoneHours * 0.4;
    const snsYears = snsHours / (24 * 365.25);

    // Waiting in lines (country average)
    const waitingHours = age.years * 150; // ~150 hours per year
    const waitingDays = waitingHours / 24;

    // Free time
    const usedHours = sleepHours + workHours + phoneHours + toiletHours + eatingHours + showerHours + commuteHours + waitingHours;
    const freeHours = totalHours - usedHours;
    const freeYears = freeHours / (24 * 365.25);

    // Consumption calculations
    // Coffee: Only count if they drink coffee, start from age 20 (work/university)
    // Not everyone drinks coffee every day - assume 250 days/year
    const coffeeYears = data.coffee > 0 ? Math.max(0, age.years - 20) : 0;
    const totalCoffee = Math.floor(coffeeYears * 250 * data.coffee);

    // Meals: Count from birth (babies eat too!)
    const totalMeals = Math.floor(age.days * 3);

    // Water & Food: Only count from age 5 (babies/toddlers consume much less)
    const adultDays = Math.max(0, age.days - (5 * 365.25));
    const totalWater = Math.floor(adultDays * 1.5); // 1.5L per day from age 5+
    const bathtubs = Math.floor(totalWater / 200); // 200L per bathtub
    const totalFood = Math.floor(adultDays * 1.2); // 1.2kg per day from age 5+
    const elephants = Math.floor(totalFood / 6000); // 6000kg per elephant

    // Steps: Only count from age 2 (when walking), use 50% of country average
    // (accounts for lazy days, sedentary lifestyle, not everyone walks that much)
    const walkingDays = Math.max(0, age.days - (2 * 365.25));
    const steps = Math.floor(walkingDays * countryInfo.avgWalkingSteps * 0.5);

    // Walking distance comparisons
    const stepLength = 0.762; // meters per step (average)
    const distanceKm = steps * stepLength / 1000; // total distance in km
    const earthCircumferences = distanceKm / 40075; // Earth circumference at equator
    const marathons = Math.floor(distanceKm / 42.195); // Marathon distance

    const hairLength = age.years * 13; // 13cm per year (more conservative)
    const heartbeats = Math.floor(age.days * 86400); // About 60 bpm average (86,400 beats/day)
    const blinks = Math.floor(age.days * (24 - data.sleep) * 60 * 12); // 12 blinks per minute while awake

    // Money calculations
    const coffeeSpent = totalCoffee * countryInfo.avgCoffeePrice;
    const foodSpent = totalMeals * countryInfo.avgMealPrice;

    return {
        age,
        totalHours,
        sleepHours,
        sleepYears,
        workHours,
        workYearsCalc,
        phoneHours,
        phoneYears,
        toiletHours,
        toiletDays,
        eatingHours,
        eatingYears,
        showerHours,
        showerDays,
        commuteHours,
        commuteYears,
        snsHours,
        snsYears,
        waitingHours,
        waitingDays,
        freeHours,
        freeYears,
        totalCoffee,
        totalMeals,
        totalWater,
        bathtubs,
        totalFood,
        elephants,
        steps,
        earthCircumferences,
        marathons,
        hairLength,
        heartbeats,
        blinks,
        coffeeSpent,
        foodSpent,
        countryInfo
    };
}

function renderReceipt(data) {
    const today = new Date().toISOString().split('T')[0];
    const texts = {
        en: {
            title: 'LIFE RECEIPT',
            subtitle: 'Your Life Receipt',
            customer: 'Customer',
            issued: 'Issued',
            daysLived: 'days lived',
            timeCategory: '【 TIME CONSUMPTION 】',
            totalLife: 'Total Life',
            sleep: 'Sleep',
            work: 'Work/Study',
            smartphone: 'Smartphone',
            toilet: 'Toilet',
            eating: 'Eating',
            commute: 'Commute',
            shower: 'Shower',
            waiting: 'Waiting',
            sns: 'SNS/YouTube',
            freeTime: '★ FREE TIME',
            consumptionCategory: '【 CONSUMPTION 】',
            coffee: 'Coffee',
            meals: 'Meals',
            water: 'Water',
            food: 'Food consumed',
            steps: 'Steps walked',
            hair: 'Hair grown',
            heartbeats: 'Heartbeats',
            blinks: 'Eye blinks',
            moneyCategory: '【 MONEY 】',
            coffeeSpent: 'Coffee spent',
            foodSpent: 'Food spent',
            subtotal: 'Subtotal',
            tax: 'Tax',
            total: 'Total',
            thanks: 'Thank you. Have a great day.',
            continues: 'Your life continues today.',
            hours: 'hours',
            years: 'years',
            days: 'days',
            cups: 'cups',
            items: 'items',
            you: 'You'
        },
        ko: {
            title: 'LIFE RECEIPT',
            subtitle: '당신의 인생 영수증',
            customer: '고객명',
            issued: '발행일',
            daysLived: '일째',
            timeCategory: '【 시간 소비 】',
            totalLife: '총 생존 시간',
            sleep: '수면',
            work: '일/공부',
            smartphone: '스마트폰',
            toilet: '화장실',
            eating: '식사',
            commute: '이동/출퇴근',
            shower: '샤워/목욕',
            waiting: '대기/줄서기',
            sns: 'SNS/유튜브',
            freeTime: '★ 남은 자유시간',
            consumptionCategory: '【 소비량 】',
            coffee: '커피',
            meals: '식사 횟수',
            water: '물',
            food: '음식 무게',
            steps: '걸음 수',
            hair: '머리카락 자란 길이',
            heartbeats: '심장 박동 수',
            blinks: '눈 깜빡임',
            moneyCategory: '【 돈 】',
            coffeeSpent: '커피 지출',
            foodSpent: '식비 총액',
            subtotal: '소계',
            tax: '부가세',
            total: '합계',
            thanks: '감사합니다. 좋은 하루 되세요.',
            continues: '오늘도 당신의 인생은 계속됩니다.',
            hours: '시간',
            years: '년',
            days: '일',
            cups: '잔',
            items: '끼',
            you: '소중한 당신'
        },
        ja: {
            title: 'LIFE RECEIPT',
            subtitle: 'あなたの人生レシート',
            customer: '顧客名',
            issued: '発行日',
            daysLived: '日目',
            timeCategory: '【 時間消費 】',
            totalLife: '総生存時間',
            sleep: '睡眠',
            work: '仕事/勉強',
            smartphone: 'スマートフォン',
            toilet: 'トイレ',
            eating: '食事',
            commute: '通勤/移動',
            shower: 'シャワー/入浴',
            waiting: '待機/行列',
            sns: 'SNS/YouTube',
            freeTime: '★ 自由時間',
            consumptionCategory: '【 消費量 】',
            coffee: 'コーヒー',
            meals: '食事回数',
            water: '水',
            food: '食品重量',
            steps: '歩数',
            hair: '髪の成長',
            heartbeats: '心拍数',
            blinks: '瞬き回数',
            moneyCategory: '【 お金 】',
            coffeeSpent: 'コーヒー支出',
            foodSpent: '食費総額',
            subtotal: '小計',
            tax: '税金',
            total: '合計',
            thanks: 'ありがとうございました。良い一日を。',
            continues: '今日もあなたの人生は続きます。',
            hours: '時間',
            years: '年',
            days: '日',
            cups: '杯',
            items: '回',
            you: 'あなた'
        },
        es: {
            title: 'LIFE RECEIPT',
            subtitle: 'Tu Recibo de Vida',
            customer: 'Cliente',
            issued: 'Fecha de emisión',
            daysLived: 'días vividos',
            timeCategory: '【 CONSUMO DE TIEMPO 】',
            totalLife: 'Tiempo total de vida',
            sleep: 'Sueño',
            work: 'Trabajo/Estudio',
            smartphone: 'Smartphone',
            toilet: 'Baño',
            eating: 'Comiendo',
            commute: 'Desplazamiento',
            shower: 'Ducha',
            waiting: 'Esperando',
            sns: 'SNS/YouTube',
            freeTime: '★ TIEMPO LIBRE',
            consumptionCategory: '【 CONSUMO 】',
            coffee: 'Café',
            meals: 'Comidas',
            water: 'Agua',
            food: 'Alimentos consumidos',
            steps: 'Pasos caminados',
            hair: 'Cabello crecido',
            heartbeats: 'Latidos del corazón',
            blinks: 'Parpadeos',
            moneyCategory: '【 DINERO 】',
            coffeeSpent: 'Gasto en café',
            foodSpent: 'Gasto en comida',
            subtotal: 'Subtotal',
            tax: 'Impuesto',
            total: 'Total',
            thanks: 'Gracias. Que tengas un gran día.',
            continues: 'Tu vida continúa hoy.',
            hours: 'horas',
            years: 'años',
            days: 'días',
            cups: 'tazas',
            items: 'veces',
            you: 'Tú'
        }
    };

    const t = texts[currentLang];

    const receiptHTML = `
        <div class="text-center mb-6">
            <div class="text-4xl font-bold mb-2 tracking-wide">${t.title}</div>
            <div class="text-sm opacity-70">${t.subtitle}</div>
            <div class="mt-3 text-xs opacity-40 tracking-widest">━━━━━━━━━━━━━━━━━━━━</div>
        </div>

        <div class="border-t-2 border-dashed border-gray-400 my-5"></div>

        <div class="text-xs mb-5 leading-relaxed">
            <div class="flex justify-between mb-1">
                <span>${t.customer}:</span>
                <span>${t.you}</span>
            </div>
            <div class="flex justify-between mb-1">
                <span>${t.issued}:</span>
                <span>${today}</span>
            </div>
            <div class="flex justify-between">
                <span>${t.daysLived}:</span>
                <span>${formatNumber(data.age.days)} ${t.days}</span>
            </div>
        </div>

        <div class="border-t-2 border-dashed border-gray-400 my-5"></div>

        <div class="text-center font-bold mb-4 text-base tracking-wide">${t.timeCategory}</div>

        <div class="text-xs space-y-1.5 mb-5 leading-relaxed">
            <div class="flex justify-between">
                <span>${t.totalLife}</span>
                <span>${formatNumber(data.totalHours)} ${t.hours}</span>
            </div>
            <div class="flex justify-between">
                <span>${t.sleep}</span>
                <span>${formatNumber(data.sleepHours)} ${t.hours} (${data.sleepYears.toFixed(1)}${t.years})</span>
            </div>
            <div class="flex justify-between">
                <span>${t.work}</span>
                <span>${formatNumber(data.workHours)} ${t.hours} (${data.workYearsCalc.toFixed(1)}${t.years})</span>
            </div>
            <div class="flex justify-between">
                <span>${t.smartphone}</span>
                <span>${formatNumber(data.phoneHours)} ${t.hours} (${data.phoneYears.toFixed(1)}${t.years})</span>
            </div>
            <div class="flex justify-between">
                <span>${t.toilet}</span>
                <span>${formatNumber(data.toiletHours)} ${t.hours} (${Math.floor(data.toiletDays)}${t.days})</span>
            </div>
            <div class="flex justify-between">
                <span>${t.eating}</span>
                <span>${formatNumber(data.eatingHours)} ${t.hours} (${data.eatingYears.toFixed(1)}${t.years})</span>
            </div>
            <div class="flex justify-between">
                <span>${t.commute}</span>
                <span>${formatNumber(data.commuteHours)} ${t.hours} (${data.commuteYears.toFixed(1)}${t.years})</span>
            </div>
            <div class="flex justify-between">
                <span>${t.shower}</span>
                <span>${formatNumber(data.showerHours)} ${t.hours} (${Math.floor(data.showerDays)}${t.days})</span>
            </div>
            <div class="flex justify-between">
                <span>${t.waiting}</span>
                <span>${formatNumber(data.waitingHours)} ${t.hours} (${Math.floor(data.waitingDays)}${t.days})</span>
            </div>
            <div class="flex justify-between">
                <span>${t.sns}</span>
                <span>${formatNumber(data.snsHours)} ${t.hours} (${data.snsYears.toFixed(1)}${t.years})</span>
            </div>
            <div class="border-t border-gray-400 my-2"></div>
            <div class="flex justify-between font-bold text-blue-600">
                <span>${t.freeTime}</span>
                <span>${formatNumber(data.freeHours)} ${t.hours} (${data.freeYears.toFixed(1)}${t.years})</span>
            </div>
        </div>

        <div class="border-t-2 border-dashed border-gray-400 my-5"></div>

        <div class="text-center font-bold mb-4 text-base tracking-wide">${t.consumptionCategory}</div>

        <div class="text-xs space-y-1.5 mb-5 leading-relaxed">
            <div class="flex justify-between">
                <span>${t.coffee}</span>
                <span>${formatNumber(data.totalCoffee)} ${t.cups}</span>
            </div>
            <div class="flex justify-between">
                <span>${t.meals}</span>
                <span>${formatNumber(data.totalMeals)} ${t.items}</span>
            </div>
            <div class="flex justify-between">
                <span>${t.water}</span>
                <span>${formatNumber(data.totalWater)}L (${currentLang === 'en' ? 'bathtubs' : currentLang === 'ko' ? '욕조' : currentLang === 'ja' ? '浴槽' : 'bañeras'} ${data.bathtubs}${currentLang === 'ko' ? '개' : currentLang === 'ja' ? '杯' : ''})</span>
            </div>
            <div class="flex justify-between">
                <span>${t.food}</span>
                <span>${formatNumber(data.totalFood)}kg (${currentLang === 'en' ? 'elephants' : currentLang === 'ko' ? '코끼리' : currentLang === 'ja' ? '象' : 'elefantes'} ${data.elephants}${currentLang === 'ko' ? '마리' : currentLang === 'ja' ? '頭' : ''})</span>
            </div>
            <div class="flex justify-between">
                <span>${t.steps}</span>
                <span>${formatNumber(data.steps)} (${data.earthCircumferences >= 0.01 ? (currentLang === 'en' ? 'Earth ' + data.earthCircumferences.toFixed(2) + 'x' : currentLang === 'ko' ? '지구 ' + data.earthCircumferences.toFixed(2) + '바퀴' : currentLang === 'ja' ? '地球' + data.earthCircumferences.toFixed(2) + '周' : 'Tierra ' + data.earthCircumferences.toFixed(2) + 'x') : (currentLang === 'en' ? data.marathons + ' marathons' : currentLang === 'ko' ? '마라톤 ' + data.marathons + '회' : currentLang === 'ja' ? 'マラソン' + data.marathons + '回' : data.marathons + ' maratones')})</span>
            </div>
            <div class="flex justify-between">
                <span>${t.hair}</span>
                <span>${data.hairLength.toFixed(1)}m</span>
            </div>
            <div class="flex justify-between">
                <span>${t.heartbeats}</span>
                <span>${formatNumber(data.heartbeats)}${currentLang === 'ko' ? '회' : currentLang === 'ja' ? '回' : ''}</span>
            </div>
            <div class="flex justify-between">
                <span>${t.blinks}</span>
                <span>${formatNumber(data.blinks)}${currentLang === 'ko' ? '회' : currentLang === 'ja' ? '回' : ''}</span>
            </div>
        </div>

        <div class="border-t-2 border-dashed border-gray-400 my-5"></div>

        ${getShockingFact(data)}

        <div class="border-t-2 border-dashed border-gray-400 my-5"></div>

        <div class="text-center font-bold mb-4 text-base tracking-wide">${t.moneyCategory}</div>

        <div class="text-xs space-y-1.5 mb-5 leading-relaxed">
            <div class="flex justify-between">
                <span>${t.coffeeSpent}</span>
                <span>${data.countryInfo.currency}${formatNumber(Math.floor(data.coffeeSpent))}</span>
            </div>
            <div class="flex justify-between">
                <span>${t.foodSpent}</span>
                <span>${data.countryInfo.currency}${formatNumber(Math.floor(data.foodSpent))}</span>
            </div>
        </div>

        <div class="border-t-2 border-dashed border-gray-400 my-5"></div>

        <div class="text-xs space-y-2 mb-5 leading-relaxed">
            <div class="flex justify-between opacity-80">
                <span>${t.subtotal}:</span>
                <span>${{en: 'Your life', ko: '당신의 인생', ja: 'あなたの人生', es: 'Tu vida'}[currentLang]}</span>
            </div>
            <div class="flex justify-between opacity-80">
                <span>${t.tax}:</span>
                <span>${{en: 'Experiences & Memories', ko: '경험과 추억', ja: '経験と思い出', es: 'Experiencias y Recuerdos'}[currentLang]}</span>
            </div>
            <div class="border-t border-gray-400 my-3"></div>
            <div class="flex justify-between font-bold text-lg tracking-wider">
                <span>${t.total}:</span>
                <span class="gradient-text" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">PRICELESS</span>
            </div>
        </div>

        <div class="border-t-2 border-dashed border-gray-400 my-5"></div>

        ${renderTimePieGrid(data)}

        <div class="border-t-2 border-dashed border-gray-400 my-5"></div>

        <div class="text-center text-xs space-y-2 leading-relaxed opacity-70">
            <div>${t.thanks}</div>
            <div>${t.continues}</div>
        </div>

        <div class="mt-6 text-center">
            <svg class="mx-auto" width="200" height="40">
                <rect width="200" height="40" fill="white"/>
                ${generateBarcode()}
            </svg>
        </div>
    `;

    document.getElementById('receipt-container').innerHTML = receiptHTML;
}



function generateBarcode() {
    let bars = '';
    for (let i = 0; i < 40; i++) {
        const height = 30 + Math.random() * 10;
        const width = 3 + Math.random() * 2;
        bars += `<rect x="${i * 5}" y="5" width="${width}" height="${height}" fill="black"/>`;
    }
    return bars;
}

function getShockingFact(data) {
    const facts = [
        {
            condition: () => data.phoneYears > data.eatingYears,
            en: `You spent more time on your phone (${data.phoneYears.toFixed(1)}yr) than eating (${data.eatingYears.toFixed(1)}yr)`,
            ko: `스마트폰 사용시간(${data.phoneYears.toFixed(1)}년)이 식사시간(${data.eatingYears.toFixed(1)}년)보다 많습니다`,
            ja: `スマホ使用時間(${data.phoneYears.toFixed(1)}年)が食事時間(${data.eatingYears.toFixed(1)}年)を上回っています`,
            es: `Pasaste más tiempo en el celular (${data.phoneYears.toFixed(1)}a) que comiendo (${data.eatingYears.toFixed(1)}a)`
        },
        {
            condition: () => data.earthCircumferences >= 1,
            en: `You've walked far enough to circle the Earth ${data.earthCircumferences.toFixed(1)} times`,
            ko: `걸은 거리로 지구를 ${data.earthCircumferences.toFixed(1)}바퀴 돌 수 있습니다`,
            ja: `歩いた距離で地球を${data.earthCircumferences.toFixed(1)}周できます`,
            es: `Has caminado lo suficiente para dar ${data.earthCircumferences.toFixed(1)} vueltas a la Tierra`
        },
        {
            condition: () => data.bathtubs >= 50,
            en: `The water you drank could fill ${formatNumber(data.bathtubs)} bathtubs`,
            ko: `마신 물을 모으면 욕조 ${formatNumber(data.bathtubs)}개를 채울 수 있습니다`,
            ja: `飲んだ水で浴槽${formatNumber(data.bathtubs)}杯分になります`,
            es: `El agua que bebiste llenaría ${formatNumber(data.bathtubs)} bañeras`
        },
        {
            condition: () => data.snsYears >= 0.5,
            en: `You spent ${data.snsYears.toFixed(1)} years scrolling SNS & YouTube`,
            ko: `SNS와 유튜브를 스크롤하며 ${data.snsYears.toFixed(1)}년을 보냈습니다`,
            ja: `SNSとYouTubeのスクロールに${data.snsYears.toFixed(1)}年を費やしました`,
            es: `Pasaste ${data.snsYears.toFixed(1)} años navegando redes sociales y YouTube`
        },
        {
            condition: () => data.totalCoffee >= 1000,
            en: `You've drunk ${formatNumber(data.totalCoffee)} cups of coffee — enough to fill a small pool`,
            ko: `커피 ${formatNumber(data.totalCoffee)}잔을 마셨습니다 — 작은 수영장을 채울 수 있는 양`,
            ja: `コーヒーを${formatNumber(data.totalCoffee)}杯飲みました — 小さなプールが埋まる量`,
            es: `Bebiste ${formatNumber(data.totalCoffee)} tazas de café — suficiente para llenar una piscina pequeña`
        },
        {
            condition: () => data.sleepYears >= 5,
            en: `You've slept for ${data.sleepYears.toFixed(1)} years — that's ${Math.round(data.sleepYears / data.age.years * 100)}% of your life`,
            ko: `${data.sleepYears.toFixed(1)}년을 잠으로 보냈습니다 — 인생의 ${Math.round(data.sleepYears / data.age.years * 100)}%`,
            ja: `${data.sleepYears.toFixed(1)}年を睡眠に費やしました — 人生の${Math.round(data.sleepYears / data.age.years * 100)}%`,
            es: `Dormiste ${data.sleepYears.toFixed(1)} años — eso es el ${Math.round(data.sleepYears / data.age.years * 100)}% de tu vida`
        }
    ];

    const fact = facts.find(f => f.condition());
    if (!fact) return '';

    const text = fact[currentLang] || fact.en;
    return `
        <div style="border: 2px dashed #9ca3af; border-radius: 8px; padding: 12px 16px; text-align: center; margin: 4px 0;">
            <div style="font-size: 11px; font-weight: 700; line-height: 1.5; color: #374151;">
                ${text}
            </div>
        </div>
    `;
}

function renderTimePieGrid(data) {
    const categories = [
        { key: 'sleep', hours: data.sleepHours, color: '#64748b', en: 'Sleep', ko: '수면', ja: '睡眠', es: 'Sueño' },
        { key: 'work', hours: data.workHours, color: '#6b7280', en: 'Work', ko: '일', ja: '仕事', es: 'Trabajo' },
        { key: 'phone', hours: data.phoneHours, color: '#ef4444', en: 'Phone', ko: '폰', ja: 'スマホ', es: 'Celular' },
        { key: 'eating', hours: data.eatingHours, color: '#f97316', en: 'Eating', ko: '식사', ja: '食事', es: 'Comida' },
        { key: 'commute', hours: data.commuteHours, color: '#22c55e', en: 'Commute', ko: '이동', ja: '通勤', es: 'Viaje' },
        { key: 'other', hours: data.toiletHours + data.showerHours + data.waitingHours, color: '#06b6d4', en: 'Other', ko: '기타', ja: 'その他', es: 'Otro' },
        { key: 'free', hours: data.freeHours, color: '#eab308', en: 'Free', ko: '자유', ja: '自由', es: 'Libre' }
    ];

    const total = data.totalHours;
    let cells = [];
    let usedCells = 0;

    for (let i = 0; i < categories.length - 1; i++) {
        const count = Math.round((categories[i].hours / total) * 100);
        categories[i].percent = count;
        for (let j = 0; j < count && usedCells < 100; j++) {
            cells.push(categories[i].color);
            usedCells++;
        }
    }
    // Fill remaining with free time
    const freeCount = 100 - usedCells;
    categories[categories.length - 1].percent = freeCount;
    for (let j = 0; j < freeCount; j++) {
        cells.push(categories[categories.length - 1].color);
    }

    const gridHTML = cells.map(color =>
        `<div style="width: 10%; aspect-ratio: 1; background: ${color}; border-radius: 2px;"></div>`
    ).join('');

    const legendHTML = categories.filter(c => (c.percent || 0) > 0).map(c => {
        const label = c[currentLang] || c.en;
        return `<span style="display: inline-flex; align-items: center; gap: 3px; font-size: 9px; color: #6b7280; margin-right: 6px;">
            <span style="width: 8px; height: 8px; background: ${c.color}; border-radius: 1px; display: inline-block;"></span>
            ${label} ${c.percent || 0}%
        </span>`;
    }).join('');

    return `
        <div style="text-align: center; margin: 4px 0;">
            <div style="font-size: 10px; font-weight: 700; margin-bottom: 8px; color: #374151; letter-spacing: 0.1em;">
                ${{en: '【 YOUR TIME 】', ko: '【 나의 시간 비율 】', ja: '【 時間の割合 】', es: '【 TU TIEMPO 】'}[currentLang]}
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 2px; max-width: 260px; margin: 0 auto;">
                ${gridHTML}
            </div>
            <div style="margin-top: 8px; line-height: 1.8; max-width: 260px; margin-left: auto; margin-right: auto;">
                ${legendHTML}
            </div>
        </div>
    `;
}

// Share and save functions
function saveImage() {
    saveAsImage('receipt-container', 'my-life-receipt.png', '#ffffff');
}

function getReceiptShareText() {
    if (lastReceiptData) {
        const d = lastReceiptData;
        const texts = {
            en: `I drank ${formatNumber(d.totalCoffee)} cups of coffee and spent ${d.phoneYears.toFixed(1)} years on my phone! Get your Life Receipt`,
            ko: `커피 ${formatNumber(d.totalCoffee)}잔을 마셨고 스마트폰에 ${d.phoneYears.toFixed(1)}년을 썼대! 나의 인생 영수증`,
            ja: `コーヒー${formatNumber(d.totalCoffee)}杯飲んで、スマホに${d.phoneYears.toFixed(1)}年費やしてた！人生レシート`,
            es: `¡Bebí ${formatNumber(d.totalCoffee)} cafés y pasé ${d.phoneYears.toFixed(1)} años en el celular! Mi Recibo de Vida`
        };
        return texts[currentLang] || texts.en;
    }
    const texts = {
        en: 'I just created my Life Receipt! Check yours',
        ko: '나의 인생 영수증을 만들어봤어요! 여기서 만들어보세요',
        ja: '人生レシートを作ってみました！あなたも確認してみてください',
        es: '¡Acabo de crear mi Recibo de Vida! Mira el tuyo'
    };
    return texts[currentLang] || texts.en;
}

function shareReceiptToX() { shareToX(getReceiptShareText(), getShareUrl()); }
function shareReceiptToFacebook() { shareToFacebook(getShareUrl()); }
function shareReceiptToThreads() { shareToThreads(getReceiptShareText(), getShareUrl()); }
function shareReceiptToLine() { shareToLine(getReceiptShareText(), getShareUrl()); }
function shareReceiptToKakao() {
    const title = currentLang === 'ko' ? '나의 인생 영수증' : 'My Life Receipt';
    shareToKakao(title, getReceiptShareText(), getShareUrl());
}
function copyLink() { copyLinkShared(); }

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set default coffee value (7 per week = 1 per day)
    updateSliderValue('coffee', '7');
});
