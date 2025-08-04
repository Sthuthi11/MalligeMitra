// TODO: Remove this workaround when login/backend is ready.
// This script persists the Google Translate language selection across page loads using localStorage.
// It should be loaded after the Google Translate widget script.

function persistGoogleTranslateLanguage() {
  // Listen for language changes
  document.addEventListener('DOMNodeInserted', function (event) {
    if (event.target.nodeType === 1 && event.target.classList.contains('goog-te-combo')) {
      var combo = event.target;
      combo.addEventListener('change', function () {
        localStorage.setItem('google-translate-lang', combo.value);
      });
      // On load, set the language if previously selected
      var savedLang = localStorage.getItem('google-translate-lang');
      if (savedLang && combo.value !== savedLang) {
        combo.value = savedLang;
        combo.dispatchEvent(new Event('change'));
      }
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', persistGoogleTranslateLanguage);
} else {
  persistGoogleTranslateLanguage();
}
