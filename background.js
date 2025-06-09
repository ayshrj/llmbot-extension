/* ---------------------------------------------------------------
   Runs in the extension’s service-worker context.
   Injects the chatbot only when the user clicks the toolbar icon.
---------------------------------------------------------------- */
chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["inject.js"],
    });
  } catch (err) {
    console.error("LLMChatbot injection failed:", err);
  }
});
