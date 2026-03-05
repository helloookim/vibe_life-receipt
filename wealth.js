// Global Wealth Percentile - Main JavaScript

// ==================== GLOBAL STATE ====================
let wealthUserData = {};
let wealthResult = {};
let selectedOccupation = null;
let loadingInterval = null;

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    populateCountryDropdown();
    loadDataFromOtherServices();
    detectCountry();
});

// ==================== LANDING PAGE ====================

function startWealthForm() {
    document.getElementById('landing').classList.add('hidden');
    document.getElementById('form').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==================== FORM HANDLING ====================

function populateCountryDropdown() {
    const select = document.getElementById('country');
    const lang = currentLang || 'en';

    const countries = Object.entries(WEALTH_COUNTRY_DATA)
        .map(([code, data]) => ({
            code,
            name: data.name[lang] || data.name.en
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

    countries.forEach(c => {
        const option = document.createElement('option');
        option.value = c.code;
        option.textContent = c.name;
        select.appendChild(option);
    });
}

function onCountryChange() {
    const code = document.getElementById('country').value;
    const data = WEALTH_COUNTRY_DATA[code];
    if (!data) return;

    // Update currency symbol
    document.getElementById('currency-symbol').textContent = data.currencySymbol;

    // Update placeholder
    const lang = currentLang || 'en';
    const placeholder = data.inputPlaceholder[lang] || data.inputPlaceholder.en;
    document.getElementById('income').placeholder = placeholder;

    // Update unit suffix inside input
    const unitLabel = data.incomeUnitLabel[lang] || data.incomeUnitLabel.en;
    const suffix = document.getElementById('income-unit-suffix');
    if (data.incomeUnit > 1) {
        suffix.textContent = unitLabel;
    } else {
        suffix.textContent = '';
    }

    // Update helper text below input
    const unitText = {
        en: data.incomeUnit > 1 ? `Enter amount in ${unitLabel}` : `Enter annual income in ${data.currencyCode}`,
        ko: data.incomeUnit > 1 ? `${unitLabel} 단위로 입력하세요` : `${data.currencyCode} 연소득을 입력하세요`,
        ja: data.incomeUnit > 1 ? `${unitLabel}単位で入力してください` : `${data.currencyCode}の年収を入力してください`,
        es: data.incomeUnit > 1 ? `Ingrese la cantidad en ${unitLabel}` : `Ingrese el ingreso anual en ${data.currencyCode}`
    };
    document.getElementById('income-unit-label').textContent = unitText[lang] || unitText.en;

    // Clear income field
    document.getElementById('income').value = '';
}

function setPreset(type) {
    const code = document.getElementById('country').value;
    if (!code) {
        showAlert();
        return;
    }
    const data = WEALTH_COUNTRY_DATA[code];
    if (!data) return;

    let value;
    switch (type) {
        case 'minimum':
            value = data.minimumWage / (data.incomeUnit || 1);
            break;
        case 'median':
            value = data.medianIncomeLocal / (data.incomeUnit || 1);
            break;
        case 'top10':
            value = data.top10Local / (data.incomeUnit || 1);
            break;
    }

    if (value === 0) {
        // No minimum wage for this country
        const lang = currentLang || 'en';
        const msgs = {
            en: 'Data not available for this country.',
            ko: '이 국가에는 해당 데이터가 없습니다.',
            ja: 'この国のデータはありません。',
            es: 'Datos no disponibles para este país.'
        };
        const msg = msgs[lang] || msgs.en;
        alert(msg);
        return;
    }

    document.getElementById('income').value = Math.round(value);
}

function toggleOptional() {
    const inputs = document.getElementById('optional-inputs');
    const arrow = document.getElementById('optional-arrow');
    const isHidden = inputs.classList.contains('hidden');

    inputs.classList.toggle('hidden');
    arrow.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
}

function selectOccupation(value, evt) {
    selectedOccupation = value;
    document.querySelectorAll('.occupation-btn').forEach(btn => {
        btn.classList.remove('border-yellow-400', 'bg-yellow-900', 'bg-opacity-30');
        btn.classList.add('border-gray-600');
    });
    const target = evt ? evt.currentTarget : document.querySelector(`[onclick*="selectOccupation('${value}'"]`);
    if (target) {
        target.classList.remove('border-gray-600');
        target.classList.add('border-yellow-400', 'bg-yellow-900', 'bg-opacity-30');
    }
}

function detectCountry() {
    const detected = detectUserCountry();
    if (detected && WEALTH_COUNTRY_DATA[detected]) {
        const select = document.getElementById('country');
        if (!select.value) {
            select.value = detected;
            onCountryChange();
        }
    }
}

// ==================== VALIDATION ====================

function showAlert() {
    const lang = currentLang || 'en';
    const msgs = {
        en: 'Please select a country first.',
        ko: '먼저 국가를 선택해주세요.',
        ja: 'まず国を選択してください。',
        es: 'Por favor, selecciona un país primero.'
    };
    alert(msgs[lang] || msgs.en);
}

function validateForm() {
    const country = document.getElementById('country').value;
    const income = document.getElementById('income').value;
    const lang = currentLang || 'en';

    if (!country) {
        const countryMsgs = {
            en: 'Please select a country.',
            ko: '국가를 선택해주세요.',
            ja: '国を選択してください。',
            es: 'Por favor, selecciona un país.'
        };
        const msg = countryMsgs[lang] || countryMsgs.en;
        alert(msg);
        return false;
    }

    if (!income || parseFloat(income) < 0) {
        const incomeMsgs = {
            en: 'Please enter your income.',
            ko: '소득을 입력해주세요.',
            ja: '収入を入力してください。',
            es: 'Por favor, ingresa tu ingreso.'
        };
        const msg = incomeMsgs[lang] || incomeMsgs.en;
        alert(msg);
        return false;
    }

    return true;
}

// ==================== MATH: ERROR FUNCTION ====================

/**
 * Error function approximation (Abramowitz & Stegun, formula 7.1.26)
 * Max error: ~1.5e-7
 */
function erf(x) {
    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);

    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
}

/**
 * Inverse error function (Winitzki's approximation)
 */
function erfinv(x) {
    const a = 0.147;
    const ln1mx2 = Math.log(1 - x * x);
    const term1 = (2 / (Math.PI * a)) + (ln1mx2 / 2);
    const term2 = ln1mx2 / a;

    const sign = x >= 0 ? 1 : -1;
    return sign * Math.sqrt(Math.sqrt(term1 * term1 - term2) - term1);
}

/**
 * Log-normal CDF: P(X <= x)
 */
function logNormalCDF(x, mu, sigma) {
    if (x <= 0) return 0;
    return 0.5 * (1 + erf((Math.log(x) - mu) / (sigma * Math.SQRT2)));
}

// ==================== CALCULATION ENGINE ====================

/**
 * Calculate global percentile (population-weighted across all countries)
 */
function calculateGlobalPercentile(incomePPP) {
    if (incomePPP <= 0) return 0;

    let totalBelow = 0;
    let totalPop = 0;

    for (const [code, data] of Object.entries(WEALTH_COUNTRY_DATA)) {
        const sigma = Math.SQRT2 * erfinv(data.giniCoefficient);
        const mu = Math.log(data.medianIncome);
        const fractionBelow = logNormalCDF(incomePPP, mu, sigma);
        totalBelow += fractionBelow * data.population;
        totalPop += data.population;
    }

    let percentile = totalBelow / totalPop;

    // Pareto correction for top 1%
    const PARETO_ALPHA = 1.8;
    const PARETO_XMIN = GLOBAL_INCOME_PARAMS.percentileBreakpoints[99];
    if (incomePPP > PARETO_XMIN && percentile > 0.99) {
        const paretoSurvival = Math.pow(PARETO_XMIN / incomePPP, PARETO_ALPHA);
        percentile = 1 - (0.01 * paretoSurvival);
    }

    return Math.min(Math.max(percentile, 0), 0.99999);
}

/**
 * Calculate national percentile for a specific country
 */
function calculateNationalPercentile(incomePPP, countryCode) {
    const data = WEALTH_COUNTRY_DATA[countryCode];
    if (!data || incomePPP <= 0) return 0;

    const sigma = Math.SQRT2 * erfinv(data.giniCoefficient);
    const mu = Math.log(data.medianIncome);

    return Math.min(Math.max(logNormalCDF(incomePPP, mu, sigma), 0), 0.99999);
}

/**
 * Compute all result values (pure function, no DOM)
 */
function computeResults(userData) {
    const { incomePPP, countryCode } = userData;
    const countryData = WEALTH_COUNTRY_DATA[countryCode];
    const worldPop = GLOBAL_INCOME_PARAMS.worldPopulation;

    // Global percentile
    const globalPercentile = calculateGlobalPercentile(incomePPP);
    const richerThan = Math.round(globalPercentile * worldPop);
    const topPercent = (1 - globalPercentile) * 100;

    // National percentile
    const nationalPercentile = calculateNationalPercentile(incomePPP, countryCode);
    const nationalTopPercent = (1 - nationalPercentile) * 100;
    const nationalRicherThan = Math.round(nationalPercentile * countryData.population);

    // Income comparisons
    const incomeVsGlobalMedian = incomePPP / GLOBAL_INCOME_PARAMS.globalMedianIncome;
    const incomeInUSD = userData.incomeLocal / countryData.exchangeRate;

    // Find matching insight
    const insight = findMatchingInsight(globalPercentile);

    return {
        globalPercentile,
        nationalPercentile,
        richerThan,
        topPercent,
        nationalTopPercent,
        nationalRicherThan,
        incomeVsGlobalMedian,
        incomePPP,
        incomeInUSD,
        countryCode,
        insight
    };
}

function findMatchingInsight(percentile) {
    for (const insight of WEALTH_INSIGHTS) {
        if (percentile <= insight.maxPercentile) {
            return insight.text;
        }
    }
    return WEALTH_INSIGHTS[WEALTH_INSIGHTS.length - 1].text;
}

// ==================== MAIN CALCULATION FLOW ====================

function calculateWealth() {
    if (!validateForm()) return;

    const countryCode = document.getElementById('country').value;
    const countryData = WEALTH_COUNTRY_DATA[countryCode];
    const incomeRaw = parseFloat(document.getElementById('income').value);
    const annualIncomeLocal = incomeRaw * (countryData.incomeUnit || 1);

    // Collect user data
    wealthUserData = {
        countryCode,
        incomeLocal: annualIncomeLocal,
        incomePPP: annualIncomeLocal / countryData.pppFactor,
        age: document.getElementById('age')?.value ? parseInt(document.getElementById('age').value) : null,
        householdSize: parseInt(document.getElementById('household')?.value || '1'),
        occupation: selectedOccupation
    };

    // Apply household equivalization
    if (wealthUserData.householdSize > 1) {
        const scale = 1 + 0.5 * (wealthUserData.householdSize - 1);
        wealthUserData.incomePPP = wealthUserData.incomePPP / scale;
    }

    // Show loading
    document.getElementById('form').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');
    document.querySelector('.lang-switcher').classList.add('hidden');
    startLoadingAnimation();

    // Calculate after delay
    setTimeout(() => {
        wealthResult = computeResults(wealthUserData);
        renderResults();

        document.getElementById('loading').classList.add('hidden');
        document.getElementById('result').classList.remove('hidden');
        document.querySelector('.lang-switcher').classList.remove('hidden');

        animatePercentile(wealthResult.globalPercentile * 100);
        saveWealthData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2500);
}

// ==================== LOADING ANIMATION ====================

function startLoadingAnimation() {
    const counterEl = document.getElementById('loading-counter');
    const barEl = document.getElementById('loading-bar');
    const target = GLOBAL_INCOME_PARAMS.worldPopulation;
    let count = 0;
    let progress = 0;

    loadingInterval = setInterval(() => {
        count += Math.floor(Math.random() * 400000000) + 100000000;
        progress += 4;
        if (count >= target) {
            count = target;
            clearInterval(loadingInterval);
        }
        counterEl.textContent = count.toLocaleString();
        barEl.style.width = Math.min(progress, 95) + '%';
    }, 100);
}

// ==================== RESULT RENDERING ====================

function getTexts() {
    return {
        en: {
            youAreRicherThan: 'YOU ARE RICHER THAN',
            ofPeopleWorldwide: 'of people worldwide',
            outOf: 'Out of 8 billion people, you are wealthier than',
            people: 'people',
            andRicherThanYou: 'people are wealthier than you',
            globalRank: 'Global Ranking',
            nationalRank: 'in',
            topGlobal: 'Top',
            globally: 'globally',
            inCountry: 'in',
            yourIncome: 'Your Income',
            timesGlobalMedian: 'times the global median income',
            equivUSD: 'equivalent in USD',
            positionBarTitle: 'Your position in the world',
            positionYou: 'YOU',
            positionPoorest: 'Lower income',
            positionRichest: 'Higher income',
            positionBelowYou: 'earn less than you',
            positionAboveYou: 'earn more than you',
            comparisonTitle: 'How You Compare',
            insightTitle: 'Perspective',
            shareTitle: 'Share My Rank',
            saveImage: 'Save as Image',
            lifeClockLink: 'How Long Will I Live?',
            lifeReceiptLink: 'See My Life Receipt',
            startOver: 'Calculate Again',
            disclaimer: 'Based on World Bank 2023 data. This is a statistical estimate.',
            householdNote: 'Adjusted for household size using OECD equivalence scale.'
        },
        ko: {
            youAreRicherThan: '당신은',
            ofPeopleWorldwide: '보다 부유합니다',
            outOf: '전 세계 80억 명 중',
            people: '명',
            andRicherThanYou: '명이 당신보다 부유합니다',
            globalRank: '전 세계 순위',
            nationalRank: '내 순위',
            topGlobal: '상위',
            globally: '(전 세계)',
            inCountry: '',
            yourIncome: '당신의 소득',
            timesGlobalMedian: '전 세계 중위소득의 배',
            equivUSD: 'USD 환산',
            positionBarTitle: '전 세계에서 당신의 위치',
            positionYou: '당신',
            positionPoorest: '저소득',
            positionRichest: '고소득',
            positionBelowYou: '이 당신보다 적게 벌어요',
            positionAboveYou: '이 당신보다 많이 벌어요',
            comparisonTitle: '순위 비교',
            insightTitle: '한 가지 관점',
            shareTitle: '내 순위 공유하기',
            saveImage: '이미지로 저장',
            lifeClockLink: '나의 남은 수명은?',
            lifeReceiptLink: '인생 영수증 보기',
            startOver: '다시 확인하기',
            disclaimer: 'World Bank 2023 데이터 기반 통계적 추정치입니다.',
            householdNote: 'OECD 균등화 소득 기준으로 가구 인원수를 반영했습니다.'
        },
        ja: {
            youAreRicherThan: 'あなたは',
            ofPeopleWorldwide: 'より裕福です',
            outOf: '世界80億人の中で',
            people: '人',
            andRicherThanYou: '人があなたより裕福です',
            globalRank: '世界ランキング',
            nationalRank: '国内順位',
            topGlobal: '上位',
            globally: '（世界）',
            inCountry: '',
            yourIncome: 'あなたの収入',
            timesGlobalMedian: '世界の中央値所得の倍',
            equivUSD: 'USD換算',
            positionBarTitle: '世界でのあなたの位置',
            positionYou: 'あなた',
            positionPoorest: '低所得',
            positionRichest: '高所得',
            positionBelowYou: 'があなたより少ない',
            positionAboveYou: 'があなたより多い',
            comparisonTitle: '順位比較',
            insightTitle: 'ひとつの視点',
            shareTitle: '順位をシェア',
            saveImage: '画像として保存',
            lifeClockLink: 'あと何年生きられる？',
            lifeReceiptLink: 'ライフレシートを見る',
            startOver: 'もう一度確認する',
            disclaimer: '世界銀行2023年データに基づく統計的推定値です。',
            householdNote: 'OECD等価尺度に基づき世帯人数を調整しています。'
        },
        es: {
            youAreRicherThan: 'ERES MÁS RICO QUE',
            ofPeopleWorldwide: 'de las personas en el mundo',
            outOf: 'De 8 mil millones de personas, eres más rico que',
            people: 'personas',
            andRicherThanYou: 'personas son más ricas que tú',
            globalRank: 'Ranking Global',
            nationalRank: 'en',
            topGlobal: 'Top',
            globally: 'globalmente',
            inCountry: 'en',
            yourIncome: 'Tu Ingreso',
            timesGlobalMedian: 'veces el ingreso medio global',
            equivUSD: 'equivalente en USD',
            positionBarTitle: 'Tu posición en el mundo',
            positionYou: 'TÚ',
            positionPoorest: 'Menor ingreso',
            positionRichest: 'Mayor ingreso',
            positionBelowYou: 'ganan menos que tú',
            positionAboveYou: 'ganan más que tú',
            comparisonTitle: 'Comparación',
            insightTitle: 'Perspectiva',
            shareTitle: 'Compartir Mi Ranking',
            saveImage: 'Guardar como Imagen',
            lifeClockLink: '¿Cuánto me queda de vida?',
            lifeReceiptLink: 'Ver Mi Recibo de Vida',
            startOver: 'Calcular de Nuevo',
            disclaimer: 'Basado en datos del Banco Mundial 2023. Esta es una estimación estadística.',
            householdNote: 'Ajustado por tamaño del hogar usando la escala de equivalencia OCDE.'
        }
    };
}

function renderResults() {
    const container = document.getElementById('result-container');
    const r = wealthResult;
    const lang = currentLang || 'en';
    const t = getTexts()[lang] || getTexts().en;
    const countryData = WEALTH_COUNTRY_DATA[r.countryCode];
    const countryName = countryData.name[lang] || countryData.name.en;

    const topPercentFormatted = r.topPercent < 1 ? r.topPercent.toFixed(2) : r.topPercent.toFixed(1);
    const nationalTopFormatted = r.nationalTopPercent < 1 ? r.nationalTopPercent.toFixed(2) : r.nationalTopPercent.toFixed(1);
    const richerThanFormatted = formatLargeNumber(r.richerThan, lang);
    const richerThanYouFormatted = formatLargeNumber(GLOBAL_INCOME_PARAMS.worldPopulation - r.richerThan, lang);
    const nationalRicherFormatted = formatLargeNumber(r.nationalRicherThan, lang);

    container.innerHTML = `
        <!-- Hero: Big Percentile -->
        <div class="text-center mb-12 fade-in">
            <p class="text-xl text-blue-300 mb-2 font-semibold">${t.youAreRicherThan}</p>
            <div class="mb-4">
                <span id="percentile-number" class="text-8xl md:text-9xl font-black wealth-gold-pulse mono-font">0.0%</span>
            </div>
            <p class="text-xl text-blue-300 font-semibold">${t.ofPeopleWorldwide}</p>
            <div class="mt-4 text-gray-400">
                <p>${t.outOf} <span class="text-white font-bold">${richerThanFormatted}</span> ${t.people}</p>
                <p class="text-sm mt-1"><span class="text-yellow-400">${richerThanYouFormatted}</span> ${t.andRicherThanYou}</p>
            </div>
            ${wealthUserData.householdSize > 1 ? `<p class="text-xs text-gray-500 mt-2">${t.householdNote}</p>` : ''}
        </div>

        <!-- Position Bar -->
        <div class="mb-12 fade-in" style="animation-delay: 0.3s">
            <h3 class="text-center text-lg font-bold mb-4 text-gray-300">${t.positionBarTitle}</h3>
            ${renderPositionBar(r.globalPercentile, richerThanFormatted, richerThanYouFormatted, t)}
        </div>

        <!-- Comparison Bars -->
        <div class="mb-12 fade-in" style="animation-delay: 0.5s">
            <h3 class="text-center text-lg font-bold mb-6 text-gray-300">${t.comparisonTitle}</h3>
            ${renderComparisonBars(r, countryName, t, lang)}
        </div>

        <!-- Income Stats -->
        <div class="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4 fade-in" style="animation-delay: 0.7s">
            <div class="bg-gray-800 bg-opacity-60 rounded-xl p-6 border border-gray-700 text-center">
                <div class="text-3xl font-bold text-yellow-400 mb-1">${r.incomeVsGlobalMedian.toFixed(1)}x</div>
                <div class="text-sm text-gray-400">${t.timesGlobalMedian}</div>
            </div>
            <div class="bg-gray-800 bg-opacity-60 rounded-xl p-6 border border-gray-700 text-center">
                <div class="text-3xl font-bold text-green-400 mb-1">$${formatNumber(Math.round(r.incomeInUSD))}</div>
                <div class="text-sm text-gray-400">${t.equivUSD}</div>
            </div>
        </div>

        <!-- What Your Income Buys -->
        <div class="mb-12 fade-in" style="animation-delay: 0.8s">
            <h3 class="text-center text-lg font-bold mb-4 text-gray-300">
                <span class="lang-en">What Your Income Could Buy</span>
                <span class="lang-ko hidden">당신의 연소득으로 살 수 있는 것</span>
                <span class="lang-ja hidden">あなたの年収で買えるもの</span>
                <span class="lang-es hidden">Lo Que Tu Ingreso Podría Comprar</span>
            </h3>
            ${renderIncomeBuysGrid(r.incomeInUSD, lang)}
        </div>

        <!-- Insight -->
        <div class="mb-12 fade-in" style="animation-delay: 0.9s">
            <h3 class="text-center text-lg font-bold mb-4 text-gray-300">${t.insightTitle}</h3>
            ${renderHistoricalComparison(r.incomeInUSD, lang)}
            <div class="bg-blue-900 bg-opacity-30 border-l-4 border-yellow-500 rounded-r-xl p-6 mt-3">
                <p class="text-blue-200 text-lg italic">"${r.insight[lang] || r.insight.en}"</p>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3 fade-in" style="animation-delay: 1.1s">
            <button onclick="saveWealthImage()" class="w-full btn-gradient-gold text-gray-900 font-bold py-5 rounded-xl text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105">
                <span class="text-xl">📸</span> ${t.saveImage}
            </button>

            <!-- Share Buttons Grid -->
            <div class="grid grid-cols-3 gap-2">
                <button onclick="shareWealthToX()" class="flex items-center justify-center gap-1.5 py-3 bg-black text-white rounded-xl hover:opacity-80 transition-all text-sm font-medium">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    X
                </button>
                <button onclick="shareWealthToFacebook()" class="flex items-center justify-center gap-1.5 py-3 text-white rounded-xl hover:opacity-80 transition-all text-sm font-medium" style="background:#1877F2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                </button>
                <button onclick="shareWealthToThreads()" class="flex items-center justify-center gap-1.5 py-3 bg-black text-white rounded-xl hover:opacity-80 transition-all text-sm font-medium">
                    Threads
                </button>
                <button onclick="shareWealthToKakao()" class="share-ko-only hidden flex items-center justify-center gap-1.5 py-3 rounded-xl hover:opacity-80 transition-all text-sm font-bold text-gray-900" style="background:#FEE500">
                    KakaoTalk
                </button>
                <button onclick="shareWealthToLine()" class="share-asian hidden flex items-center justify-center gap-1.5 py-3 rounded-xl hover:opacity-80 transition-all text-sm font-bold text-white" style="background:#06C755">
                    LINE
                </button>
                <button onclick="copyLink()" class="flex items-center justify-center gap-1.5 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition-all text-sm font-medium">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                    <span class="lang-en">Copy</span>
                    <span class="lang-ko hidden">복사</span>
                    <span class="lang-ja hidden">コピー</span>
                    <span class="lang-es hidden">Copiar</span>
                </button>
            </div>

            <div class="grid grid-cols-3 gap-3 pt-2">
                <a href="blog/how-wealth-percentile-works.html" class="group block bg-blue-900 bg-opacity-30 border-2 border-blue-500 border-opacity-30 hover:border-yellow-500 hover:border-opacity-60 rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1">
                    <div class="text-2xl mb-1">📊</div>
                    <div class="font-bold text-gray-200 text-sm">${{en:'How It Works',ko:'계산 원리',ja:'計算の仕組み',es:'Cómo Funciona'}[currentLang]}</div>
                    <div class="text-gray-600 group-hover:text-yellow-400 text-xs mt-1 transition-colors">→</div>
                </a>
                <a href="lifespan.html" class="group block bg-blue-900 bg-opacity-30 border-2 border-blue-500 border-opacity-30 hover:border-yellow-500 hover:border-opacity-60 rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1">
                    <div class="text-2xl mb-1">⏳</div>
                    <div class="font-bold text-gray-200 text-sm">${t.lifeClockLink}</div>
                    <div class="text-gray-600 group-hover:text-yellow-400 text-xs mt-1 transition-colors">→</div>
                </a>
                <a href="index.html" class="group block bg-blue-900 bg-opacity-30 border-2 border-blue-500 border-opacity-30 hover:border-yellow-500 hover:border-opacity-60 rounded-2xl p-4 text-center transition-all duration-300 hover:-translate-y-1">
                    <div class="text-2xl mb-1">🧾</div>
                    <div class="font-bold text-gray-200 text-sm">${t.lifeReceiptLink}</div>
                    <div class="text-gray-600 group-hover:text-yellow-400 text-xs mt-1 transition-colors">→</div>
                </a>
            </div>
            <button onclick="startOver()" class="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium py-3 rounded-xl text-sm transition-all border border-gray-700 mt-2">
                🔄 ${t.startOver}
            </button>
        </div>

        <!-- Disclaimer -->
        <div class="mt-8 text-center text-xs text-gray-600">
            <p>${t.disclaimer}</p>
            <p class="mt-1">Data: World Bank PIP, OECD, UBS (${GLOBAL_INCOME_PARAMS.dataYear})</p>
        </div>
    `;

    // Re-apply language visibility after dynamic render
    switchLang(currentLang);
}

// ==================== VISUALIZATIONS ====================

function renderPositionBar(percentile, belowFormatted, aboveFormatted, t) {
    const pct = Math.min(99, Math.max(1, Math.round(percentile * 100)));

    // Crowd of people on each side (proportional count)
    const leftCount = Math.round(pct / 10);
    const rightCount = Math.round((100 - pct) / 10);
    const leftPeople = '👤'.repeat(Math.max(1, leftCount));
    const rightPeople = '👤'.repeat(Math.max(1, rightCount));

    return `
    <div class="max-w-xl mx-auto">
        <!-- People row with marker -->
        <div class="relative mb-2" style="height: 60px">
            <!-- Left crowd -->
            <div class="absolute left-0 bottom-0 text-gray-600 text-sm tracking-tight overflow-hidden whitespace-nowrap" style="width: ${Math.max(pct - 3, 0)}%">
                ${leftPeople}
            </div>
            <!-- User marker -->
            <div class="absolute bottom-0 flex flex-col items-center" style="left: ${pct}%; transform: translateX(-50%)">
                <span class="text-xs font-bold text-yellow-400 mb-0.5">${t.positionYou}</span>
                <span class="text-2xl">⭐</span>
            </div>
            <!-- Right crowd -->
            <div class="absolute right-0 bottom-0 text-blue-400 text-sm tracking-tight overflow-hidden whitespace-nowrap text-right" style="width: ${Math.max(97 - pct, 0)}%">
                ${rightPeople}
            </div>
        </div>

        <!-- Bar -->
        <div class="relative w-full h-4 rounded-full overflow-hidden bg-gray-700">
            <div class="absolute inset-0 rounded-full" style="background: linear-gradient(to right, #374151, #1e3a5f, #2563eb, #fbbf24, #ffd700)"></div>
            <!-- Position marker line -->
            <div class="absolute top-0 bottom-0 w-0.5 bg-white" style="left: ${pct}%; box-shadow: 0 0 6px rgba(255,255,255,0.8)"></div>
        </div>

        <!-- Labels -->
        <div class="flex justify-between mt-2 text-xs text-gray-500">
            <span>${t.positionPoorest}</span>
            <span>${t.positionRichest}</span>
        </div>

        <!-- Population counts -->
        <div class="flex justify-between mt-3 text-sm">
            <div class="text-gray-400">
                <span class="text-gray-300 font-semibold">${belowFormatted}</span> ${t.positionBelowYou}
            </div>
            <div class="text-blue-300 text-right">
                <span class="text-blue-200 font-semibold">${aboveFormatted}</span> ${t.positionAboveYou}
            </div>
        </div>
    </div>
    `;
}

function renderComparisonBars(result, countryName, t, lang) {
    const globalWidth = Math.round(result.globalPercentile * 100);
    const nationalWidth = Math.round(result.nationalPercentile * 100);
    const topG = result.topPercent < 1 ? result.topPercent.toFixed(2) : result.topPercent.toFixed(1);
    const topN = result.nationalTopPercent < 1 ? result.nationalTopPercent.toFixed(2) : result.nationalTopPercent.toFixed(1);

    return `
    <div class="space-y-6 max-w-xl mx-auto">
        <div>
            <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-300">🌍 ${{en:'Global',ko:'전 세계',ja:'世界',es:'Global'}[lang] || 'Global'}</span>
                <span class="text-yellow-400 font-bold">${t.topGlobal} ${topG}%</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-7 overflow-hidden">
                <div class="h-7 bar-gradient-gold rounded-full transition-all duration-1000 flex items-center justify-end pr-2" style="width:${globalWidth}%">
                    <span class="text-xs font-bold text-gray-900">${globalWidth}%</span>
                </div>
            </div>
        </div>
        <div>
            <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-300">🏠 ${countryName}</span>
                <span class="text-blue-400 font-bold">${t.topGlobal} ${topN}%</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-7 overflow-hidden">
                <div class="h-7 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 flex items-center justify-end pr-2" style="width:${nationalWidth}%">
                    <span class="text-xs font-bold text-white">${nationalWidth}%</span>
                </div>
            </div>
        </div>
    </div>
    `;
}

// ==================== ANIMATIONS ====================

function animatePercentile(target) {
    const el = document.getElementById('percentile-number');
    if (!el) return;

    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        el.textContent = current.toFixed(1) + '%';

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ==================== VIRAL CONTENT ====================

function renderIncomeBuysGrid(incomeUSD, lang) {
    const items = [
        { emoji: '🍔', costUSD: 5.15, en: 'Big Macs', ko: '빅맥', ja: 'ビッグマック', es: 'Big Macs' },
        { emoji: '📱', costUSD: 1199, en: 'iPhones', ko: '아이폰', ja: 'iPhone', es: 'iPhones' },
        { emoji: '✈️', costUSD: 3000, en: 'Round-the-world flights', ko: '세계일주 항공권', ja: '世界一周航空券', es: 'Vuelos al mundo' },
        { emoji: '🚗', costUSD: 35000, en: 'Tesla Model 3s', ko: '테슬라 Model 3', ja: 'テスラ Model 3', es: 'Tesla Model 3' },
        { emoji: '🎓', costUSD: 200, en: 'Years of education (developing countries)', ko: '개도국 교육 1년분', ja: '途上国の教育年数', es: 'Años de educación' },
        { emoji: '🎬', costUSD: 180, en: 'Years of Netflix', ko: '넷플릭스 구독 연수', ja: 'Netflix年数', es: 'Años de Netflix' }
    ];

    const cards = items.map(item => {
        const count = Math.floor(incomeUSD / item.costUSD);
        if (count < 1) return '';
        const label = item[lang] || item.en;
        return `
            <div class="bg-gray-800 bg-opacity-50 rounded-xl p-4 border border-gray-700 text-center">
                <div class="text-2xl mb-1">${item.emoji}</div>
                <div class="text-xl font-bold text-yellow-400">${formatNumber(count)}</div>
                <div class="text-xs text-gray-400 mt-1">${label}</div>
            </div>
        `;
    }).filter(c => c).slice(0, 6);

    return `<div class="grid grid-cols-3 gap-3 max-w-xl mx-auto">${cards.join('')}</div>`;
}

function renderHistoricalComparison(incomeUSD, lang) {
    const comparisons = [
        { minUSD: 75000,
            en: 'You earn more than 99% of all humans who have ever lived.',
            ko: '역사상 존재한 인류의 99%보다 많이 벌고 있습니다.',
            ja: '歴史上存在した人類の99%より多く稼いでいます。',
            es: 'Ganas más que el 99% de todos los humanos que han existido.' },
        { minUSD: 30000,
            en: 'You have more purchasing power than a medieval European king.',
            ko: '중세 유럽 왕의 구매력보다 당신이 더 높습니다.',
            ja: '中世ヨーロッパの王より購買力が高いです。',
            es: 'Tienes más poder adquisitivo que un rey medieval europeo.' },
        { minUSD: 5000,
            en: 'Your daily income exceeds what a Roman citizen earned in a week.',
            ko: '당신의 하루 소득은 로마 시민의 일주일 소득을 넘습니다.',
            ja: 'あなたの日収はローマ市民の週収を超えています。',
            es: 'Tu ingreso diario supera lo que un romano ganaba en una semana.' },
        { minUSD: 500,
            en: 'You earn more per year than 90% of humans who ever lived.',
            ko: '역사상 90%의 인류보다 연소득이 높습니다.',
            ja: '歴史上90%の人類より年収が高いです。',
            es: 'Ganas más al año que el 90% de los humanos que han existido.' }
    ];

    const match = comparisons.find(c => incomeUSD >= c.minUSD);
    if (!match) return '';

    const text = match[lang] || match.en;
    return `
        <div class="bg-yellow-900 bg-opacity-20 border border-yellow-600 border-opacity-40 rounded-xl p-5 text-center mb-3">
            <p class="text-yellow-200 text-base font-semibold">${text}</p>
        </div>
    `;
}

// ==================== SHARING ====================

function getWealthShareText() {
    const topP = wealthResult.topPercent < 1 ? wealthResult.topPercent.toFixed(2) : wealthResult.topPercent.toFixed(1);
    const richerFormatted = formatLargeNumber(wealthResult.richerThan, currentLang);
    const texts = {
        en: `I'm richer than ${richerFormatted} people on Earth (top ${topP}%). How about you?`,
        ko: `지구에서 ${richerFormatted}보다 부유하대 (상위 ${topP}%). 너는?`,
        ja: `地球上の${richerFormatted}人より裕福だって（上位${topP}%）。あなたは？`,
        es: `Soy más rico que ${richerFormatted} personas en la Tierra (top ${topP}%). ¿Y tú?`
    };
    return texts[currentLang] || texts.en;
}

function shareWealthToX() { shareToX(getWealthShareText(), getShareUrl('/wealth.html')); }
function shareWealthToFacebook() { shareToFacebook(getShareUrl('/wealth.html')); }
function shareWealthToThreads() { shareToThreads(getWealthShareText(), getShareUrl('/wealth.html')); }
function shareWealthToLine() { shareToLine(getWealthShareText(), getShareUrl('/wealth.html')); }
function shareWealthToKakao() {
    const titles = {en:'Global Wealth Rank', ko:'글로벌 부 순위', ja:'グローバル資産ランキング', es:'Ranking de Riqueza Global'};
    const title = titles[currentLang] || titles.en;
    shareToKakao(title, getWealthShareText(), getShareUrl('/wealth.html'));
}
function copyLink() { copyLinkShared(); }

function saveWealthImage() {
    saveAsImage('result-container', 'my-wealth-rank.png', '#0a192f');
}

// ==================== CROSS-SERVICE INTEGRATION ====================

function saveWealthData() {
    try {
        const data = {
            countryCode: wealthUserData.countryCode,
            globalPercentile: wealthResult.globalPercentile,
            topPercent: wealthResult.topPercent,
            timestamp: Date.now()
        };
        localStorage.setItem('wealthData', JSON.stringify(data));
    } catch (e) {
        // localStorage not available
    }
}

function loadDataFromOtherServices() {
    try {
        // Try lifespan data
        const lifespanData = localStorage.getItem('lifespanData');
        if (lifespanData) {
            const data = JSON.parse(lifespanData);
            if (data.country && WEALTH_COUNTRY_DATA[data.country]) {
                document.getElementById('country').value = data.country;
                onCountryChange();
                return;
            }
        }

        // Try life receipt data
        const receiptData = localStorage.getItem('lifeReceiptData');
        if (receiptData) {
            const data = JSON.parse(receiptData);
            if (data.country && WEALTH_COUNTRY_DATA[data.country]) {
                document.getElementById('country').value = data.country;
                onCountryChange();
            }
        }
    } catch (e) {
        // localStorage not available
    }
}

// ==================== UTILITIES ====================

function startOver() {
    if (loadingInterval) {
        clearInterval(loadingInterval);
    }

    document.getElementById('result').classList.add('hidden');
    document.getElementById('landing').classList.remove('hidden');
    document.querySelector('.lang-switcher').classList.remove('hidden');

    // Reset form
    document.getElementById('income').value = '';
    selectedOccupation = null;
    document.querySelectorAll('.occupation-btn').forEach(btn => {
        btn.classList.remove('border-yellow-400', 'bg-yellow-900', 'bg-opacity-30');
        btn.classList.add('border-gray-600');
    });

    wealthUserData = {};
    wealthResult = {};

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function formatLargeNumber(num, lang) {
    lang = lang || 'en';

    if (lang === 'ko') {
        if (num >= 100000000) {
            return (num / 100000000).toFixed(1) + '억';
        } else if (num >= 10000) {
            return Math.round(num / 10000).toLocaleString() + '만';
        }
        return num.toLocaleString();
    }

    if (lang === 'ja') {
        if (num >= 100000000) {
            return (num / 100000000).toFixed(1) + '億';
        } else if (num >= 10000) {
            return Math.round(num / 10000).toLocaleString() + '万';
        }
        return num.toLocaleString();
    }

    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + ' billion';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + ' million';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
}
