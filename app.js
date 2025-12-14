(function(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const btn = document.getElementById('btnPrint');
  if(btn) btn.addEventListener('click', () => window.print());
})();