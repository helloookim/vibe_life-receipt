/**
 * Global Wealth Percentile Data
 * Sources: World Bank PIP, OECD Income Distribution Database, UBS Global Wealth Report
 * PPP conversion factors: World Bank International Comparison Program (2023)
 * Gini coefficients: World Bank Development Indicators (2023)
 * All income values are annual PPP-adjusted international dollars unless noted
 */

const WEALTH_COUNTRY_DATA = {
    // ==================== East Asia & Pacific ====================
    KR: {
        name: { en: 'South Korea', ko: '대한민국', ja: '韓国', cn: '韩国', es: 'Corea del Sur' },
        currencyCode: 'KRW', currencySymbol: '₩',
        medianIncome: 31000, giniCoefficient: 0.312,
        pppFactor: 855.4, exchangeRate: 1300, population: 51740000,
        minimumWage: 24048000, medianIncomeLocal: 40000000, top10Local: 80000000,
        incomeUnit: 10000, incomeUnitLabel: { en: '10K KRW', ko: '만원' },
        inputPlaceholder: { en: 'e.g. 5000 (=50M KRW)', ko: '예: 5000 (=5천만원)' }
    },
    JP: {
        name: { en: 'Japan', ko: '일본', ja: '日本', cn: '日本', es: 'Japón' },
        currencyCode: 'JPY', currencySymbol: '¥',
        medianIncome: 28000, giniCoefficient: 0.329,
        pppFactor: 102.5, exchangeRate: 150, population: 125000000,
        minimumWage: 3600000, medianIncomeLocal: 4330000, top10Local: 9000000,
        incomeUnit: 10000, incomeUnitLabel: { en: '10K JPY', ko: '만엔' },
        inputPlaceholder: { en: 'e.g. 500 (=5M JPY)', ko: '예: 500 (=500만엔)' }
    },
    CN: {
        name: { en: 'China', ko: '중국', ja: '中国', cn: '中国', es: 'China' },
        currencyCode: 'CNY', currencySymbol: '¥',
        medianIncome: 12500, giniCoefficient: 0.382,
        pppFactor: 4.19, exchangeRate: 7.2, population: 1412000000,
        minimumWage: 26400, medianIncomeLocal: 52375, top10Local: 150000,
        incomeUnit: 1, incomeUnitLabel: { en: 'CNY', ko: '위안' },
        inputPlaceholder: { en: 'e.g. 100000', ko: '예: 100000' }
    },
    HK: {
        name: { en: 'Hong Kong', ko: '홍콩', ja: '香港', cn: '香港', es: 'Hong Kong' },
        currencyCode: 'HKD', currencySymbol: 'HK$',
        medianIncome: 38000, giniCoefficient: 0.539,
        pppFactor: 5.73, exchangeRate: 7.82, population: 7500000,
        minimumWage: 292500, medianIncomeLocal: 217740, top10Local: 600000,
        incomeUnit: 1, incomeUnitLabel: { en: 'HKD', ko: '홍콩달러' },
        inputPlaceholder: { en: 'e.g. 300000', ko: '예: 300000' }
    },
    SG: {
        name: { en: 'Singapore', ko: '싱가포르', ja: 'シンガポール', cn: '新加坡', es: 'Singapur' },
        currencyCode: 'SGD', currencySymbol: 'S$',
        medianIncome: 42000, giniCoefficient: 0.444,
        pppFactor: 0.84, exchangeRate: 1.35, population: 5900000,
        minimumWage: 0, medianIncomeLocal: 56700, top10Local: 150000,
        incomeUnit: 1, incomeUnitLabel: { en: 'SGD', ko: '싱가포르달러' },
        inputPlaceholder: { en: 'e.g. 60000', ko: '예: 60000' }
    },
    TW: {
        name: { en: 'Taiwan', ko: '대만', ja: '台湾', cn: '台湾', es: 'Taiwán' },
        currencyCode: 'TWD', currencySymbol: 'NT$',
        medianIncome: 29000, giniCoefficient: 0.338,
        pppFactor: 15.1, exchangeRate: 31.5, population: 23500000,
        minimumWage: 330360, medianIncomeLocal: 437900, top10Local: 1000000,
        incomeUnit: 1, incomeUnitLabel: { en: 'TWD', ko: '대만달러' },
        inputPlaceholder: { en: 'e.g. 500000', ko: '예: 500000' }
    },
    AU: {
        name: { en: 'Australia', ko: '호주', ja: 'オーストラリア', cn: '澳大利亚', es: 'Australia' },
        currencyCode: 'AUD', currencySymbol: 'A$',
        medianIncome: 38000, giniCoefficient: 0.343,
        pppFactor: 1.46, exchangeRate: 1.55, population: 26000000,
        minimumWage: 45906, medianIncomeLocal: 55480, top10Local: 130000,
        incomeUnit: 1, incomeUnitLabel: { en: 'AUD', ko: '호주달러' },
        inputPlaceholder: { en: 'e.g. 60000', ko: '예: 60000' }
    },
    NZ: {
        name: { en: 'New Zealand', ko: '뉴질랜드', ja: 'ニュージーランド', cn: '新西兰', es: 'Nueva Zelanda' },
        currencyCode: 'NZD', currencySymbol: 'NZ$',
        medianIncome: 32000, giniCoefficient: 0.349,
        pppFactor: 1.52, exchangeRate: 1.65, population: 5200000,
        minimumWage: 45240, medianIncomeLocal: 48640, top10Local: 110000,
        incomeUnit: 1, incomeUnitLabel: { en: 'NZD', ko: '뉴질랜드달러' },
        inputPlaceholder: { en: 'e.g. 50000', ko: '예: 50000' }
    },
    MY: {
        name: { en: 'Malaysia', ko: '말레이시아', ja: 'マレーシア', cn: '马来西亚', es: 'Malasia' },
        currencyCode: 'MYR', currencySymbol: 'RM',
        medianIncome: 15000, giniCoefficient: 0.407,
        pppFactor: 1.66, exchangeRate: 4.7, population: 33000000,
        minimumWage: 18000, medianIncomeLocal: 24900, top10Local: 80000,
        incomeUnit: 1, incomeUnitLabel: { en: 'MYR', ko: '링깃' },
        inputPlaceholder: { en: 'e.g. 30000', ko: '예: 30000' }
    },
    TH: {
        name: { en: 'Thailand', ko: '태국', ja: 'タイ', cn: '泰国', es: 'Tailandia' },
        currencyCode: 'THB', currencySymbol: '฿',
        medianIncome: 8200, giniCoefficient: 0.350,
        pppFactor: 12.2, exchangeRate: 35, population: 72000000,
        minimumWage: 118260, medianIncomeLocal: 100040, top10Local: 360000,
        incomeUnit: 1, incomeUnitLabel: { en: 'THB', ko: '바트' },
        inputPlaceholder: { en: 'e.g. 120000', ko: '예: 120000' }
    },
    VN: {
        name: { en: 'Vietnam', ko: '베트남', ja: 'ベトナム', cn: '越南', es: 'Vietnam' },
        currencyCode: 'VND', currencySymbol: '₫',
        medianIncome: 4500, giniCoefficient: 0.357,
        pppFactor: 8200, exchangeRate: 25000, population: 99000000,
        minimumWage: 56160000, medianIncomeLocal: 36900000, top10Local: 120000000,
        incomeUnit: 1000000, incomeUnitLabel: { en: 'M VND', ko: '백만동' },
        inputPlaceholder: { en: 'e.g. 60 (=60M VND)', ko: '예: 60 (=6천만동)' }
    },
    ID: {
        name: { en: 'Indonesia', ko: '인도네시아', ja: 'インドネシア', cn: '印度尼西亚', es: 'Indonesia' },
        currencyCode: 'IDR', currencySymbol: 'Rp',
        medianIncome: 5200, giniCoefficient: 0.379,
        pppFactor: 5250, exchangeRate: 15700, population: 277000000,
        minimumWage: 52000000, medianIncomeLocal: 27300000, top10Local: 100000000,
        incomeUnit: 1000000, incomeUnitLabel: { en: 'M IDR', ko: '백만루피아' },
        inputPlaceholder: { en: 'e.g. 50 (=50M IDR)', ko: '예: 50' }
    },
    PH: {
        name: { en: 'Philippines', ko: '필리핀', ja: 'フィリピン', cn: '菲律宾', es: 'Filipinas' },
        currencyCode: 'PHP', currencySymbol: '₱',
        medianIncome: 3800, giniCoefficient: 0.423,
        pppFactor: 19.5, exchangeRate: 56, population: 116000000,
        minimumWage: 156000, medianIncomeLocal: 74100, top10Local: 350000,
        incomeUnit: 1, incomeUnitLabel: { en: 'PHP', ko: '페소' },
        inputPlaceholder: { en: 'e.g. 100000', ko: '예: 100000' }
    },
    MM: {
        name: { en: 'Myanmar', ko: '미얀마', ja: 'ミャンマー', cn: '缅甸', es: 'Myanmar' },
        currencyCode: 'MMK', currencySymbol: 'K',
        medianIncome: 2100, giniCoefficient: 0.307,
        pppFactor: 380, exchangeRate: 2100, population: 55000000,
        minimumWage: 1440000, medianIncomeLocal: 798000, top10Local: 3000000,
        incomeUnit: 1, incomeUnitLabel: { en: 'MMK', ko: '짯' },
        inputPlaceholder: { en: 'e.g. 1000000', ko: '예: 1000000' }
    },
    KH: {
        name: { en: 'Cambodia', ko: '캄보디아', ja: 'カンボジア', cn: '柬埔寨', es: 'Camboya' },
        currencyCode: 'USD', currencySymbol: '$',
        medianIncome: 1800, giniCoefficient: 0.320,
        pppFactor: 1520, exchangeRate: 4100, population: 17000000,
        minimumWage: 2400, medianIncomeLocal: 2400, top10Local: 8000,
        incomeUnit: 1, incomeUnitLabel: { en: 'USD', ko: '달러' },
        inputPlaceholder: { en: 'e.g. 3000', ko: '예: 3000' }
    },
    MN: {
        name: { en: 'Mongolia', ko: '몽골', ja: 'モンゴル', cn: '蒙古', es: 'Mongolia' },
        currencyCode: 'MNT', currencySymbol: '₮',
        medianIncome: 5500, giniCoefficient: 0.327,
        pppFactor: 1100, exchangeRate: 3400, population: 3400000,
        minimumWage: 7200000, medianIncomeLocal: 6050000, top10Local: 20000000,
        incomeUnit: 1000000, incomeUnitLabel: { en: 'M MNT', ko: '백만투그릭' },
        inputPlaceholder: { en: 'e.g. 10', ko: '예: 10' }
    },

    // ==================== North America ====================
    US: {
        name: { en: 'United States', ko: '미국', ja: 'アメリカ', cn: '美国', es: 'Estados Unidos' },
        currencyCode: 'USD', currencySymbol: '$',
        medianIncome: 41000, giniCoefficient: 0.397,
        pppFactor: 1.0, exchangeRate: 1.0, population: 334000000,
        minimumWage: 15080, medianIncomeLocal: 41000, top10Local: 167000,
        incomeUnit: 1, incomeUnitLabel: { en: 'USD', ko: '달러' },
        inputPlaceholder: { en: 'e.g. 50000', ko: '예: 50000' }
    },
    CA: {
        name: { en: 'Canada', ko: '캐나다', ja: 'カナダ', cn: '加拿大', es: 'Canadá' },
        currencyCode: 'CAD', currencySymbol: 'C$',
        medianIncome: 36000, giniCoefficient: 0.330,
        pppFactor: 1.23, exchangeRate: 1.36, population: 39000000,
        minimumWage: 33280, medianIncomeLocal: 44280, top10Local: 110000,
        incomeUnit: 1, incomeUnitLabel: { en: 'CAD', ko: '캐나다달러' },
        inputPlaceholder: { en: 'e.g. 50000', ko: '예: 50000' }
    },
    MX: {
        name: { en: 'Mexico', ko: '멕시코', ja: 'メキシコ', cn: '墨西哥', es: 'México' },
        currencyCode: 'MXN', currencySymbol: 'MX$',
        medianIncome: 9500, giniCoefficient: 0.421,
        pppFactor: 10.3, exchangeRate: 17, population: 130000000,
        minimumWage: 72420, medianIncomeLocal: 97850, top10Local: 400000,
        incomeUnit: 1, incomeUnitLabel: { en: 'MXN', ko: '페소' },
        inputPlaceholder: { en: 'e.g. 120000', ko: '예: 120000' }
    },

    // ==================== South America ====================
    BR: {
        name: { en: 'Brazil', ko: '브라질', ja: 'ブラジル', cn: '巴西', es: 'Brasil' },
        currencyCode: 'BRL', currencySymbol: 'R$',
        medianIncome: 7500, giniCoefficient: 0.489,
        pppFactor: 2.65, exchangeRate: 5.0, population: 215000000,
        minimumWage: 18252, medianIncomeLocal: 19875, top10Local: 80000,
        incomeUnit: 1, incomeUnitLabel: { en: 'BRL', ko: '헤알' },
        inputPlaceholder: { en: 'e.g. 30000', ko: '예: 30000' }
    },
    AR: {
        name: { en: 'Argentina', ko: '아르헨티나', ja: 'アルゼンチン', cn: '阿根廷', es: 'Argentina' },
        currencyCode: 'ARS', currencySymbol: 'AR$',
        medianIncome: 11000, giniCoefficient: 0.421,
        pppFactor: 195, exchangeRate: 850, population: 46000000,
        minimumWage: 2340000, medianIncomeLocal: 2145000, top10Local: 7000000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K ARS', ko: '천페소' },
        inputPlaceholder: { en: 'e.g. 3000 (=3M ARS)', ko: '예: 3000' }
    },
    CL: {
        name: { en: 'Chile', ko: '칠레', ja: 'チリ', cn: '智利', es: 'Chile' },
        currencyCode: 'CLP', currencySymbol: 'CL$',
        medianIncome: 14500, giniCoefficient: 0.445,
        pppFactor: 445, exchangeRate: 900, population: 19500000,
        minimumWage: 5340000, medianIncomeLocal: 6452500, top10Local: 20000000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K CLP', ko: '천페소' },
        inputPlaceholder: { en: 'e.g. 8000 (=8M CLP)', ko: '예: 8000' }
    },
    CO: {
        name: { en: 'Colombia', ko: '콜롬비아', ja: 'コロンビア', cn: '哥伦比亚', es: 'Colombia' },
        currencyCode: 'COP', currencySymbol: 'COL$',
        medianIncome: 6800, giniCoefficient: 0.513,
        pppFactor: 1580, exchangeRate: 4000, population: 52000000,
        minimumWage: 15600000, medianIncomeLocal: 10744000, top10Local: 48000000,
        incomeUnit: 1000000, incomeUnitLabel: { en: 'M COP', ko: '백만페소' },
        inputPlaceholder: { en: 'e.g. 15', ko: '예: 15' }
    },
    PE: {
        name: { en: 'Peru', ko: '페루', ja: 'ペルー', cn: '秘鲁', es: 'Perú' },
        currencyCode: 'PEN', currencySymbol: 'S/',
        medianIncome: 6500, giniCoefficient: 0.438,
        pppFactor: 1.82, exchangeRate: 3.7, population: 34000000,
        minimumWage: 12300, medianIncomeLocal: 11830, top10Local: 45000,
        incomeUnit: 1, incomeUnitLabel: { en: 'PEN', ko: '솔' },
        inputPlaceholder: { en: 'e.g. 15000', ko: '예: 15000' }
    },
    VE: {
        name: { en: 'Venezuela', ko: '베네수엘라', ja: 'ベネズエラ', cn: '委内瑞拉', es: 'Venezuela' },
        currencyCode: 'USD', currencySymbol: '$',
        medianIncome: 3200, giniCoefficient: 0.445,
        pppFactor: 1.0, exchangeRate: 1.0, population: 28000000,
        minimumWage: 1800, medianIncomeLocal: 3200, top10Local: 12000,
        incomeUnit: 1, incomeUnitLabel: { en: 'USD', ko: '달러' },
        inputPlaceholder: { en: 'e.g. 4000', ko: '예: 4000' }
    },
    EC: {
        name: { en: 'Ecuador', ko: '에콰도르', ja: 'エクアドル', cn: '厄瓜多尔', es: 'Ecuador' },
        currencyCode: 'USD', currencySymbol: '$',
        medianIncome: 5800, giniCoefficient: 0.453,
        pppFactor: 0.55, exchangeRate: 1.0, population: 18000000,
        minimumWage: 5400, medianIncomeLocal: 3190, top10Local: 15000,
        incomeUnit: 1, incomeUnitLabel: { en: 'USD', ko: '달러' },
        inputPlaceholder: { en: 'e.g. 5000', ko: '예: 5000' }
    },
    BO: {
        name: { en: 'Bolivia', ko: '볼리비아', ja: 'ボリビア', cn: '玻利维亚', es: 'Bolivia' },
        currencyCode: 'BOB', currencySymbol: 'Bs',
        medianIncome: 3800, giniCoefficient: 0.421,
        pppFactor: 3.2, exchangeRate: 6.9, population: 12000000,
        minimumWage: 26208, medianIncomeLocal: 12160, top10Local: 48000,
        incomeUnit: 1, incomeUnitLabel: { en: 'BOB', ko: '볼리비아노' },
        inputPlaceholder: { en: 'e.g. 15000', ko: '예: 15000' }
    },
    UY: {
        name: { en: 'Uruguay', ko: '우루과이', ja: 'ウルグアイ', cn: '乌拉圭', es: 'Uruguay' },
        currencyCode: 'UYU', currencySymbol: 'UY$',
        medianIncome: 13000, giniCoefficient: 0.397,
        pppFactor: 22.5, exchangeRate: 39, population: 3500000,
        minimumWage: 273000, medianIncomeLocal: 292500, top10Local: 900000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K UYU', ko: '천페소' },
        inputPlaceholder: { en: 'e.g. 300', ko: '예: 300' }
    },
    PY: {
        name: { en: 'Paraguay', ko: '파라과이', ja: 'パラグアイ', cn: '巴拉圭', es: 'Paraguay' },
        currencyCode: 'PYG', currencySymbol: '₲',
        medianIncome: 5500, giniCoefficient: 0.453,
        pppFactor: 2900, exchangeRate: 7300, population: 7300000,
        minimumWage: 31500000, medianIncomeLocal: 15950000, top10Local: 60000000,
        incomeUnit: 1000000, incomeUnitLabel: { en: 'M PYG', ko: '백만과라니' },
        inputPlaceholder: { en: 'e.g. 20', ko: '예: 20' }
    },

    // ==================== Western Europe ====================
    UK: {
        name: { en: 'United Kingdom', ko: '영국', ja: 'イギリス', cn: '英国', es: 'Reino Unido' },
        currencyCode: 'GBP', currencySymbol: '£',
        medianIncome: 33000, giniCoefficient: 0.352,
        pppFactor: 0.69, exchangeRate: 0.79, population: 67000000,
        minimumWage: 21674, medianIncomeLocal: 22770, top10Local: 55000,
        incomeUnit: 1, incomeUnitLabel: { en: 'GBP', ko: '파운드' },
        inputPlaceholder: { en: 'e.g. 30000', ko: '예: 30000' }
    },
    DE: {
        name: { en: 'Germany', ko: '독일', ja: 'ドイツ', cn: '德国', es: 'Alemania' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 37000, giniCoefficient: 0.317,
        pppFactor: 0.76, exchangeRate: 0.92, population: 84000000,
        minimumWage: 24960, medianIncomeLocal: 28120, top10Local: 65000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 40000', ko: '예: 40000' }
    },
    FR: {
        name: { en: 'France', ko: '프랑스', ja: 'フランス', cn: '法国', es: 'Francia' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 32000, giniCoefficient: 0.324,
        pppFactor: 0.73, exchangeRate: 0.92, population: 67000000,
        minimumWage: 21203, medianIncomeLocal: 23360, top10Local: 55000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 35000', ko: '예: 35000' }
    },
    IT: {
        name: { en: 'Italy', ko: '이탈리아', ja: 'イタリア', cn: '意大利', es: 'Italia' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 28000, giniCoefficient: 0.352,
        pppFactor: 0.70, exchangeRate: 0.92, population: 59000000,
        minimumWage: 0, medianIncomeLocal: 19600, top10Local: 50000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 25000', ko: '예: 25000' }
    },
    ES: {
        name: { en: 'Spain', ko: '스페인', ja: 'スペイン', cn: '西班牙', es: 'España' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 25000, giniCoefficient: 0.347,
        pppFactor: 0.65, exchangeRate: 0.92, population: 47000000,
        minimumWage: 15876, medianIncomeLocal: 16250, top10Local: 45000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 25000', ko: '예: 25000' }
    },
    PT: {
        name: { en: 'Portugal', ko: '포르투갈', ja: 'ポルトガル', cn: '葡萄牙', es: 'Portugal' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 22000, giniCoefficient: 0.338,
        pppFactor: 0.58, exchangeRate: 0.92, population: 10300000,
        minimumWage: 10640, medianIncomeLocal: 12760, top10Local: 35000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 15000', ko: '예: 15000' }
    },
    NL: {
        name: { en: 'Netherlands', ko: '네덜란드', ja: 'オランダ', cn: '荷兰', es: 'Países Bajos' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 38000, giniCoefficient: 0.296,
        pppFactor: 0.78, exchangeRate: 0.92, population: 17500000,
        minimumWage: 25272, medianIncomeLocal: 29640, top10Local: 68000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 35000', ko: '예: 35000' }
    },
    BE: {
        name: { en: 'Belgium', ko: '벨기에', ja: 'ベルギー', cn: '比利时', es: 'Bélgica' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 35000, giniCoefficient: 0.272,
        pppFactor: 0.76, exchangeRate: 0.92, population: 11600000,
        minimumWage: 23496, medianIncomeLocal: 26600, top10Local: 60000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 30000', ko: '예: 30000' }
    },
    AT: {
        name: { en: 'Austria', ko: '오스트리아', ja: 'オーストリア', cn: '奥地利', es: 'Austria' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 36000, giniCoefficient: 0.305,
        pppFactor: 0.77, exchangeRate: 0.92, population: 9100000,
        minimumWage: 0, medianIncomeLocal: 27720, top10Local: 62000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 35000', ko: '예: 35000' }
    },
    CH: {
        name: { en: 'Switzerland', ko: '스위스', ja: 'スイス', cn: '瑞士', es: 'Suiza' },
        currencyCode: 'CHF', currencySymbol: 'CHF',
        medianIncome: 46000, giniCoefficient: 0.331,
        pppFactor: 1.21, exchangeRate: 0.88, population: 8800000,
        minimumWage: 0, medianIncomeLocal: 55660, top10Local: 130000,
        incomeUnit: 1, incomeUnitLabel: { en: 'CHF', ko: '스위스프랑' },
        inputPlaceholder: { en: 'e.g. 60000', ko: '예: 60000' }
    },
    IE: {
        name: { en: 'Ireland', ko: '아일랜드', ja: 'アイルランド', cn: '爱尔兰', es: 'Irlanda' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 37000, giniCoefficient: 0.309,
        pppFactor: 0.79, exchangeRate: 0.92, population: 5100000,
        minimumWage: 24336, medianIncomeLocal: 29230, top10Local: 70000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 35000', ko: '예: 35000' }
    },
    LU: {
        name: { en: 'Luxembourg', ko: '룩셈부르크', ja: 'ルクセンブルク', cn: '卢森堡', es: 'Luxemburgo' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 52000, giniCoefficient: 0.322,
        pppFactor: 0.85, exchangeRate: 0.92, population: 660000,
        minimumWage: 29568, medianIncomeLocal: 44200, top10Local: 100000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 50000', ko: '예: 50000' }
    },

    // ==================== Northern Europe ====================
    SE: {
        name: { en: 'Sweden', ko: '스웨덴', ja: 'スウェーデン', cn: '瑞典', es: 'Suecia' },
        currencyCode: 'SEK', currencySymbol: 'kr',
        medianIncome: 36000, giniCoefficient: 0.300,
        pppFactor: 9.1, exchangeRate: 10.5, population: 10400000,
        minimumWage: 0, medianIncomeLocal: 327600, top10Local: 700000,
        incomeUnit: 1, incomeUnitLabel: { en: 'SEK', ko: '크로나' },
        inputPlaceholder: { en: 'e.g. 350000', ko: '예: 350000' }
    },
    NO: {
        name: { en: 'Norway', ko: '노르웨이', ja: 'ノルウェー', cn: '挪威', es: 'Noruega' },
        currencyCode: 'NOK', currencySymbol: 'kr',
        medianIncome: 44000, giniCoefficient: 0.277,
        pppFactor: 10.5, exchangeRate: 10.8, population: 5500000,
        minimumWage: 0, medianIncomeLocal: 462000, top10Local: 900000,
        incomeUnit: 1, incomeUnitLabel: { en: 'NOK', ko: '크로네' },
        inputPlaceholder: { en: 'e.g. 500000', ko: '예: 500000' }
    },
    DK: {
        name: { en: 'Denmark', ko: '덴마크', ja: 'デンマーク', cn: '丹麦', es: 'Dinamarca' },
        currencyCode: 'DKK', currencySymbol: 'kr',
        medianIncome: 40000, giniCoefficient: 0.284,
        pppFactor: 6.7, exchangeRate: 6.9, population: 5900000,
        minimumWage: 0, medianIncomeLocal: 268000, top10Local: 550000,
        incomeUnit: 1, incomeUnitLabel: { en: 'DKK', ko: '크로네' },
        inputPlaceholder: { en: 'e.g. 300000', ko: '예: 300000' }
    },
    FI: {
        name: { en: 'Finland', ko: '핀란드', ja: 'フィンランド', cn: '芬兰', es: 'Finlandia' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 34000, giniCoefficient: 0.278,
        pppFactor: 0.80, exchangeRate: 0.92, population: 5500000,
        minimumWage: 0, medianIncomeLocal: 27200, top10Local: 60000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 30000', ko: '예: 30000' }
    },
    IS: {
        name: { en: 'Iceland', ko: '아이슬란드', ja: 'アイスランド', cn: '冰岛', es: 'Islandia' },
        currencyCode: 'ISK', currencySymbol: 'kr',
        medianIncome: 42000, giniCoefficient: 0.268,
        pppFactor: 160, exchangeRate: 138, population: 380000,
        minimumWage: 5040000, medianIncomeLocal: 6720000, top10Local: 14000000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K ISK', ko: '천크로나' },
        inputPlaceholder: { en: 'e.g. 7000', ko: '예: 7000' }
    },

    // ==================== Eastern Europe ====================
    RU: {
        name: { en: 'Russia', ko: '러시아', ja: 'ロシア', cn: '俄罗斯', es: 'Rusia' },
        currencyCode: 'RUB', currencySymbol: '₽',
        medianIncome: 14000, giniCoefficient: 0.360,
        pppFactor: 28.5, exchangeRate: 92, population: 144000000,
        minimumWage: 228000, medianIncomeLocal: 399000, top10Local: 1200000,
        incomeUnit: 1, incomeUnitLabel: { en: 'RUB', ko: '루블' },
        inputPlaceholder: { en: 'e.g. 500000', ko: '예: 500000' }
    },
    PL: {
        name: { en: 'Poland', ko: '폴란드', ja: 'ポーランド', cn: '波兰', es: 'Polonia' },
        currencyCode: 'PLN', currencySymbol: 'zł',
        medianIncome: 22000, giniCoefficient: 0.298,
        pppFactor: 1.92, exchangeRate: 4.0, population: 38000000,
        minimumWage: 50400, medianIncomeLocal: 42240, top10Local: 120000,
        incomeUnit: 1, incomeUnitLabel: { en: 'PLN', ko: '즈워티' },
        inputPlaceholder: { en: 'e.g. 50000', ko: '예: 50000' }
    },
    CZ: {
        name: { en: 'Czech Republic', ko: '체코', ja: 'チェコ', cn: '捷克', es: 'República Checa' },
        currencyCode: 'CZK', currencySymbol: 'Kč',
        medianIncome: 24000, giniCoefficient: 0.254,
        pppFactor: 14.2, exchangeRate: 23, population: 10700000,
        minimumWage: 241200, medianIncomeLocal: 340800, top10Local: 700000,
        incomeUnit: 1, incomeUnitLabel: { en: 'CZK', ko: '코루나' },
        inputPlaceholder: { en: 'e.g. 400000', ko: '예: 400000' }
    },
    HU: {
        name: { en: 'Hungary', ko: '헝가리', ja: 'ハンガリー', cn: '匈牙利', es: 'Hungría' },
        currencyCode: 'HUF', currencySymbol: 'Ft',
        medianIncome: 19000, giniCoefficient: 0.301,
        pppFactor: 168, exchangeRate: 360, population: 9700000,
        minimumWage: 3216000, medianIncomeLocal: 3192000, top10Local: 8000000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K HUF', ko: '천포린트' },
        inputPlaceholder: { en: 'e.g. 4000', ko: '예: 4000' }
    },
    RO: {
        name: { en: 'Romania', ko: '루마니아', ja: 'ルーマニア', cn: '罗马尼亚', es: 'Rumania' },
        currencyCode: 'RON', currencySymbol: 'lei',
        medianIncome: 16000, giniCoefficient: 0.345,
        pppFactor: 2.05, exchangeRate: 4.6, population: 19000000,
        minimumWage: 39600, medianIncomeLocal: 32800, top10Local: 100000,
        incomeUnit: 1, incomeUnitLabel: { en: 'RON', ko: '레이' },
        inputPlaceholder: { en: 'e.g. 40000', ko: '예: 40000' }
    },
    UA: {
        name: { en: 'Ukraine', ko: '우크라이나', ja: 'ウクライナ', cn: '乌克兰', es: 'Ucrania' },
        currencyCode: 'UAH', currencySymbol: '₴',
        medianIncome: 5500, giniCoefficient: 0.260,
        pppFactor: 9.8, exchangeRate: 37, population: 44000000,
        minimumWage: 96000, medianIncomeLocal: 53900, top10Local: 200000,
        incomeUnit: 1, incomeUnitLabel: { en: 'UAH', ko: '흐리브냐' },
        inputPlaceholder: { en: 'e.g. 80000', ko: '예: 80000' }
    },
    BG: {
        name: { en: 'Bulgaria', ko: '불가리아', ja: 'ブルガリア', cn: '保加利亚', es: 'Bulgaria' },
        currencyCode: 'BGN', currencySymbol: 'лв',
        medianIncome: 14000, giniCoefficient: 0.396,
        pppFactor: 0.85, exchangeRate: 1.80, population: 6900000,
        minimumWage: 11040, medianIncomeLocal: 11900, top10Local: 40000,
        incomeUnit: 1, incomeUnitLabel: { en: 'BGN', ko: '레프' },
        inputPlaceholder: { en: 'e.g. 15000', ko: '예: 15000' }
    },
    HR: {
        name: { en: 'Croatia', ko: '크로아티아', ja: 'クロアチア', cn: '克罗地亚', es: 'Croacia' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 18000, giniCoefficient: 0.299,
        pppFactor: 0.49, exchangeRate: 0.92, population: 3900000,
        minimumWage: 8400, medianIncomeLocal: 8820, top10Local: 25000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 10000', ko: '예: 10000' }
    },
    RS: {
        name: { en: 'Serbia', ko: '세르비아', ja: 'セルビア', cn: '塞尔维亚', es: 'Serbia' },
        currencyCode: 'RSD', currencySymbol: 'din',
        medianIncome: 10500, giniCoefficient: 0.362,
        pppFactor: 42.5, exchangeRate: 108, population: 6800000,
        minimumWage: 540000, medianIncomeLocal: 446250, top10Local: 1300000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K RSD', ko: '천디나르' },
        inputPlaceholder: { en: 'e.g. 500', ko: '예: 500' }
    },
    SK: {
        name: { en: 'Slovakia', ko: '슬로바키아', ja: 'スロバキア', cn: '斯洛伐克', es: 'Eslovaquia' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 20000, giniCoefficient: 0.250,
        pppFactor: 0.52, exchangeRate: 0.92, population: 5500000,
        minimumWage: 8412, medianIncomeLocal: 10400, top10Local: 30000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 12000', ko: '예: 12000' }
    },
    SI: {
        name: { en: 'Slovenia', ko: '슬로베니아', ja: 'スロベニア', cn: '斯洛文尼亚', es: 'Eslovenia' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 26000, giniCoefficient: 0.244,
        pppFactor: 0.59, exchangeRate: 0.92, population: 2100000,
        minimumWage: 13812, medianIncomeLocal: 15340, top10Local: 40000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 18000', ko: '예: 18000' }
    },
    EE: {
        name: { en: 'Estonia', ko: '에스토니아', ja: 'エストニア', cn: '爱沙尼亚', es: 'Estonia' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 24000, giniCoefficient: 0.311,
        pppFactor: 0.56, exchangeRate: 0.92, population: 1300000,
        minimumWage: 9360, medianIncomeLocal: 13440, top10Local: 35000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 15000', ko: '예: 15000' }
    },
    LV: {
        name: { en: 'Latvia', ko: '라트비아', ja: 'ラトビア', cn: '拉脱维亚', es: 'Letonia' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 20000, giniCoefficient: 0.348,
        pppFactor: 0.52, exchangeRate: 0.92, population: 1900000,
        minimumWage: 7800, medianIncomeLocal: 10400, top10Local: 30000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 12000', ko: '예: 12000' }
    },
    LT: {
        name: { en: 'Lithuania', ko: '리투아니아', ja: 'リトアニア', cn: '立陶宛', es: 'Lituania' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 22000, giniCoefficient: 0.362,
        pppFactor: 0.51, exchangeRate: 0.92, population: 2800000,
        minimumWage: 10080, medianIncomeLocal: 11220, top10Local: 32000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 12000', ko: '예: 12000' }
    },
    GR: {
        name: { en: 'Greece', ko: '그리스', ja: 'ギリシャ', cn: '希腊', es: 'Grecia' },
        currencyCode: 'EUR', currencySymbol: '€',
        medianIncome: 20000, giniCoefficient: 0.333,
        pppFactor: 0.58, exchangeRate: 0.92, population: 10400000,
        minimumWage: 10920, medianIncomeLocal: 11600, top10Local: 35000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EUR', ko: '유로' },
        inputPlaceholder: { en: 'e.g. 15000', ko: '예: 15000' }
    },

    // ==================== South Asia ====================
    IN: {
        name: { en: 'India', ko: '인도', ja: 'インド', cn: '印度', es: 'India' },
        currencyCode: 'INR', currencySymbol: '₹',
        medianIncome: 2800, giniCoefficient: 0.353,
        pppFactor: 23.3, exchangeRate: 83, population: 1428000000,
        minimumWage: 216000, medianIncomeLocal: 65240, top10Local: 500000,
        incomeUnit: 1, incomeUnitLabel: { en: 'INR', ko: '루피' },
        inputPlaceholder: { en: 'e.g. 100000', ko: '예: 100000' }
    },
    BD: {
        name: { en: 'Bangladesh', ko: '방글라데시', ja: 'バングラデシュ', cn: '孟加拉国', es: 'Bangladés' },
        currencyCode: 'BDT', currencySymbol: '৳',
        medianIncome: 2200, giniCoefficient: 0.324,
        pppFactor: 36.5, exchangeRate: 110, population: 170000000,
        minimumWage: 96000, medianIncomeLocal: 80300, top10Local: 300000,
        incomeUnit: 1, incomeUnitLabel: { en: 'BDT', ko: '타카' },
        inputPlaceholder: { en: 'e.g. 100000', ko: '예: 100000' }
    },
    PK: {
        name: { en: 'Pakistan', ko: '파키스탄', ja: 'パキスタン', cn: '巴基斯坦', es: 'Pakistán' },
        currencyCode: 'PKR', currencySymbol: 'Rs',
        medianIncome: 1900, giniCoefficient: 0.296,
        pppFactor: 88.5, exchangeRate: 280, population: 230000000,
        minimumWage: 300000, medianIncomeLocal: 168150, top10Local: 600000,
        incomeUnit: 1, incomeUnitLabel: { en: 'PKR', ko: '루피' },
        inputPlaceholder: { en: 'e.g. 200000', ko: '예: 200000' }
    },
    LK: {
        name: { en: 'Sri Lanka', ko: '스리랑카', ja: 'スリランカ', cn: '斯里兰卡', es: 'Sri Lanka' },
        currencyCode: 'LKR', currencySymbol: 'Rs',
        medianIncome: 4200, giniCoefficient: 0.393,
        pppFactor: 105, exchangeRate: 320, population: 22000000,
        minimumWage: 360000, medianIncomeLocal: 441000, top10Local: 1500000,
        incomeUnit: 1, incomeUnitLabel: { en: 'LKR', ko: '루피' },
        inputPlaceholder: { en: 'e.g. 500000', ko: '예: 500000' }
    },
    NP: {
        name: { en: 'Nepal', ko: '네팔', ja: 'ネパール', cn: '尼泊尔', es: 'Nepal' },
        currencyCode: 'NPR', currencySymbol: 'Rs',
        medianIncome: 1500, giniCoefficient: 0.328,
        pppFactor: 40.2, exchangeRate: 133, population: 30000000,
        minimumWage: 225000, medianIncomeLocal: 60300, top10Local: 250000,
        incomeUnit: 1, incomeUnitLabel: { en: 'NPR', ko: '루피' },
        inputPlaceholder: { en: 'e.g. 100000', ko: '예: 100000' }
    },

    // ==================== Middle East ====================
    SA: {
        name: { en: 'Saudi Arabia', ko: '사우디아라비아', ja: 'サウジアラビア', cn: '沙特阿拉伯', es: 'Arabia Saudita' },
        currencyCode: 'SAR', currencySymbol: 'SAR',
        medianIncome: 22000, giniCoefficient: 0.459,
        pppFactor: 1.75, exchangeRate: 3.75, population: 36000000,
        minimumWage: 48000, medianIncomeLocal: 38500, top10Local: 150000,
        incomeUnit: 1, incomeUnitLabel: { en: 'SAR', ko: '리얄' },
        inputPlaceholder: { en: 'e.g. 50000', ko: '예: 50000' }
    },
    AE: {
        name: { en: 'United Arab Emirates', ko: 'UAE', ja: 'アラブ首長国連邦', cn: '阿联酋', es: 'Emiratos Árabes Unidos' },
        currencyCode: 'AED', currencySymbol: 'AED',
        medianIncome: 30000, giniCoefficient: 0.360,
        pppFactor: 1.95, exchangeRate: 3.67, population: 10000000,
        minimumWage: 0, medianIncomeLocal: 58500, top10Local: 200000,
        incomeUnit: 1, incomeUnitLabel: { en: 'AED', ko: '디르함' },
        inputPlaceholder: { en: 'e.g. 70000', ko: '예: 70000' }
    },
    IL: {
        name: { en: 'Israel', ko: '이스라엘', ja: 'イスラエル', cn: '以色列', es: 'Israel' },
        currencyCode: 'ILS', currencySymbol: '₪',
        medianIncome: 30000, giniCoefficient: 0.389,
        pppFactor: 3.73, exchangeRate: 3.7, population: 9800000,
        minimumWage: 73164, medianIncomeLocal: 111900, top10Local: 300000,
        incomeUnit: 1, incomeUnitLabel: { en: 'ILS', ko: '셰켈' },
        inputPlaceholder: { en: 'e.g. 120000', ko: '예: 120000' }
    },
    TR: {
        name: { en: 'Turkey', ko: '터키', ja: 'トルコ', cn: '土耳其', es: 'Turquía' },
        currencyCode: 'TRY', currencySymbol: '₺',
        medianIncome: 15000, giniCoefficient: 0.415,
        pppFactor: 6.6, exchangeRate: 27, population: 85000000,
        minimumWage: 201204, medianIncomeLocal: 99000, top10Local: 400000,
        incomeUnit: 1, incomeUnitLabel: { en: 'TRY', ko: '리라' },
        inputPlaceholder: { en: 'e.g. 150000', ko: '예: 150000' }
    },
    EG: {
        name: { en: 'Egypt', ko: '이집트', ja: 'エジプト', cn: '埃及', es: 'Egipto' },
        currencyCode: 'EGP', currencySymbol: 'E£',
        medianIncome: 4200, giniCoefficient: 0.315,
        pppFactor: 4.95, exchangeRate: 31, population: 106000000,
        minimumWage: 72000, medianIncomeLocal: 20790, top10Local: 100000,
        incomeUnit: 1, incomeUnitLabel: { en: 'EGP', ko: '파운드' },
        inputPlaceholder: { en: 'e.g. 30000', ko: '예: 30000' }
    },
    IQ: {
        name: { en: 'Iraq', ko: '이라크', ja: 'イラク', cn: '伊拉克', es: 'Irak' },
        currencyCode: 'IQD', currencySymbol: 'IQD',
        medianIncome: 5200, giniCoefficient: 0.296,
        pppFactor: 498, exchangeRate: 1310, population: 43000000,
        minimumWage: 4200000, medianIncomeLocal: 2589600, top10Local: 10000000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K IQD', ko: '천디나르' },
        inputPlaceholder: { en: 'e.g. 3000', ko: '예: 3000' }
    },
    IR: {
        name: { en: 'Iran', ko: '이란', ja: 'イラン', cn: '伊朗', es: 'Irán' },
        currencyCode: 'IRR', currencySymbol: 'IRR',
        medianIncome: 8500, giniCoefficient: 0.408,
        pppFactor: 38000, exchangeRate: 420000, population: 88000000,
        minimumWage: 700000000, medianIncomeLocal: 323000000, top10Local: 1200000000,
        incomeUnit: 1000000, incomeUnitLabel: { en: 'M IRR', ko: '백만리알' },
        inputPlaceholder: { en: 'e.g. 400', ko: '예: 400' }
    },
    JO: {
        name: { en: 'Jordan', ko: '요르단', ja: 'ヨルダン', cn: '约旦', es: 'Jordania' },
        currencyCode: 'JOD', currencySymbol: 'JOD',
        medianIncome: 5000, giniCoefficient: 0.337,
        pppFactor: 0.31, exchangeRate: 0.71, population: 11000000,
        minimumWage: 3120, medianIncomeLocal: 1550, top10Local: 8000,
        incomeUnit: 1, incomeUnitLabel: { en: 'JOD', ko: '디나르' },
        inputPlaceholder: { en: 'e.g. 2000', ko: '예: 2000' }
    },
    QA: {
        name: { en: 'Qatar', ko: '카타르', ja: 'カタール', cn: '卡塔尔', es: 'Catar' },
        currencyCode: 'QAR', currencySymbol: 'QAR',
        medianIncome: 35000, giniCoefficient: 0.411,
        pppFactor: 2.3, exchangeRate: 3.64, population: 2900000,
        minimumWage: 12000, medianIncomeLocal: 80500, top10Local: 300000,
        incomeUnit: 1, incomeUnitLabel: { en: 'QAR', ko: '리얄' },
        inputPlaceholder: { en: 'e.g. 90000', ko: '예: 90000' }
    },
    KW: {
        name: { en: 'Kuwait', ko: '쿠웨이트', ja: 'クウェート', cn: '科威特', es: 'Kuwait' },
        currencyCode: 'KWD', currencySymbol: 'KWD',
        medianIncome: 28000, giniCoefficient: 0.370,
        pppFactor: 0.17, exchangeRate: 0.31, population: 4300000,
        minimumWage: 900, medianIncomeLocal: 4760, top10Local: 18000,
        incomeUnit: 1, incomeUnitLabel: { en: 'KWD', ko: '디나르' },
        inputPlaceholder: { en: 'e.g. 5000', ko: '예: 5000' }
    },

    // ==================== Africa ====================
    ZA: {
        name: { en: 'South Africa', ko: '남아프리카', ja: '南アフリカ', cn: '南非', es: 'Sudáfrica' },
        currencyCode: 'ZAR', currencySymbol: 'R',
        medianIncome: 4800, giniCoefficient: 0.630,
        pppFactor: 7.2, exchangeRate: 19, population: 60000000,
        minimumWage: 51120, medianIncomeLocal: 34560, top10Local: 250000,
        incomeUnit: 1, incomeUnitLabel: { en: 'ZAR', ko: '란드' },
        inputPlaceholder: { en: 'e.g. 50000', ko: '예: 50000' }
    },
    NG: {
        name: { en: 'Nigeria', ko: '나이지리아', ja: 'ナイジェリア', cn: '尼日利亚', es: 'Nigeria' },
        currencyCode: 'NGN', currencySymbol: '₦',
        medianIncome: 1200, giniCoefficient: 0.351,
        pppFactor: 210, exchangeRate: 780, population: 224000000,
        minimumWage: 360000, medianIncomeLocal: 252000, top10Local: 1500000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K NGN', ko: '천나이라' },
        inputPlaceholder: { en: 'e.g. 300', ko: '예: 300' }
    },
    KE: {
        name: { en: 'Kenya', ko: '케냐', ja: 'ケニア', cn: '肯尼亚', es: 'Kenia' },
        currencyCode: 'KES', currencySymbol: 'KSh',
        medianIncome: 1800, giniCoefficient: 0.408,
        pppFactor: 52.5, exchangeRate: 150, population: 55000000,
        minimumWage: 180000, medianIncomeLocal: 94500, top10Local: 500000,
        incomeUnit: 1, incomeUnitLabel: { en: 'KES', ko: '실링' },
        inputPlaceholder: { en: 'e.g. 120000', ko: '예: 120000' }
    },
    GH: {
        name: { en: 'Ghana', ko: '가나', ja: 'ガーナ', cn: '加纳', es: 'Ghana' },
        currencyCode: 'GHS', currencySymbol: 'GH₵',
        medianIncome: 2400, giniCoefficient: 0.435,
        pppFactor: 4.2, exchangeRate: 12, population: 33000000,
        minimumWage: 17280, medianIncomeLocal: 10080, top10Local: 50000,
        incomeUnit: 1, incomeUnitLabel: { en: 'GHS', ko: '세디' },
        inputPlaceholder: { en: 'e.g. 12000', ko: '예: 12000' }
    },
    ET: {
        name: { en: 'Ethiopia', ko: '에티오피아', ja: 'エチオピア', cn: '埃塞俄比亚', es: 'Etiopía' },
        currencyCode: 'ETB', currencySymbol: 'Br',
        medianIncome: 950, giniCoefficient: 0.350,
        pppFactor: 18.5, exchangeRate: 56, population: 126000000,
        minimumWage: 0, medianIncomeLocal: 17575, top10Local: 80000,
        incomeUnit: 1, incomeUnitLabel: { en: 'ETB', ko: '비르' },
        inputPlaceholder: { en: 'e.g. 20000', ko: '예: 20000' }
    },
    TZ: {
        name: { en: 'Tanzania', ko: '탄자니아', ja: 'タンザニア', cn: '坦桑尼亚', es: 'Tanzania' },
        currencyCode: 'TZS', currencySymbol: 'TSh',
        medianIncome: 1100, giniCoefficient: 0.405,
        pppFactor: 930, exchangeRate: 2500, population: 65000000,
        minimumWage: 1200000, medianIncomeLocal: 1023000, top10Local: 5000000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K TZS', ko: '천실링' },
        inputPlaceholder: { en: 'e.g. 1200', ko: '예: 1200' }
    },
    UG: {
        name: { en: 'Uganda', ko: '우간다', ja: 'ウガンダ', cn: '乌干达', es: 'Uganda' },
        currencyCode: 'UGX', currencySymbol: 'USh',
        medianIncome: 850, giniCoefficient: 0.427,
        pppFactor: 1350, exchangeRate: 3700, population: 47000000,
        minimumWage: 0, medianIncomeLocal: 1147500, top10Local: 5000000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K UGX', ko: '천실링' },
        inputPlaceholder: { en: 'e.g. 1500', ko: '예: 1500' }
    },
    CD: {
        name: { en: 'DR Congo', ko: '콩고민주공화국', ja: 'コンゴ民主共和国', cn: '刚果民主共和国', es: 'RD del Congo' },
        currencyCode: 'USD', currencySymbol: '$',
        medianIncome: 500, giniCoefficient: 0.421,
        pppFactor: 1.0, exchangeRate: 1.0, population: 102000000,
        minimumWage: 420, medianIncomeLocal: 500, top10Local: 3000,
        incomeUnit: 1, incomeUnitLabel: { en: 'USD', ko: '달러' },
        inputPlaceholder: { en: 'e.g. 600', ko: '예: 600' }
    },
    MA: {
        name: { en: 'Morocco', ko: '모로코', ja: 'モロッコ', cn: '摩洛哥', es: 'Marruecos' },
        currencyCode: 'MAD', currencySymbol: 'MAD',
        medianIncome: 4000, giniCoefficient: 0.395,
        pppFactor: 4.1, exchangeRate: 10, population: 37000000,
        minimumWage: 31200, medianIncomeLocal: 16400, top10Local: 80000,
        incomeUnit: 1, incomeUnitLabel: { en: 'MAD', ko: '디르함' },
        inputPlaceholder: { en: 'e.g. 20000', ko: '예: 20000' }
    },
    DZ: {
        name: { en: 'Algeria', ko: '알제리', ja: 'アルジェリア', cn: '阿尔及利亚', es: 'Argelia' },
        currencyCode: 'DZD', currencySymbol: 'DA',
        medianIncome: 5500, giniCoefficient: 0.276,
        pppFactor: 42.5, exchangeRate: 135, population: 45000000,
        minimumWage: 240000, medianIncomeLocal: 233750, top10Local: 700000,
        incomeUnit: 1, incomeUnitLabel: { en: 'DZD', ko: '디나르' },
        inputPlaceholder: { en: 'e.g. 300000', ko: '예: 300000' }
    },
    TN: {
        name: { en: 'Tunisia', ko: '튀니지', ja: 'チュニジア', cn: '突尼斯', es: 'Túnez' },
        currencyCode: 'TND', currencySymbol: 'DT',
        medianIncome: 5000, giniCoefficient: 0.328,
        pppFactor: 0.78, exchangeRate: 3.1, population: 12000000,
        minimumWage: 5400, medianIncomeLocal: 3900, top10Local: 15000,
        incomeUnit: 1, incomeUnitLabel: { en: 'TND', ko: '디나르' },
        inputPlaceholder: { en: 'e.g. 5000', ko: '예: 5000' }
    },
    AO: {
        name: { en: 'Angola', ko: '앙골라', ja: 'アンゴラ', cn: '安哥拉', es: 'Angola' },
        currencyCode: 'AOA', currencySymbol: 'Kz',
        medianIncome: 2500, giniCoefficient: 0.513,
        pppFactor: 250, exchangeRate: 830, population: 35000000,
        minimumWage: 420000, medianIncomeLocal: 625000, top10Local: 3000000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K AOA', ko: '천콴자' },
        inputPlaceholder: { en: 'e.g. 700', ko: '예: 700' }
    },
    MZ: {
        name: { en: 'Mozambique', ko: '모잠비크', ja: 'モザンビーク', cn: '莫桑比克', es: 'Mozambique' },
        currencyCode: 'MZN', currencySymbol: 'MT',
        medianIncome: 600, giniCoefficient: 0.540,
        pppFactor: 26.5, exchangeRate: 64, population: 33000000,
        minimumWage: 80400, medianIncomeLocal: 15900, top10Local: 100000,
        incomeUnit: 1, incomeUnitLabel: { en: 'MZN', ko: '메티칼' },
        inputPlaceholder: { en: 'e.g. 20000', ko: '예: 20000' }
    },
    CI: {
        name: { en: "Côte d'Ivoire", ko: '코트디부아르', ja: 'コートジボワール', cn: '科特迪瓦', es: "Costa de Marfil" },
        currencyCode: 'XOF', currencySymbol: 'CFA',
        medianIncome: 1800, giniCoefficient: 0.415,
        pppFactor: 260, exchangeRate: 600, population: 28000000,
        minimumWage: 900000, medianIncomeLocal: 468000, top10Local: 2500000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K CFA', ko: '천세파' },
        inputPlaceholder: { en: 'e.g. 500', ko: '예: 500' }
    },
    SN: {
        name: { en: 'Senegal', ko: '세네갈', ja: 'セネガル', cn: '塞内加尔', es: 'Senegal' },
        currencyCode: 'XOF', currencySymbol: 'CFA',
        medianIncome: 1500, giniCoefficient: 0.403,
        pppFactor: 240, exchangeRate: 600, population: 18000000,
        minimumWage: 600000, medianIncomeLocal: 360000, top10Local: 2000000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K CFA', ko: '천세파' },
        inputPlaceholder: { en: 'e.g. 400', ko: '예: 400' }
    },
    CM: {
        name: { en: 'Cameroon', ko: '카메룬', ja: 'カメルーン', cn: '喀麦隆', es: 'Camerún' },
        currencyCode: 'XAF', currencySymbol: 'CFA',
        medianIncome: 1600, giniCoefficient: 0.467,
        pppFactor: 255, exchangeRate: 600, population: 28000000,
        minimumWage: 444000, medianIncomeLocal: 408000, top10Local: 2500000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K CFA', ko: '천세파' },
        inputPlaceholder: { en: 'e.g. 500', ko: '예: 500' }
    },
    ZW: {
        name: { en: 'Zimbabwe', ko: '짐바브웨', ja: 'ジンバブエ', cn: '津巴布韦', es: 'Zimbabue' },
        currencyCode: 'USD', currencySymbol: '$',
        medianIncome: 1100, giniCoefficient: 0.502,
        pppFactor: 1.0, exchangeRate: 1.0, population: 16000000,
        minimumWage: 1200, medianIncomeLocal: 1100, top10Local: 8000,
        incomeUnit: 1, incomeUnitLabel: { en: 'USD', ko: '달러' },
        inputPlaceholder: { en: 'e.g. 1500', ko: '예: 1500' }
    },
    ZM: {
        name: { en: 'Zambia', ko: '잠비아', ja: 'ザンビア', cn: '赞比亚', es: 'Zambia' },
        currencyCode: 'ZMW', currencySymbol: 'ZK',
        medianIncome: 1200, giniCoefficient: 0.571,
        pppFactor: 8.5, exchangeRate: 22, population: 20000000,
        minimumWage: 14400, medianIncomeLocal: 10200, top10Local: 80000,
        incomeUnit: 1, incomeUnitLabel: { en: 'ZMW', ko: '콰차' },
        inputPlaceholder: { en: 'e.g. 15000', ko: '예: 15000' }
    },
    MW: {
        name: { en: 'Malawi', ko: '말라위', ja: 'マラウイ', cn: '马拉维', es: 'Malaui' },
        currencyCode: 'MWK', currencySymbol: 'MK',
        medianIncome: 450, giniCoefficient: 0.447,
        pppFactor: 420, exchangeRate: 1700, population: 20000000,
        minimumWage: 620000, medianIncomeLocal: 189000, top10Local: 1000000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K MWK', ko: '천콰차' },
        inputPlaceholder: { en: 'e.g. 250', ko: '예: 250' }
    },
    RW: {
        name: { en: 'Rwanda', ko: '르완다', ja: 'ルワンダ', cn: '卢旺达', es: 'Ruanda' },
        currencyCode: 'RWF', currencySymbol: 'RF',
        medianIncome: 850, giniCoefficient: 0.437,
        pppFactor: 450, exchangeRate: 1250, population: 14000000,
        minimumWage: 0, medianIncomeLocal: 382500, top10Local: 2000000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K RWF', ko: '천프랑' },
        inputPlaceholder: { en: 'e.g. 400', ko: '예: 400' }
    },
    MG: {
        name: { en: 'Madagascar', ko: '마다가스카르', ja: 'マダガスカル', cn: '马达加斯加', es: 'Madagascar' },
        currencyCode: 'MGA', currencySymbol: 'Ar',
        medianIncome: 500, giniCoefficient: 0.425,
        pppFactor: 1550, exchangeRate: 4500, population: 30000000,
        minimumWage: 2400000, medianIncomeLocal: 775000, top10Local: 4000000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K MGA', ko: '천아리아리' },
        inputPlaceholder: { en: 'e.g. 1000', ko: '예: 1000' }
    },

    // ==================== Central Asia ====================
    KZ: {
        name: { en: 'Kazakhstan', ko: '카자흐스탄', ja: 'カザフスタン', cn: '哈萨克斯坦', es: 'Kazajistán' },
        currencyCode: 'KZT', currencySymbol: '₸',
        medianIncome: 12000, giniCoefficient: 0.275,
        pppFactor: 170, exchangeRate: 460, population: 19500000,
        minimumWage: 840000, medianIncomeLocal: 2040000, top10Local: 6000000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K KZT', ko: '천텡게' },
        inputPlaceholder: { en: 'e.g. 2500', ko: '예: 2500' }
    },
    UZ: {
        name: { en: 'Uzbekistan', ko: '우즈베키스탄', ja: 'ウズベキスタン', cn: '乌兹别克斯坦', es: 'Uzbekistán' },
        currencyCode: 'UZS', currencySymbol: 'сўм',
        medianIncome: 3500, giniCoefficient: 0.353,
        pppFactor: 4200, exchangeRate: 12300, population: 35000000,
        minimumWage: 10800000, medianIncomeLocal: 14700000, top10Local: 50000000,
        incomeUnit: 1000000, incomeUnitLabel: { en: 'M UZS', ko: '백만솜' },
        inputPlaceholder: { en: 'e.g. 15', ko: '예: 15' }
    },
    GE: {
        name: { en: 'Georgia', ko: '조지아', ja: 'ジョージア', cn: '格鲁吉亚', es: 'Georgia' },
        currencyCode: 'GEL', currencySymbol: '₾',
        medianIncome: 7000, giniCoefficient: 0.347,
        pppFactor: 1.15, exchangeRate: 2.7, population: 3700000,
        minimumWage: 3000, medianIncomeLocal: 8050, top10Local: 30000,
        incomeUnit: 1, incomeUnitLabel: { en: 'GEL', ko: '라리' },
        inputPlaceholder: { en: 'e.g. 10000', ko: '예: 10000' }
    },
    AZ: {
        name: { en: 'Azerbaijan', ko: '아제르바이잔', ja: 'アゼルバイジャン', cn: '阿塞拜疆', es: 'Azerbaiyán' },
        currencyCode: 'AZN', currencySymbol: '₼',
        medianIncome: 7500, giniCoefficient: 0.268,
        pppFactor: 0.62, exchangeRate: 1.7, population: 10200000,
        minimumWage: 3600, medianIncomeLocal: 4650, top10Local: 15000,
        incomeUnit: 1, incomeUnitLabel: { en: 'AZN', ko: '마나트' },
        inputPlaceholder: { en: 'e.g. 5000', ko: '예: 5000' }
    },

    // ==================== Southeast Europe / Others ====================
    BY: {
        name: { en: 'Belarus', ko: '벨라루스', ja: 'ベラルーシ', cn: '白俄罗斯', es: 'Bielorrusia' },
        currencyCode: 'BYN', currencySymbol: 'Br',
        medianIncome: 10000, giniCoefficient: 0.253,
        pppFactor: 1.22, exchangeRate: 3.2, population: 9400000,
        minimumWage: 7680, medianIncomeLocal: 12200, top10Local: 35000,
        incomeUnit: 1, incomeUnitLabel: { en: 'BYN', ko: '루블' },
        inputPlaceholder: { en: 'e.g. 15000', ko: '예: 15000' }
    },

    // ==================== Caribbean / Central America ====================
    CU: {
        name: { en: 'Cuba', ko: '쿠바', ja: 'キューバ', cn: '古巴', es: 'Cuba' },
        currencyCode: 'CUP', currencySymbol: '$',
        medianIncome: 4500, giniCoefficient: 0.380,
        pppFactor: 6.0, exchangeRate: 24, population: 11000000,
        minimumWage: 48000, medianIncomeLocal: 27000, top10Local: 100000,
        incomeUnit: 1, incomeUnitLabel: { en: 'CUP', ko: '페소' },
        inputPlaceholder: { en: 'e.g. 30000', ko: '예: 30000' }
    },
    DO: {
        name: { en: 'Dominican Republic', ko: '도미니카공화국', ja: 'ドミニカ共和国', cn: '多米尼加共和国', es: 'República Dominicana' },
        currencyCode: 'DOP', currencySymbol: 'RD$',
        medianIncome: 7000, giniCoefficient: 0.397,
        pppFactor: 26, exchangeRate: 57, population: 11000000,
        minimumWage: 252000, medianIncomeLocal: 182000, top10Local: 800000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K DOP', ko: '천페소' },
        inputPlaceholder: { en: 'e.g. 250', ko: '예: 250' }
    },
    CR: {
        name: { en: 'Costa Rica', ko: '코스타리카', ja: 'コスタリカ', cn: '哥斯达黎加', es: 'Costa Rica' },
        currencyCode: 'CRC', currencySymbol: '₡',
        medianIncome: 10000, giniCoefficient: 0.481,
        pppFactor: 365, exchangeRate: 530, population: 5200000,
        minimumWage: 4200000, medianIncomeLocal: 3650000, top10Local: 12000000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K CRC', ko: '천콜론' },
        inputPlaceholder: { en: 'e.g. 4000', ko: '예: 4000' }
    },
    PA: {
        name: { en: 'Panama', ko: '파나마', ja: 'パナマ', cn: '巴拿马', es: 'Panamá' },
        currencyCode: 'USD', currencySymbol: '$',
        medianIncome: 8500, giniCoefficient: 0.498,
        pppFactor: 0.52, exchangeRate: 1.0, population: 4400000,
        minimumWage: 5616, medianIncomeLocal: 4420, top10Local: 20000,
        incomeUnit: 1, incomeUnitLabel: { en: 'USD', ko: '달러' },
        inputPlaceholder: { en: 'e.g. 6000', ko: '예: 6000' }
    },
    GT: {
        name: { en: 'Guatemala', ko: '과테말라', ja: 'グアテマラ', cn: '危地马拉', es: 'Guatemala' },
        currencyCode: 'GTQ', currencySymbol: 'Q',
        medianIncome: 4500, giniCoefficient: 0.483,
        pppFactor: 4.2, exchangeRate: 7.8, population: 18000000,
        minimumWage: 38352, medianIncomeLocal: 18900, top10Local: 80000,
        incomeUnit: 1, incomeUnitLabel: { en: 'GTQ', ko: '케찰' },
        inputPlaceholder: { en: 'e.g. 25000', ko: '예: 25000' }
    },
    HN: {
        name: { en: 'Honduras', ko: '온두라스', ja: 'ホンジュラス', cn: '洪都拉斯', es: 'Honduras' },
        currencyCode: 'HNL', currencySymbol: 'L',
        medianIncome: 3000, giniCoefficient: 0.482,
        pppFactor: 12.5, exchangeRate: 25, population: 10000000,
        minimumWage: 132000, medianIncomeLocal: 37500, top10Local: 200000,
        incomeUnit: 1, incomeUnitLabel: { en: 'HNL', ko: '렘피라' },
        inputPlaceholder: { en: 'e.g. 50000', ko: '예: 50000' }
    },
    JM: {
        name: { en: 'Jamaica', ko: '자메이카', ja: 'ジャマイカ', cn: '牙买加', es: 'Jamaica' },
        currencyCode: 'JMD', currencySymbol: 'J$',
        medianIncome: 5500, giniCoefficient: 0.359,
        pppFactor: 72, exchangeRate: 155, population: 2800000,
        minimumWage: 520000, medianIncomeLocal: 396000, top10Local: 1500000,
        incomeUnit: 1000, incomeUnitLabel: { en: 'K JMD', ko: '천달러' },
        inputPlaceholder: { en: 'e.g. 450', ko: '예: 450' }
    },
    TT: {
        name: { en: 'Trinidad & Tobago', ko: '트리니다드토바고', ja: 'トリニダード・トバゴ', cn: '特立尼达和多巴哥', es: 'Trinidad y Tobago' },
        currencyCode: 'TTD', currencySymbol: 'TT$',
        medianIncome: 12000, giniCoefficient: 0.402,
        pppFactor: 4.5, exchangeRate: 6.8, population: 1400000,
        minimumWage: 26520, medianIncomeLocal: 54000, top10Local: 150000,
        incomeUnit: 1, incomeUnitLabel: { en: 'TTD', ko: '달러' },
        inputPlaceholder: { en: 'e.g. 60000', ko: '예: 60000' }
    }
};

// ==================== GLOBAL DISTRIBUTION PARAMETERS ====================

const GLOBAL_INCOME_PARAMS = {
    worldPopulation: 8100000000,
    globalMedianIncome: 2920,      // Annual PPP international dollars
    globalMeanIncome: 12000,       // Annual PPP international dollars
    globalGini: 0.65,              // Global Gini coefficient
    dataYear: 2023,
    sources: 'World Bank PIP, OECD, UBS Global Wealth Report 2023',

    // Pre-computed percentile breakpoints (PPP $, for validation & Pareto tail)
    percentileBreakpoints: {
        1:    250,
        5:    500,
        10:   750,
        25:   1500,
        50:   2920,
        75:   8500,
        90:   23000,
        95:   38000,
        99:   72000,
        99.5: 120000,
        99.9: 300000
    }
};

// ==================== INSIGHT QUOTES ====================

const WEALTH_INSIGHTS = [
    {
        maxPercentile: 0.15,
        text: {
            en: 'Every step forward counts. Your journey is uniquely yours.',
            ko: '한 걸음 한 걸음이 소중합니다. 당신의 여정은 고유합니다.',
            ja: '一歩一歩が大切です。あなたの旅は唯一無二です。',
            cn: '每一步都很重要。你的旅程独一无二。',
            es: 'Cada paso adelante cuenta. Tu camino es únicamente tuyo.'
        }
    },
    {
        maxPercentile: 0.30,
        text: {
            en: 'If you have access to clean water and electricity, you already have what billions dream of.',
            ko: '깨끗한 물과 전기를 사용할 수 있다면, 이미 수십억 명이 꿈꾸는 것을 가지고 있습니다.',
            ja: '清潔な水と電気を利用できるなら、数十億人が夢見るものをすでに持っています。',
            cn: '如果你能获得清洁的水和电力，你已经拥有了数十亿人梦寐以求的东西。',
            es: 'Si tienes acceso a agua limpia y electricidad, ya tienes lo que miles de millones sueñan.'
        }
    },
    {
        maxPercentile: 0.50,
        text: {
            en: 'If you have a bank account, you are wealthier than 40% of the world\'s adults.',
            ko: '은행 계좌가 있다면, 전 세계 성인의 40%보다 부유합니다.',
            ja: '銀行口座を持っているなら、世界の成人の40%より裕福です。',
            cn: '如果你有银行账户，你就比世界上40%的成年人更富有。',
            es: 'Si tienes una cuenta bancaria, eres más rico que el 40% de los adultos del mundo.'
        }
    },
    {
        maxPercentile: 0.70,
        text: {
            en: 'If you own a smartphone, you have more computing power than NASA had in the 1960s.',
            ko: '스마트폰을 가지고 있다면, 1960년대 NASA보다 더 강력한 컴퓨팅 능력을 가지고 있습니다.',
            ja: 'スマートフォンを持っているなら、1960年代のNASAより強力なコンピューティング能力を持っています。',
            cn: '如果你拥有智能手机，你拥有的计算能力比1960年代的NASA还强。',
            es: 'Si tienes un smartphone, tienes más poder de cómputo que la NASA en los años 60.'
        }
    },
    {
        maxPercentile: 0.85,
        text: {
            en: 'You earn more than most people on Earth. The average global income is just $12,000 per year.',
            ko: '지구상의 대부분의 사람들보다 많이 벌고 있습니다. 전 세계 평균 소득은 연간 $12,000에 불과합니다.',
            ja: '地球上のほとんどの人より多く稼いでいます。世界の平均所得は年間わずか$12,000です。',
            cn: '你的收入超过了地球上大多数人。全球平均收入仅为每年12,000美元。',
            es: 'Ganas más que la mayoría de personas en la Tierra. El ingreso promedio global es solo $12,000 al año.'
        }
    },
    {
        maxPercentile: 0.95,
        text: {
            en: 'You are in the global elite. Only 1 in 10 people on Earth earns as much as you.',
            ko: '글로벌 상위권에 있습니다. 지구에서 10명 중 1명만이 당신만큼 벌고 있습니다.',
            ja: 'グローバルエリートに入っています。地球上で10人に1人だけがあなたと同じだけ稼いでいます。',
            cn: '你属于全球精英阶层。地球上只有十分之一的人收入与你相当。',
            es: 'Estás en la élite global. Solo 1 de cada 10 personas en la Tierra gana tanto como tú.'
        }
    },
    {
        maxPercentile: 0.99,
        text: {
            en: 'You are wealthier than 95% of all humans who have ever lived.',
            ko: '역사상 존재했던 모든 인류의 95%보다 부유합니다.',
            ja: '歴史上存在したすべての人類の95%より裕福です。',
            cn: '你比历史上95%的人类都更富有。',
            es: 'Eres más rico que el 95% de todos los humanos que han existido.'
        }
    },
    {
        maxPercentile: 1.0,
        text: {
            en: 'You are among the richest people in human history. With great wealth comes great opportunity to make a difference.',
            ko: '인류 역사상 가장 부유한 사람들 중 하나입니다. 큰 부에는 세상을 바꿀 큰 기회가 따릅니다.',
            ja: '人類史上最も裕福な人々の一人です。大きな富には世界を変える大きな機会が伴います。',
            cn: '你是人类历史上最富有的人之一。巨大的财富带来改变世界的巨大机会。',
            es: 'Estás entre las personas más ricas de la historia. Con gran riqueza viene una gran oportunidad de hacer la diferencia.'
        }
    }
];
