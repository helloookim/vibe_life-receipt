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
        ko: data.incomeUnit > 1 ? `${unitLabel} 단위로 입력하세요` : `${data.currencyCode} 연소득을 입력하세요`
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
        const msg = lang === 'ko' ? '이 국가에는 해당 데이터가 없습니다.' : 'Data not available for this country.';
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

function selectOccupation(value) {
    selectedOccupation = value;
    document.querySelectorAll('.occupation-btn').forEach(btn => {
        btn.classList.remove('border-yellow-400', 'bg-yellow-900', 'bg-opacity-30');
        btn.classList.add('border-gray-600');
    });
    event.currentTarget.classList.remove('border-gray-600');
    event.currentTarget.classList.add('border-yellow-400', 'bg-yellow-900', 'bg-opacity-30');
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
        ko: '먼저 국가를 선택해주세요.'
    };
    alert(msgs[lang] || msgs.en);
}

function validateForm() {
    const country = document.getElementById('country').value;
    const income = document.getElementById('income').value;
    const lang = currentLang || 'en';

    if (!country) {
        const msg = lang === 'ko' ? '국가를 선택해주세요.' : 'Please select a country.';
        alert(msg);
        return false;
    }

    if (!income || parseFloat(income) < 0) {
        const msg = lang === 'ko' ? '소득을 입력해주세요.' : 'Please enter your income.';
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
            dotMapTitle: 'Your position among 100 people',
            comparisonTitle: 'How You Compare',
            insightTitle: 'Perspective',
            shareTitle: 'Share My Rank',
            saveImage: 'Save as Image',
            lifeClockLink: 'Check My Life Clock',
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
            dotMapTitle: '100명 중 당신의 위치',
            comparisonTitle: '순위 비교',
            insightTitle: '한 가지 관점',
            shareTitle: '내 순위 공유하기',
            saveImage: '이미지로 저장',
            lifeClockLink: '생명시계 확인하기',
            lifeReceiptLink: '인생 영수증 보기',
            startOver: '다시 확인하기',
            disclaimer: 'World Bank 2023 데이터 기반 통계적 추정치입니다.',
            householdNote: 'OECD 균등화 소득 기준으로 가구 인원수를 반영했습니다.'
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

        <!-- Dot Map -->
        <div class="mb-12 fade-in" style="animation-delay: 0.3s">
            <h3 class="text-center text-lg font-bold mb-4 text-gray-300">${t.dotMapTitle}</h3>
            ${renderDotMap(r.globalPercentile)}
            <p class="text-center text-sm text-gray-500 mt-2">⭐ = ${lang === 'ko' ? '당신' : 'You'}</p>
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

        <!-- Insight -->
        <div class="mb-12 fade-in" style="animation-delay: 0.9s">
            <h3 class="text-center text-lg font-bold mb-4 text-gray-300">${t.insightTitle}</h3>
            <div class="bg-blue-900 bg-opacity-30 border-l-4 border-yellow-500 rounded-r-xl p-6">
                <p class="text-blue-200 text-lg italic">"${r.insight[lang] || r.insight.en}"</p>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3 fade-in" style="animation-delay: 1.1s">
            <button onclick="shareWealth()" class="w-full btn-gradient-gold text-gray-900 font-bold py-5 rounded-xl text-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105">
                <span class="text-xl">📤</span> ${t.shareTitle}
            </button>
            <button onclick="saveWealthImage()" class="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-3 transition-all border border-gray-600">
                <span class="text-xl">📸</span> ${t.saveImage}
            </button>
            <div class="grid grid-cols-2 gap-3 pt-2">
                <a href="lifespan.html" class="block bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-4 rounded-xl text-center transition-all">
                    <span class="text-lg">⏳</span><br><span class="text-sm">${t.lifeClockLink}</span>
                </a>
                <a href="index.html" class="block bg-gradient-to-r from-pink-700 to-orange-700 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl text-center transition-all">
                    <span class="text-lg">🧾</span><br><span class="text-sm">${t.lifeReceiptLink}</span>
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

function renderDotMap(percentile) {
    const position = Math.min(100, Math.max(1, Math.round(percentile * 100)));
    let html = '<div class="grid grid-cols-10 gap-1.5 max-w-sm mx-auto">';

    for (let i = 1; i <= 100; i++) {
        const isUser = (i === position);
        const isBelowUser = (i < position);
        const delay = i * 15;

        if (isUser) {
            html += `<div class="text-center text-xl dot-appear" style="animation-delay:${delay}ms">⭐</div>`;
        } else if (isBelowUser) {
            html += `<div class="text-center text-lg text-gray-600 dot-appear" style="animation-delay:${delay}ms">👤</div>`;
        } else {
            html += `<div class="text-center text-lg text-blue-400 dot-appear" style="animation-delay:${delay}ms">👤</div>`;
        }
    }

    html += '</div>';
    return html;
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
                <span class="text-gray-300">🌍 ${lang === 'ko' ? '전 세계' : 'Global'}</span>
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

// ==================== SHARING ====================

function shareWealth() {
    const topP = wealthResult.topPercent < 1 ? wealthResult.topPercent.toFixed(2) : wealthResult.topPercent.toFixed(1);
    const lang = currentLang || 'en';

    const shareTexts = {
        en: `I'm in the top ${topP}% globally! Where do you rank among 8 billion people?`,
        ko: `나는 전 세계 상위 ${topP}%래! 80억 명 중 너는 몇 등이야?`
    };

    const text = shareTexts[lang] || shareTexts.en;
    const url = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: lang === 'ko' ? '글로벌 부 순위' : 'Global Wealth Rank',
            text: text,
            url: url
        }).catch(() => copyLink());
    } else {
        copyLink();
    }
}

function copyLink() {
    const lang = currentLang || 'en';
    navigator.clipboard.writeText(window.location.href).then(() => {
        const msg = lang === 'ko' ? '링크가 복사되었습니다!' : 'Link copied to clipboard!';
        alert(msg);
    }).catch(() => {
        const msg = lang === 'ko' ? '링크를 복사할 수 없습니다.' : 'Could not copy link.';
        alert(msg);
    });
}

function saveWealthImage() {
    const lang = currentLang || 'en';
    // Try html2canvas if available
    if (typeof html2canvas !== 'undefined') {
        const el = document.getElementById('result-container');
        html2canvas(el, {
            backgroundColor: '#0a192f',
            scale: 2,
            useCORS: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'my-wealth-rank.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    } else {
        // Fallback: prompt screenshot
        const msgs = {
            en: 'Take a screenshot to save your result!\n\niPhone: Power + Volume Up\nAndroid: Power + Volume Down\nPC: Print Screen or Win+Shift+S',
            ko: '스크린샷을 찍어 결과를 저장하세요!\n\niPhone: 전원 + 볼륨업\nAndroid: 전원 + 볼륨다운\nPC: Print Screen 또는 Win+Shift+S'
        };
        alert(msgs[lang] || msgs.en);
    }
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

    if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1) + ' billion';
    } else if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + ' million';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
}
