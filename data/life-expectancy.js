/**
 * WHO 2023 Life Expectancy Data
 * Source: WHO Global Health Observatory (GHO) - Life expectancy at birth
 * Data represents life expectancy at birth by country and gender
 * Values are in years
 */

const LIFE_EXPECTANCY_DATA = {
    // East Asia & Pacific
    KR: { male: 80.5, female: 86.5 },  // South Korea
    JP: { male: 81.5, female: 87.6 },  // Japan
    CN: { male: 75.4, female: 80.5 },  // China
    HK: { male: 82.9, female: 88.1 },  // Hong Kong
    SG: { male: 81.7, female: 86.1 },  // Singapore
    TW: { male: 78.1, female: 84.7 },  // Taiwan
    AU: { male: 81.3, female: 85.4 },  // Australia
    NZ: { male: 80.5, female: 84.0 },  // New Zealand
    MY: { male: 74.5, female: 79.0 },  // Malaysia
    TH: { male: 74.6, female: 81.0 },  // Thailand
    VN: { male: 71.7, female: 80.5 },  // Vietnam
    ID: { male: 69.4, female: 73.7 },  // Indonesia
    PH: { male: 68.3, female: 75.8 },  // Philippines
    MM: { male: 65.1, female: 70.9 },  // Myanmar
    KH: { male: 67.6, female: 72.4 },  // Cambodia
    LA: { male: 66.6, female: 70.0 },  // Laos
    MN: { male: 66.7, female: 76.0 },  // Mongolia

    // North America
    US: { male: 74.8, female: 80.2 },  // United States
    CA: { male: 80.0, female: 84.1 },  // Canada
    MX: { male: 72.4, female: 78.1 },  // Mexico

    // South America
    BR: { male: 72.0, female: 79.4 },  // Brazil
    AR: { male: 73.3, female: 80.2 },  // Argentina
    CL: { male: 77.6, female: 83.2 },  // Chile
    CO: { male: 73.8, female: 79.7 },  // Colombia
    PE: { male: 74.2, female: 79.6 },  // Peru
    VE: { male: 70.5, female: 77.8 },  // Venezuela
    EC: { male: 74.6, female: 80.3 },  // Ecuador
    BO: { male: 68.8, female: 74.3 },  // Bolivia
    PY: { male: 71.7, female: 75.9 },  // Paraguay
    UY: { male: 74.2, female: 81.1 },  // Uruguay

    // Western Europe
    UK: { male: 79.0, female: 82.9 },  // United Kingdom
    DE: { male: 78.5, female: 83.4 },  // Germany
    FR: { male: 79.8, female: 85.9 },  // France
    ES: { male: 80.7, female: 86.2 },  // Spain
    IT: { male: 81.2, female: 85.3 },  // Italy
    NL: { male: 80.1, female: 83.2 },  // Netherlands
    BE: { male: 79.4, female: 84.0 },  // Belgium
    CH: { male: 81.8, female: 85.7 },  // Switzerland
    AT: { male: 79.3, female: 84.1 },  // Austria
    SE: { male: 81.0, female: 84.7 },  // Sweden
    NO: { male: 81.1, female: 84.6 },  // Norway
    DK: { male: 79.4, female: 83.3 },  // Denmark
    FI: { male: 79.1, female: 84.6 },  // Finland
    IE: { male: 80.3, female: 84.0 },  // Ireland
    PT: { male: 78.8, female: 84.4 },  // Portugal
    GR: { male: 78.7, female: 83.9 },  // Greece
    IS: { male: 81.3, female: 84.4 },  // Iceland
    LU: { male: 80.3, female: 84.6 },  // Luxembourg

    // Eastern Europe
    RU: { male: 68.2, female: 78.0 },  // Russia
    PL: { male: 74.1, female: 82.1 },  // Poland
    CZ: { male: 76.1, female: 82.1 },  // Czech Republic
    RO: { male: 71.7, female: 79.1 },  // Romania
    HU: { male: 73.2, female: 79.8 },  // Hungary
    BG: { male: 71.5, female: 78.5 },  // Bulgaria
    SK: { male: 73.8, female: 80.9 },  // Slovakia
    HR: { male: 75.4, female: 81.4 },  // Croatia
    SI: { male: 78.8, female: 84.3 },  // Slovenia
    EE: { male: 74.4, female: 83.0 },  // Estonia
    LV: { male: 70.9, female: 80.1 },  // Latvia
    LT: { male: 71.9, female: 81.7 },  // Lithuania
    UA: { male: 67.0, female: 77.0 },  // Ukraine
    BY: { male: 69.6, female: 79.5 },  // Belarus

    // Middle East
    IL: { male: 80.7, female: 84.7 },  // Israel
    AE: { male: 78.3, female: 80.7 },  // UAE
    SA: { male: 73.9, female: 76.9 },  // Saudi Arabia
    TR: { male: 75.6, female: 81.1 },  // Turkey
    IR: { male: 75.5, female: 78.3 },  // Iran
    IQ: { male: 68.6, female: 72.4 },  // Iraq
    JO: { male: 73.2, female: 76.4 },  // Jordan
    LB: { male: 77.2, female: 81.1 },  // Lebanon
    KW: { male: 74.6, female: 76.6 },  // Kuwait
    QA: { male: 78.5, female: 80.4 },  // Qatar
    BH: { male: 76.4, female: 78.7 },  // Bahrain
    OM: { male: 76.0, female: 79.2 },  // Oman
    SY: { male: 70.9, female: 76.1 },  // Syria
    YE: { male: 64.9, female: 67.9 },  // Yemen

    // South Asia
    IN: { male: 69.5, female: 72.2 },  // India
    PK: { male: 66.1, female: 68.8 },  // Pakistan
    BD: { male: 71.9, female: 75.1 },  // Bangladesh
    LK: { male: 73.1, female: 80.0 },  // Sri Lanka
    NP: { male: 69.6, female: 71.9 },  // Nepal
    BT: { male: 70.9, female: 71.9 },  // Bhutan
    MV: { male: 77.5, female: 80.2 },  // Maldives
    AF: { male: 62.6, female: 65.3 },  // Afghanistan

    // Central Asia
    KZ: { male: 70.3, female: 78.7 },  // Kazakhstan
    UZ: { male: 71.2, female: 75.7 },  // Uzbekistan
    TM: { male: 65.9, female: 72.4 },  // Turkmenistan
    KG: { male: 68.3, female: 76.4 },  // Kyrgyzstan
    TJ: { male: 69.4, female: 73.9 },  // Tajikistan

    // Africa - North
    EG: { male: 70.2, female: 74.1 },  // Egypt
    DZ: { male: 75.9, female: 78.3 },  // Algeria
    MA: { male: 75.5, female: 78.3 },  // Morocco
    TN: { male: 75.3, female: 79.0 },  // Tunisia
    LY: { male: 70.8, female: 75.5 },  // Libya
    SD: { male: 63.7, female: 67.5 },  // Sudan

    // Africa - Sub-Saharan
    ZA: { male: 62.3, female: 68.5 },  // South Africa
    NG: { male: 53.1, female: 55.0 },  // Nigeria
    ET: { male: 64.9, female: 68.3 },  // Ethiopia
    KE: { male: 64.6, female: 69.7 },  // Kenya
    TZ: { male: 64.5, female: 68.6 },  // Tanzania
    UG: { male: 61.7, female: 67.0 },  // Uganda
    GH: { male: 62.4, female: 65.5 },  // Ghana
    RW: { male: 66.3, female: 71.5 },  // Rwanda
    SN: { male: 66.7, female: 70.1 },  // Senegal
    CI: { male: 56.3, female: 58.7 },  // Côte d'Ivoire
    CM: { male: 58.0, female: 60.3 },  // Cameroon
    AO: { male: 59.7, female: 64.7 },  // Angola
    MZ: { male: 58.1, female: 64.1 },  // Mozambique
    MW: { male: 62.2, female: 67.7 },  // Malawi
    ZM: { male: 60.1, female: 65.1 },  // Zambia
    ZW: { male: 59.3, female: 63.4 },  // Zimbabwe
    BW: { male: 65.8, female: 71.3 },  // Botswana
    NA: { male: 62.3, female: 66.8 },  // Namibia
    ML: { male: 57.7, female: 60.0 },  // Mali
    BF: { male: 59.3, female: 61.6 },  // Burkina Faso
    NE: { male: 60.7, female: 63.1 },  // Niger
    TD: { male: 52.5, female: 55.2 },  // Chad
    CF: { male: 51.7, female: 55.5 },  // Central African Republic

    // Caribbean & Central America
    CU: { male: 77.4, female: 81.0 },  // Cuba
    JM: { male: 72.4, female: 76.5 },  // Jamaica
    DO: { male: 72.0, female: 77.6 },  // Dominican Republic
    HT: { male: 62.2, female: 66.6 },  // Haiti
    GT: { male: 71.1, female: 77.6 },  // Guatemala
    HN: { male: 72.5, female: 77.4 },  // Honduras
    SV: { male: 70.4, female: 78.2 },  // El Salvador
    NI: { male: 72.8, female: 78.6 },  // Nicaragua
    CR: { male: 77.9, female: 82.6 },  // Costa Rica
    PA: { male: 76.0, female: 81.6 },  // Panama
    TT: { male: 70.4, female: 76.9 },  // Trinidad and Tobago

    // Pacific Islands
    FJ: { male: 65.8, female: 70.1 },  // Fiji
    PG: { male: 62.8, female: 66.8 },  // Papua New Guinea
    WS: { male: 71.4, female: 76.3 },  // Samoa
    TO: { male: 70.1, female: 74.9 },  // Tonga
};

/**
 * Country-specific holidays and special days for localization
 * Used for calculating "remaining special days" in emotional metrics
 */
const COUNTRY_HOLIDAYS = {
    // Countries that celebrate Christmas
    christmas: ['US', 'CA', 'MX', 'UK', 'DE', 'FR', 'ES', 'IT', 'NL', 'BE', 'CH', 'AT', 'SE', 'NO', 'DK', 'FI', 'IE', 'PT', 'GR', 'IS', 'LU', 'PL', 'CZ', 'RO', 'HU', 'BG', 'SK', 'HR', 'SI', 'EE', 'LV', 'LT', 'BR', 'AR', 'CL', 'CO', 'PE', 'VE', 'EC', 'BO', 'PY', 'UY', 'PH', 'AU', 'NZ', 'ZA'],

    // Countries with Lunar New Year
    lunar_new_year: ['KR', 'CN', 'TW', 'HK', 'SG', 'VN', 'MY'],

    // Countries with Thanksgiving (primarily North America)
    thanksgiving: ['US', 'CA'],

    // Countries with Diwali
    diwali: ['IN', 'NP', 'LK', 'MY', 'SG', 'FJ'],

    // Countries with Ramadan/Eid
    ramadan: ['SA', 'AE', 'TR', 'IR', 'IQ', 'JO', 'LB', 'KW', 'QA', 'BH', 'OM', 'SY', 'YE', 'EG', 'DZ', 'MA', 'TN', 'LY', 'SD', 'PK', 'BD', 'AF', 'MY', 'ID'],

    // Japan-specific holidays
    obon: ['JP'],
    hanami: ['JP'],

    // Korea-specific holidays
    chuseok: ['KR'],

    // Brazil-specific
    carnaval: ['BR']
};

/**
 * Get life expectancy for a specific country and gender
 * @param {string} countryCode - ISO country code (e.g., 'US', 'KR')
 * @param {string} gender - 'M' or 'F'
 * @returns {number} - Life expectancy in years, or global average if country not found
 */
function getLifeExpectancy(countryCode, gender) {
    const data = LIFE_EXPECTANCY_DATA[countryCode];

    if (!data) {
        // Return global average if country not found
        return gender === 'M' ? 70.8 : 75.9;
    }

    return gender === 'M' ? data.male : data.female;
}

/**
 * Check if country celebrates a specific holiday
 * @param {string} countryCode - ISO country code
 * @param {string} holiday - Holiday name (e.g., 'christmas', 'lunar_new_year')
 * @returns {boolean}
 */
function celebratesHoliday(countryCode, holiday) {
    return COUNTRY_HOLIDAYS[holiday] && COUNTRY_HOLIDAYS[holiday].includes(countryCode);
}

/**
 * Get the primary holiday for a country (for "remaining X" calculations)
 * @param {string} countryCode - ISO country code
 * @returns {object} - { name: string, key: string }
 */
function getPrimaryHoliday(countryCode) {
    if (celebratesHoliday(countryCode, 'christmas')) {
        return {
            name: { en: 'Christmas', ko: '크리스마스', ja: 'クリスマス', cn: '圣诞节', es: 'Navidad' },
            key: 'christmas'
        };
    }
    if (celebratesHoliday(countryCode, 'lunar_new_year')) {
        return {
            name: { en: 'Lunar New Year', ko: '설날', ja: '旧正月', cn: '春节', es: 'Año Nuevo Lunar' },
            key: 'lunar_new_year'
        };
    }
    if (celebratesHoliday(countryCode, 'diwali')) {
        return {
            name: { en: 'Diwali', ko: '디왈리', ja: 'ディワリ', cn: '排灯节', es: 'Diwali' },
            key: 'diwali'
        };
    }
    if (celebratesHoliday(countryCode, 'ramadan')) {
        return {
            name: { en: 'Eid', ko: '이드', ja: 'イード', cn: '开斋节', es: 'Eid' },
            key: 'ramadan'
        };
    }

    // Default to New Year if no specific holiday
    return {
        name: { en: 'New Year', ko: '새해', ja: '新年', cn: '新年', es: 'Año Nuevo' },
        key: 'new_year'
    };
}
