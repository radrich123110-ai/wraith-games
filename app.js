const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
let favs=JSON.parse(localStorage.getItem("wraith-favs")||"[]");
function card(g){const fav=favs.includes(g.name);return `<article class="card" data-name="${g.name.toLowerCase()}"><b>${g.name}</b><small>${g.category}</small><div class="actions"><button onclick='play(${JSON.stringify(g.name)})'>PLAY</button><button onclick='favorite(${JSON.stringify(g.name)})'>${fav?"★":"☆"}</button></div></article>`}
function render(){ $("#library").innerHTML=GAMES.map(card).join("");$("#quick").innerHTML=GAMES.slice(0,4).map(card).join("");$("#favLibrary").innerHTML=GAMES.filter(g=>favs.includes(g.name)).map(card).join("")||"<p class='muted'>No favorites yet.</p>";$("#count").textContent=GAMES.length+" GAMES";}
function showView(id){$$(".view").forEach(x=>x.classList.remove("show"));$("#"+id).classList.add("show");$$("nav button").forEach(x=>x.classList.toggle("active",x.dataset.view===id));$("#title").innerHTML=id==="home"?'Welcome to <em>WRAITH</em>':id[0].toUpperCase()+id.slice(1);}
$$("nav button").forEach(b=>b.onclick=()=>showView(b.dataset.view));
function play(name){let g=GAMES.find(x=>x.name===name);if(!g)return;$("#playerTitle").textContent="WRAITH // "+g.name;$("#frame").src=g.url;$("#player").classList.remove("hidden")}
function openExternal(){const url=document.querySelector('#frame').src;if(url&&url!=='about:blank')window.open(url,'_blank','noopener,noreferrer')}
function closePlayer(){$("#frame").src="about:blank";$("#player").classList.add("hidden")}
function fullscreen(){document.querySelector("#player").requestFullscreen?.()}
function favorite(name){favs=favs.includes(name)?favs.filter(x=>x!==name):[...favs,name];localStorage.setItem("wraith-favs",JSON.stringify(favs));render()}
$("#search").oninput=e=>{showView("games");let q=e.target.value.toLowerCase();$$("#library .card").forEach(c=>c.style.display=c.dataset.name.includes(q)?"":"none")}
$("#compact").onchange=e=>document.body.classList.toggle("compact",e.target.checked);
render();