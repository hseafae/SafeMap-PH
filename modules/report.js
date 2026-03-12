import { addReport } from './data.js';
import { toast } from './ui.js';

let rmap, pin;

export function initReportModule(){
  // Build small map for pinpointing location
  rmap = L.map('reportMap', { zoomControl:true, attributionControl:false })
           .setView([14.5995,120.9842], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(rmap);

  // Create a draggable marker; hidden until user clicks
  pin = L.marker([14.5995,120.9842], {draggable:true, opacity:0.0}).addTo(rmap);

  // Click to drop pin
  rmap.on('click', (e)=>{
    const {lat, lng} = e.latlng;
    pin.setLatLng([lat,lng]).setOpacity(1.0);
    setCoordFields(lat, lng);
  });

  // Drag end updates fields
  pin.on('dragend', ()=>{
    const {lat, lng} = pin.getLatLng();
    setCoordFields(lat, lng);
  });

  // Submit button
  document.getElementById('btnSubmitReport')?.addEventListener('click', submitReport);
}

function setCoordFields(lat, lng){
  document.getElementById('repCoords').value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  const loc = document.getElementById('repLocation');
  if(loc && !loc.value) loc.value = `Pinned @ ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
}

function submitReport(){
  const type = document.getElementById('repType').value;
  const date = document.getElementById('repDate').value;
  const loc  = document.getElementById('repLocation').value.trim();
  const crd  = document.getElementById('repCoords').value.trim();
  const desc = document.getElementById('repDesc').value.trim();

  if(!type || !date || !loc){
    toast('Please complete required fields (Type, Date, Location).');
    return;
  }

  let lat=14.5995, lng=120.9842;
  if(crd.includes(',')){
    const [a,b] = crd.split(',').map(v=>parseFloat(v));
    if(!isNaN(a)&&!isNaN(b)){ lat=a; lng=b; }
  }

  const {id, ref} = addReport({type, date, lat, lng, desc});
  document.getElementById('submitAck').innerHTML =
    `<span style="color:#a7f3d0">Submission received.</span> Reference: <strong>${ref}</strong>.<br/>` +
    `Status is <em>Pending Review</em>. Anonymous reports are for awareness only.`;

  toast(`Report #${id} submitted`);
  // Reset minimal fields (keep location for convenience)
  document.getElementById('repType').value='';
  document.getElementById('repDate').value='';
  document.getElementById('repDesc').value='';
}