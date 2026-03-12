export function initRouting(){
  const routeButtons = document.querySelectorAll('.route-btn');
  const sections = document.querySelectorAll('.section');
  routeButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      routeButtons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.target;
      sections.forEach(s=>s.classList.toggle('active', s.id === target));
    });
  });
}

export function toast(msg, ms=2200){
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.style.display='block';
  setTimeout(()=>t.style.display='none', ms);
}