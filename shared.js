// Shared utilities for Life Receipt and Lifespan Calculator
// Global state
let currentLang = 'en';

// Country data - shared across services
const COUNTRY_DATA = {
    KR: {
        name: { en: 'South Korea', ko: '대한민국', ja: '韓国', cn: '韩国', es: 'Corea del Sur' },
        currency: '₩',
        avgCoffeePrice: 4500,
        avgMealPrice: 12000,
        avgWalkingSteps: 7000,
        comparisons: {
            water: { en: 'bathtubs', ko: '욕조' },
            food: { en: 'elephants', ko: '코끼리' },
            coffee: { en: 'soju bottles', ko: '소주병' }
        }
    },
    US: {
        name: { en: 'United States', ko: '미국', ja: 'アメリカ', cn: '美国', es: 'Estados Unidos' },
        currency: '$',
        avgCoffeePrice: 4.5,
        avgMealPrice: 15,
        avgWalkingSteps: 5000,
        comparisons: {
            water: { en: 'Olympic pools', ko: '올림픽 수영장' },
            food: { en: 'elephants', ko: '코끼리' },
            coffee: { en: 'Starbucks cups', ko: '스타벅스 컵' }
        }
    },
    JP: {
        name: { en: 'Japan', ko: '일본', ja: '日本', cn: '日本', es: 'Japón' },
        currency: '¥',
        avgCoffeePrice: 450,
        avgMealPrice: 1000,
        avgWalkingSteps: 7500,
        comparisons: {
            water: { en: 'bathtubs', ko: '욕조' },
            food: { en: 'elephants', ko: '코끼리' },
            coffee: { en: 'coffee cans', ko: '커피캔' }
        }
    },
    CN: {
        name: { en: 'China', ko: '중국', ja: '中国', cn: '中国', es: 'China' },
        currency: '¥',
        avgCoffeePrice: 25,
        avgMealPrice: 30,
        avgWalkingSteps: 6000,
        comparisons: {
            water: { en: 'bathtubs', ko: '욕조' },
            food: { en: 'elephants', ko: '코끼리' },
            coffee: { en: 'cups', ko: '컵' }
        }
    },
    UK: {
        name: { en: 'United Kingdom', ko: '영국', ja: 'イギリス', cn: '英国', es: 'Reino Unido' },
        currency: '£',
        avgCoffeePrice: 3.5,
        avgMealPrice: 12,
        avgWalkingSteps: 5500,
        comparisons: {
            water: { en: 'bathtubs', ko: '욕조' },
            food: { en: 'elephants', ko: '코끼리' },
            coffee: { en: 'tea cups', ko: '차 컵' }
        }
    },
    DE: {
        name: { en: 'Germany', ko: '독일', ja: 'ドイツ', cn: '德国', es: 'Alemania' },
        currency: '€',
        avgCoffeePrice: 3.2,
        avgMealPrice: 11,
        avgWalkingSteps: 5800,
        comparisons: {
            water: { en: 'bathtubs', ko: '욕조' },
            food: { en: 'elephants', ko: '코끼리' },
            coffee: { en: 'cups', ko: '컵' }
        }
    },
    FR: {
        name: { en: 'France', ko: '프랑스', ja: 'フランス', cn: '法国', es: 'Francia' },
        currency: '€',
        avgCoffeePrice: 3.8,
        avgMealPrice: 13,
        avgWalkingSteps: 5200,
        comparisons: {
            water: { en: 'bathtubs', ko: '욕조' },
            food: { en: 'elephants', ko: '코끼리' },
            coffee: { en: 'espresso cups', ko: '에스프레소 잔' }
        }
    },
    ES: {
        name: { en: 'Spain', ko: '스페인', ja: 'スペイン', cn: '西班牙', es: 'España' },
        currency: '€',
        avgCoffeePrice: 2.5,
        avgMealPrice: 10,
        avgWalkingSteps: 5500,
        comparisons: {
            water: { en: 'bathtubs', ko: '욕조' },
            food: { en: 'elephants', ko: '코끼리' },
            coffee: { en: 'café con leche', ko: '카페 라떼' }
        }
    },
    BR: {
        name: { en: 'Brazil', ko: '브라질', ja: 'ブラジル', cn: '巴西', es: 'Brasil' },
        currency: 'R$',
        avgCoffeePrice: 5,
        avgMealPrice: 20,
        avgWalkingSteps: 4800,
        comparisons: {
            water: { en: 'bathtubs', ko: '욕조' },
            food: { en: 'elephants', ko: '코끼리' },
            coffee: { en: 'cafezinho', ko: '카페지뉴' }
        }
    },
    IN: {
        name: { en: 'India', ko: '인도', ja: 'インド', cn: '印度', es: 'India' },
        currency: '₹',
        avgCoffeePrice: 150,
        avgMealPrice: 200,
        avgWalkingSteps: 6500,
        comparisons: {
            water: { en: 'bathtubs', ko: '욕조' },
            food: { en: 'elephants', ko: '코끼리' },
            coffee: { en: 'chai cups', ko: '차이 컵' }
        }
    }
};

// Birthdate select configuration
const ASIAN_LANGS = ['ko', 'ja', 'cn'];
const MONTH_NAMES = {
    en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    ko: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    ja: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    cn: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
};
const BIRTHDATE_LABELS = {
    en: { year: 'Year', month: 'Month', day: 'Day' },
    ko: { year: '년', month: '월', day: '일' },
    ja: { year: '年', month: '月', day: '日' },
    cn: { year: '年', month: '月', day: '日' },
    es: { year: 'Año', month: 'Mes', day: 'Día' }
};

// Utility Functions

/**
 * Calculate age from birthdate
 * @param {string} birthdate - Date string in YYYY-MM-DD format
 * @returns {object} - { days: number, years: number }
 */
function calculateAge(birthdate) {
    const today = new Date();
    const birth = new Date(birthdate);
    const ageMs = today - birth;
    const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
    const ageYears = ageDays / 365.25;
    return { days: ageDays, years: ageYears };
}

/**
 * Switch language across the page
 * @param {string} lang - Language code (en, ko, ja, cn, es)
 */
function switchLang(lang) {
    currentLang = lang;

    // Update HTML lang attribute for date picker and browser localization
    document.documentElement.lang = lang;

    // Toggle visibility of language-specific elements
    document.querySelectorAll('.lang-en').forEach(el => el.classList.toggle('hidden', lang !== 'en'));
    document.querySelectorAll('.lang-ko').forEach(el => el.classList.toggle('hidden', lang !== 'ko'));
    document.querySelectorAll('.lang-ja').forEach(el => el.classList.toggle('hidden', lang !== 'ja'));
    document.querySelectorAll('.lang-cn').forEach(el => el.classList.toggle('hidden', lang !== 'cn'));
    document.querySelectorAll('.lang-es').forEach(el => el.classList.toggle('hidden', lang !== 'es'));

    // Highlight active language button
    const enBtn = document.getElementById('lang-en');
    const koBtn = document.getElementById('lang-ko');
    const jaBtn = document.getElementById('lang-ja');
    const cnBtn = document.getElementById('lang-cn');
    const esBtn = document.getElementById('lang-es');

    if (enBtn) enBtn.classList.toggle('lang-switch-active', lang === 'en');
    if (koBtn) koBtn.classList.toggle('lang-switch-active', lang === 'ko');
    if (jaBtn) jaBtn.classList.toggle('lang-switch-active', lang === 'ja');
    if (cnBtn) cnBtn.classList.toggle('lang-switch-active', lang === 'cn');
    if (esBtn) esBtn.classList.toggle('lang-switch-active', lang === 'es');

    // Update birthdate select order and labels
    updateBirthdateOrder(lang);
}

/**
 * Format number with locale-aware thousand separators
 * @param {number} num - Number to format
 * @returns {string} - Formatted number string
 */
function formatNumber(num) {
    return Math.floor(num).toLocaleString();
}

/**
 * Initialize birthdate select dropdowns (Year, Month, Day)
 * Replaces native date input with custom selects for locale-aware ordering
 */
function initBirthdateSelects() {
    const containers = document.querySelectorAll('.birthdate-container');
    if (!containers.length) return;

    const currentYear = new Date().getFullYear();

    containers.forEach(container => {
        const yearSelect = container.querySelector('.birth-year');
        const monthSelect = container.querySelector('.birth-month');
        const daySelect = container.querySelector('.birth-day');
        if (!yearSelect || !monthSelect || !daySelect) return;

        // Populate years
        yearSelect.innerHTML = '<option value="">Year</option>';
        for (let y = currentYear; y >= 1920; y--) {
            yearSelect.innerHTML += `<option value="${y}">${y}</option>`;
        }

        // Populate months (1-12)
        const names = MONTH_NAMES.en;
        monthSelect.innerHTML = '<option value="">Month</option>';
        for (let m = 1; m <= 12; m++) {
            monthSelect.innerHTML += `<option value="${String(m).padStart(2, '0')}">${names[m - 1]}</option>`;
        }

        // Populate days (1-31)
        daySelect.innerHTML = '<option value="">Day</option>';
        for (let d = 1; d <= 31; d++) {
            daySelect.innerHTML += `<option value="${String(d).padStart(2, '0')}">${d}</option>`;
        }

        // Update hidden input on change
        const onChange = () => {
            updateBirthdateDays(container);
            updateBirthdateValue(container);
        };
        yearSelect.addEventListener('change', onChange);
        monthSelect.addEventListener('change', onChange);
        daySelect.addEventListener('change', () => updateBirthdateValue(container));
    });
}

function updateBirthdateDays(container) {
    const yearSelect = container.querySelector('.birth-year');
    const monthSelect = container.querySelector('.birth-month');
    const daySelect = container.querySelector('.birth-day');

    const year = parseInt(yearSelect.value) || 2000;
    const month = parseInt(monthSelect.value) || 1;
    const daysInMonth = new Date(year, month, 0).getDate();

    const currentDay = daySelect.value;
    const lang = currentLang || 'en';
    const labels = BIRTHDATE_LABELS[lang] || BIRTHDATE_LABELS.en;
    daySelect.innerHTML = `<option value="">${labels.day}</option>`;
    for (let d = 1; d <= daysInMonth; d++) {
        const val = String(d).padStart(2, '0');
        daySelect.innerHTML += `<option value="${val}"${val === currentDay ? ' selected' : ''}>${d}</option>`;
    }
}

function updateBirthdateValue(container) {
    const year = container.querySelector('.birth-year').value;
    const month = container.querySelector('.birth-month').value;
    const day = container.querySelector('.birth-day').value;
    const hiddenInput = container.querySelector('.birthdate-hidden');

    if (year && month && day) {
        hiddenInput.value = `${year}-${month}-${day}`;
    } else {
        hiddenInput.value = '';
    }
}

function updateBirthdateOrder(lang) {
    const containers = document.querySelectorAll('.birthdate-container');
    if (!containers.length) return;

    const isAsian = ASIAN_LANGS.includes(lang);
    const labels = BIRTHDATE_LABELS[lang] || BIRTHDATE_LABELS.en;
    const names = MONTH_NAMES[lang] || MONTH_NAMES.en;

    containers.forEach(container => {
        const yearGroup = container.querySelector('.birth-year-group');
        const monthGroup = container.querySelector('.birth-month-group');
        const dayGroup = container.querySelector('.birth-day-group');
        if (!yearGroup || !monthGroup || !dayGroup) return;

        // Reorder: Asian = Y-M-D, others = D-M-Y
        if (isAsian) {
            yearGroup.style.order = '1';
            monthGroup.style.order = '2';
            dayGroup.style.order = '3';
        } else {
            dayGroup.style.order = '1';
            monthGroup.style.order = '2';
            yearGroup.style.order = '3';
        }

        // Update placeholders
        const yearSelect = container.querySelector('.birth-year');
        const monthSelect = container.querySelector('.birth-month');
        const daySelect = container.querySelector('.birth-day');

        yearSelect.options[0].textContent = labels.year;
        daySelect.options[0].textContent = labels.day;
        monthSelect.options[0].textContent = labels.month;

        // Update month option text
        for (let i = 1; i <= 12 && i < monthSelect.options.length; i++) {
            monthSelect.options[i].textContent = names[i - 1];
        }
    });
}

/**
 * Set birthdate from YYYY-MM-DD string (for pre-fill from localStorage)
 */
function setBirthdate(dateStr) {
    if (!dateStr) return;
    const parts = dateStr.split('-');
    if (parts.length !== 3) return;

    const containers = document.querySelectorAll('.birthdate-container');
    containers.forEach(container => {
        const hiddenInput = container.querySelector('.birthdate-hidden');
        hiddenInput.value = dateStr;

        container.querySelector('.birth-year').value = parts[0];
        container.querySelector('.birth-month').value = parts[1];
        container.querySelector('.birth-day').value = parts[2];
    });
}

/**
 * Detect user's likely country from browser locale
 * @returns {string|null} - ISO country code or null
 */
function detectUserCountry() {
    const locale = navigator.language || navigator.userLanguage || '';
    const mapping = {
        'ko': 'KR', 'ko-KR': 'KR',
        'ja': 'JP', 'ja-JP': 'JP',
        'zh': 'CN', 'zh-CN': 'CN', 'zh-TW': 'TW', 'zh-HK': 'HK',
        'en-US': 'US', 'en-GB': 'UK', 'en-AU': 'AU', 'en-CA': 'CA', 'en-NZ': 'NZ', 'en-SG': 'SG',
        'de': 'DE', 'de-DE': 'DE', 'de-AT': 'AT', 'de-CH': 'CH',
        'fr': 'FR', 'fr-FR': 'FR', 'fr-CA': 'CA', 'fr-BE': 'BE', 'fr-CH': 'CH',
        'es': 'ES', 'es-ES': 'ES', 'es-MX': 'MX', 'es-AR': 'AR', 'es-CO': 'CO', 'es-CL': 'CL',
        'pt': 'PT', 'pt-BR': 'BR', 'pt-PT': 'PT',
        'it': 'IT', 'nl': 'NL', 'nl-BE': 'BE',
        'ru': 'RU', 'hi': 'IN', 'th': 'TH', 'vi': 'VN', 'id': 'ID',
        'tr': 'TR', 'ar': 'SA', 'sv': 'SE', 'nb': 'NO', 'da': 'DK', 'fi': 'FI',
        'pl': 'PL', 'cs': 'CZ', 'hu': 'HU', 'ro': 'RO', 'uk': 'UA',
        'ms': 'MY', 'tl': 'PH'
    };

    // Try exact match first, then language prefix
    return mapping[locale] || mapping[locale.split('-')[0]] || null;
}

/**
 * Detect language from URL parameter (?lang=ko) or data attribute
 * @returns {string} - Language code (defaults to 'en')
 */
function getInitialLang() {
    // 1. Check URL parameter: ?lang=ko
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang && ['en', 'ko', 'ja', 'cn', 'es'].includes(urlLang)) {
        return urlLang;
    }

    // 2. Check data-lang attribute on <html> (set by stub pages)
    const htmlLang = document.documentElement.getAttribute('data-default-lang');
    if (htmlLang) {
        return htmlLang;
    }

    // 3. Default to English
    return 'en';
}

// Initialize on DOM load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        initBirthdateSelects();
        switchLang(getInitialLang());
    });
}
