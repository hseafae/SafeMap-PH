export function initHelp(){
  const btn = document.getElementById('btnNearest');
  const out = document.getElementById('nearestOut');
  btn?.addEventListener('click', ()=>{
    if(!navigator.geolocation){ out.textContent='Geolocation not supported.'; return; }
    navigator.geolocation.getCurrentPosition(pos=>{
      const {latitude, longitude} = pos.coords;
      out.textContent = `Approx location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}. Nearest station: simulated (demo).`;
    }, ()=>{
      out.textContent = 'Unable to get location.';
    });
  });
}