import { subscribe, getReports, updateReportStatus, getActivity, STATUS } from './data.js';
import { toast } from './ui.js';

export function initAdminModule(){
  document.getElementById('btnAdminLogin')?.addEventListener('click', onLogin);
  subscribe(()=>populate());
}

function onLogin(){
  document.getElementById('adminLoginCard').style.display='none';
  document.getElementById('adminPanel').style.display='block';
  toast('Admin logged in (demo)');
  populate();
}

function populate(){
  const list = document.getElementById('pendingList');
  if(!list) return;
  list.innerHTML='';

  getReports().filter(r=>r.status===STATUS.PENDING).forEach(r=>{
    const el = document.createElement('div');
    el.className='card';
    el.innerHTML = `
      <h4>#${r.id} — ${r.type}</h4>
      <div class="meta">Date: ${r.date} • Coords: ${r.lat.toFixed(3)}, ${r.lng.toFixed(3)}</div>
      <div class="divider" style="height:1px;background:rgba(255,255,255,.06);margin:8px 0"></div>
      <div>${(r.desc||'No details provided.').slice(0,180)}</div>
      <div class="actions">
        <button class="btn" data-act="approve">Approve (Aggregated Heat)</button>
        <button class="btn primary" data-act="verify">Verify (PNP Confirmed)</button>
        <button class="btn warn" data-act="dismiss">Dismiss</button>
      </div>
    `;
    el.querySelectorAll('button').forEach(b=>{
      b.addEventListener('click', ()=>{
        if(b.dataset.act==='approve') updateReportStatus(r.id, STATUS.UNVERIFIED_APPROVED, 'approved for awareness');
        if(b.dataset.act==='verify')  updateReportStatus(r.id, STATUS.VERIFIED, 'verified by admin');
        if(b.dataset.act==='dismiss') updateReportStatus(r.id, STATUS.DISMISSED, 'dismissed');
        populate();
        toast(`Report #${r.id} updated`);
      });
    });
    list.appendChild(el);
  });

  const out = getActivity().slice(0,12).map(a=>`• ${new Date(a.t).toLocaleString()} — ${a.msg}`).join('<br>');
  document.getElementById('activityLog').innerHTML = out || 'No activity yet.';
}