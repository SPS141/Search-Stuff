const ENGINES=[
{id:'google',name:'Google',url:q=>`https://www.google.com/search?q=${encodeURIComponent(q)}`},
{id:'bing',name:'Bing',url:q=>`https://www.bing.com/search?q=${encodeURIComponent(q)}`},
{id:'duck',name:'DuckDuckGo',url:q=>`https://duckduckgo.com/?q=${encodeURIComponent(q)}`},
{id:'reddit',name:'Reddit',url:q=>`https://www.reddit.com/search/?q=${encodeURIComponent(q)}`},
{id:'ahmia',name:'Ahmia (Tor OSINT)',url:q=>`https://ahmia.fi/search/?q=${encodeURIComponent(q)}`},
{id:'onionland',name:'OnionLand Search',url:q=>`https://onionlandsearchengine.com/search?q=${encodeURIComponent(q)}`},
{id:'darkfail',name:'Dark.Fail Directory',url:q=>`https://dark.fail/`}
];

window.onload=()=>{
const box=document.getElementById('engineList');
ENGINES.forEach(e=>{
const d=document.createElement('div');
d.className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded border";
d.innerHTML=`<input type='checkbox' id='eng_${e.id}'><label for='eng_${e.id}'>${e.name}</label>`;
box.appendChild(d);
});
};

function runSearch(){
const raw=document.getElementById('names').value.trim();
if(!raw){alert('Enter at least one name');return;}
const names=raw.split(/\n|,/).map(n=>n.trim()).filter(Boolean);
const city=document.getElementById('city').value.trim();
const prov=document.getElementById('province').value.trim();
const country=document.getElementById('country').value.trim();
const loc=[city,prov,country].filter(Boolean).join(' ');
const ex=document.getElementById('excludeObits').checked;
const filter=ex?" -obituary -death -memorial -funeral":"";
const selected=ENGINES.filter(e=>document.getElementById('eng_'+e.id).checked);
if(selected.length===0){alert('Select a source');return;}
names.forEach(n=>{
const q=[n,loc].filter(Boolean).join(' ')+filter;
selected.forEach(e=>window.open(e.url(q),'_blank'));
});
}
