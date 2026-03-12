// Simple in-memory store + pub/sub

export const STATUS = {
  PENDING: 'pending',
  UNVERIFIED_APPROVED: 'unverified_approved',
  VERIFIED: 'verified',
  DISMISSED: 'dismissed'
};

let reports = [
  {id:1, type:'Theft / Robbery',  date:'2026-02-20', lat:14.607, lng:121.0, status:STATUS.UNVERIFIED_APPROVED, desc:'Bag snatching reported in the area.'},
  {id:2, type:'Rape / GBV',       date:'2026-02-18', lat:14.59,  lng:120.98, status:STATUS.PENDING, desc:'Sensitive incident reported.'},
  {id:3, type:'Physical Injury',  date:'2026-02-10', lat:14.61,  lng:120.99, status:STATUS.VERIFIED, desc:'Verified case recorded by PNP.'},
  {id:4, type:'Other',            date:'2026-02-15', lat:14.62,  lng:121.02, status:STATUS.UNVERIFIED_APPROVED, desc:'Shots heard, details unknown.'}
];

let activity = [];
const listeners = new Set();
function emit(evt, payload){ listeners.forEach(fn=>fn(evt, payload)); }

export function subscribe(fn){ listeners.add(fn); return ()=>listeners.delete(fn); }

export function getReports(){ return [...reports]; }
export function getActivity(){ return [...activity]; }

export function addReport({type, date, lat, lng, desc}){
  const id = Date.now();
  const rec = {id, type, date, lat, lng, status:STATUS.PENDING, desc:desc||''};
  reports.push(rec);
  const ref = `SMPH-${id.toString().slice(-6)}`;
  activity.unshift({t:new Date(), msg:`Report ${id} received (Pending)`});
  emit('report-added', rec);
  return {id, ref};
}

export function updateReportStatus(id, status, note=''){
  const rec = reports.find(r=>r.id===id);
  if(!rec) return;
  rec.status = status;
  activity.unshift({t:new Date(), msg:`Report ${id} → ${status} ${note?'- '+note:''}`});
  emit('report-updated', rec);
}

export function filterReports({type, status, dateFrom, dateTo}){
  return reports.filter(r=>{
    if(type && r.type!==type) return false;
    if(status && r.status!==status) return false;
    if(dateFrom && r.date < dateFrom) return false;
    if(dateTo && r.date > dateTo) return false;
    return true;
  });
}