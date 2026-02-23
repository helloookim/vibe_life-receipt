// Lifespan Calculator - Main JavaScript
// Global state
let currentStep = 1;
let selectedGender = null;
let lifespanUserData = {};
let lifespanResult = {};
let countdownInterval = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeLandingCountdown();
    loadDataFromLifeReceipt();
});

// ==================== LANDING PAGE ====================

function initializeLandingCountdown() {
    // Simple countdown animation on landing page
    // Shows average remaining time ticking down
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
    renderStep2(); // Prepare step 2 content
    renderStep3(); // Prepare step 3 content
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

    // Set defaults
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
                    <span class="lang-en">Low</span><span class="lang-ko hidden">낮음</span>
                    <span class="lang-en">High</span><span class="lang-ko hidden">높음</span>
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
                    <!-- Parents Age -->
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

    // Set defaults
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

    // Reset both buttons to original state
    [mBtn, fBtn].forEach(btn => {
        btn.classList.remove('bg-gray-500', 'text-white', 'border-gray-400');
        btn.classList.add('bg-gray-700', 'border-gray-600');
    });

    // Highlight selected
    const selectedBtn = gender === 'M' ? mBtn : fBtn;
    selectedBtn.classList.remove('bg-gray-700', 'border-gray-600');
    selectedBtn.classList.add('bg-gray-500', 'text-white', 'border-gray-400');
}

function selectOption(category, value, silent = false) {
    // Store value
    if (!lifespanUserData) lifespanUserData = {};
    lifespanUserData[category] = value;

    // Visual feedback - highlight selected button
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

        // Check age restriction (13+)
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
    // Show loading
    document.getElementById('form').classList.add('hidden');
    document.getElementById('loading').classList.remove('hidden');

    // Collect all data
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

    // Save to localStorage for cross-service integration
    saveDataForLifeReceipt();

    // Perform calculation after 3 second delay
    setTimeout(() => {
        lifespanResult = calculateLifespan(lifespanUserData);
        renderResults();
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('result').classList.remove('hidden');
        startCountdownTimer();
    }, 3000);
}

function calculateLifespan(userData) {
    // Get current age
    const ageData = calculateAge(userData.birthdate);
    const currentAge = ageData.years;

    // Get base life expectancy from WHO data
    const baseLifeExpectancy = getLifeExpectancy(userData.country, userData.gender);

    // Calculate BMI
    const heightM = userData.height / 100;
    const bmi = userData.weight / (heightM * heightM);

    // Initialize adjustment factors
    const adjustmentFactors = {};

    // BMI Adjustment
    if (bmi < 18.5) {
        adjustmentFactors.bmi = -3.0; // Underweight
    } else if (bmi >= 18.5 && bmi < 25) {
        adjustmentFactors.bmi = 0; // Normal
    } else if (bmi >= 25 && bmi < 30) {
        adjustmentFactors.bmi = -2.0; // Overweight
    } else {
        adjustmentFactors.bmi = -5.0; // Obese
    }

    // Smoking
    const smokingImpact = {
        none: 0,
        past: -2.0,
        occasional: -5.0,
        daily: -10.0
    };
    adjustmentFactors.smoking = smokingImpact[userData.smoking] || 0;

    // Drinking
    const drinkingImpact = {
        none: 0,
        occasional: 0,
        moderate: -1.0,
        daily: -5.0
    };
    adjustmentFactors.drinking = drinkingImpact[userData.drinking] || 0;

    // Exercise (0-7 times/week)
    if (userData.exercise >= 5) {
        adjustmentFactors.exercise = 4.5;
    } else if (userData.exercise >= 3) {
        adjustmentFactors.exercise = 3.0;
    } else if (userData.exercise >= 1) {
        adjustmentFactors.exercise = 1.5;
    } else {
        adjustmentFactors.exercise = -3.0;
    }

    // Sleep
    if (userData.sleep >= 7 && userData.sleep <= 8) {
        adjustmentFactors.sleep = 1.0; // Optimal
    } else if (userData.sleep >= 6 && userData.sleep <= 9) {
        adjustmentFactors.sleep = 0; // Acceptable
    } else {
        adjustmentFactors.sleep = -3.0; // Too little or too much
    }

    // Diet
    const dietImpact = {
        healthy: 4.0,
        balanced: 0,
        fast_food: -3.0
    };
    adjustmentFactors.diet = dietImpact[userData.diet] || 0;

    // Sitting time
    if (userData.sitting <= 6) {
        adjustmentFactors.sitting = 1.0;
    } else if (userData.sitting <= 8) {
        adjustmentFactors.sitting = 0;
    } else {
        adjustmentFactors.sitting = -2.0;
    }

    // Sun exposure
    const sunImpact = {
        indoor: 0,
        normal: 0,
        outdoor: -0.5
    };
    adjustmentFactors.sun_exposure = sunImpact[userData.sun_exposure] || 0;

    // Stress
    if (userData.stress <= 3) {
        adjustmentFactors.stress = 1.0;
    } else if (userData.stress <= 7) {
        adjustmentFactors.stress = 0;
    } else {
        adjustmentFactors.stress = -3.0;
    }

    // Social relationships
    const socialImpact = {
        active: 2.0,
        normal: 0,
        isolated: -5.0
    };
    adjustmentFactors.social = socialImpact[userData.social] || 0;

    // Partner/Married
    if (userData.partner) {
        adjustmentFactors.partner = userData.gender === 'M' ? 3.0 : 1.5;
    } else {
        adjustmentFactors.partner = 0;
    }

    // Calculate total adjustment
    let totalAdjustment = Object.values(adjustmentFactors).reduce((sum, val) => sum + val, 0);

    // Apply caps: total adjustment between -20 and +15 years
    totalAdjustment = Math.max(-20, Math.min(15, totalAdjustment));

    // Calculate adjusted life expectancy
    let adjustedLifeExpectancy = baseLifeExpectancy + totalAdjustment;

    // Add deterministic variation (±1.0 year) based on user inputs so same inputs = same result
    const seed = `${userData.birthdate}-${userData.country}-${userData.gender}-${userData.height}-${userData.weight}`;
    const hash = Array.from(seed).reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0);
    const deterministicVariation = ((((hash % 2000) + 2000) % 2000) / 1000) - 1.0; // -1.0 to +1.0
    adjustedLifeExpectancy += deterministicVariation;

    // Apply constraints
    const minLifeExpectancy = currentAge + 5; // Ethical floor
    const maxLifeExpectancy = baseLifeExpectancy + 20;
    adjustedLifeExpectancy = Math.max(minLifeExpectancy, Math.min(maxLifeExpectancy, adjustedLifeExpectancy));

    // Calculate remaining time
    const yearsRemaining = adjustedLifeExpectancy - currentAge;

    // Calculate progress
    const lifeProgressPercent = (currentAge / adjustedLifeExpectancy) * 100;

    // Calculate emotional metrics
    const emotionalMetrics = calculateEmotionalMetrics(yearsRemaining, userData);

    // Return result object
    return {
        currentAge: Math.floor(currentAge),
        baseLifeExpectancy: Math.round(baseLifeExpectancy),
        adjustedLifeExpectancy: Math.round(adjustedLifeExpectancy * 10) / 10,
        adjustmentFactors,
        totalAdjustment: Math.round(totalAdjustment * 10) / 10,
        yearsRemaining: Math.round(yearsRemaining * 10) / 10,
        lifeProgressPercent: Math.round(lifeProgressPercent * 10) / 10,
        ...emotionalMetrics
    };
}

function calculateEmotionalMetrics(yearsRemaining, userData) {
    // Remaining seasons
    const remainingSeasons = {
        spring: Math.floor(yearsRemaining),
        summer: Math.floor(yearsRemaining),
        fall: Math.floor(yearsRemaining),
        winter: Math.floor(yearsRemaining)
    };

    // Remaining weekends (years * 52 weeks)
    const remainingWeekends = Math.floor(yearsRemaining * 52);

    // Remaining holidays (get primary holiday for country)
    const primaryHoliday = getPrimaryHoliday(userData.country);
    const remainingHolidays = Math.floor(yearsRemaining);

    // Remaining birthdays
    const remainingBirthdays = Math.floor(yearsRemaining);

    // Remaining meals (years * 365.25 days * 3 meals)
    const remainingMeals = Math.floor(yearsRemaining * 365.25 * 3);

    // Time with parents (KILLER FEATURE)
    let timeWithParents = null;
    if (userData.parent_age_mother || userData.parent_age_father) {
        timeWithParents = calculateParentTime(userData, yearsRemaining);
    }

    return {
        remainingSeasons,
        remainingWeekends,
        remainingHolidays,
        primaryHoliday,
        remainingBirthdays,
        remainingMeals,
        timeWithParents
    };
}

function calculateParentTime(userData, yearsRemaining) {
    const result = {};

    // Calculate for mother
    if (userData.parent_age_mother) {
        const motherAge = parseInt(userData.parent_age_mother);
        const motherLifeExpectancy = getLifeExpectancy(userData.country, 'F');
        const motherYearsRemaining = Math.max(0, motherLifeExpectancy - motherAge);

        // Years we can spend with mother = min(our remaining years, mother's remaining years)
        const yearsWithMother = Math.min(yearsRemaining, motherYearsRemaining);

        // Assume meeting frequency: 2 times/month = 24 days/year
        const meetingDaysPerYear = 24;
        const totalDaysWithMother = Math.floor(yearsWithMother * meetingDaysPerYear);

        result.mother = {
            yearsRemaining: Math.round(yearsWithMother * 10) / 10,
            daysRemaining: totalDaysWithMother,
            meetingsRemaining: Math.floor(yearsWithMother * 24) // 24 meetings/year
        };
    }

    // Calculate for father
    if (userData.parent_age_father) {
        const fatherAge = parseInt(userData.parent_age_father);
        const fatherLifeExpectancy = getLifeExpectancy(userData.country, 'M');
        const fatherYearsRemaining = Math.max(0, fatherLifeExpectancy - fatherAge);

        const yearsWithFather = Math.min(yearsRemaining, fatherYearsRemaining);
        const meetingDaysPerYear = 24;
        const totalDaysWithFather = Math.floor(yearsWithFather * meetingDaysPerYear);

        result.father = {
            yearsRemaining: Math.round(yearsWithFather * 10) / 10,
            daysRemaining: totalDaysWithFather,
            meetingsRemaining: Math.floor(yearsWithFather * 24)
        };
    }

    return result;
}

// ==================== RESULTS RENDERING ====================

function renderResults() {
    const container = document.getElementById('result-container');
    if (!container) return;

    const result = lifespanResult;
    const userData = lifespanUserData;

    // Get text translations (defined at bottom of file)
    const t = getTexts();

    container.innerHTML = `
        <!-- Main Countdown Display -->
        <div class="text-center mb-12 fade-in">
            <h1 class="text-5xl md:text-7xl font-extrabold mb-4 countdown-glow">
                <span class="lang-en">YOUR LIFE CLOCK</span>
                <span class="lang-ko hidden">당신의 생명시계</span>
                <span class="lang-ja hidden">あなたの命の時計</span>
                <span class="lang-cn hidden">你的生命时钟</span>
                <span class="lang-es hidden">TU RELOJ DE VIDA</span>
            </h1>

            <div class="mb-8">
                <p class="text-2xl text-gray-400 mb-2">
                    <span class="lang-en">Expected Lifespan</span>
                    <span class="lang-ko hidden">예상 수명</span>
                    <span class="lang-ja hidden">予想寿命</span>
                    <span class="lang-cn hidden">预期寿命</span>
                    <span class="lang-es hidden">Esperanza de Vida</span>
                </p>
                <p class="text-6xl md:text-8xl font-bold text-gray-300">
                    ${result.adjustedLifeExpectancy}
                    <span class="text-4xl text-gray-400">
                        <span class="lang-en">years</span>
                        <span class="lang-ko hidden">세</span>
                        <span class="lang-ja hidden">歳</span>
                        <span class="lang-cn hidden">岁</span>
                        <span class="lang-es hidden">años</span>
                    </span>
                </p>
            </div>

            <div class="mb-8">
                <p class="text-2xl text-gray-400 mb-4">
                    <span class="lang-en">Time Remaining</span>
                    <span class="lang-ko hidden">남은 시간</span>
                    <span class="lang-ja hidden">残り時間</span>
                    <span class="lang-cn hidden">剩余时间</span>
                    <span class="lang-es hidden">Tiempo Restante</span>
                </p>
                <div id="countdown-display" class="mono-font text-4xl md:text-6xl text-gray-300 font-bold">
                    <!-- Countdown will be updated here -->
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="max-w-2xl mx-auto mb-4">
                <div class="w-full bg-gray-700 rounded-full h-6 overflow-hidden border-2 border-gray-600 border-opacity-30">
                    <div class="progress-bar-bg h-6 transition-all duration-1000" style="width: ${result.lifeProgressPercent}%"></div>
                </div>
                <p class="text-lg text-gray-400 mt-2">
                    ${result.lifeProgressPercent}%
                    <span class="lang-en">of life used</span>
                    <span class="lang-ko hidden">사용됨</span>
                    <span class="lang-ja hidden">使用済み</span>
                    <span class="lang-cn hidden">已使用</span>
                    <span class="lang-es hidden">de vida usada</span>
                </p>
            </div>
        </div>

        <!-- Emotional Metrics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <!-- Remaining Seasons -->
            <div class="bg-gray-800 bg-opacity-60 p-6 rounded-xl border-2 border-gray-600 border-opacity-20 text-center">
                <div class="text-4xl mb-2">🌸🌞🍂❄️</div>
                <p class="text-sm text-gray-400 mb-2">
                    <span class="lang-en">Remaining Seasons</span>
                    <span class="lang-ko hidden">남은 계절</span>
                    <span class="lang-ja hidden">残りの季節</span>
                    <span class="lang-cn hidden">剩余季节</span>
                    <span class="lang-es hidden">Temporadas Restantes</span>
                </p>
                <p class="text-3xl font-bold text-gray-300">${result.remainingSeasons.spring}
                    <span class="text-lg text-gray-400">
                        <span class="lang-en">each</span>
                        <span class="lang-ko hidden">번</span>
                        <span class="lang-ja hidden">回</span>
                        <span class="lang-cn hidden">次</span>
                        <span class="lang-es hidden">cada una</span>
                    </span>
                </p>
            </div>

            <!-- Remaining Weekends -->
            <div class="bg-gray-800 bg-opacity-60 p-6 rounded-xl border-2 border-gray-600 border-opacity-20 text-center">
                <div class="text-4xl mb-2">🎉</div>
                <p class="text-sm text-gray-400 mb-2">
                    <span class="lang-en">Remaining Weekends</span>
                    <span class="lang-ko hidden">남은 주말</span>
                    <span class="lang-ja hidden">残りの週末</span>
                    <span class="lang-cn hidden">剩余周末</span>
                    <span class="lang-es hidden">Fines de Semana Restantes</span>
                </p>
                <p class="text-3xl font-bold text-gray-300">${formatNumber(result.remainingWeekends)}
                    <span class="text-lg text-gray-400">
                        <span class="lang-en">weekends</span>
                        <span class="lang-ko hidden">번</span>
                        <span class="lang-ja hidden">回</span>
                        <span class="lang-cn hidden">个</span>
                        <span class="lang-es hidden">fines de semana</span>
                    </span>
                </p>
            </div>

            <!-- Remaining Holidays -->
            <div class="bg-gray-800 bg-opacity-60 p-6 rounded-xl border-2 border-gray-600 border-opacity-20 text-center">
                <div class="text-4xl mb-2">🎄</div>
                <p class="text-sm text-gray-400 mb-2">
                    <span class="lang-en">Remaining ${result.primaryHoliday.name.en}</span>
                    <span class="lang-ko hidden">남은 ${result.primaryHoliday.name.ko}</span>
                    <span class="lang-ja hidden">残りの${result.primaryHoliday.name.ja}</span>
                    <span class="lang-cn hidden">剩余${result.primaryHoliday.name.cn}</span>
                    <span class="lang-es hidden">${result.primaryHoliday.name.es} Restantes</span>
                </p>
                <p class="text-3xl font-bold text-gray-300">${result.remainingHolidays}
                    <span class="text-lg text-gray-400">
                        <span class="lang-en">times</span>
                        <span class="lang-ko hidden">번</span>
                        <span class="lang-ja hidden">回</span>
                        <span class="lang-cn hidden">次</span>
                        <span class="lang-es hidden">veces</span>
                    </span>
                </p>
            </div>

            <!-- Remaining Birthdays -->
            <div class="bg-gray-800 bg-opacity-60 p-6 rounded-xl border-2 border-gray-600 border-opacity-20 text-center">
                <div class="text-4xl mb-2">🎂</div>
                <p class="text-sm text-gray-400 mb-2">
                    <span class="lang-en">Remaining Birthdays</span>
                    <span class="lang-ko hidden">남은 생일</span>
                    <span class="lang-ja hidden">残りの誕生日</span>
                    <span class="lang-cn hidden">剩余生日</span>
                    <span class="lang-es hidden">Cumpleaños Restantes</span>
                </p>
                <p class="text-3xl font-bold text-gray-300">${result.remainingBirthdays}
                    <span class="text-lg text-gray-400">
                        <span class="lang-en">cakes</span>
                        <span class="lang-ko hidden">번</span>
                        <span class="lang-ja hidden">回</span>
                        <span class="lang-cn hidden">次</span>
                        <span class="lang-es hidden">veces</span>
                    </span>
                </p>
            </div>

            <!-- Remaining Meals -->
            <div class="bg-gray-800 bg-opacity-60 p-6 rounded-xl border-2 border-gray-600 border-opacity-20 text-center">
                <div class="text-4xl mb-2">🍽️</div>
                <p class="text-sm text-gray-400 mb-2">
                    <span class="lang-en">Remaining Meals</span>
                    <span class="lang-ko hidden">남은 식사</span>
                    <span class="lang-ja hidden">残りの食事</span>
                    <span class="lang-cn hidden">剩余餐数</span>
                    <span class="lang-es hidden">Comidas Restantes</span>
                </p>
                <p class="text-3xl font-bold text-gray-300">${formatNumber(result.remainingMeals)}</p>
            </div>

            ${result.timeWithParents ? renderParentTimeCard(result.timeWithParents) : '<div></div>'}
        </div>

        <!-- Impact Analysis Chart -->
        <div class="bg-gray-800 bg-opacity-60 p-8 rounded-xl border-2 border-gray-600 border-opacity-20 mb-12">
            <h2 class="text-3xl font-bold mb-6 text-center text-gray-300">
                <span class="lang-en">What Affects Your Lifespan</span>
                <span class="lang-ko hidden">수명에 영향을 주는 요인</span>
                <span class="lang-ja hidden">寿命に影響する要因</span>
                <span class="lang-cn hidden">影响寿命的因素</span>
                <span class="lang-es hidden">Qué Afecta Tu Esperanza de Vida</span>
            </h2>
            <div id="impact-chart"></div>
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

            <!-- Share Buttons Grid -->
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
        <div class="max-w-3xl mx-auto bg-yellow-900 bg-opacity-20 border-2 border-yellow-600 border-opacity-40 rounded-xl p-6 text-center text-sm text-gray-300 mb-8">
            <p class="mb-2 font-semibold text-yellow-400">⚠️ <span class="lang-en">Important Disclaimer</span></p>
            <p class="lang-en">This is a statistical estimate based on WHO data and research. It is NOT medical advice. Your actual lifespan depends on countless factors. For health concerns, please consult a healthcare professional.</p>
            <p class="lang-ko hidden">이것은 WHO 데이터와 연구를 기반으로 한 통계적 추정입니다. 의학적 조언이 아닙니다. 실제 수명은 무수히 많은 요인에 따라 결정됩니다. 건강 문제는 의료 전문가와 상담하세요.</p>
            <p class="lang-ja hidden">これはWHOデータと研究に基づく統計的推定です。医学的アドバイスではありません。実際の寿命は無数の要因によって決まります。健康上の懸念については医療専門家に相談してください.</p>
            <p class="lang-cn hidden">这是基于世卫组织数据和研究的统计估计。不是医疗建议。你的实际寿命取决于无数因素。健康问题请咨询医疗专业人员。</p>
            <p class="lang-es hidden">Esta es una estimación estadística basada en datos de la OMS e investigación. NO es consejo médico. Tu esperanza de vida real depende de innumerables factores. Para problemas de salud, consulta a un profesional de salud.</p>
        </div>
    `;

    renderImpactChart();
}

function renderParentTimeCard(timeWithParents) {
    let html = '';

    if (timeWithParents.mother) {
        const m = timeWithParents.mother;
        html += `
            <div class="bg-gray-800 bg-opacity-60 p-6 rounded-xl border-2 border-gray-600 border-opacity-40 text-center">
                <div class="text-4xl mb-2">👩</div>
                <p class="text-sm text-gray-300 mb-2">
                    <span class="lang-en">Time with Mother</span>
                    <span class="lang-ko hidden">어머니와의 시간</span>
                    <span class="lang-ja hidden">母との時間</span>
                    <span class="lang-cn hidden">与母亲的时间</span>
                    <span class="lang-es hidden">Tiempo con Madre</span>
                </p>
                <p class="text-3xl font-bold text-gray-300">${formatNumber(m.daysRemaining)}
                    <span class="text-lg text-gray-300">
                        <span class="lang-en">days</span>
                        <span class="lang-ko hidden">일</span>
                        <span class="lang-ja hidden">日</span>
                        <span class="lang-cn hidden">天</span>
                        <span class="lang-es hidden">días</span>
                    </span>
                </p>
                <p class="text-xs text-gray-400 mt-1">
                    <span class="lang-en">≈ ${m.meetingsRemaining} meetings left</span>
                    <span class="lang-ko hidden">≈ ${m.meetingsRemaining}번 남음</span>
                    <span class="lang-ja hidden">≈ ${m.meetingsRemaining}回残り</span>
                    <span class="lang-cn hidden">≈ 剩${m.meetingsRemaining}次</span>
                    <span class="lang-es hidden">≈ ${m.meetingsRemaining} encuentros</span>
                </p>
            </div>
        `;
    }

    if (timeWithParents.father) {
        const f = timeWithParents.father;
        html += `
            <div class="bg-gray-800 bg-opacity-60 p-6 rounded-xl border-2 border-gray-600 border-opacity-40 text-center">
                <div class="text-4xl mb-2">👨</div>
                <p class="text-sm text-gray-300 mb-2">
                    <span class="lang-en">Time with Father</span>
                    <span class="lang-ko hidden">아버지와의 시간</span>
                    <span class="lang-ja hidden">父との時間</span>
                    <span class="lang-cn hidden">与父亲的时间</span>
                    <span class="lang-es hidden">Tiempo con Padre</span>
                </p>
                <p class="text-3xl font-bold text-gray-300">${formatNumber(f.daysRemaining)}
                    <span class="text-lg text-gray-300">
                        <span class="lang-en">days</span>
                        <span class="lang-ko hidden">일</span>
                        <span class="lang-ja hidden">日</span>
                        <span class="lang-cn hidden">天</span>
                        <span class="lang-es hidden">días</span>
                    </span>
                </p>
                <p class="text-xs text-gray-400 mt-1">
                    <span class="lang-en">≈ ${f.meetingsRemaining} meetings left</span>
                    <span class="lang-ko hidden">≈ ${f.meetingsRemaining}번 남음</span>
                    <span class="lang-ja hidden">≈ ${f.meetingsRemaining}回残り</span>
                    <span class="lang-cn hidden">≈ 剩${f.meetingsRemaining}次</span>
                    <span class="lang-es hidden">≈ ${f.meetingsRemaining} encuentros</span>
                </p>
            </div>
        `;
    }

    return html;
}

function renderImpactChart() {
    const chartContainer = document.getElementById('impact-chart');
    if (!chartContainer) return;

    const factors = lifespanResult.adjustmentFactors;

    // Sort by absolute impact
    const sortedFactors = Object.entries(factors)
        .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));

    let html = '<div class="space-y-3">';

    sortedFactors.forEach(([factor, years]) => {
        if (years === 0) return; // Skip zero impact

        const isPositive = years > 0;
        const absYears = Math.abs(years);
        const percentage = (absYears / 10) * 100; // Scale: 10 years = 100%
        const cappedPercentage = Math.min(100, percentage);

        const factorNames = {
            bmi: { en: 'BMI', ko: 'BMI', ja: 'BMI', cn: 'BMI', es: 'IMC' },
            smoking: { en: 'Smoking', ko: '흡연', ja: '喫煙', cn: '吸烟', es: 'Fumar' },
            drinking: { en: 'Alcohol', ko: '음주', ja: '飲酒', cn: '饮酒', es: 'Alcohol' },
            exercise: { en: 'Exercise', ko: '운동', ja: '運動', cn: '运动', es: 'Ejercicio' },
            sleep: { en: 'Sleep', ko: '수면', ja: '睡眠', cn: '睡眠', es: 'Sueño' },
            diet: { en: 'Diet', ko: '식습관', ja: '食習慣', cn: '饮食', es: 'Dieta' },
            sitting: { en: 'Sitting Time', ko: '좌식 시간', ja: '座る時間', cn: '坐着时间', es: 'Tiempo Sentado' },
            sun_exposure: { en: 'Sun Exposure', ko: '자외선', ja: '日光', cn: '阳光', es: 'Sol' },
            stress: { en: 'Stress', ko: '스트레스', ja: 'ストレス', cn: '压力', es: 'Estrés' },
            social: { en: 'Social Life', ko: '사회생활', ja: '社会生活', cn: '社交', es: 'Vida Social' },
            partner: { en: 'Partnership', ko: '배우자', ja: 'パートナー', cn: '伴侣', es: 'Pareja' }
        };

        const name = factorNames[factor] || { en: factor };

        html += `
            <div class="flex items-center gap-3">
                <div class="w-32 text-right text-sm">
                    <span class="lang-en">${name.en}</span>
                    <span class="lang-ko hidden">${name.ko}</span>
                    <span class="lang-ja hidden">${name.ja}</span>
                    <span class="lang-cn hidden">${name.cn}</span>
                    <span class="lang-es hidden">${name.es}</span>
                </div>
                <div class="flex-1 flex items-center ${isPositive ? 'justify-start' : 'justify-end'}">
                    <div class="${isPositive ? 'impact-bar-positive' : 'impact-bar-negative'} h-8 rounded flex items-center px-3 text-sm font-bold"
                         style="width: ${cappedPercentage}%">
                        ${isPositive ? '+' : ''}${years.toFixed(1)}
                        <span class="ml-1 text-xs">
                            <span class="lang-en">yr</span>
                            <span class="lang-ko hidden">년</span>
                            <span class="lang-ja hidden">年</span>
                            <span class="lang-cn hidden">年</span>
                            <span class="lang-es hidden">a</span>
                        </span>
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    chartContainer.innerHTML = html;
}

// ==================== COUNTDOWN TIMER ====================

let visibilityChangeHandler = null;

function startCountdownTimer() {
    // Stop any existing countdown and remove previous listener
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    if (visibilityChangeHandler) {
        document.removeEventListener('visibilitychange', visibilityChangeHandler);
    }

    const birthdate = new Date(lifespanUserData.birthdate);
    const yearsToAdd = lifespanResult.adjustedLifeExpectancy;
    const targetDate = new Date(birthdate);
    targetDate.setFullYear(birthdate.getFullYear() + Math.floor(yearsToAdd));

    // Add remaining months/days
    const fractionalDays = (yearsToAdd - Math.floor(yearsToAdd)) * 365.25;
    targetDate.setDate(targetDate.getDate() + Math.floor(fractionalDays));

    function updateCountdown() {
        const now = new Date();
        const remaining = targetDate - now;

        if (remaining <= 0) {
            document.getElementById('countdown-display').textContent = '0y 0m 0d 00:00:00';
            return;
        }

        const seconds = Math.floor(remaining / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const years = Math.floor(days / 365.25);
        const months = Math.floor((days % 365.25) / 30.44);
        const daysLeft = Math.floor((days % 365.25) % 30.44);

        const sec = seconds % 60;
        const min = minutes % 60;
        const hr = hours % 24;

        const display = `${years}y ${months}m ${daysLeft}d ${hr.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
        document.getElementById('countdown-display').textContent = display;
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);

    // Stop countdown when page is hidden (performance)
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
    const title = currentLang === 'ko' ? '나의 생명시계' : 'My Life Clock';
    shareToKakao(title, getLifespanShareText(), getShareUrl('/lifespan.html'));
}
function copyLink() { copyLinkShared(); }

// ==================== CROSS-SERVICE INTEGRATION ====================

function loadDataFromLifeReceipt() {
    try {
        const lifeReceiptData = localStorage.getItem('lifeReceiptData');
        if (lifeReceiptData) {
            const data = JSON.parse(lifeReceiptData);
            // Pre-fill birthdate, country, gender if available
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

    // Clear countdown and remove visibility listener
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
    if (visibilityChangeHandler) {
        document.removeEventListener('visibilitychange', visibilityChangeHandler);
        visibilityChangeHandler = null;
    }

    // Reset form
    currentStep = 1;
    selectedGender = null;
    lifespanUserData = {};
    lifespanResult = {};

    // Reset to step 1
    document.getElementById('step-1').classList.remove('hidden');
    document.getElementById('step-2').classList.add('hidden');
    document.getElementById('step-3').classList.add('hidden');
    updateProgressBar();
    updateStepIndicators();

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function getTexts() {
    // Placeholder for future text localization
    // For now, texts are embedded in HTML with lang-XX classes
    return {};
}
