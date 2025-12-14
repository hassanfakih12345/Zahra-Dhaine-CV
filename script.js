(function(){
  const year = document.getElementById('year');
  year.textContent = String(new Date().getFullYear());

  // Mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  function setMenu(open){
    menuBtn.setAttribute('aria-expanded', String(open));
    mobileMenu.hidden = !open;
  }

  menuBtn?.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') !== 'true';
    setMenu(open);
  });

  mobileMenu?.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if(a) setMenu(false);
  });

  // Stars & dots rendering
  document.querySelectorAll('[data-stars]').forEach((el) => {
    const count = Math.max(0, Math.min(5, parseInt(el.getAttribute('data-stars') || '0', 10)));
    el.innerHTML = '';
    for(let i=0;i<5;i++){
      const s = document.createElement('span');
      s.className = 'star' + (i < count ? ' is-on' : '');
      el.appendChild(s);
    }
  });

  document.querySelectorAll('[data-dots]').forEach((el) => {
    const count = Math.max(0, Math.min(5, parseInt(el.getAttribute('data-dots') || '0', 10)));
    el.innerHTML = '';
    for(let i=0;i<5;i++){
      const d = document.createElement('span');
      d.className = 'dot' + (i < count ? ' is-on' : '');
      el.appendChild(d);
    }
  });

  // Copy link
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  copyLinkBtn?.addEventListener('click', async () => {
    try{
      await navigator.clipboard.writeText(location.href);
      toast('Copied!');
    }catch{
      toast('Copy failed — select & copy from the address bar.');
    }
  });

  // Message copy
  const msgForm = document.getElementById('msgForm');
  msgForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('msg');
    try{
      await navigator.clipboard.writeText(msg.value || '');
      toast('Message copied.');
    }catch{
      toast('Copy failed.');
    }
  });

  // QR code
  const siteUrl = document.getElementById('siteUrl');
  const genQrBtn = document.getElementById('genQrBtn');
  const qrTarget = document.getElementById('qrTarget');
  const downloadQrBtn = document.getElementById('downloadQrBtn');

  let qr;

  function normalizeUrl(u){
    try{
      const url = new URL(u);
      return url.toString();
    }catch{
      return '';
    }
  }

  function renderQr(url){
    qrTarget.innerHTML = '';
    qr = new QRCode(qrTarget, {
      text: url,
      width: 180,
      height: 180,
      correctLevel: QRCode.CorrectLevel.M
    });

    // enable download button after a short tick
    setTimeout(() => {
      const canvas = qrTarget.querySelector('canvas');
      downloadQrBtn.disabled = !canvas;
    }, 50);
  }

  genQrBtn?.addEventListener('click', () => {
    const u = normalizeUrl(siteUrl.value.trim());
    if(!u){
      toast('Please paste a valid URL.');
      return;
    }
    renderQr(u);
  });

  downloadQrBtn?.addEventListener('click', () => {
    const canvas = qrTarget.querySelector('canvas');
    if(!canvas) return;
    const a = document.createElement('a');
    a.download = 'zahra-dhaine-qr.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  });

  // tiny toast
  let t;
  function toast(text){
    if(t) t.remove();
    t = document.createElement('div');
    t.textContent = text;
    t.style.position = 'fixed';
    t.style.left = '50%';
    t.style.bottom = '22px';
    t.style.transform = 'translateX(-50%)';
    t.style.padding = '10px 12px';
    t.style.borderRadius = '14px';
    t.style.background = 'rgba(15,26,46,.92)';
    t.style.border = '1px solid rgba(255,255,255,.12)';
    t.style.boxShadow = '0 18px 55px rgba(0,0,0,.35)';
    t.style.color = '#e7eef7';
    t.style.fontWeight = '600';
    t.style.zIndex = '9999';
    document.body.appendChild(t);
    setTimeout(()=>{ t?.remove(); t=null; }, 1400);
  }
})(); 
