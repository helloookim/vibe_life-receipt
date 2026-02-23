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
 * Set max date for date input to today
 * Prevents selecting future dates
 */
function setMaxDateToToday() {
    const today = new Date().toISOString().split('T')[0];
    const birthdateInputs = document.querySelectorAll('input[type="date"]');
    birthdateInputs.forEach(input => {
        input.setAttribute('max', today);
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

// Initialize on DOM load
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        setMaxDateToToday();
        switchLang('en'); // Default language
    });
}
