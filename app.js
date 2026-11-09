const grid=document.getElementById('movieGrid'),search=document.getElementById('movieSearch'),filters=document.getElementById('filters');
let activeGenre='All';
function render(){
 const q=search.value.trim().toLowerCase();
 const list=MOVIES.filter(m=>(activeGenre==='All'||m.genre===activeGenre)&&(`${m.title} ${m.year} ${m.genre}`).toLowerCase().includes(q));
 grid.innerHTML=list.length?list.map(m=>`<article class="movie-card" data-id="${m.id}" tabindex="0" role="button" aria-label="View ${m.title}"><div class="poster"><img loading="lazy" src="${m.poster}" alt="Poster artwork for ${m.title}"><span class="play-icon">▶</span></div><div class="movie-info"><h3>${m.title}</h3><p>${m.year} &nbsp;·&nbsp; <span class="genre">${m.genre}</span> &nbsp;·&nbsp; ★ ${m.rating}</p></div></article>`).join(''):'<p class="empty">No titles found. Try another search.</p>';
}
function openMovie(id){
 const m=MOVIES.find(x=>x.id===Number(id));if(!m)return;
 const watch=m.watchUrl?`<a class="btn primary" href="${m.watchUrl}" target="_blank" rel="noopener">Watch on official platform ↗</a>`:'<p class="demo-note">Official licensed watch link not configured yet.</p>';
 const trailer=m.trailerUrl?`<a class="btn ghost" href="${m.trailerUrl}" target="_blank" rel="noopener">Watch trailer ↗</a>`:'';
 document.getElementById('modalContent').innerHTML=`<p class="eyebrow">${m.genre} · ${m.year} · ★ ${m.rating}</p><h2 id="modalTitle">${m.title}</h2><p>${m.description}</p>${watch} ${trailer}`;
 const modal=document.getElementById('movieModal');modal.classList.add('open');modal.setAttribute('aria-hidden','false');
}
grid.addEventListener('click',e=>{const card=e.target.closest('.movie-card');if(card)openMovie(card.dataset.id)});
grid.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.classList.contains('movie-card')){e.preventDefault();openMovie(e.target.dataset.id)}});
search.addEventListener('input',render);
filters.addEventListener('click',e=>{const b=e.target.closest('button[data-genre]');if(!b)return;activeGenre=b.dataset.genre;filters.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));render()});
document.querySelector('.modal-close').addEventListener('click',()=>{const m=document.getElementById('movieModal');m.classList.remove('open');m.setAttribute('aria-hidden','true')});
document.getElementById('movieModal').addEventListener('click',e=>{if(e.target.id==='movieModal')document.querySelector('.modal-close').click()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelector('.modal-close').click()});
document.querySelector('.menu-toggle').addEventListener('click',e=>{const nav=document.querySelector('.nav');const open=nav.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',String(open))});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav').classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();render();