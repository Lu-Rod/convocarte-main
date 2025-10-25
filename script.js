// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();

// Filtros de galería
['anio','artista','tecnica','archivo'].forEach(f=>{
  const el = document.getElementById('filtro-'+f);
  if(el) el.addEventListener('change', filtrar);
});
function filtrar(){
  const anio = document.getElementById('filtro-anio')?.value;
  const artista = document.getElementById('filtro-artista')?.value;
  const tecnica = document.getElementById('filtro-tecnica')?.value;
  const archivo = document.getElementById('filtro-archivo')?.value;
  document.querySelectorAll('#gallery .thumb').forEach(card => {
    const ok = (!anio || card.dataset.anio===anio) &&
               (!artista || card.dataset.artista===artista) &&
               (!tecnica || card.dataset.tecnica===tecnica) &&
               (!archivo || card.dataset.archivo===archivo);
    card.style.display = ok ? '' : 'none';
  });
}


// Contacto via mailto
/*
function enviarMail(e){
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const to = 'comunicacionvisual.cerpsw@gmail.com';
  const subject = encodeURIComponent('Contacto desde Convocarte: ' + nombre);
  const body = encodeURIComponent(`Nombre: ${nombre}\nCorreo: ${correo}\n\n${mensaje}`);
  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  e.target.reset();
}
*/

// Alto contraste
document.getElementById('contrastToggle')?.addEventListener('change', (e)=>{
  if(e.target.checked){
    document.documentElement.style.setProperty('--bg','#000');
    document.documentElement.style.setProperty('--panel','#000000ee');
    document.documentElement.style.setProperty('--text','#fff');
    document.documentElement.style.setProperty('--muted','#e5e7eb');
    document.body.style.background = '#000';
  } else {
    document.location.reload();
  }
});

// i18n
const i18n = {
  es:{headline:'Convocarte'},
  en:{headline:'Convocarte'},
  pt:{headline:'Convocarte'}
};
let lang = 'es';
document.getElementById('langBtn').addEventListener('click', ()=>{
  lang = lang==='es'?'en':lang==='en'?'pt':'es';
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(i18n[lang] && i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  document.getElementById('langBtn').textContent = (lang==='es'?'🌐 Idioma':'🌐 Language');
  document.documentElement.setAttribute('lang', lang);
});

// Resaltar sección activa + scroll suave
const navLinks = Array.from(document.querySelectorAll('nav.menu a[href^="#"]'));
const sections = navLinks.map(a => document.getElementById(a.getAttribute('href').slice(1))).filter(Boolean);
function setActive(id){ navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`)); }
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry => { if(entry.isIntersecting){ setActive(entry.target.id); } })
}, { rootMargin: '-120px 0px -60% 0px', threshold: 0.2 });
sections.forEach(sec => observer.observe(sec));
navLinks.forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if(target){ e.preventDefault(); setActive(id); target.scrollIntoView({behavior:'smooth', block:'start'}); }
  })
});
// --- Scroll suave robusto para el menú ---
(function () {
  const links = document.querySelectorAll('nav.menu a[href^="#"]');

  function go(id) {
    const target = document.getElementById(id);
    if (!target) return false;                 // no frenamos el click si no existe
    history.pushState(null, '', '#' + id);     // actualiza URL
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return true;
  }

  links.forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const ok = go(id);
      if (ok) e.preventDefault();              // solo prevenimos si existe destino
    });
  });

  // Si la página carga con hash (#impacto, etc.), desplazá al destino
  if (location.hash && document.getElementById(location.hash.slice(1))) {
    setTimeout(() => go(location.hash.slice(1)), 0);
  }
})();
