// Lifespan Calculator - Main JavaScript
// Global state
let currentStep = 1;
let selectedGender = null;
let lifespanUserData = {};
let lifespanResult = {};
let countdownInterval = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
    initializeLandingCountdown();
    loadDataFromLifeReceipt();
});

// ==================== LANDING PAGE ====================

function initializeLandingCountdown() {
    const countdownEl = document.getElementById('average-countdown');
    if (!countdownEl) return;

    const formats = {
        en: (s) => `47y 3m 12d 07:23:${s}`,
        ko: (s) => `47년 3개월 12일 07:23:${s}`,
        ja: (s) => `47年 3ヶ月 12日 07:23:${s}`,
        cn: (s) => `47年 3个月 12天 07:23:${s}`,
        es: (s) => `47a 3m 12d 07:23:${s}`
    };

    let seconds = 41;
    function updateDisplay() {
        const s = seconds.toString().padStart(2, '0');
        const formatter = formats[currentLang] || formats.en;
        countdownEl.textContent = formatter(s);
    }

    updateDisplay();
    setInterval(() => {
        seconds--;
        if (seconds < 0) seconds = 59;
        updateDisplay();
    }, 1000);
}

// ==================== NAVIGATION ====================

function startLifespanForm() {
    document.getElementById('landing').classList.add('hidden');
    document.getElementById('form').classList.remove('hidden');
    renderStep2();
    renderStep3();
    // Re-apply language to dynamically rendered content
    switchLang(currentLang);
    window.scrollTo(0, 0);
}

function nextStep() {
    if (!validateCurrentStep()) {
        return;
    }

    if (currentStep < 3) {
        document.getElementById(`step-${currentStep}`).classList.add('hidden');
        currentStep++;
        document.getElementById(`step-${currentStep}`).classList.remove('hidden');
        updateProgressBar();
        updateStepIndicators();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function previousStep() {
    if (currentStep > 1) {
        document.getElementById(`step-${currentStep}`).classList.add('hidden');
        currentStep--;
        document.getElementById(`step-${currentStep}`).classList.remove('hidden');
        updateProgressBar();
        updateStepIndicators();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateProgressBar() {
    const progress = (currentStep / 3) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function updateStepIndicators() {
    document.getElementById('current-step').textContent = currentStep;
    document.getElementById('current-step-ko').textContent = currentStep;
    document.getElementById('current-step-ja').textContent = currentStep;
    document.getElementById('current-step-cn').textContent = currentStep;
    document.getElementById('current-step-es').textContent = currentStep;
}

// ==================== FORM RENDERING ====================

function renderStep2() {
    const step2Content = document.getElementById('step-2-content');
    if (!step2Content) return;

    step2Content.innerHTML = `
        <div class="space-y-6">
            <!-- Smoking -->
            <div class="bg-gray-700 bg-opacity-40 p-5 rounded-xl border-2 border-gray-600">
                <label class="block text-sm font-medium mb-3 flex items-center gap-2">
                    <span>🚬</span>
                    <span class="lang-en">Smoking</span>
                    <span class="lang-ko hidden">흡연</span>
                    <span class="lang-ja hidden">喫煙</span>
                    <span class="lang-cn hidden">吸烟</span>
                    <span class="lang-es hidden">Fumar</span>
                </label>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button type="button" onclick="selectOption('smoking', 'none')" id="smoking-none" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="lang-en">Never</div>
                        <div class="lang-ko hidden">안 함</div>
                        <div class="lang-ja hidden">しない</div>
                        <div class="lang-cn hidden">从不</div>
                        <div class="lang-es hidden">Nunca</div>
                    </button>
                    <button type="button" onclick="selectOption('smoking', 'past')" id="smoking-past" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="lang-en">Former</div>
                        <div class="lang-ko hidden">과거</div>
                        <div class="lang-ja hidden">過去</div>
                        <div class="lang-cn hidden">过去</div>
                        <div class="lang-es hidden">Anterior</div>
                    </button>
                    <button type="button" onclick="selectOption('smoking', 'occasional')" id="smoking-occasional" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="lang-en">Occasional</div>
                        <div class="lang-ko hidden">가끔</div>
                        <div class="lang-ja hidden">時々</div>
                        <div class="lang-cn hidden">偶尔</div>
                        <div class="lang-es hidden">Ocasional</div>
                    </button>
                    <button type="button" onclick="selectOption('smoking', 'daily')" id="smoking-daily" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="lang-en">Daily</div>
                        <div class="lang-ko hidden">매일</div>
                        <div class="lang-ja hidden">毎日</div>
                        <div class="lang-cn hidden">每天</div>
                        <div class="lang-es hidden">Diario</div>
                    </button>
                </div>
            </div>

            <!-- Drinking -->
            <div class="bg-gray-700 bg-opacity-40 p-5 rounded-xl border-2 border-gray-600">
                <label class="block text-sm font-medium mb-3 flex items-center gap-2">
                    <span>🍺</span>
                    <span class="lang-en">Alcohol Consumption</span>
                    <span class="lang-ko hidden">음주</span>
                    <span class="lang-ja hidden">飲酒</span>
                    <span class="lang-cn hidden">饮酒</span>
                    <span class="lang-es hidden">Consumo de Alcohol</span>
                </label>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <button type="button" onclick="selectOption('drinking', 'none')" id="drinking-none" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="lang-en">Never</div>
                        <div class="lang-ko hidden">안 함</div>
                        <div class="lang-ja hidden">しない</div>
                        <div class="lang-cn hidden">从不</div>
                        <div class="lang-es hidden">Nunca</div>
                    </button>
                    <button type="button" onclick="selectOption('drinking', 'occasional')" id="drinking-occasional" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="lang-en">Occasional</div>
                        <div class="lang-ko hidden">가끔</div>
                        <div class="lang-ja hidden">時々</div>
                        <div class="lang-cn hidden">偶尔</div>
                        <div class="lang-es hidden">Ocasional</div>
                    </button>
                    <button type="button" onclick="selectOption('drinking', 'moderate')" id="drinking-moderate" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="lang-en">2-3/week</div>
                        <div class="lang-ko hidden">주2-3</div>
                        <div class="lang-ja hidden">週2-3</div>
                        <div class="lang-cn hidden">周2-3</div>
                        <div class="lang-es hidden">2-3/sem</div>
                    </button>
                    <button type="button" onclick="selectOption('drinking', 'daily')" id="drinking-daily" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="lang-en">Daily</div>
                        <div class="lang-ko hidden">매일</div>
                        <div class="lang-ja hidden">毎日</div>
                        <div class="lang-cn hidden">每天</div>
                        <div class="lang-es hidden">Diario</div>
                    </button>
                </div>
            </div>

            <!-- Exercise -->
            <div class="bg-gray-700 bg-opacity-40 p-5 rounded-xl border-2 border-gray-600">
                <label class="block text-sm font-medium mb-3 flex justify-between">
                    <span class="flex items-center gap-2">
                        <span>🏃</span>
                        <span class="lang-en">Exercise (times/week)</span>
                        <span class="lang-ko hidden">운동 (주당 횟수)</span>
                        <span class="lang-ja hidden">運動 (週回数)</span>
                        <span class="lang-cn hidden">运动 (每周次数)</span>
                        <span class="lang-es hidden">Ejercicio (veces/sem)</span>
                    </span>
                    <span id="exercise-value" class="text-gray-400 font-bold">3</span>
                </label>
                <input type="range" id="exercise" min="0" max="7" step="1" value="3" class="w-full" oninput="updateSliderValue('exercise', this.value)">
                <div class="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0</span>
                    <span>7</span>
                </div>
            </div>

            <!-- Sleep -->
            <div class="bg-gray-700 bg-opacity-40 p-5 rounded-xl border-2 border-gray-600">
                <label class="block text-sm font-medium mb-3 flex justify-between">
                    <span class="flex items-center gap-2">
                        <span>😴</span>
                        <span class="lang-en">Sleep (hours/day)</span>
                        <span class="lang-ko hidden">수면 (시간/일)</span>
                        <span class="lang-ja hidden">睡眠 (時間/日)</span>
                        <span class="lang-cn hidden">睡眠 (小时/天)</span>
                        <span class="lang-es hidden">Sueño (horas/día)</span>
                    </span>
                    <span id="sleep-value" class="text-gray-400 font-bold">7h</span>
                </label>
                <input type="range" id="sleep" min="4" max="12" step="0.5" value="7" class="w-full" oninput="updateSliderValue('sleep', this.value + 'h')">
                <div class="flex justify-between text-xs text-gray-400 mt-1">
                    <span>4h</span>
                    <span>12h</span>
                </div>
            </div>

            <!-- Diet -->
            <div class="bg-gray-700 bg-opacity-40 p-5 rounded-xl border-2 border-gray-600">
                <label class="block text-sm font-medium mb-3 flex items-center gap-2">
                    <span>🥗</span>
                    <span class="lang-en">Diet Quality</span>
                    <span class="lang-ko hidden">식습관</span>
                    <span class="lang-ja hidden">食習慣</span>
                    <span class="lang-cn hidden">饮食质量</span>
                    <span class="lang-es hidden">Calidad de Dieta</span>
                </label>
                <div class="grid grid-cols-3 gap-3">
                    <button type="button" onclick="selectOption('diet', 'healthy')" id="diet-healthy" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="text-xl mb-1">🥗</div>
                        <div class="lang-en">Healthy</div>
                        <div class="lang-ko hidden">건강식</div>
                        <div class="lang-ja hidden">健康的</div>
                        <div class="lang-cn hidden">健康</div>
                        <div class="lang-es hidden">Saludable</div>
                    </button>
                    <button type="button" onclick="selectOption('diet', 'balanced')" id="diet-balanced" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="text-xl mb-1">🍱</div>
                        <div class="lang-en">Balanced</div>
                        <div class="lang-ko hidden">보통</div>
                        <div class="lang-ja hidden">普通</div>
                        <div class="lang-cn hidden">均衡</div>
                        <div class="lang-es hidden">Equilibrado</div>
                    </button>
                    <button type="button" onclick="selectOption('diet', 'fast_food')" id="diet-fast_food" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="text-xl mb-1">🍔</div>
                        <div class="lang-en">Fast Food</div>
                        <div class="lang-ko hidden">패스트푸드</div>
                        <div class="lang-ja hidden">ファストフード</div>
                        <div class="lang-cn hidden">快餐</div>
                        <div class="lang-es hidden">Comida Rápida</div>
                    </button>
                </div>
            </div>

            <!-- Sitting Time -->
            <div class="bg-gray-700 bg-opacity-40 p-5 rounded-xl border-2 border-gray-600">
                <label class="block text-sm font-medium mb-3 flex justify-between">
                    <span class="flex items-center gap-2">
                        <span>💺</span>
                        <span class="lang-en">Sitting Time (hours/day)</span>
                        <span class="lang-ko hidden">좌식 시간 (시간/일)</span>
                        <span class="lang-ja hidden">座る時間 (時間/日)</span>
                        <span class="lang-cn hidden">坐着时间 (小时/天)</span>
                        <span class="lang-es hidden">Tiempo Sentado (horas/día)</span>
                    </span>
                    <span id="sitting-value" class="text-gray-400 font-bold">8h</span>
                </label>
                <input type="range" id="sitting" min="2" max="14" step="1" value="8" class="w-full" oninput="updateSliderValue('sitting', this.value + 'h')">
                <div class="flex justify-between text-xs text-gray-400 mt-1">
                    <span>2h</span>
                    <span>14h</span>
                </div>
            </div>

            <!-- Sun Exposure -->
            <div class="bg-gray-700 bg-opacity-40 p-5 rounded-xl border-2 border-gray-600">
                <label class="block text-sm font-medium mb-3 flex items-center gap-2">
                    <span>☀️</span>
                    <span class="lang-en">Sun Exposure</span>
                    <span class="lang-ko hidden">자외선 노출</span>
                    <span class="lang-ja hidden">日光への露出</span>
                    <span class="lang-cn hidden">阳光照射</span>
                    <span class="lang-es hidden">Exposición al Sol</span>
                </label>
                <div class="grid grid-cols-3 gap-3">
                    <button type="button" onclick="selectOption('sun_exposure', 'indoor')" id="sun_exposure-indoor" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="lang-en">Indoor Job</div>
                        <div class="lang-ko hidden">실내직</div>
                        <div class="lang-ja hidden">屋内仕事</div>
                        <div class="lang-cn hidden">室内工作</div>
                        <div class="lang-es hidden">Trabajo Interior</div>
                    </button>
                    <button type="button" onclick="selectOption('sun_exposure', 'normal')" id="sun_exposure-normal" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="lang-en">Normal</div>
                        <div class="lang-ko hidden">보통</div>
                        <div class="lang-ja hidden">普通</div>
                        <div class="lang-cn hidden">正常</div>
                        <div class="lang-es hidden">Normal</div>
                    </button>
                    <button type="button" onclick="selectOption('sun_exposure', 'outdoor')" id="sun_exposure-outdoor" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="lang-en">Outdoor Job</div>
                        <div class="lang-ko hidden">야외직</div>
                        <div class="lang-ja hidden">屋外仕事</div>
                        <div class="lang-cn hidden">户外工作</div>
                        <div class="lang-es hidden">Trabajo Exterior</div>
                    </button>
                </div>
            </div>
        </div>
    `;

    selectOption('smoking', 'none', true);
    selectOption('drinking', 'none', true);
    selectOption('diet', 'balanced', true);
    selectOption('sun_exposure', 'normal', true);
}

function renderStep3() {
    const step3Content = document.getElementById('step-3-content');
    if (!step3Content) return;

    step3Content.innerHTML = `
        <div class="space-y-6">
            <!-- Stress Level -->
            <div class="bg-gray-700 bg-opacity-40 p-5 rounded-xl border-2 border-gray-600">
                <label class="block text-sm font-medium mb-3 flex justify-between">
                    <span class="flex items-center gap-2">
                        <span>😰</span>
                        <span class="lang-en">Stress Level (1-10)</span>
                        <span class="lang-ko hidden">스트레스 수준 (1-10)</span>
                        <span class="lang-ja hidden">ストレスレベル (1-10)</span>
                        <span class="lang-cn hidden">压力水平 (1-10)</span>
                        <span class="lang-es hidden">Nivel de Estrés (1-10)</span>
                    </span>
                    <span id="stress-value" class="text-gray-400 font-bold">5</span>
                </label>
                <input type="range" id="stress" min="1" max="10" step="1" value="5" class="w-full" oninput="updateSliderValue('stress', this.value)">
                <div class="flex justify-between text-xs text-gray-400 mt-1">
                    <span class="lang-en">Low</span><span class="lang-ko hidden">낮음</span><span class="lang-ja hidden">低い</span><span class="lang-cn hidden">低</span><span class="lang-es hidden">Bajo</span>
                    <span class="lang-en">High</span><span class="lang-ko hidden">높음</span><span class="lang-ja hidden">高い</span><span class="lang-cn hidden">高</span><span class="lang-es hidden">Alto</span>
                </div>
            </div>

            <!-- Social Relationships -->
            <div class="bg-gray-700 bg-opacity-40 p-5 rounded-xl border-2 border-gray-600">
                <label class="block text-sm font-medium mb-3 flex items-center gap-2">
                    <span>👥</span>
                    <span class="lang-en">Social Relationships</span>
                    <span class="lang-ko hidden">사회적 관계</span>
                    <span class="lang-ja hidden">社会的関係</span>
                    <span class="lang-cn hidden">社交关系</span>
                    <span class="lang-es hidden">Relaciones Sociales</span>
                </label>
                <div class="grid grid-cols-3 gap-3">
                    <button type="button" onclick="selectOption('social', 'active')" id="social-active" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="lang-en">Active</div>
                        <div class="lang-ko hidden">활발</div>
                        <div class="lang-ja hidden">活発</div>
                        <div class="lang-cn hidden">活跃</div>
                        <div class="lang-es hidden">Activo</div>
                    </button>
                    <button type="button" onclick="selectOption('social', 'normal')" id="social-normal" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="lang-en">Normal</div>
                        <div class="lang-ko hidden">보통</div>
                        <div class="lang-ja hidden">普通</div>
                        <div class="lang-cn hidden">正常</div>
                        <div class="lang-es hidden">Normal</div>
                    </button>
                    <button type="button" onclick="selectOption('social', 'isolated')" id="social-isolated" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="lang-en">Isolated</div>
                        <div class="lang-ko hidden">고립</div>
                        <div class="lang-ja hidden">孤立</div>
                        <div class="lang-cn hidden">孤立</div>
                        <div class="lang-es hidden">Aislado</div>
                    </button>
                </div>
            </div>

            <!-- Partner/Married -->
            <div class="bg-gray-700 bg-opacity-40 p-5 rounded-xl border-2 border-gray-600">
                <label class="block text-sm font-medium mb-3 flex items-center gap-2">
                    <span>💑</span>
                    <span class="lang-en">Partner/Married</span>
                    <span class="lang-ko hidden">배우자 유무</span>
                    <span class="lang-ja hidden">パートナー/既婚</span>
                    <span class="lang-cn hidden">伴侣/已婚</span>
                    <span class="lang-es hidden">Pareja/Casado</span>
                </label>
                <div class="grid grid-cols-2 gap-3">
                    <button type="button" onclick="selectOption('partner', 'true')" id="partner-true" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="lang-en">Yes</div>
                        <div class="lang-ko hidden">예</div>
                        <div class="lang-ja hidden">はい</div>
                        <div class="lang-cn hidden">是</div>
                        <div class="lang-es hidden">Sí</div>
                    </button>
                    <button type="button" onclick="selectOption('partner', 'false')" id="partner-false" class="option-button py-3 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-all border-2 border-gray-600">
                        <div class="lang-en">No</div>
                        <div class="lang-ko hidden">아니오</div>
                        <div class="lang-ja hidden">いいえ</div>
                        <div class="lang-cn hidden">否</div>
                        <div class="lang-es hidden">No</div>
                    </button>
                </div>
            </div>

            <!-- Family History (Accordion) -->
            <div class="border-t-2 border-gray-600 pt-6 mt-6">
                <button onclick="toggleFamilyHistory()" class="w-full text-left font-semibold mb-4 hover:text-gray-400 transition flex justify-between items-center p-4 bg-gray-700 bg-opacity-40 rounded-xl border-2 border-gray-600 border-opacity-20">
                    <span class="flex items-center gap-2">
                        <span class="text-xl">🧬</span>
                        <span class="lang-en">Family History (optional)</span>
                        <span class="lang-ko hidden">가족력 (선택사항)</span>
                        <span class="lang-ja hidden">家族歴 (オプション)</span>
                        <span class="lang-cn hidden">家族史 (可选)</span>
                        <span class="lang-es hidden">Historial Familiar (opcional)</span>
                    </span>
                    <span id="family-arrow" class="transform transition-transform text-gray-400 text-xl">▼</span>
                </button>

                <div id="family-history" class="hidden space-y-4 pt-4">
                    <div class="bg-gray-700 bg-opacity-40 p-5 rounded-xl border-2 border-gray-600">
                        <p class="text-sm text-gray-400 mb-4">
                            <span class="lang-en">This helps calculate "time remaining with parents"</span>
                            <span class="lang-ko hidden">부모님과의 남은 시간 계산에 도움이 됩니다</span>
                            <span class="lang-ja hidden">両親との残り時間を計算するのに役立ちます</span>
                            <span class="lang-cn hidden">这有助于计算"与父母剩余的时间"</span>
                            <span class="lang-es hidden">Esto ayuda a calcular el "tiempo restante con los padres"</span>
                        </p>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm mb-2">
                                    <span class="lang-en">Mother's Current Age</span>
                                    <span class="lang-ko hidden">어머니 현재 나이</span>
                                    <span class="lang-ja hidden">母の現在の年齢</span>
                                    <span class="lang-cn hidden">母亲当前年龄</span>
                                    <span class="lang-es hidden">Edad Actual de Madre</span>
                                </label>
                                <input type="number" id="parent_age_mother" min="40" max="120" placeholder="-" class="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border-2 border-gray-600">
                            </div>
                            <div>
                                <label class="block text-sm mb-2">
                                    <span class="lang-en">Father's Current Age</span>
                                    <span class="lang-ko hidden">아버지 현재 나이</span>
                                    <span class="lang-ja hidden">父の現在の年齢</span>
                                    <span class="lang-cn hidden">父亲当前年龄</span>
                                    <span class="lang-es hidden">Edad Actual de Padre</span>
                                </label>
                                <input type="number" id="parent_age_father" min="40" max="120" placeholder="-" class="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border-2 border-gray-600">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    selectOption('social', 'normal', true);
    selectOption('partner', 'false', true);
}

function toggleFamilyHistory() {
    const familyHistory = document.getElementById('family-history');
    const arrow = document.getElementById('family-arrow');
    familyHistory.classList.toggle('hidden');
    arrow.style.transform = familyHistory.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
}

// ==================== FORM UTILITIES ====================

function selectGender(gender) {
    selectedGender = gender;
    const mBtn = document.getElementById('gender-M');
    const fBtn = document.getElementById('gender-F');

    [mBtn, fBtn].forEach(btn => {
        btn.classList.remove('bg-gray-500', 'text-white', 'border-gray-400');
        btn.classList.add('bg-gray-700', 'border-gray-600');
    });

    const selectedBtn = gender === 'M' ? mBtn : fBtn;
    selectedBtn.classList.remove('bg-gray-700', 'border-gray-600');
    selectedBtn.classList.add('bg-gray-500', 'text-white', 'border-gray-400');
}

function selectOption(category, value, silent = false) {
    if (!lifespanUserData) lifespanUserData = {};
    lifespanUserData[category] = value;

    const buttons = document.querySelectorAll(`[id^="${category}-"]`);
    buttons.forEach(btn => {
        btn.classList.remove('ring-4', 'ring-gray-500', 'bg-gray-600');
        btn.classList.add('bg-gray-800');
    });

    const selectedBtn = document.getElementById(`${category}-${value}`);
    if (selectedBtn) {
        selectedBtn.classList.remove('bg-gray-800');
        selectedBtn.classList.add('ring-4', 'ring-gray-500', 'bg-gray-600');
    }
}

function updateSliderValue(id, value) {
    document.getElementById(`${id}-value`).textContent = value;
}

function validateCurrentStep() {
    if (currentStep === 1) {
        const birthdate = document.getElementById('birthdate').value;
        const height = document.getElementById('height').value;
        const weight = document.getElementById('weight').value;

        if (!birthdate || !selectedGender || !height || !weight) {
            const msg = {
                en: 'Please fill in all required fields',
                ko: '필수 항목을 모두 입력해주세요',
                ja: 'すべての必須フィールドに入力してください',
                cn: '请填写所有必填字段',
                es: 'Por favor complete todos los campos requeridos'
            };
            alert(msg[currentLang] || msg.en);
            return false;
        }

        const age = calculateAge(birthdate);
        if (age.years < 13) {
            const msg = {
                en: 'You must be at least 13 years old to use this service',
                ko: '이 서비스를 이용하려면 13세 이상이어야 합니다',
                ja: 'このサービスを利用するには13歳以上である必要があります',
                cn: '您必须年满 13 岁才能使用此服务',
                es: 'Debes tener al menos 13 años para usar este servicio'
            };
            alert(msg[currentLang] || msg.en);
            return false;
        }
    }

    return true;
}

// ==================== CALCULATION ENGINE ====================

function calculateLifespanResult() {
    document.getElementById('form').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');
    window.scrollTo(0, 0);

    lifespanUserData = {
        birthdate: document.getElementById('birthdate').value,
        country: document.getElementById('country').value,
        gender: selectedGender,
        height: parseFloat(document.getElementById('height').value),
        weight: parseFloat(document.getElementById('weight').value),
        smoking: lifespanUserData.smoking || 'none',
        drinking: lifespanUserData.drinking || 'none',
        exercise: parseInt(document.getElementById('exercise').value),
        sleep: parseFloat(document.getElementById('sleep').value),
        diet: lifespanUserData.diet || 'balanced',
        sitting: parseInt(document.getElementById('sitting').value),
        sun_exposure: lifespanUserData.sun_exposure || 'normal',
        stress: parseInt(document.getElementById('stress').value),
        social: lifespanUserData.social || 'normal',
        partner: lifespanUserData.partner === 'true',
        parent_age_mother: document.getElementById('parent_age_mother')?.value || null,
        parent_age_father: document.getElementById('parent_age_father')?.value || null
    };

    saveDataForLifeReceipt();

    setTimeout(() => {
        lifespanResult = calculateLifespan(lifespanUserData);
        renderResults();
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('result').classList.remove('hidden');
        startCountdownTimer();
        // Re-apply language to dynamically rendered result content
        switchLang(currentLang);
        window.scrollTo(0, 0);
    }, 3000);
}

function calculateLifespan(userData) {
    const ageData = calculateAge(userData.birthdate);
    const currentAge = ageData.years;
    const baseLifeExpectancy = getLifeExpectancy(userData.country, userData.gender);
    const heightM = userData.height / 100;
    const bmi = userData.weight / (heightM * heightM);

    const adjustmentFactors = {};

    if (bmi < 18.5) {
        adjustmentFactors.bmi = -3.0;
    } else if (bmi >= 18.5 && bmi < 25) {
        adjustmentFactors.bmi = 0;
    } else if (bmi >= 25 && bmi < 30) {
        adjustmentFactors.bmi = -2.0;
    } else {
        adjustmentFactors.bmi = -5.0;
    }

    const smokingImpact = { none: 0, past: -2.0, occasional: -5.0, daily: -10.0 };
    adjustmentFactors.smoking = smokingImpact[userData.smoking] || 0;

    const drinkingImpact = { none: 0, occasional: 0, moderate: -1.0, daily: -5.0 };
    adjustmentFactors.drinking = drinkingImpact[userData.drinking] || 0;

    if (userData.exercise >= 5) adjustmentFactors.exercise = 4.5;
    else if (userData.exercise >= 3) adjustmentFactors.exercise = 3.0;
    else if (userData.exercise >= 1) adjustmentFactors.exercise = 1.5;
    else adjustmentFactors.exercise = -3.0;

    if (userData.sleep >= 7 && userData.sleep <= 8) adjustmentFactors.sleep = 1.0;
    else if (userData.sleep >= 6 && userData.sleep <= 9) adjustmentFactors.sleep = 0;
    else adjustmentFactors.sleep = -3.0;

    const dietImpact = { healthy: 4.0, balanced: 0, fast_food: -3.0 };
    adjustmentFactors.diet = dietImpact[userData.diet] || 0;

    if (userData.sitting <= 6) adjustmentFactors.sitting = 1.0;
    else if (userData.sitting <= 8) adjustmentFactors.sitting = 0;
    else adjustmentFactors.sitting = -2.0;

    const sunImpact = { indoor: 0, normal: 0, outdoor: -0.5 };
    adjustmentFactors.sun_exposure = sunImpact[userData.sun_exposure] || 0;

    if (userData.stress <= 3) adjustmentFactors.stress = 1.0;
    else if (userData.stress <= 7) adjustmentFactors.stress = 0;
    else adjustmentFactors.stress = -3.0;

    const socialImpact = { active: 2.0, normal: 0, isolated: -5.0 };
    adjustmentFactors.social = socialImpact[userData.social] || 0;

    if (userData.partner) adjustmentFactors.partner = userData.gender === 'M' ? 3.0 : 1.5;
    else adjustmentFactors.partner = 0;

    let totalAdjustment = Object.values(adjustmentFactors).reduce((sum, val) => sum + val, 0);
    totalAdjustment = Math.max(-20, Math.min(15, totalAdjustment));

    let adjustedLifeExpectancy = baseLifeExpectancy + totalAdjustment;

    const seed = `${userData.birthdate}-${userData.country}-${userData.gender}-${userData.height}-${userData.weight}`;
    const hash = Array.from(seed).reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0);
    const deterministicVariation = ((((hash % 2000) + 2000) % 2000) / 1000) - 1.0;
    adjustedLifeExpectancy += deterministicVariation;

    const minLifeExpectancy = currentAge + 5;
    const maxLifeExpectancy = baseLifeExpectancy + 20;
    adjustedLifeExpectancy = Math.max(minLifeExpectancy, Math.min(maxLifeExpectancy, adjustedLifeExpectancy));

    const yearsRemaining = adjustedLifeExpectancy - currentAge;
    const lifeProgressPercent = (currentAge / adjustedLifeExpectancy) * 100;
    const emotionalMetrics = calculateEmotionalMetrics(yearsRemaining, userData);

    return {
        currentAge: Math.floor(currentAge),
        baseLifeExpectancy: Math.round(baseLifeExpectancy),
        adjustedLifeExpectancy: Math.round(adjustedLifeExpectancy * 10) / 10,
        adjustmentFactors,
        totalAdjustment: Math.round(totalAdjustment * 10) / 10,
        yearsRemaining: Math.round(yearsRemaining * 10) / 10,
        lifeProgressPercent: Math.round(lifeProgressPercent * 10) / 10,
        bmi: Math.round((userData.weight / Math.pow(userData.height / 100, 2)) * 10) / 10,
        ...emotionalMetrics
    };
}

function calculateEmotionalMetrics(yearsRemaining, userData) {
    const remainingSeasons = {
        spring: Math.floor(yearsRemaining),
        summer: Math.floor(yearsRemaining),
        fall: Math.floor(yearsRemaining),
        winter: Math.floor(yearsRemaining)
    };
    const remainingWeekends = Math.floor(yearsRemaining * 52);
    const primaryHoliday = getPrimaryHoliday(userData.country);
    const remainingHolidays = Math.floor(yearsRemaining);
    const remainingBirthdays = Math.floor(yearsRemaining);
    const remainingMeals = Math.floor(yearsRemaining * 365.25 * 3);

    let timeWithParents = null;
    if (userData.parent_age_mother || userData.parent_age_father) {
        timeWithParents = calculateParentTime(userData, yearsRemaining);
    }

    return { remainingSeasons, remainingWeekends, remainingHolidays, primaryHoliday, remainingBirthdays, remainingMeals, timeWithParents };
}

function calculateParentTime(userData, yearsRemaining) {
    const result = {};

    if (userData.parent_age_mother) {
        const motherAge = parseInt(userData.parent_age_mother);
        const motherLifeExpectancy = getLifeExpectancy(userData.country, 'F');
        const motherYearsRemaining = Math.max(0, motherLifeExpectancy - motherAge);
        const yearsWithMother = Math.min(yearsRemaining, motherYearsRemaining);
        result.mother = {
            yearsRemaining: Math.round(yearsWithMother * 10) / 10,
            daysRemaining: Math.floor(yearsWithMother * 24),
            meetingsRemaining: Math.floor(yearsWithMother * 24)
        };
    }

    if (userData.parent_age_father) {
        const fatherAge = parseInt(userData.parent_age_father);
        const fatherLifeExpectancy = getLifeExpectancy(userData.country, 'M');
        const fatherYearsRemaining = Math.max(0, fatherLifeExpectancy - fatherAge);
        const yearsWithFather = Math.min(yearsRemaining, fatherYearsRemaining);
        result.father = {
            yearsRemaining: Math.round(yearsWithFather * 10) / 10,
            daysRemaining: Math.floor(yearsWithFather * 24),
            meetingsRemaining: Math.floor(yearsWithFather * 24)
        };
    }

    return result;
}

// ==================== FACTOR DETAILS (for result page) ====================

function getFactorConfig() {
    const ud = lifespanUserData;
    const bmi = lifespanResult.bmi;
    const factors = lifespanResult.adjustmentFactors;

    const bmiCategory = bmi < 18.5 ? 'underweight' : bmi < 25 ? 'normal' : bmi < 30 ? 'overweight' : 'obese';

    return {
        bmi: {
            icon: '⚖️',
            name: { en: 'Body Mass Index', ko: '체질량지수(BMI)', ja: 'BMI', cn: '体重指数', es: 'IMC' },
            choice: {
                underweight: { en: `${bmi} — Underweight`, ko: `${bmi} — 저체중`, ja: `${bmi} — 低体重`, cn: `${bmi} — 偏瘦`, es: `${bmi} — Bajo peso` },
                normal: { en: `${bmi} — Normal`, ko: `${bmi} — 정상`, ja: `${bmi} — 標準`, cn: `${bmi} — 正常`, es: `${bmi} — Normal` },
                overweight: { en: `${bmi} — Overweight`, ko: `${bmi} — 과체중`, ja: `${bmi} — 過体重`, cn: `${bmi} — 超重`, es: `${bmi} — Sobrepeso` },
                obese: { en: `${bmi} — Obese`, ko: `${bmi} — 비만`, ja: `${bmi} — 肥満`, cn: `${bmi} — 肥胖`, es: `${bmi} — Obeso` }
            }[bmiCategory],
            explanation: {
                underweight: { en: 'Being underweight can weaken your immune system and increase risk of osteoporosis and infections.', ko: '저체중은 면역 체계를 약화시키고 골다공증 및 감염 위험을 높일 수 있습니다.' },
                normal: { en: 'Your BMI is in the healthy range. Maintaining a normal weight reduces risks of heart disease and diabetes.', ko: 'BMI가 건강한 범위에 있습니다. 정상 체중 유지는 심장병과 당뇨병 위험을 줄여줍니다.' },
                overweight: { en: 'Being overweight increases risk of cardiovascular disease. Moderate weight loss can add years to your life.', ko: '과체중은 심혈관 질환 위험을 높입니다. 적당한 체중 감량이 수명을 연장할 수 있습니다.' },
                obese: { en: 'Obesity significantly increases risks of heart disease, stroke, diabetes, and certain cancers.', ko: '비만은 심장병, 뇌졸중, 당뇨병 및 특정 암의 위험을 크게 높입니다.' }
            }[bmiCategory]
        },
        smoking: {
            icon: '🚬',
            name: { en: 'Smoking', ko: '흡연', ja: '喫煙', cn: '吸烟', es: 'Tabaquismo' },
            choice: {
                none: { en: 'Never smoked', ko: '비흡연', ja: '喫煙しない', cn: '从不吸烟', es: 'No fumador' },
                past: { en: 'Former smoker', ko: '과거 흡연자', ja: '元喫煙者', cn: '曾经吸烟', es: 'Ex fumador' },
                occasional: { en: 'Occasional smoker', ko: '가끔 흡연', ja: '時々喫煙', cn: '偶尔吸烟', es: 'Fumador ocasional' },
                daily: { en: 'Daily smoker', ko: '매일 흡연', ja: '毎日喫煙', cn: '每天吸烟', es: 'Fumador diario' }
            }[ud.smoking],
            explanation: {
                none: { en: 'Non-smoking is the single most impactful lifestyle choice for longevity.', ko: '비흡연은 장수에 가장 큰 영향을 미치는 생활습관입니다.' },
                past: { en: 'Quitting smoking was a great decision. Your body continues to recover over time.', ko: '금연은 훌륭한 결정이었습니다. 시간이 지나면서 신체가 계속 회복됩니다.' },
                occasional: { en: 'Even occasional smoking damages lungs and blood vessels. Each cigarette shortens life by ~11 minutes.', ko: '가끔 흡연도 폐와 혈관에 손상을 줍니다. 담배 1개비당 수명이 약 11분 줄어듭니다.' },
                daily: { en: 'Daily smoking is the #1 preventable cause of death. Quitting at any age provides major benefits.', ko: '매일 흡연은 예방 가능한 사망 원인 1위입니다. 어떤 나이에든 금연은 큰 도움이 됩니다.' }
            }[ud.smoking]
        },
        drinking: {
            icon: '🍺',
            name: { en: 'Alcohol', ko: '음주', ja: '飲酒', cn: '饮酒', es: 'Alcohol' },
            choice: {
                none: { en: 'Non-drinker', ko: '비음주', ja: '飲酒しない', cn: '不饮酒', es: 'No bebedor' },
                occasional: { en: 'Occasional', ko: '가끔', ja: '時々', cn: '偶尔', es: 'Ocasional' },
                moderate: { en: '2-3 times/week', ko: '주 2-3회', ja: '週2-3回', cn: '每周2-3次', es: '2-3 veces/sem' },
                daily: { en: 'Daily drinker', ko: '매일 음주', ja: '毎日飲酒', cn: '每天饮酒', es: 'Bebedor diario' }
            }[ud.drinking],
            explanation: {
                none: { en: 'Abstaining from alcohol eliminates risks of liver disease and alcohol-related accidents.', ko: '금주는 간 질환 및 음주 관련 사고 위험을 없앱니다.' },
                occasional: { en: 'Occasional drinking has minimal health impact. Moderation is key.', ko: '가끔 음주는 건강에 미치는 영향이 미미합니다. 절제가 핵심입니다.' },
                moderate: { en: 'Regular alcohol consumption increases liver disease risk. Consider reducing intake.', ko: '규칙적인 음주는 간 질환 위험을 높입니다. 음주량을 줄이는 것을 고려하세요.' },
                daily: { en: 'Daily drinking significantly raises risks of liver cirrhosis, cancer, and cardiovascular disease.', ko: '매일 음주는 간경변, 암, 심혈관 질환의 위험을 크게 높입니다.' }
            }[ud.drinking]
        },
        exercise: {
            icon: '🏃',
            name: { en: 'Exercise', ko: '운동', ja: '運動', cn: '运动', es: 'Ejercicio' },
            choice: (() => {
                const v = ud.exercise;
                if (v === 0) return { en: 'No exercise', ko: '운동 안 함', ja: '運動なし', cn: '不运动', es: 'Sin ejercicio' };
                return { en: `${v} times/week`, ko: `주 ${v}회`, ja: `週${v}回`, cn: `每周${v}次`, es: `${v} veces/sem` };
            })(),
            explanation: (() => {
                if (ud.exercise >= 5) return { en: 'Excellent exercise habit! 5+ sessions/week provides maximum cardiovascular and longevity benefits.', ko: '훌륭한 운동 습관! 주 5회 이상은 심혈관 건강과 장수에 최대의 효과를 줍니다.' };
                if (ud.exercise >= 3) return { en: 'Good exercise frequency. 3-4 sessions/week significantly reduces chronic disease risk.', ko: '좋은 운동 빈도입니다. 주 3-4회는 만성 질환 위험을 크게 줄여줍니다.' };
                if (ud.exercise >= 1) return { en: 'Some exercise is better than none. Increasing to 3+ times/week would add more years.', ko: '운동을 안 하는 것보다 낫습니다. 주 3회 이상으로 늘리면 더 많은 수명이 늘어납니다.' };
                return { en: 'No exercise is equivalent to smoking in health risk. Even 15 min/day of walking helps.', ko: '운동 부족은 흡연만큼 건강에 해롭습니다. 하루 15분 걷기만으로도 도움이 됩니다.' };
            })()
        },
        sleep: {
            icon: '😴',
            name: { en: 'Sleep', ko: '수면', ja: '睡眠', cn: '睡眠', es: 'Sueño' },
            choice: { en: `${ud.sleep}h/day`, ko: `하루 ${ud.sleep}시간`, ja: `${ud.sleep}時間/日`, cn: `${ud.sleep}小时/天`, es: `${ud.sleep}h/día` },
            explanation: (() => {
                if (ud.sleep >= 7 && ud.sleep <= 8) return { en: 'Optimal sleep duration! 7-8 hours supports immune function, memory, and heart health.', ko: '최적의 수면 시간! 7-8시간은 면역 기능, 기억력, 심장 건강을 돕습니다.' };
                if (ud.sleep >= 6 && ud.sleep <= 9) return { en: 'Acceptable sleep range. Closer to 7-8 hours would be ideal for long-term health.', ko: '허용 가능한 수면 범위입니다. 7-8시간에 가까울수록 장기 건강에 이상적입니다.' };
                if (ud.sleep < 6) return { en: 'Sleep deprivation increases risks of obesity, diabetes, heart disease, and cognitive decline.', ko: '수면 부족은 비만, 당뇨, 심장병, 인지 저하의 위험을 높입니다.' };
                return { en: 'Excessive sleep (9+ hours) is associated with higher mortality risk. Aim for 7-8 hours.', ko: '과도한 수면(9시간 이상)은 사망률 증가와 관련이 있습니다. 7-8시간을 목표로 하세요.' };
            })()
        },
        diet: {
            icon: '🥗',
            name: { en: 'Diet', ko: '식습관', ja: '食習慣', cn: '饮食', es: 'Dieta' },
            choice: {
                healthy: { en: 'Healthy diet', ko: '건강식', ja: '健康的', cn: '健康饮食', es: 'Dieta saludable' },
                balanced: { en: 'Balanced diet', ko: '균형 잡힌 식사', ja: '普通', cn: '均衡饮食', es: 'Dieta equilibrada' },
                fast_food: { en: 'Fast food heavy', ko: '패스트푸드 위주', ja: 'ファストフード中心', cn: '快餐为主', es: 'Comida rápida' }
            }[ud.diet],
            explanation: {
                healthy: { en: 'A nutrient-rich diet with fruits, vegetables, and whole grains is one of the strongest predictors of longevity.', ko: '과일, 채소, 통곡물이 풍부한 식단은 장수의 가장 강력한 예측 인자 중 하나입니다.' },
                balanced: { en: 'A balanced diet provides adequate nutrition. Adding more fruits and vegetables would further improve outcomes.', ko: '균형 잡힌 식단은 적절한 영양을 제공합니다. 과일과 채소를 더 추가하면 더 좋아집니다.' },
                fast_food: { en: 'Fast food diets high in sodium, sugar, and trans fats significantly increase cardiovascular disease and cancer risks.', ko: '나트륨, 설탕, 트랜스 지방이 많은 패스트푸드 식단은 심혈관 질환과 암 위험을 크게 높입니다.' }
            }[ud.diet]
        },
        sitting: {
            icon: '💺',
            name: { en: 'Sitting Time', ko: '좌식 시간', ja: '座る時間', cn: '久坐时间', es: 'Tiempo Sentado' },
            choice: { en: `${ud.sitting}h/day`, ko: `하루 ${ud.sitting}시간`, ja: `${ud.sitting}時間/日`, cn: `${ud.sitting}小时/天`, es: `${ud.sitting}h/día` },
            explanation: (() => {
                if (ud.sitting <= 6) return { en: 'Good! Lower sitting time reduces risks of metabolic syndrome and cardiovascular disease.', ko: '좋습니다! 적은 좌식 시간은 대사 증후군과 심혈관 질환 위험을 줄여줍니다.' };
                if (ud.sitting <= 8) return { en: 'Average sitting time. Try to take breaks every 30-60 minutes to reduce health risks.', ko: '평균적인 좌식 시간입니다. 30-60분마다 휴식을 취하면 건강 위험을 줄일 수 있습니다.' };
                return { en: 'Prolonged sitting (8+ hours) is called "the new smoking." Stand up regularly to counteract risks.', ko: '장시간 앉기(8시간 이상)는 "새로운 흡연"이라 불립니다. 정기적으로 일어나세요.' };
            })()
        },
        sun_exposure: {
            icon: '☀️',
            name: { en: 'Sun Exposure', ko: '자외선 노출', ja: '日光', cn: '阳光照射', es: 'Exposición Solar' },
            choice: {
                indoor: { en: 'Indoor work', ko: '실내 근무', ja: '屋内仕事', cn: '室内工作', es: 'Trabajo interior' },
                normal: { en: 'Normal exposure', ko: '보통', ja: '普通', cn: '正常', es: 'Normal' },
                outdoor: { en: 'Outdoor work', ko: '야외 근무', ja: '屋外仕事', cn: '户外工作', es: 'Trabajo exterior' }
            }[ud.sun_exposure],
            explanation: {
                indoor: { en: 'Indoor work reduces UV damage but consider vitamin D supplementation for bone health.', ko: '실내 근무는 자외선 손상을 줄이지만 뼈 건강을 위해 비타민 D 보충을 고려하세요.' },
                normal: { en: 'Moderate sun exposure provides vitamin D benefits without excessive skin damage risk.', ko: '적당한 햇빛 노출은 과도한 피부 손상 없이 비타민 D 혜택을 제공합니다.' },
                outdoor: { en: 'Prolonged UV exposure increases skin cancer risk. Use sunscreen and protective clothing.', ko: '장시간 자외선 노출은 피부암 위험을 높입니다. 자외선 차단제와 보호복을 사용하세요.' }
            }[ud.sun_exposure]
        },
        stress: {
            icon: '😰',
            name: { en: 'Stress', ko: '스트레스', ja: 'ストレス', cn: '压力', es: 'Estrés' },
            choice: (() => {
                if (ud.stress <= 3) return { en: `Level ${ud.stress} — Low`, ko: `${ud.stress}단계 — 낮음`, ja: `レベル${ud.stress} — 低い`, cn: `${ud.stress}级 — 低`, es: `Nivel ${ud.stress} — Bajo` };
                if (ud.stress <= 7) return { en: `Level ${ud.stress} — Moderate`, ko: `${ud.stress}단계 — 보통`, ja: `レベル${ud.stress} — 中`, cn: `${ud.stress}级 — 中`, es: `Nivel ${ud.stress} — Moderado` };
                return { en: `Level ${ud.stress} — High`, ko: `${ud.stress}단계 — 높음`, ja: `レベル${ud.stress} — 高い`, cn: `${ud.stress}级 — 高`, es: `Nivel ${ud.stress} — Alto` };
            })(),
            explanation: (() => {
                if (ud.stress <= 3) return { en: 'Low stress levels support immune function and cardiovascular health. Keep it up!', ko: '낮은 스트레스는 면역 기능과 심혈관 건강을 지원합니다. 잘 유지하세요!' };
                if (ud.stress <= 7) return { en: 'Moderate stress is normal. Mindfulness, exercise, and social connection can help manage it.', ko: '적당한 스트레스는 정상입니다. 명상, 운동, 사회적 교류가 관리에 도움이 됩니다.' };
                return { en: 'Chronic high stress increases cortisol, raising risks of heart disease, depression, and weakened immunity.', ko: '만성적 고스트레스는 코르티솔을 증가시켜 심장병, 우울증, 면역력 저하 위험을 높입니다.' };
            })()
        },
        social: {
            icon: '👥',
            name: { en: 'Social Life', ko: '사회적 관계', ja: '社会生活', cn: '社交生活', es: 'Vida Social' },
            choice: {
                active: { en: 'Active social life', ko: '활발한 사회생활', ja: '活発な社会生活', cn: '活跃的社交', es: 'Vida social activa' },
                normal: { en: 'Normal social life', ko: '보통 사회생활', ja: '普通の社会生活', cn: '正常社交', es: 'Vida social normal' },
                isolated: { en: 'Socially isolated', ko: '사회적 고립', ja: '社会的孤立', cn: '社交孤立', es: 'Aislamiento social' }
            }[ud.social],
            explanation: {
                active: { en: 'Strong social connections are as powerful as exercise in extending lifespan. Loneliness is a major health risk.', ko: '강한 사회적 유대는 운동만큼 수명 연장에 효과적입니다. 외로움은 주요 건강 위험입니다.' },
                normal: { en: 'Normal social connections provide baseline health benefits. Deepening relationships may add more years.', ko: '보통 수준의 사회적 관계는 기본적인 건강 혜택을 제공합니다. 관계를 깊게 하면 더 도움이 됩니다.' },
                isolated: { en: 'Social isolation is as harmful as smoking 15 cigarettes/day. Building connections can significantly extend life.', ko: '사회적 고립은 하루 담배 15개비만큼 해롭습니다. 관계를 구축하면 수명이 크게 늘어날 수 있습니다.' }
            }[ud.social]
        },
        partner: {
            icon: '💑',
            name: { en: 'Partnership', ko: '배우자 유무', ja: 'パートナー', cn: '伴侣', es: 'Pareja' },
            choice: ud.partner
                ? { en: 'Has partner', ko: '배우자 있음', ja: 'パートナーあり', cn: '有伴侣', es: 'Con pareja' }
                : { en: 'No partner', ko: '배우자 없음', ja: 'パートナーなし', cn: '无伴侣', es: 'Sin pareja' },
            explanation: ud.partner
                ? { en: 'Marriage/partnership provides emotional support, healthier habits, and better stress management.', ko: '결혼/배우자 관계는 정서적 지지, 건강한 습관, 더 나은 스트레스 관리를 제공합니다.' }
                : { en: 'Being single has no inherent health penalty. Strong friendships and social networks provide similar benefits.', ko: '미혼이 건강에 불리한 것은 아닙니다. 강한 우정과 사회적 네트워크가 비슷한 효과를 줍니다.' }
        }
    };
}

// ==================== RESULTS RENDERING ====================

function renderResults() {
    const container = document.getElementById('result-container');
    if (!container) return;

    const result = lifespanResult;
    const isPositiveNet = result.totalAdjustment >= 0;

    container.innerHTML = `
        <!-- Hero: Expected Lifespan -->
        <div class="text-center mb-10 fade-in">
            <h1 class="text-4xl md:text-6xl font-extrabold mb-6 countdown-glow">
                <span class="lang-en">YOUR LIFE CLOCK</span>
                <span class="lang-ko hidden">나의 생명 시계</span>
                <span class="lang-ja hidden">あなたの生命時計</span>
                <span class="lang-cn hidden">你的生命时钟</span>
                <span class="lang-es hidden">TU RELOJ DE VIDA</span>
            </h1>

            <div class="mb-6">
                <p class="text-lg text-gray-400 mb-2">
                    <span class="lang-en">Expected Lifespan</span>
                    <span class="lang-ko hidden">예상 수명</span>
                    <span class="lang-ja hidden">予想寿命</span>
                    <span class="lang-cn hidden">预期寿命</span>
                    <span class="lang-es hidden">Esperanza de Vida</span>
                </p>
                <p class="text-7xl md:text-9xl font-black text-white tracking-tight">
                    ${result.adjustedLifeExpectancy}
                </p>
                <p class="text-2xl text-gray-400 mt-1">
                    <span class="lang-en">years old</span>
                    <span class="lang-ko hidden">세</span>
                    <span class="lang-ja hidden">歳</span>
                    <span class="lang-cn hidden">岁</span>
                    <span class="lang-es hidden">años</span>
                </p>
            </div>

            <!-- Live Countdown -->
            <div class="mb-8">
                <p class="text-sm text-gray-500 mb-2 uppercase tracking-wider">
                    <span class="lang-en">Time Remaining</span>
                    <span class="lang-ko hidden">남은 시간</span>
                    <span class="lang-ja hidden">残り時間</span>
                    <span class="lang-cn hidden">剩余时间</span>
                    <span class="lang-es hidden">Tiempo Restante</span>
                </p>
                <div id="countdown-display" class="mono-font text-3xl md:text-5xl text-gray-300 font-bold"></div>
            </div>

            <!-- Life Progress Bar -->
            <div class="max-w-xl mx-auto mb-4">
                <div class="flex justify-between text-xs text-gray-500 mb-1">
                    <span>0</span>
                    <span>${result.currentAge}
                        <span class="lang-en">years old</span>
                        <span class="lang-ko hidden">세 (현재)</span>
                        <span class="lang-ja hidden">歳</span>
                        <span class="lang-cn hidden">岁</span>
                        <span class="lang-es hidden">años</span>
                    </span>
                    <span>${result.adjustedLifeExpectancy}</span>
                </div>
                <div class="w-full bg-gray-800 rounded-full h-4 overflow-hidden border border-gray-700">
                    <div class="bg-gradient-to-r from-gray-500 to-gray-300 h-4 rounded-full transition-all duration-1000 relative" style="width: ${result.lifeProgressPercent}%">
                        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                    </div>
                </div>
                <p class="text-sm text-gray-500 mt-2">
                    ${result.lifeProgressPercent}%
                    <span class="lang-en">of your life has passed</span>
                    <span class="lang-ko hidden">의 인생이 지나갔습니다</span>
                    <span class="lang-ja hidden">が過ぎました</span>
                    <span class="lang-cn hidden">的人生已经过去</span>
                    <span class="lang-es hidden">de tu vida ha pasado</span>
                </p>
            </div>
        </div>

        <!-- Net Impact Badge -->
        <div class="max-w-md mx-auto mb-10 text-center p-6 rounded-2xl border-2 ${isPositiveNet ? 'bg-emerald-950/30 border-emerald-800/40' : 'bg-red-950/20 border-red-900/30'}">
            <p class="text-sm text-gray-400 mb-1">
                <span class="lang-en">Net Lifestyle Impact</span>
                <span class="lang-ko hidden">생활습관 순 영향</span>
                <span class="lang-ja hidden">ライフスタイルの影響</span>
                <span class="lang-cn hidden">生活方式净影响</span>
                <span class="lang-es hidden">Impacto Neto</span>
            </p>
            <p class="text-4xl font-black ${isPositiveNet ? 'text-emerald-400' : 'text-red-400'}">
                ${isPositiveNet ? '+' : ''}${result.totalAdjustment}
                <span class="text-lg">
                    <span class="lang-en">years</span>
                    <span class="lang-ko hidden">년</span>
                    <span class="lang-ja hidden">年</span>
                    <span class="lang-cn hidden">年</span>
                    <span class="lang-es hidden">años</span>
                </span>
            </p>
            <p class="text-xs text-gray-500 mt-1">
                <span class="lang-en">vs. ${result.baseLifeExpectancy}yr national average</span>
                <span class="lang-ko hidden">${result.baseLifeExpectancy}세 국가 평균 대비</span>
                <span class="lang-ja hidden">${result.baseLifeExpectancy}歳の国内平均との比較</span>
                <span class="lang-cn hidden">与${result.baseLifeExpectancy}岁国家平均相比</span>
                <span class="lang-es hidden">vs. promedio nacional de ${result.baseLifeExpectancy} años</span>
            </p>
        </div>

        <!-- Lifestyle Analysis Section -->
        <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-bold mb-6 text-center">
                <span class="lang-en">Your Lifestyle Analysis</span>
                <span class="lang-ko hidden">나의 생활습관 분석</span>
                <span class="lang-ja hidden">あなたのライフスタイル分析</span>
                <span class="lang-cn hidden">你的生活方式分析</span>
                <span class="lang-es hidden">Análisis de Tu Estilo de Vida</span>
            </h2>
            <div id="lifestyle-analysis" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
        </div>

        <!-- Emotional Metrics -->
        <div class="mb-12">
            <h2 class="text-2xl md:text-3xl font-bold mb-6 text-center">
                <span class="lang-en">Moments Remaining</span>
                <span class="lang-ko hidden">남은 순간들</span>
                <span class="lang-ja hidden">残りの瞬間</span>
                <span class="lang-cn hidden">剩余的时刻</span>
                <span class="lang-es hidden">Momentos Restantes</span>
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div class="bg-gray-800/60 p-5 rounded-2xl border border-gray-700/40 text-center">
                    <div class="text-3xl mb-2">🌸🌞🍂❄️</div>
                    <p class="text-2xl font-bold text-white">${result.remainingSeasons.spring}</p>
                    <p class="text-xs text-gray-400 mt-1">
                        <span class="lang-en">seasons each</span>
                        <span class="lang-ko hidden">번의 계절</span>
                        <span class="lang-ja hidden">回の季節</span>
                        <span class="lang-cn hidden">个季节</span>
                        <span class="lang-es hidden">temporadas</span>
                    </p>
                </div>
                <div class="bg-gray-800/60 p-5 rounded-2xl border border-gray-700/40 text-center">
                    <div class="text-3xl mb-2">🎉</div>
                    <p class="text-2xl font-bold text-white">${formatNumber(result.remainingWeekends)}</p>
                    <p class="text-xs text-gray-400 mt-1">
                        <span class="lang-en">weekends</span>
                        <span class="lang-ko hidden">번의 주말</span>
                        <span class="lang-ja hidden">回の週末</span>
                        <span class="lang-cn hidden">个周末</span>
                        <span class="lang-es hidden">fines de semana</span>
                    </p>
                </div>
                <div class="bg-gray-800/60 p-5 rounded-2xl border border-gray-700/40 text-center">
                    <div class="text-3xl mb-2">🎄</div>
                    <p class="text-2xl font-bold text-white">${result.remainingHolidays}</p>
                    <p class="text-xs text-gray-400 mt-1">
                        <span class="lang-en">${result.primaryHoliday.name.en}</span>
                        <span class="lang-ko hidden">${result.primaryHoliday.name.ko}</span>
                        <span class="lang-ja hidden">${result.primaryHoliday.name.ja}</span>
                        <span class="lang-cn hidden">${result.primaryHoliday.name.cn}</span>
                        <span class="lang-es hidden">${result.primaryHoliday.name.es}</span>
                    </p>
                </div>
                <div class="bg-gray-800/60 p-5 rounded-2xl border border-gray-700/40 text-center">
                    <div class="text-3xl mb-2">🎂</div>
                    <p class="text-2xl font-bold text-white">${result.remainingBirthdays}</p>
                    <p class="text-xs text-gray-400 mt-1">
                        <span class="lang-en">birthdays</span>
                        <span class="lang-ko hidden">번의 생일</span>
                        <span class="lang-ja hidden">回の誕生日</span>
                        <span class="lang-cn hidden">个生日</span>
                        <span class="lang-es hidden">cumpleaños</span>
                    </p>
                </div>
                <div class="bg-gray-800/60 p-5 rounded-2xl border border-gray-700/40 text-center">
                    <div class="text-3xl mb-2">🍽️</div>
                    <p class="text-2xl font-bold text-white">${formatNumber(result.remainingMeals)}</p>
                    <p class="text-xs text-gray-400 mt-1">
                        <span class="lang-en">meals</span>
                        <span class="lang-ko hidden">끼의 식사</span>
                        <span class="lang-ja hidden">回の食事</span>
                        <span class="lang-cn hidden">顿饭</span>
                        <span class="lang-es hidden">comidas</span>
                    </p>
                </div>
                ${result.timeWithParents ? renderParentTimeCards(result.timeWithParents) : ''}
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="max-w-2xl mx-auto space-y-4 mb-12">
            <button onclick="saveLifespanImage()" class="w-full btn-gradient-purple font-bold py-5 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                <span class="text-xl">📸</span>
                <span class="lang-en">Save as Image</span>
                <span class="lang-ko hidden">이미지로 저장</span>
                <span class="lang-ja hidden">画像として保存</span>
                <span class="lang-cn hidden">保存为图片</span>
                <span class="lang-es hidden">Guardar como Imagen</span>
            </button>

            <div class="grid grid-cols-3 gap-2">
                <button onclick="shareLifespanToX()" class="flex items-center justify-center gap-1.5 py-3 bg-black text-white rounded-xl hover:opacity-80 transition-all text-sm font-medium">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    X
                </button>
                <button onclick="shareLifespanToFacebook()" class="flex items-center justify-center gap-1.5 py-3 text-white rounded-xl hover:opacity-80 transition-all text-sm font-medium" style="background:#1877F2">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                </button>
                <button onclick="shareLifespanToThreads()" class="flex items-center justify-center gap-1.5 py-3 bg-black text-white rounded-xl hover:opacity-80 transition-all text-sm font-medium">
                    Threads
                </button>
                <button onclick="shareLifespanToKakao()" class="share-ko-only hidden flex items-center justify-center gap-1.5 py-3 rounded-xl hover:opacity-80 transition-all text-sm font-bold text-gray-900" style="background:#FEE500">
                    KakaoTalk
                </button>
                <button onclick="shareLifespanToLine()" class="share-asian hidden flex items-center justify-center gap-1.5 py-3 rounded-xl hover:opacity-80 transition-all text-sm font-bold text-white" style="background:#06C755">
                    LINE
                </button>
                <button onclick="copyLink()" class="flex items-center justify-center gap-1.5 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-500 transition-all text-sm font-medium">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                    <span class="lang-en">Copy</span>
                    <span class="lang-ko hidden">복사</span>
                    <span class="lang-ja hidden">コピー</span>
                    <span class="lang-cn hidden">复制</span>
                    <span class="lang-es hidden">Copiar</span>
                </button>
            </div>

            <button onclick="window.location.href='index.html'" class="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-5 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                <span class="text-xl">🧾</span>
                <span class="lang-en">See My Life Receipt</span>
                <span class="lang-ko hidden">인생 영수증 보기</span>
                <span class="lang-ja hidden">人生レシートを見る</span>
                <span class="lang-cn hidden">查看人生收据</span>
                <span class="lang-es hidden">Ver Mi Recibo de Vida</span>
            </button>

            <button onclick="startOver()" class="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-5 rounded-xl text-lg transition-all border-2 border-gray-600 flex items-center justify-center gap-2">
                <span class="text-xl">🔄</span>
                <span class="lang-en">Calculate Again</span>
                <span class="lang-ko hidden">다시 계산하기</span>
                <span class="lang-ja hidden">再計算</span>
                <span class="lang-cn hidden">重新计算</span>
                <span class="lang-es hidden">Calcular de Nuevo</span>
            </button>
        </div>

        <!-- Disclaimer -->
        <div class="max-w-3xl mx-auto bg-yellow-900/20 border border-yellow-600/40 rounded-xl p-6 text-center text-sm text-gray-300 mb-8">
            <p class="mb-2 font-semibold text-yellow-400">
                <span class="lang-en">Important Disclaimer</span>
                <span class="lang-ko hidden">중요 안내</span>
                <span class="lang-ja hidden">重要な免責事項</span>
                <span class="lang-cn hidden">重要声明</span>
                <span class="lang-es hidden">Aviso Importante</span>
            </p>
            <p class="lang-en">This is a statistical estimate based on WHO data and research. It is NOT medical advice. Your actual lifespan depends on countless factors. For health concerns, please consult a healthcare professional.</p>
            <p class="lang-ko hidden">이것은 WHO 데이터와 연구를 기반으로 한 통계적 추정입니다. 의학적 조언이 아닙니다. 실제 수명은 무수히 많은 요인에 따라 결정됩니다. 건강 문제는 의료 전문가와 상담하세요.</p>
            <p class="lang-ja hidden">これはWHOデータと研究に基づく統計的推定です。医学的アドバイスではありません。健康上の懸念については医療専門家に相談してください。</p>
            <p class="lang-cn hidden">这是基于世卫组织数据和研究的统计估计。不是医疗建议。健康问题请咨询医疗专业人员。</p>
            <p class="lang-es hidden">Esta es una estimación estadística basada en datos de la OMS. NO es consejo médico. Para problemas de salud, consulta a un profesional.</p>
        </div>
    `;

    renderLifestyleAnalysis();
}

function renderParentTimeCards(timeWithParents) {
    let html = '';

    if (timeWithParents.mother) {
        const m = timeWithParents.mother;
        html += `
            <div class="bg-gray-800/60 p-5 rounded-2xl border-2 border-pink-900/30 text-center">
                <div class="text-3xl mb-2">👩</div>
                <p class="text-2xl font-bold text-white">${formatNumber(m.daysRemaining)}</p>
                <p class="text-xs text-gray-400 mt-1">
                    <span class="lang-en">days with mother</span>
                    <span class="lang-ko hidden">일 — 어머니와</span>
                    <span class="lang-ja hidden">日 — 母と</span>
                    <span class="lang-cn hidden">天与母亲</span>
                    <span class="lang-es hidden">días con madre</span>
                </p>
                <p class="text-xs text-gray-500 mt-0.5">~ ${m.meetingsRemaining}
                    <span class="lang-en">meetings</span>
                    <span class="lang-ko hidden">번 만남</span>
                    <span class="lang-ja hidden">回</span>
                    <span class="lang-cn hidden">次见面</span>
                    <span class="lang-es hidden">encuentros</span>
                </p>
            </div>
        `;
    }

    if (timeWithParents.father) {
        const f = timeWithParents.father;
        html += `
            <div class="bg-gray-800/60 p-5 rounded-2xl border-2 border-blue-900/30 text-center">
                <div class="text-3xl mb-2">👨</div>
                <p class="text-2xl font-bold text-white">${formatNumber(f.daysRemaining)}</p>
                <p class="text-xs text-gray-400 mt-1">
                    <span class="lang-en">days with father</span>
                    <span class="lang-ko hidden">일 — 아버지와</span>
                    <span class="lang-ja hidden">日 — 父と</span>
                    <span class="lang-cn hidden">天与父亲</span>
                    <span class="lang-es hidden">días con padre</span>
                </p>
                <p class="text-xs text-gray-500 mt-0.5">~ ${f.meetingsRemaining}
                    <span class="lang-en">meetings</span>
                    <span class="lang-ko hidden">번 만남</span>
                    <span class="lang-ja hidden">回</span>
                    <span class="lang-cn hidden">次见面</span>
                    <span class="lang-es hidden">encuentros</span>
                </p>
            </div>
        `;
    }

    return html;
}

// Factor ranges for comparative display (worst vs best case per factor)
const FACTOR_RANGES = {
    bmi:          { worst: -5,   best: 0,   worstLabel: { en: 'obese BMI',      ko: '비만',            ja: '肥満',            cn: '肥胖',          es: 'IMC obeso' } },
    smoking:      { worst: -10,  best: 0,   worstLabel: { en: 'daily smoker',   ko: '매일 흡연',       ja: '毎日喫煙',        cn: '每天吸烟',      es: 'fumador diario' } },
    drinking:     { worst: -5,   best: 0,   worstLabel: { en: 'daily drinker',  ko: '매일 음주',       ja: '毎日飲酒',        cn: '每天饮酒',      es: 'bebedor diario' } },
    exercise:     { worst: -3,   best: 4.5, worstLabel: { en: 'no exercise',    ko: '운동 안 함',      ja: '運動なし',        cn: '不运动',        es: 'sin ejercicio' } },
    sleep:        { worst: -3,   best: 1,   worstLabel: { en: 'poor sleep',     ko: '수면 부족',       ja: '睡眠不足',        cn: '睡眠不足',      es: 'mal sueño' } },
    diet:         { worst: -3,   best: 4,   worstLabel: { en: 'fast food diet', ko: '패스트푸드 식단', ja: 'ファストフード',   cn: '快餐饮食',      es: 'comida rápida' } },
    sitting:      { worst: -2,   best: 1,   worstLabel: { en: '9h+ sitting',    ko: '9시간+ 좌식',    ja: '9時間+座位',      cn: '9小时+久坐',    es: '9h+ sentado' } },
    sun_exposure: { worst: -0.5, best: 0,   worstLabel: { en: 'excess UV',      ko: '과도한 자외선',   ja: '過度なUV',        cn: '过度紫外线',    es: 'exceso UV' } },
    stress:       { worst: -3,   best: 1,   worstLabel: { en: 'high stress',    ko: '높은 스트레스',   ja: '高ストレス',      cn: '高压力',        es: 'alto estrés' } },
    social:       { worst: -5,   best: 2,   worstLabel: { en: 'isolation',      ko: '사회적 고립',     ja: '社会的孤立',      cn: '社交孤立',      es: 'aislamiento' } },
    partner:      { worst: 0,    best: 3,   worstLabel: { en: 'no partner',     ko: '배우자 없음',     ja: 'パートナーなし',   cn: '无伴侣',        es: 'sin pareja' } }
};

function renderLifestyleAnalysis() {
    const analysisContainer = document.getElementById('lifestyle-analysis');
    if (!analysisContainer) return;

    const factorConfig = getFactorConfig();
    const factors = lifespanResult.adjustmentFactors;

    // Sort by relative benefit (biggest advantage over worst case first)
    const sortedKeys = Object.keys(factors).sort((a, b) => {
        const rangeA = FACTOR_RANGES[a], rangeB = FACTOR_RANGES[b];
        const relA = rangeA ? factors[a] - rangeA.worst : 0;
        const relB = rangeB ? factors[b] - rangeB.worst : 0;
        return relB - relA;
    });

    let html = '';

    sortedKeys.forEach(key => {
        const config = factorConfig[key];
        if (!config) return;

        const impact = factors[key];
        const range = FACTOR_RANGES[key];
        if (!range) return;

        // Dynamic best for partner (gender-dependent)
        const bestVal = key === 'partner' ? (lifespanUserData.gender === 'M' ? 3 : 1.5) : range.best;

        // Relative impact: how much better than worst case
        const relativeImpact = Math.round((impact - range.worst) * 10) / 10;
        const totalRange = bestVal - range.worst;
        const positionPercent = totalRange > 0 ? Math.round((relativeImpact / totalRange) * 100) : 100;

        // Color based on position in range (green=great, amber=ok, red=poor)
        let impactColor, badgeBg, barColor;
        if (positionPercent >= 70) {
            impactColor = 'text-emerald-400';
            badgeBg = 'bg-emerald-900/40 border-emerald-800/40';
            barColor = 'bg-emerald-500/60';
        } else if (positionPercent >= 35) {
            impactColor = 'text-amber-400';
            badgeBg = 'bg-amber-900/30 border-amber-800/30';
            barColor = 'bg-amber-500/50';
        } else {
            impactColor = 'text-red-400';
            badgeBg = 'bg-red-950/30 border-red-900/30';
            barColor = 'bg-red-500/40';
        }

        const barWidth = Math.max(5, Math.min(100, positionPercent));
        const worstLabel = range.worstLabel || {};
        const choiceText = config.choice || {};
        const explanationText = config.explanation || {};
        const nameText = config.name || {};

        // Badge: show relative value (always >= 0, compared to worst case)
        const badgeValue = relativeImpact === 0 ? '0' : '+' + relativeImpact.toFixed(1);

        html += `
            <div class="bg-gray-800/50 rounded-2xl p-5 border border-gray-700/40 hover:border-gray-600/60 transition-all">
                <div class="flex items-start justify-between mb-3">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-gray-700/60 flex items-center justify-center text-xl shrink-0">${config.icon}</div>
                        <div>
                            <div class="font-semibold text-gray-200 text-sm">
                                <span class="lang-en">${nameText.en || key}</span>
                                <span class="lang-ko hidden">${nameText.ko || key}</span>
                                <span class="lang-ja hidden">${nameText.ja || key}</span>
                                <span class="lang-cn hidden">${nameText.cn || key}</span>
                                <span class="lang-es hidden">${nameText.es || key}</span>
                            </div>
                            <div class="text-xs text-gray-400 mt-0.5">
                                <span class="lang-en">${choiceText.en || ''}</span>
                                <span class="lang-ko hidden">${choiceText.ko || ''}</span>
                                <span class="lang-ja hidden">${choiceText.ja || ''}</span>
                                <span class="lang-cn hidden">${choiceText.cn || ''}</span>
                                <span class="lang-es hidden">${choiceText.es || ''}</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right shrink-0 ml-2">
                        <div class="px-2.5 py-1 rounded-lg text-sm font-bold ${badgeBg} border ${impactColor}">
                            ${badgeValue}
                            <span class="text-xs ml-0.5">
                                <span class="lang-en">yr</span>
                                <span class="lang-ko hidden">년</span>
                                <span class="lang-ja hidden">年</span>
                                <span class="lang-cn hidden">年</span>
                                <span class="lang-es hidden">a</span>
                            </span>
                        </div>
                        <div class="text-[10px] text-gray-500 mt-1">
                            vs <span class="lang-en">${worstLabel.en || ''}</span><span class="lang-ko hidden">${worstLabel.ko || ''}</span><span class="lang-ja hidden">${worstLabel.ja || ''}</span><span class="lang-cn hidden">${worstLabel.cn || ''}</span><span class="lang-es hidden">${worstLabel.es || ''}</span>
                        </div>
                    </div>
                </div>
                <p class="text-xs text-gray-400 leading-relaxed mb-3">
                    <span class="lang-en">${explanationText.en || ''}</span>
                    <span class="lang-ko hidden">${explanationText.ko || ''}</span>
                    <span class="lang-ja hidden">${explanationText.ja || ''}</span>
                    <span class="lang-cn hidden">${explanationText.cn || ''}</span>
                    <span class="lang-es hidden">${explanationText.es || ''}</span>
                </p>
                <div class="w-full bg-gray-700/40 rounded-full h-1.5">
                    <div class="${barColor} h-1.5 rounded-full transition-all duration-700" style="width: ${barWidth}%"></div>
                </div>
            </div>
        `;
    });

    analysisContainer.innerHTML = html;
}

// ==================== COUNTDOWN TIMER ====================

let visibilityChangeHandler = null;

function startCountdownTimer() {
    if (countdownInterval) clearInterval(countdownInterval);
    if (visibilityChangeHandler) document.removeEventListener('visibilitychange', visibilityChangeHandler);

    const birthdate = new Date(lifespanUserData.birthdate);
    const yearsToAdd = lifespanResult.adjustedLifeExpectancy;
    const targetDate = new Date(birthdate);
    targetDate.setFullYear(birthdate.getFullYear() + Math.floor(yearsToAdd));
    const fractionalDays = (yearsToAdd - Math.floor(yearsToAdd)) * 365.25;
    targetDate.setDate(targetDate.getDate() + Math.floor(fractionalDays));

    const countdownFormats = {
        en: (y, mo, d, h, mi, s) => `${y}y ${mo}m ${d}d ${h}:${mi}:${s}`,
        ko: (y, mo, d, h, mi, s) => `${y}년 ${mo}개월 ${d}일 ${h}:${mi}:${s}`,
        ja: (y, mo, d, h, mi, s) => `${y}年 ${mo}ヶ月 ${d}日 ${h}:${mi}:${s}`,
        cn: (y, mo, d, h, mi, s) => `${y}年 ${mo}个月 ${d}天 ${h}:${mi}:${s}`,
        es: (y, mo, d, h, mi, s) => `${y}a ${mo}m ${d}d ${h}:${mi}:${s}`
    };

    function updateCountdown() {
        const now = new Date();
        const remaining = targetDate - now;
        const el = document.getElementById('countdown-display');
        if (!el) return;

        if (remaining <= 0) {
            el.textContent = '0y 0m 0d 00:00:00';
            return;
        }

        const totalSec = Math.floor(remaining / 1000);
        const totalMin = Math.floor(totalSec / 60);
        const totalHr = Math.floor(totalMin / 60);
        const totalDays = Math.floor(totalHr / 24);
        const years = Math.floor(totalDays / 365.25);
        const months = Math.floor((totalDays % 365.25) / 30.44);
        const days = Math.floor((totalDays % 365.25) % 30.44);

        const h = String(totalHr % 24).padStart(2, '0');
        const mi = String(totalMin % 60).padStart(2, '0');
        const s = String(totalSec % 60).padStart(2, '0');

        const formatter = countdownFormats[currentLang] || countdownFormats.en;
        el.textContent = formatter(years, months, days, h, mi, s);
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    visibilityChangeHandler = () => {
        if (document.hidden) {
            clearInterval(countdownInterval);
        } else {
            clearInterval(countdownInterval);
            updateCountdown();
            countdownInterval = setInterval(updateCountdown, 1000);
        }
    };
    document.addEventListener('visibilitychange', visibilityChangeHandler);
}

// ==================== SHARING ====================

function getLifespanShareText() {
    const result = lifespanResult;
    const texts = {
        en: `I have ${result.yearsRemaining} years remaining! Check your time`,
        ko: `나에게 ${result.yearsRemaining}년이 남았대! 당신의 시간도 확인해보세요`,
        ja: `私には${result.yearsRemaining}年残っています！あなたの時間も確認してください`,
        cn: `我还剩${result.yearsRemaining}年！检查你的时间`,
        es: `¡Me quedan ${result.yearsRemaining} años! Verifica tu tiempo`
    };
    return texts[currentLang] || texts.en;
}

function saveLifespanImage() {
    saveAsImage('result-container', 'my-life-clock.png', '#111113');
}

function shareLifespanToX() { shareToX(getLifespanShareText(), getShareUrl('/lifespan.html')); }
function shareLifespanToFacebook() { shareToFacebook(getShareUrl('/lifespan.html')); }
function shareLifespanToThreads() { shareToThreads(getLifespanShareText(), getShareUrl('/lifespan.html')); }
function shareLifespanToLine() { shareToLine(getLifespanShareText(), getShareUrl('/lifespan.html')); }
function shareLifespanToKakao() {
    const titles = {en:'How Long Will I Live?', ko:'나의 남은 수명은?', ja:'あと何年生きられる？', cn:'我还能活多久？', es:'¿Cuánto me queda de vida?'};
    const title = titles[currentLang] || titles.en;
    shareToKakao(title, getLifespanShareText(), getShareUrl('/lifespan.html'));
}
function copyLink() { copyLinkShared(); }

// ==================== CROSS-SERVICE INTEGRATION ====================

function loadDataFromLifeReceipt() {
    try {
        const lifeReceiptData = localStorage.getItem('lifeReceiptData');
        if (lifeReceiptData) {
            const data = JSON.parse(lifeReceiptData);
            if (data.birthdate) setBirthdate(data.birthdate);
            if (data.country) document.getElementById('country').value = data.country;
            if (data.gender) selectGender(data.gender);
            const sleepEl = document.getElementById('sleep');
            if (data.sleep && sleepEl) sleepEl.value = data.sleep;
        }
    } catch (e) {
        console.log('No Life Receipt data found');
    }
}

function saveDataForLifeReceipt() {
    try {
        const data = {
            birthdate: lifespanUserData.birthdate,
            country: lifespanUserData.country,
            gender: lifespanUserData.gender,
            sleep: lifespanUserData.sleep
        };
        localStorage.setItem('lifespanData', JSON.stringify(data));
    } catch (e) {
        console.log('Could not save data');
    }
}

// ==================== UTILITIES ====================

function startOver() {
    document.getElementById('result').classList.add('hidden');
    document.getElementById('landing').classList.remove('hidden');

    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    if (visibilityChangeHandler) {
        document.removeEventListener('visibilitychange', visibilityChangeHandler);
        visibilityChangeHandler = null;
    }

    currentStep = 1;
    selectedGender = null;
    lifespanUserData = {};
    lifespanResult = {};

    document.getElementById('step-1').classList.remove('hidden');
    document.getElementById('step-2').classList.add('hidden');
    document.getElementById('step-3').classList.add('hidden');
    updateProgressBar();
    updateStepIndicators();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}
