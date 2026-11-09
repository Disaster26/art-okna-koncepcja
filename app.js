(function(){
  var d=document;

  // kolory okleiny ze strony art-okna.com.pl/kolorystyka (stan 09.11.2026)
  var K=[['bialy01m','Biały'],['kremowy59m','Kremowy'],['szary02m','Szary'],['anthrazitgrausatin88m','Anthrazitgrau (Satin)'],['antracyt70m','Antracyt'],['metbrushalu69m','Metbrush Alu'],['stalowoniebieski11m','Stalowoniebieski'],['ciemnozielony03m','Ciemnozielony'],['ciemnoczerwony06m','Ciemnoczerwony'],['zlotydab51m','Złoty Dąb'],['orzech21m','Orzech'],['mahon26m','Mahoń'],['dabbagienny25m','Dąb bagienny'],['ciemnybraz71m','Ciemny brąz'],['letniadaglezja27m','Letnia daglezja'],['macore40m','Macore'],['oregon52m','Oregon'],['birkerose44m','Birke Rose'],['teakarte65m','Teak Arte'],['cheyenne64m','Natur-Line Cheyenne'],['nature-line_vermont60m','Nature-Line Vermont'],['nature-line_meranti61m','Nature-Line Meranti'],['nature-line_tiama62m','Nature-Line Tiama'],['nature-line_montana63m','Nature-Line Montana']];
  var ul=d.getElementById('kolory');
  if(ul){K.forEach(function(k){var li=d.createElement('li'),p=d.createElement('i'),s=d.createElement('span');p.className='prob';p.style.backgroundImage='url(img/k-'+k[0]+'.webp)';p.setAttribute('aria-hidden','true');s.textContent=k[1];li.appendChild(p);li.appendChild(s);ul.appendChild(li)})}

  // menu mobilne
  var burger=d.getElementById('burger'), menu=d.getElementById('menu');
  function zamknij(){menu.classList.remove('otw');burger.setAttribute('aria-expanded','false');d.body.style.overflow=''}
  burger.addEventListener('click',function(){
    var otw=!menu.classList.contains('otw');
    menu.classList.toggle('otw',otw);burger.setAttribute('aria-expanded',String(otw));d.body.style.overflow=otw?'hidden':'';
  });
  menu.addEventListener('click',function(e){if(e.target.closest('a'))zamknij()});
  d.addEventListener('keydown',function(e){if(e.key==='Escape')zamknij()});

  // aktywna pozycja menu = bieżąca sekcja
  var linki=[].slice.call(menu.querySelectorAll('a[href^="#"]'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(wp){
      wp.forEach(function(w){if(w.isIntersecting){linki.forEach(function(a){if(a.getAttribute('href')==='#'+w.target.id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})}});
    },{rootMargin:'-45% 0px -50% 0px'});
    ['okna','drzwi','montaz','wykonczenie','realizacje','firma','kontakt'].forEach(function(id){var s=d.getElementById(id);if(s)io.observe(s)});
    // pasek dolny dopiero po minięciu przycisku z pierwszego ekranu
    var mob=d.getElementById('mob'), cta=d.querySelector('.hero-cta');
    if(mob&&cta){new IntersectionObserver(function(w){var widac=!w[0].isIntersecting&&w[0].boundingClientRect.top<0;mob.classList.toggle('widac',widac);mob.setAttribute('aria-hidden',String(!widac));mob.querySelectorAll('a').forEach(function(a){a.tabIndex=widac?0:-1})}).observe(cta)}
  }

  // pasy: palec natywnie, mysz przeciąganiem, strzałki
  d.querySelectorAll('.pas').forEach(function(pas){
    var x0=0,s0=0,ciag=false,ruch=false;
    pas.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;ciag=true;ruch=false;x0=e.clientX;s0=pas.scrollLeft});
    window.addEventListener('pointermove',function(e){if(!ciag)return;var dx=e.clientX-x0;if(Math.abs(dx)>4){ruch=true;pas.classList.add('ciag')}if(ruch){pas.scrollLeft=s0-dx;e.preventDefault()}});
    window.addEventListener('pointerup',function(){if(!ciag)return;ciag=false;pas.classList.remove('ciag')});
    pas.addEventListener('click',function(e){if(ruch){e.preventDefault();e.stopPropagation();ruch=false}},true);
    pas.addEventListener('dragstart',function(e){e.preventDefault()});
    pas.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();krok(pas,1)}if(e.key==='ArrowLeft'){e.preventDefault();krok(pas,-1)}});
  });
  function krok(pas,k){var f=pas.firstElementChild;pas.scrollBy({left:k*(f?f.getBoundingClientRect().width+18:300)*(pas.id==='kolory'?4:1),behavior:'smooth'})}
  d.querySelectorAll('[data-pas]').forEach(function(b){b.addEventListener('click',function(){krok(d.getElementById(b.dataset.pas),+b.dataset.k)})});

  // formularz pokazowy, bez wysyłki
  var f=d.getElementById('form');
  if(f)f.addEventListener('submit',function(e){e.preventDefault();d.getElementById('formInfo').hidden=false});

  var rok=d.getElementById('rok');if(rok)rok.textContent=new Date().getFullYear();
})();
