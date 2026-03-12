import { initRouting, toast } from './modules/ui.js';
import { initMainMap, bindMapControls, refreshMap } from './modules/map.js';
import { initReportModule } from './modules/report.js';
import { initAdminModule } from './modules/admin.js';
import { initChatbot } from './modules/chatbot.js';
import { initHelp } from './modules/help.js';

window.addEventListener('DOMContentLoaded', () => {
  initRouting();
  initMainMap();
  bindMapControls();
  initReportModule();
  initAdminModule();
  initChatbot();
  initHelp();

  // Default view
  document.querySelector('[data-target="view-map"]').click();
  refreshMap();

  // Layer toggle button
  const btnToggle = document.getElementById('btnToggleLayer');
  btnToggle?.addEventListener('click', () => {
    const event = new CustomEvent('smp:toggleLayers');
    window.dispatchEvent(event);
    toast('Toggled map layers');
  });
});