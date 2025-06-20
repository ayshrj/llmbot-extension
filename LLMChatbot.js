class LLMChatbot extends HTMLElement {
  SALUTATIONS = [
    "Hi there! Curious about my work? Ask away.",
    "Hello! Feel free to explore my portfolio — what would you like to know?",
    "Welcome! I'm here to share about my projects, skills, and experience.",
    "Hey! Got questions about what I do? I'm all ears.",
    "Greetings! Let's dive into my portfolio — what interests you?",
  ];

  chevronDown = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
      viewBox="0 0 24 24" fill="none" stroke="var(--card-fg)" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`;

  sparkles = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0
      0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0
      0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582
      6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>`;

  maximize = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
      viewBox="0 0 24 24" fill="none" stroke="var(--card-fg)" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2
      2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2
      2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>`;

  minimize = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
      viewBox="0 0 24 24" fill="none" stroke="var(--card-fg)" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0
      1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0
      1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>`;

  arrowUp = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7
      7"/><path d="M12 19V5"/></svg>`;

  plus = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
      viewBox="0 0 24 24" fill="none" stroke="var(--card-fg)" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path
      d="M12 5v14"/></svg>`;

  gear = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
      viewBox="0 0 24 24" fill="none" stroke="var(--card-fg)" stroke-width="2"
      stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1
      1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1
      1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 5 15.4a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0
      1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1
      1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0
      1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1
      1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.36.13.7.31 1
      .54v-.04A1.65 1.65 0 0 0 21 9h.09a2 2 0 0 1 0 4H21a1.65 1.65 0 0 0-1.6 1.17c-.23.3-.41.64-.54 1Z"/></svg>`;

  MODEL_OPTIONS = {
    OpenAI: [
      "gpt-4o",
      "gpt-4o-mini",
      "gpt-4o-8k",
      "gpt-3.5-turbo",
      "gpt-4o-preview",
    ],
    Gemini: [
      "gemini-1.5-pro-latest",
      "gemini-1.5-flash-latest",
      "gemini-1.0-pro",
    ],
    Claude: [
      "claude-3-opus-20240229",
      "claude-3-sonnet-20240229",
      "claude-3-haiku-20240307",
    ],
    Azure: [
      "gpt-3.5-turbo",
      "gpt-4",
      "gpt-4o",
      "gpt-4o-mini",
      "gpt-4o-8k",
      "gpt-4o-preview",
    ],
  };

  DEFAULT_AZURE_API_VERSION = "2023-05-15";

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });

    this.minimized = true;
    this.fullscreen = false;
    this.loading = false;
    this.abortController = null;

    this.displayName =
      localStorage.getItem("llmchatbot_name") || this._askNameOnce();
    this.provider = localStorage.getItem("llmchatbot_provider") || "Gemini";
    this.model =
      localStorage.getItem("llmchatbot_model") ||
      this.MODEL_OPTIONS[this.provider][0];
    this.azureApiVersion =
      localStorage.getItem("llmchatbot_azure_api_version") ||
      this.DEFAULT_AZURE_API_VERSION;

    this.channel = new BroadcastChannel("llmchatbot_channel");
    this.channel.onmessage = () => this._syncFromStorage();

    if (!window.marked) {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/marked@5/marked.min.js";
      document.head.appendChild(s);
    }
  }

  connectedCallback() {
    this._shadow.innerHTML = `${this._style()}${this._html()}`;

    this.$container = this._shadow.querySelector(".chatbot");
    this.$messages = this._shadow.getElementById("messages");
    this.$input = this._shadow.getElementById("input");
    this.$sendBtn = this._shadow.getElementById("sendBtn");
    this.$toggleBtn = this._shadow.getElementById("toggleBtn");
    this.$newBtn = this._shadow.getElementById("newBtn");
    this.$resizeBtn = this._shadow.getElementById("resize");
    this.$settingsBtn = this._shadow.getElementById("settingsBtn");
    this.$settingsPanel = this._shadow.getElementById("settingsPanel");
    this.$providerSel = this._shadow.getElementById("providerSelect");
    this.$modelSel = this._shadow.getElementById("modelSelect");
    this.$apiInput = this._shadow.getElementById("apiInput");
    this.$endpointInput = this._shadow.getElementById("endpointInput");
    this.$apiVerLabel = this._shadow.getElementById("apiVersionLabel");
    this.$apiVerInput = this._shadow.getElementById("apiVersionInput");
    this.$saveSettings = this._shadow.getElementById("saveSettings");

    this._populateProviderUI();
    this._addMessage(
      this.SALUTATIONS[Math.floor(Math.random() * this.SALUTATIONS.length)],
      false,
      { markdown: true }
    );
    this._bindEvents();
  }

  disconnectedCallback() {
    this.channel.close();
  }

  _html() {
    return `
      <div class="chatbot${this.minimized ? " minimized" : ""}">
        <div class="chatbot-header">
          <div class="avatar">${this.sparkles}</div>
          <div class="user-info">
            <p class="name">${this.displayName}</p>
            <p class="email">${this.provider} • ${this.model}</p>
          </div>
          <div class="header-actions ml-auto">
            <button id="resize" title="Resize">${this.maximize}</button>
            <button id="newBtn" title="New conversation">${this.plus}</button>
            <button id="settingsBtn" title="Settings">${this.gear}</button>
            <button class="toggle-btn" id="toggleBtn" title="Minimise/Expand">
              ${this.sparkles}
              <div class="tooltip">AI Assistant</div>
            </button>
          </div>
        </div>

        <div id="settingsPanel" class="settings hidden">
          <h4>Chatbot Settings</h4>
          <label>Provider
            <select id="providerSelect"></select>
          </label>
          <label>Model
            <select id="modelSelect"></select>
          </label>
          <label>API key
            <input id="apiInput" type="password" placeholder="sk-…" />
          </label>
          <label id="endpointLabel" class="hidden">Endpoint
            <input id="endpointInput" type="text" placeholder="https://…"/>
          </label>
          <label id="apiVersionLabel" class="hidden">API Version
            <input id="apiVersionInput" type="text" placeholder="${
              this.DEFAULT_AZURE_API_VERSION
            }" />
          </label>
          <button id="saveSettings">Save</button>
        </div>

        <div class="chatbot-body" id="messages"></div>
        <div class="chatbot-footer">
          <input id="input" type="text" placeholder="Type your message…" autocomplete="off"/>
          <button class="send" id="sendBtn" disabled>${this.arrowUp}</button>
        </div>
      </div>`;
  }

  _style() {
    return `
      <style>
        :host{--foreground:#09090b;--card-bg:#fff;--card-fg:#0f1419;--muted-bg:#f1f5f9;--muted-fg:#64748b;
          --primary-bg:#0f172a;--primary-fg:#f8fafc;--border:#e2e8f0;--btn-bg:#f1f5f9;
          --btn-hover:#e2e8f0;--input-bg:transparent;--input-border:#e2e8f0;
          --input-placeholder:#94a3b8;font-family:system-ui,sans-serif;}
        .ml-auto{margin-left:auto;}
        .chatbot{position:fixed;bottom:20px;right:20px;width:400px;height:500px;
          display:flex;flex-direction:column;background:var(--card-bg);
          color:var(--card-fg);border:1px solid var(--border);border-radius:12px;
          box-shadow:0 4px 12px rgba(0,0,0,.1);z-index:999999;
          transition:width .2s,height .2s;}
        .chatbot.minimized{width:auto;height:auto;border-radius:9999px;}
        .chatbot.minimized .chatbot-body,
        .chatbot.minimized .chatbot-footer,
        .chatbot.minimized .avatar,
        .chatbot.minimized .user-info,
        .chatbot.minimized #newBtn,
        .chatbot.minimized #resize,
        .chatbot.minimized #settingsBtn{display:none!important;}
        .chatbot.minimized .chatbot-header{padding:0;border:none;justify-content:flex-end;border-radius:9999px;}
        .chatbot-header{display:flex;align-items:center;padding:16px;border-bottom:1px solid var(--border);}
        .avatar{width:40px;height:40px;border-radius:50%;overflow:hidden;flex-shrink:0;margin-right:12px;background:linear-gradient(45deg,#4f46e5,#7c3aed);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:600;}
        .user-info{display:flex;flex-direction:column;}
        .user-info .name{margin:0;font-size:1rem;font-weight:500;}
        .user-info .email{margin:2px 0 0;font-size:.85rem;color:var(--muted-fg);}
        .header-actions{display:flex;align-items:center;gap:2px;}
        .header-actions button{width:32px;height:32px;border:none;background:var(--btn-bg);border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;}
        .header-actions button:hover{background:var(--btn-hover);}
        .chatbot-body{flex:1;padding:16px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;}
        .message{max-width:75%;padding:8px 12px;border-radius:12px;font-size:.9rem;line-height:1.4;word-break:break-word;}
        .bot{background:var(--muted-bg);color:var(--card-fg);align-self:flex-start;}
        .user{background:var(--primary-bg);color:var(--primary-fg);align-self:flex-end;}
        /* Markdown content */
        .bot :where(h1,h2,h3,h4,h5,h6){margin:.25em 0;font-weight:600;}
        .bot p{margin:.25em 0;}
        .bot code{background:#e2e8f0;padding:2px 4px;border-radius:4px;font-size:.85em;}
        .bot pre{background:#e2e8f0;padding:12px;border-radius:8px;overflow:auto;}
        .bot a{color:#2563eb;text-decoration:underline;}
        .loading-dots{display:inline-flex;gap:4px;}
        .loading-dots span{width:6px;height:6px;border-radius:50%;
          background:var(--muted-fg);animation:pulse 1s infinite alternate;}
        .loading-dots span:nth-child(2){animation-delay:.2s}
        .loading-dots span:nth-child(3){animation-delay:.4s}
        @keyframes pulse{from{opacity:.3}to{opacity:1}}
        .error{background:#dc2626;color:#fff;padding:8px 12px;border-radius:12px;font-size:.8rem;}
        .chatbot-footer{padding:12px 16px;border-top:1px solid var(--border);display:flex;gap:8px;}
        .chatbot-footer input{flex:1;height:36px;padding:0 12px;border:1px solid var(--input-border);border-radius:8px;background:var(--input-bg);font-size:.9rem;color:var(--card-fg);}
        .chatbot-footer input:focus {outline:none;border-color:#e2e8f0;box-shadow:0 0 0 1px #e2e8f0;}
        .chatbot-footer input::placeholder{color:var(--input-placeholder);}
        .chatbot-footer button.send{width:36px;height:36px;border:none;background:var(--primary-bg);color:var(--primary-fg);border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;}
        .chatbot-footer button.send:disabled{opacity:.5;cursor:default;}
        .chatbot-footer button.send:hover:not(:disabled){background:#0c1220;}
        .toggle-btn{width:32px;height:32px;border:none;background:var(--btn-bg);border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;position:relative;color:var(--card-fg)}
        .toggle-btn:hover{background:var(--btn-hover);}
        .tooltip{position:absolute;right:calc(100% + 12px);top:50%;transform:translateY(-50%);background:var(--card-fg);color:var(--card-bg);padding:6px 12px;border-radius:6px;font-size:.8rem;white-space:nowrap;opacity:0;visibility:hidden;transition:opacity .2s,visibility .2s;box-shadow:0 2px 8px rgba(0,0,0,.1);}
        .tooltip::after{content:'';position:absolute;left:100%;top:50%;transform:translateY(-50%);border:5px solid transparent;border-left-color:var(--card-fg);}
        .chatbot.minimized .tooltip{opacity:1;visibility:visible;}
        .chatbot.fullscreen{top:20px;left:20px;right:20px;bottom:20px;width:auto!important;height:auto!important;border-radius:16px;}

        /* Settings panel */
        .settings{position:absolute;right:16px;top:64px;width:300px;background:var(--card-bg);border:1px solid var(--border);border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.1);padding:16px;display:flex;flex-direction:column;gap:12px;z-index:10;}
        .settings.hidden{display:none;}
        .settings h4{margin:0;font-size:1rem;font-weight:600;color:var(--card-fg);}
        .settings label{display:flex;flex-direction:column;font-size:.85rem;color:var(--card-fg);gap:4px;}
        .settings input,.settings select{height:32px;border:1px solid var(--border);border-radius:6px;padding:0 8px;background:var(--input-bg);color:var(--card-fg);font-size:.85rem;}
        .settings button{align-self:flex-end;background:var(--primary-bg);color:var(--primary-fg);border:none;border-radius:6px;height:32px;padding:0 16px;font-size:.85rem;cursor:pointer;}
        .settings button:hover{background:#0c1220;}
        #endpointLabel.hidden,#apiVersionLabel.hidden{display:none;}
      </style>`;
  }

  _syncFromStorage() {
    this.provider = localStorage.getItem("llmchatbot_provider") || "Gemini";
    this.model =
      localStorage.getItem("llmchatbot_model") ||
      this.MODEL_OPTIONS[this.provider][0];
    this.azureApiVersion =
      localStorage.getItem("llmchatbot_azure_api_version") ||
      this.DEFAULT_AZURE_API_VERSION;
    this._populateProviderUI();
    this._shadow.querySelector(
      ".user-info .email"
    ).textContent = `${this.provider} • ${this.model}`;
  }

  _populateProviderUI() {
    this.$providerSel.innerHTML = Object.keys(this.MODEL_OPTIONS)
      .map(
        (p) => `<option${p === this.provider ? " selected" : ""}>${p}</option>`
      )
      .join("");

    this._populateModelOptions(this.provider);

    this.$apiInput.value =
      localStorage.getItem(`llmchatbot_api_${this.provider}`) || "";

    if (this.provider === "Azure") {
      this._shadow.getElementById("endpointLabel").classList.remove("hidden");
      this._shadow.getElementById("apiVersionLabel").classList.remove("hidden");
      this.$endpointInput.value =
        localStorage.getItem("llmchatbot_endpoint") || "";
      this.$apiVerInput.value = this.azureApiVersion;
    } else {
      this._shadow.getElementById("endpointLabel").classList.add("hidden");
      this._shadow.getElementById("apiVersionLabel").classList.add("hidden");
    }
  }

  _populateModelOptions(provider) {
    const opts = this.MODEL_OPTIONS[provider] || [];
    this.$modelSel.innerHTML = opts
      .map(
        (m) =>
          `<option value="${m}"${
            m === this.model ? " selected" : ""
          }>${m}</option>`
      )
      .join("");
  }

  _bindEvents() {
    this.$input.addEventListener("input", () => {
      this.$sendBtn.disabled = !this.$input.value.trim() || this.loading;
    });

    this.$input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !this.$sendBtn.disabled) this.$sendBtn.click();
    });

    this.$sendBtn.addEventListener("click", () => {
      const txt = this.$input.value.trim();
      if (!txt) return;
      this.$input.value = "";
      this._addMessage(txt, true);
      this._requestAI(txt);
    });

    this.$newBtn.addEventListener("click", () => {
      this.$messages.innerHTML = "";
      this._addMessage(
        this.SALUTATIONS[Math.floor(Math.random() * this.SALUTATIONS.length)],
        false,
        { markdown: true }
      );
    });

    this.$toggleBtn.addEventListener("click", () => {
      this.minimized = !this.minimized;
      if (this.minimized) this.fullscreen = false;
      this.$container.classList.toggle("minimized", this.minimized);
      this.$container.classList.toggle("fullscreen", this.fullscreen);
      this._updateToggleIcon();
    });

    this.$resizeBtn.addEventListener("click", () => {
      this.fullscreen = !this.fullscreen;
      this.$container.classList.toggle("fullscreen", this.fullscreen);
      this.$resizeBtn.innerHTML = this.fullscreen
        ? this.minimize
        : this.maximize;
    });

    this.$settingsBtn.addEventListener("click", () => {
      this.$settingsPanel.classList.toggle("hidden");
      this._populateProviderUI();
    });

    this.$providerSel.addEventListener("change", () => {
      this.provider = this.$providerSel.value;
      this._populateModelOptions(this.provider);
      this._populateProviderUI();
    });

    this.$saveSettings.addEventListener("click", () => {
      this.provider = this.$providerSel.value;
      this.model = this.$modelSel.value;
      this.azureApiVersion =
        this.$apiVerInput.value.trim() || this.DEFAULT_AZURE_API_VERSION;
      const apiKey = this.$apiInput.value.trim();

      localStorage.setItem("llmchatbot_provider", this.provider);
      localStorage.setItem("llmchatbot_model", this.model);
      localStorage.setItem(
        "llmchatbot_azure_api_version",
        this.azureApiVersion
      );
      if (apiKey) {
        localStorage.setItem(`llmchatbot_api_${this.provider}`, apiKey);
      }
      if (this.provider === "Azure") {
        localStorage.setItem(
          "llmchatbot_endpoint",
          this.$endpointInput.value.trim()
        );
      }

      this._shadow.querySelector(
        ".user-info .email"
      ).textContent = `${this.provider} • ${this.model}`;
      this.$settingsPanel.classList.add("hidden");
      this.channel.postMessage({ type: "sync" });
    });
  }

  _updateToggleIcon() {
    this.$toggleBtn.innerHTML = `${
      this.minimized ? this.sparkles : this.chevronDown
    }
      <div class="tooltip">AI Assistant</div>`;
  }

  _askNameOnce() {
    let nm = "";
    while (!nm) {
      nm = prompt("Hi! What name should I address you by?")?.trim() || "";
    }
    localStorage.setItem("llmchatbot_name", nm);
    return nm;
  }

  _getApiKey() {
    return localStorage.getItem(`llmchatbot_api_${this.provider}`) || "";
  }

  _getEndpoint() {
    if (this.provider === "OpenAI") {
      return "https://api.openai.com/v1/chat/completions";
    }
    if (this.provider === "Claude") {
      return "https://api.anthropic.com/v1/messages";
    }
    if (this.provider === "Azure") {
      const base = (localStorage.getItem("llmchatbot_endpoint") || "").replace(
        /\/$/,
        ""
      );
      return `${base}/openai/deployments/${this.model}/chat/completions?api-version=${this.azureApiVersion}`;
    }
    // Gemini default
    return `https://generativelanguage.googleapis.com/v1beta/models/${
      this.model
    }:generateContent?key=${encodeURIComponent(this._getApiKey())}`;
  }

  _addMessage(text, isUser, opts = {}) {
    const { error = false, loading = false, markdown = false } = opts;
    const div = document.createElement("div");
    div.className = `message ${error ? "error" : isUser ? "user" : "bot"}`;

    if (loading) {
      div.innerHTML =
        '<div class="loading-dots"><span></span><span></span><span></span></div>';
    } else if (markdown && window.marked) {
      div.innerHTML = window.marked.parse(text);
    } else {
      div.textContent = text;
    }
    this.$messages.appendChild(div);
    this.$messages.scrollTop = this.$messages.scrollHeight;
    return div;
  }

  async _requestAI(message) {
    const apiKey = this._getApiKey();
    if (!apiKey) {
      this.$settingsPanel.classList.remove("hidden");
      this.$apiInput.focus();
      return;
    }

    const endpoint = this._getEndpoint();
    this.abortController?.abort();
    this.abortController = new AbortController();

    this.loading = true;
    this.$sendBtn.disabled = true;
    const loader = this._addMessage("", false, { loading: true });

    const opts = this._composeFetchOptions(endpoint, apiKey, message);
    try {
      const res = await fetch(endpoint, {
        ...opts,
        signal: this.abortController.signal,
      });
      const json = await res.json();
      const reply =
        json.choices?.[0]?.message?.content ??
        json.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ??
        json.content?.[0]?.text ??
        json.text ??
        json.reply;
      if (!reply) throw new Error("Empty response");
      loader.remove();
      this._addMessage(reply, false, { markdown: true });
    } catch (err) {
      if (err.name !== "AbortError") {
        loader.remove();
        this._addMessage(err.message, false, { error: true });
      }
    } finally {
      this.loading = false;
      this.$sendBtn.disabled = !this.$input.value.trim();
    }
  }

  _composeFetchOptions(endpoint, apiKey, userMessage) {
    if (this.provider === "OpenAI") {
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userMessage },
          ],
        }),
      };
    }
    if (this.provider === "Claude") {
      return {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: 1024,
          messages: [{ role: "user", content: userMessage }],
        }),
      };
    }
    if (this.provider === "Azure") {
      return {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": apiKey },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userMessage },
          ],
        }),
      };
    }

    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: userMessage }] }],
      }),
    };
  }
}

customElements.define("llm-chatbot", LLMChatbot);
