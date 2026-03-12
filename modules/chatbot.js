import { toast } from './ui.js';

export function initChatbot(){
  const fab = document.getElementById('fabChat');
  const panel = document.getElementById('botPanel');
  const closeBtn = document.getElementById('closeBot');
  const body = document.getElementById('botBody');
  const input = document.getElementById('botInput');
  const send = document.getElementById('botSend');

  function say(text){
    const m = document.createElement('div');
    m.className='bot-msg';
    m.textContent = text;
    body.appendChild(m);
    body.scrollTop = body.scrollHeight;
  }

  fab?.addEventListener('click', ()=> panel.style.display = (panel.style.display==='block'?'none':'block'));
  closeBtn?.addEventListener('click', ()=> panel.style.display='none');
  send?.addEventListener('click', ()=>{
    const q = (input.value||'').toLowerCase().trim();
    if(!q) return;
    say(`You: ${q}`);
    input.value='';

    if(q.includes('filter') || q.includes('map')){
      say('Use "Map & Filters" to set type, status, and date. Approved unverified = heat; Verified = markers.');
    } else if(q.includes('report') || q.includes('submit')){
      say('Open "Submit Report". Pick Type, Date, and drop a pin on the small map. You will get a reference message.');
    } else if(q.includes('help') || q.includes('hotline') || q.includes('wcpd') || q.includes('vawc') || q.includes('dswd')){
      say('Go to "Help & Hotlines" for PNP, WCPD, Barangay VAWC, and DSWD contacts. You can also click "Find Nearest Station".');
    } else if(q.includes('verify') || q.includes('status')){
      say('Reports go Pending → Reviewed → Dismissed / Approved (aggregated heat) / Verified (PNP confirmed). Only verified data powers ops analytics.');
    } else {
      say('I can help with map filters, how to submit, and hotline info. Try: "How do I drop a pin on the report map?"');
    }
  });

  toast('AI chatbot ready');
}