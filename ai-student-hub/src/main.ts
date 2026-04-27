const app = document.querySelector<HTMLDivElement>('#app')!;

// --- MÉMOIRE DU CHAT ---
let chatHistory: { role: string; content: string }[] = [
  {
    role: "system",
    content: `Tu es "Best", un assistant étudiant ultra-avancé. Règles :
- Réponds TOUJOURS dans un français impeccable, chaleureux et naturel, comme un mentor humain.
- Utilise des emojis avec parcimonie pour rendre la conversation vivante.
- Si l'utilisateur est stressé ou bloqué, rassure-le avec empathie.
- Fournis des explications claires, étape par étape si nécessaire.
- Signe occasionnellement avec "– Best ✨" mais pas à chaque message.
- Reste concis sauf si on te demande des détails.
- Ne mentionne jamais que tu es une IA ou un modèle de langage, sauf si on te le demande explicitement.`
  },
  {
    role: "assistant",
    content: "Salut ! Je suis **Best**, ton compagnon d'étude personnel. Pose-moi une question, donne-moi un texte à analyser, ou lance un calcul. Je suis là pour t'aider à briller. 🌟"
  }
];

// --- INTERFACE COMPLÈTE ---
app.innerHTML = `
<div style="position: fixed; top:0; left:0; width:100%; height:100%; z-index:-1; overflow:hidden; pointer-events:none;">
  <div class="particle" style="top:5%; left:10%; animation-delay:0s;"></div>
  <div class="particle" style="top:15%; left:80%; animation-delay:1.5s;"></div>
  <div class="particle" style="top:60%; left:70%; animation-delay:3s;"></div>
  <div class="particle" style="top:85%; left:20%; animation-delay:4.5s;"></div>
  <div class="particle" style="top:30%; left:50%; animation-delay:2s;"></div>
  <div class="particle" style="top:75%; left:40%; animation-delay:5s;"></div>
</div>

<div class="main-container">
  <!-- HEADER AVEC ROBOT -->
  <header class="header">
    <div class="robot-container">
      <svg class="robot" viewBox="0 0 120 140" width="120" height="140">
        <!-- Corps -->
        <rect x="20" y="50" width="80" height="70" rx="15" fill="#6366f1" stroke="#818cf8" stroke-width="2"/>
        <!-- Tête -->
        <rect x="30" y="10" width="60" height="45" rx="12" fill="#c084fc" stroke="#e9d5ff" stroke-width="2"/>
        <!-- Yeux -->
        <circle cx="45" cy="32" r="6" fill="white"/>
        <circle cx="75" cy="32" r="6" fill="white"/>
        <circle cx="45" cy="32" r="3" fill="#1e1b4b"/>
        <circle cx="75" cy="32" r="3" fill="#1e1b4b"/>
        <!-- Antenne -->
        <line x1="60" y1="10" x2="60" y2="0" stroke="#f472b6" stroke-width="3"/>
        <circle cx="60" cy="0" r="4" fill="#f472b6"/>
        <!-- Bras -->
        <rect x="5" y="60" width="15" height="40" rx="7" fill="#a78bfa"/>
        <rect x="100" y="60" width="15" height="40" rx="7" fill="#a78bfa"/>
        <!-- Panneau "Best" -->
        <rect x="35" y="75" width="50" height="25" rx="5" fill="#0f172a" stroke="#f472b6" stroke-width="1.5"/>
        <text x="60" y="93" text-anchor="middle" fill="#f472b6" font-size="12" font-weight="bold" font-family="Space Grotesk">BEST</text>
        <!-- Jambes -->
        <rect x="30" y="120" width="15" height="20" rx="5" fill="#6366f1"/>
        <rect x="75" y="120" width="15" height="20" rx="5" fill="#6366f1"/>
      </svg>
    </div>
    <h1 class="title">AI Student Hub</h1>
    <p class="subtitle">◆ Propulsé par Best ◆</p>
  </header>

  <!-- NAVIGATION -->
  <nav class="nav">
    <button onclick="window.showTab('chat')" id="nav-chat" class="nav-btn active-tab">💬 Chat</button>
    <button onclick="window.showTab('translate')" id="nav-translate" class="nav-btn">🌐 Traduction</button>
    <button onclick="window.showTab('summary')" id="nav-summary" class="nav-btn">📝 Résumé</button>
    <button onclick="window.showTab('math')" id="nav-math" class="nav-btn">🧮 Calcul</button>
  </nav>

  <!-- ONGLET CHAT -->
  <div id="tab-chat" class="tab-content">
    <div id="chat-box" class="chat-container">
      <div class="ai-msg">
        <div class="avatar bot-avatar">🤖</div>
        <div class="bubble"><b>Best</b> : Salut ! Je suis <b>Best</b>, ton compagnon d'étude. Pose-moi une question ou demande-moi de l'aide.</div>
      </div>
    </div>
    <div class="input-bar">
      <input type="text" id="chat-input" placeholder="Écris ton message..." autocomplete="off">
      <button id="btn-chat" class="glow-btn">Envoyer</button>
    </div>
  </div>

  <!-- ONGLET TRADUCTION -->
  <div id="tab-translate" class="tab-content" style="display:none;">
    <div class="glass-card">
      <div class="lang-selectors">
        <select id="trans-from" class="custom-select">
          <option value="fr">Français</option>
          <option value="en">Anglais</option>
          <option value="es">Espagnol</option>
          <option value="de">Allemand</option>
          <option value="it">Italien</option>
          <option value="pt">Portugais</option>
          <option value="ar">Arabe</option>
          <option value="zh">Chinois</option>
          <option value="ja">Japonais</option>
          <option value="ru">Russe</option>
        </select>
        <span class="arrow">→</span>
        <select id="trans-to" class="custom-select">
          <option value="en">Anglais</option>
          <option value="fr">Français</option>
          <option value="es">Espagnol</option>
          <option value="de">Allemand</option>
          <option value="it">Italien</option>
          <option value="pt">Portugais</option>
          <option value="ar">Arabe</option>
          <option value="zh">Chinois</option>
          <option value="ja">Japonais</option>
          <option value="ru">Russe</option>
        </select>
      </div>
      <textarea id="trans-input" placeholder="Texte à traduire..." class="custom-textarea"></textarea>
      <button id="btn-trans" class="glow-btn full-width">Traduire maintenant</button>
      <div id="trans-result" class="result-box"></div>
    </div>
  </div>

  <!-- ONGLET RÉSUMÉ -->
  <div id="tab-summary" class="tab-content" style="display:none;">
    <div class="glass-card">
      <textarea id="summary-input" placeholder="Colle un long texte..." class="custom-textarea" style="height:140px;"></textarea>
      <div class="length-selector">
        <span>Longueur :</span>
        <select id="summary-length" class="custom-select">
          <option value="short">Courte (1-2 phrases)</option>
          <option value="medium" selected>Moyenne (paragraphe)</option>
          <option value="detailed">Détaillée</option>
        </select>
      </div>
      <button id="btn-summary" class="glow-btn full-width">Résumer avec Best</button>
      <div id="summary-result" class="result-box"></div>
    </div>
  </div>

  <!-- ONGLET MATHÉMATIQUES -->
  <div id="tab-math" class="tab-content" style="display:none;">
    <div class="glass-card">
      <h3 style="margin:0 0 15px 0; color:#c084fc;">Calculatrice intelligente</h3>
      <div class="math-display">
        <input type="text" id="math-input" placeholder="Ex: 2+2, sqrt(16), sin(pi/2)..." class="math-input">
        <div id="math-history" class="math-history"></div>
      </div>
      <div class="math-buttons">
        <button class="math-btn" onclick="window.insertMath('+')">+</button>
        <button class="math-btn" onclick="window.insertMath('-')">−</button>
        <button class="math-btn" onclick="window.insertMath('*')">×</button>
        <button class="math-btn" onclick="window.insertMath('/')">÷</button>
        <button class="math-btn" onclick="window.insertMath('(')">(</button>
        <button class="math-btn" onclick="window.insertMath(')')">)</button>
        <button class="math-btn" onclick="window.insertMath('^')">^</button>
        <button class="math-btn" onclick="window.insertMath('sqrt(')">√</button>
        <button class="math-btn" onclick="window.insertMath('pi')">π</button>
        <button class="math-btn" onclick="window.insertMath('e')">e</button>
        <button class="math-btn clear-btn" onclick="document.getElementById('math-input').value=''">C</button>
        <button id="btn-math" class="glow-btn" style="grid-column: span 2;">Calculer</button>
      </div>
      <div id="math-result" class="result-box" style="margin-top:15px;"></div>
    </div>
  </div>
</div>`;

// ==================== STYLES ====================
const style = document.createElement('style');
style.innerHTML = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; }
  body { 
    margin: 0; 
    background: radial-gradient(ellipse at 20% 50%, #1e1b4b 0%, #0f172a 60%, #020617 100%);
    min-height: 100vh;
    font-family: 'Space Grotesk', sans-serif;
  }

  .particle {
    position: absolute;
    width: 8px; height: 8px;
    background: #818cf8;
    border-radius: 50%;
    box-shadow: 0 0 25px #818cf8, 0 0 50px #c084fc;
    animation: float 7s infinite ease-in-out;
    opacity: 0.6;
  }
  .particle:nth-child(odd) { background: #c084fc; box-shadow: 0 0 25px #c084fc, 0 0 50px #f472b6; }
  @keyframes float {
    0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
    50% { transform: translateY(-50px) scale(1.8); opacity: 1; }
  }

  .main-container {
    max-width: 950px; margin: 20px auto;
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    padding: 30px; border-radius: 32px;
    box-shadow: 0 30px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(99,102,241,0.3), 0 0 100px rgba(99,102,241,0.15);
    border: 1px solid rgba(148, 163, 184, 0.1);
  }

  .header {
    display: flex; flex-direction: column; align-items: center; margin-bottom: 25px;
  }
  .robot-container {
    animation: bobble 3s infinite ease-in-out;
  }
  @keyframes bobble {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  .title {
    font-size: 2.8rem; font-weight: 800; margin: 5px 0 0;
    background: linear-gradient(135deg, #818cf8, #c084fc, #f472b6);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 20px rgba(129,140,248,0.5));
    letter-spacing: -1px; text-align: center;
  }
  .subtitle {
    color: #94a3b8; font-size: 0.9rem; letter-spacing: 2px; text-transform: uppercase;
  }

  .nav { 
    display: flex; gap: 10px; justify-content: center; margin-bottom: 30px; flex-wrap: wrap;
  }
  .nav-btn {
    background: rgba(30, 41, 59, 0.5); 
    color: #94a3b8; 
    border: 1px solid rgba(71, 85, 105, 0.5); 
    padding: 12px 22px; border-radius: 40px; cursor: pointer; 
    font-weight: 600; font-size: 0.9rem; letter-spacing: 0.5px;
    transition: all 0.3s; backdrop-filter: blur(8px);
  }
  .nav-btn:hover { background: rgba(51, 65, 85, 0.7); color: #e2e8f0; transform: translateY(-2px); }
  .active-tab { 
    background: linear-gradient(135deg, #6366f1, #8b5cf6) !important; 
    color: white !important; 
    border-color: #818cf8 !important; 
    box-shadow: 0 0 25px rgba(99,102,241,0.5);
  }

  .chat-container {
    height: 420px; overflow-y: auto;
    background: rgba(15, 23, 42, 0.4);
    backdrop-filter: blur(15px);
    padding: 20px; border-radius: 20px;
    border: 1px solid rgba(71, 85, 105, 0.4);
    margin-bottom: 15px; display: flex; flex-direction: column; gap: 14px;
  }
  .chat-container::-webkit-scrollbar { width: 5px; }
  .chat-container::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 20px; }

  .ai-msg, .user-msg {
    display: flex; gap: 10px; align-items: flex-end; animation: slideIn 0.3s ease-out;
  }
  .user-msg { flex-direction: row-reverse; }
  .avatar {
    width: 36px; height: 36px; border-radius: 50%; background: #1e293b;
    display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
    border: 1px solid #475569; flex-shrink: 0;
  }
  .bot-avatar { background: linear-gradient(135deg, #6366f1, #c084fc); border: none; }
  .bubble {
    max-width: 75%; padding: 12px 16px; border-radius: 18px 18px 18px 4px;
    background: rgba(30, 41, 59, 0.8); border: 1px solid rgba(71, 85, 105, 0.5);
    color: #e2e8f0; font-size: 0.95rem; line-height: 1.5;
  }
  .user-msg .bubble {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    border: none; color: white; border-radius: 18px 18px 4px 18px;
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .input-bar {
    display: flex; gap: 10px; background: rgba(30, 41, 59, 0.6);
    backdrop-filter: blur(15px); padding: 8px; border-radius: 50px;
    border: 1px solid rgba(71, 85, 105, 0.5);
  }
  .input-bar input {
    flex: 1; padding: 14px 20px; border: none; background: transparent;
    color: white; outline: none; font-size: 15px; font-family: inherit;
  }
  .input-bar input::placeholder { color: #64748b; }

  .glow-btn {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white; border: none; padding: 12px 28px; border-radius: 50px;
    cursor: pointer; font-weight: 700; letter-spacing: 0.5px;
    transition: all 0.3s; box-shadow: 0 0 25px rgba(99,102,241,0.5);
    white-space: nowrap; font-family: inherit; font-size: 0.95rem;
  }
  .glow-btn:hover {
    box-shadow: 0 0 45px rgba(139,92,246,0.7); transform: translateY(-2px);
  }
  .full-width { width: 100%; margin-top: 12px; }

  .glass-card {
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(18px);
    padding: 22px; border-radius: 20px;
    border: 1px solid rgba(71, 85, 105, 0.35);
  }
  .custom-textarea {
    width: 100%; padding: 14px; border-radius: 14px;
    border: 1px solid rgba(71, 85, 105, 0.5);
    background: rgba(15, 23, 42, 0.6); color: #e2e8f0;
    resize: vertical; font-family: inherit; font-size: 0.95rem; outline: none;
  }
  .custom-textarea:focus { border-color: #818cf8; box-shadow: 0 0 20px rgba(99,102,241,0.2); }
  .custom-select {
    padding: 10px 14px; border-radius: 30px;
    border: 1px solid rgba(71, 85, 105, 0.5);
    background: rgba(15, 23, 42, 0.7); color: #e2e8f0;
    font-family: inherit; outline: none; cursor: pointer;
  }
  .lang-selectors, .length-selector {
    display: flex; gap: 10px; align-items: center; margin-bottom: 15px;
  }
  .arrow { color:#818cf8; font-size:1.4rem; }

  .result-box {
    margin-top: 18px; padding: 16px 20px;
    background: rgba(15, 23, 42, 0.7); border-radius: 14px;
    border-left: 4px solid #818cf8; min-height: 45px;
    color: #cbd5e1; line-height: 1.5; animation: fadeIn 0.4s ease;
  }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

  .typing-dots { display: inline-flex; gap: 4px; }
  .typing-dots span {
    width: 7px; height: 7px; background: #818cf8; border-radius: 50%;
    animation: bounce 1.2s infinite;
  }
  .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
  .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-8px); }
  }

  /* Math tab */
  .math-display { margin-bottom: 15px; }
  .math-input {
    width: 100%; padding: 14px; font-size: 1.3rem;
    background: rgba(15, 23, 42, 0.8); border: 1px solid #475569;
    border-radius: 14px; color: #f1f5f9; font-family: 'Space Grotesk', monospace;
    outline: none; text-align: right;
  }
  .math-history {
    margin-top: 8px; min-height: 24px; color: #64748b; font-size: 0.85rem;
    font-family: monospace; text-align: right;
  }
  .math-buttons {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;
  }
  .math-btn {
    background: rgba(30, 41, 59, 0.7); border: 1px solid #475569;
    color: #e2e8f0; padding: 12px; border-radius: 12px;
    font-size: 1.1rem; cursor: pointer; transition: 0.2s;
    font-weight: 600;
  }
  .math-btn:hover { background: #4b5563; }
  .clear-btn { background: rgba(239,68,68,0.3); border-color: #ef4444; }
  .clear-btn:hover { background: rgba(239,68,68,0.6); }
`;
document.head.appendChild(style);

// ==================== LOGIQUE DES ONGLETS ====================
(window as any).showTab = (tab: string) => {
  document.querySelectorAll('.tab-content').forEach((el: any) => el.style.display = 'none');
  document.getElementById(`tab-${tab}`)!.style.display = 'block';
  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active-tab'));
  const activeBtn = document.getElementById(`nav-${tab}`);
  if (activeBtn) activeBtn.classList.add('active-tab');
};

// ==================== CHAT ====================
const chatBox = document.getElementById('chat-box')!;
const chatInput = document.getElementById('chat-input') as HTMLInputElement;

function addMessage(role: 'user' | 'ai', text: string) {
  const div = document.createElement('div');
  div.className = role === 'ai' ? 'ai-msg' : 'user-msg';
  div.innerHTML = role === 'ai' 
    ? `<div class="avatar bot-avatar">🤖</div><div class="bubble"><b>Best</b> : ${text.replace(/\n/g, '<br>')}</div>`
    : `<div class="avatar">👤</div><div class="bubble">${text}</div>`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'ai-msg';
  div.id = 'typing-indicator';
  div.innerHTML = `<div class="avatar bot-avatar">🤖</div><div class="bubble"><span class="typing-dots"><span></span><span></span><span></span></span></div>`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
  document.getElementById('typing-indicator')?.remove();
}

async function handleChat() {
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage('user', text);
  chatHistory.push({ role: "user", content: text });
  chatInput.value = "";
  showTyping();

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: chatHistory,
        temperature: 0.75,
        max_tokens: 800
      })
    });
    const data = await res.json();
    removeTyping();
    const aiResponse = data.choices?.[0]?.message?.content ?? "Désolé, je n'ai pas saisi. Peux-tu reformuler ?";
    chatHistory.push({ role: "assistant", content: aiResponse });
    addMessage('ai', aiResponse);
  } catch {
    removeTyping();
    addMessage('ai', "Oups, petit problème de connexion. Réessaie. 🙏");
  }
}

document.getElementById('btn-chat')!.onclick = handleChat;
chatInput.onkeydown = (e) => { if (e.key === 'Enter') handleChat(); };

// ==================== TRADUCTION ====================
document.getElementById('btn-trans')!.onclick = async () => {
  const text = (document.getElementById('trans-input') as HTMLTextAreaElement).value.trim();
  if (!text) return;
  const resultBox = document.getElementById('trans-result')!;
  resultBox.innerHTML = `<span class="typing-dots"><span></span><span></span><span></span></span> Traduction...`;
  const from = (document.getElementById('trans-from') as HTMLSelectElement).value;
  const to = (document.getElementById('trans-to') as HTMLSelectElement).value;
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`);
    const data = await res.json();
    resultBox.innerHTML = `<b>Traduction :</b><br><span style="font-size:1.1rem; color:#a5b4fc;">${data.responseData.translatedText}</span>`;
  } catch {
    resultBox.textContent = "Erreur de traduction.";
  }
};

// ==================== RÉSUMÉ ====================
document.getElementById('btn-summary')!.onclick = async () => {
  const text = (document.getElementById('summary-input') as HTMLTextAreaElement).value.trim();
  if (!text) return;
  const resultBox = document.getElementById('summary-result')!;
  resultBox.innerHTML = `<span class="typing-dots"><span></span><span></span><span></span></span> Best analyse...`;
  const lengthVal = (document.getElementById('summary-length') as HTMLSelectElement).value;
  const instr = lengthVal === 'short' ? 'en 1-2 phrases' : lengthVal === 'detailed' ? 'de façon détaillée' : 'en un paragraphe concis';
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: `Résume le texte fourni ${instr}. Français impeccable.` },
          { role: "user", content: text }
        ],
        temperature: 0.5,
        max_tokens: 500
      })
    });
    const data = await res.json();
    resultBox.innerHTML = `<b>Résumé :</b><br>${data.choices[0].message.content.replace(/\n/g, '<br>')}`;
  } catch {
    resultBox.textContent = "Erreur lors du résumé.";
  }
};

// ==================== CALCUL MATHÉMATIQUE ====================
// Charger math.js depuis CDN
const mathScript = document.createElement('script');
mathScript.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.8.0/math.min.js";
document.head.appendChild(mathScript);

(window as any).insertMath = (symbol: string) => {
  const input = document.getElementById('math-input') as HTMLInputElement;
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const before = input.value.substring(0, start);
  const after = input.value.substring(end);
  // Si on insère une fonction avec parenthèse, placer le curseur à l'intérieur
  let cursorShift = symbol.length;
  if (symbol.endsWith('(')) cursorShift = symbol.length;
  input.value = before + symbol + after;
  input.focus();
  input.setSelectionRange(start + cursorShift, start + cursorShift);
};

mathScript.onload = () => {
  document.getElementById('btn-math')!.onclick = () => {
    const input = document.getElementById('math-input') as HTMLInputElement;
    const resultBox = document.getElementById('math-result')!;
    const historyDiv = document.getElementById('math-history')!;
    const expr = input.value.trim();
    if (!expr) return;
    try {
      const result = (window as any).math.evaluate(expr);
      historyDiv.textContent = `${expr} = ${result}`;
      resultBox.innerHTML = `<b>Résultat :</b> <span style="font-size:1.5rem; color:#a5b4fc;">${result}</span>`;
    } catch (e) {
      resultBox.textContent = "Expression invalide. Vérifie la syntaxe.";
    }
  };
};