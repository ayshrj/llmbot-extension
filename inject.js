console.log("Injecting LLMChatbot...");

/* -----------------------------------------------------------------
   inject.js
   1)  Inject LLMChatbot class source into the page (real DOM context).
   2)  Append one <llm-chatbot></llm-chatbot> element to <body>.
------------------------------------------------------------------*/
(() => {
  const script = document.createElement("script");
  script.src = chrome.runtime.getURL("LLMChatbot.js");
  script.onload = () => {
    console.log("LLMChatbot script loaded.");
    document.body.appendChild(document.createElement("llm-chatbot"));
  };
  (document.head || document.documentElement).appendChild(script);
})();
