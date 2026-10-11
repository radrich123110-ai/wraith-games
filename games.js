// Live GN-Math HTML catalog. This links to source files; it does not copy games.
const GAMES=[];
const CDN='https://cdn.jsdelivr.net/gh/gn-math/html@main/';
const disallowed=/(adult|nsfw|18\+|casino|poker|roulette|slot|betting|gambling|gun|shooter|shooting|weapon|gore|blood|horror|fnaf|ultrakill|buckshot|quake|half.life|doki.doki)/i;
const friendly=s=>s.replace(/\.html$/i,'').replace(/[_-]+/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
async function loadGNGames(){
 const status=document.getElementById('catalogStatus');
 status.textContent='Loading GN Games catalog…';
 const sources=[
  async()=>{const r=await fetch('https://api.github.com/repos/gn-math/html/git/trees/main?recursive=1');if(!r.ok)throw Error('GitHub '+r.status);const j=await r.json();return j.tree.filter(x=>x.type==='blob'&&x.path.toLowerCase().endsWith('.html')).map(x=>x.path)},
  async()=>{const r=await fetch('https://data.jsdelivr.com/v1/package/gh/gn-math/html@main');if(!r.ok)throw Error('CDN '+r.status);const j=await r.json();const walk=(files,p='')=>files.flatMap(x=>x.type==='directory'?walk(x.files||[],p+x.name+'/'):[p+x.name]);return walk(j.files||[]).filter(x=>x.toLowerCase().endsWith('.html'))}
 ];
 let paths=[];let error='';for(const get of sources){try{paths=await get();if(paths.length)break}catch(e){error=e.message}}
 if(!paths.length){status.textContent='Catalog unavailable ('+error+'). Try refreshing later.';return}
 const games=paths.filter(p=>!disallowed.test(p)&&!p.includes('..')).map(p=>({name:friendly(p.split('/').pop()),category:'GN Games',url:CDN+p.split('/').map(encodeURIComponent).join('/')}));
 GAMES.splice(0,GAMES.length,...games.sort((a,b)=>a.name.localeCompare(b.name)));
 status.textContent=GAMES.length+' GN Games found • Some may require opening in a new tab';render();
}
window.addEventListener('DOMContentLoaded',loadGNGames);
