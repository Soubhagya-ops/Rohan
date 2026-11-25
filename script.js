const CITIES=[
{n:"Kolkata",m:1,v:"Keoratala &amp; Nimtala ghats, Salt Lake hall"},
{n:"Delhi",m:1.2,v:"Nigambodh Ghat, Lodhi Road, Dwarka hall"},
{n:"Mumbai",m:1.35,v:"Chandanwadi, Worli, Andheri hall"},
{n:"Bengaluru",m:1.15,v:"Kalpalli, Harishchandra Ghat, Indiranagar"},
{n:"Chennai",m:1.05,v:"Besant Nagar, Kasimedu, Adyar hall"},
{n:"Varanasi",m:.85,v:"Harishchandra &amp; Manikarnika ghats"}];
const PK=[
{n:"Essential",p:18000,t:"",f:["Body transport (20 km)","Cremation or burial slot","Basic ritual materials","Death certificate help"]},
{n:"Simple Farewell",p:35000,t:"",f:["Everything in Essential","Priest or officiant","Flowers &amp; shroud","Hall for 30 guests"]},
{n:"Traditional",p:65000,t:"Most chosen",f:["Everything in Simple","Embalming &amp; cold storage","Hall for 100 guests","Catering for 50","Ashes immersion or urn"]},
{n:"Premium Memorial",p:110000,t:"",f:["Everything in Traditional","Live stream &amp; photo tribute","Obituary in newspaper","Hall for 200 guests","Guest transport van"]},
{n:"Royal Legacy",p:225000,t:"All inclusive",f:["Everything in Premium","Hearse with floral décor","Musicians &amp; bhajan group","Catering for 200","Memorial page &amp; plaque","Dedicated family manager"]}];
const FAC=[
["M3 20h18M5 20V9l7-5 7 5v11M9 20v-6h6v6","Prayer &amp; ceremony halls","Quiet, air-conditioned halls for 30 to 300 guests."],
["M3 13l2-6h12l3 4h2v5h-2M7 18a2 2 0 100-.01M17 18a2 2 0 100-.01M9 18h6","Hearse &amp; transport","Ambulance and hearse pickup, 24 hours a day."],
["M12 3c3 4 5 6 5 9a5 5 0 01-10 0c0-3 2-5 5-9z","Cremation &amp; burial","Electric, gas and wood cremation, plus cemetery plots."],
["M12 21s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 11c0 5.500-7 10-7 10z","Cold storage &amp; embalming","Hygienic preservation while family travels in."],
["M4 5h16v11H4zM8 20h8M12 16v4","Live streaming","Let relatives abroad join the service online."],
["M6 4h12v16H6zM9 8h6M9 12h6M9 16h3","Paperwork &amp; permits","Death certificate, NOC and municipal permits filed for you."],
["M12 3v4m0 0a3 3 0 100 6 3 3 0 000-6zm-7 17c1-4 4-6 7-6s6 2 7 6","Priests &amp; officiants","Rites for Hindu, Muslim, Christian, Sikh and Buddhist families."],
["M5 21c0-9 3-14 7-18 4 4 7 9 7 18M12 13v8","Flowers &amp; tributes","Garlands, wreaths and keepsake memorial pages."]];
const ADD=[["Live streaming",4500],["Extra hall hours",6000],["Newspaper obituary",9000],["Guest van",7500],["Musicians",12000],["Memorial plaque",8500]];
const $=s=>document.querySelector(s),inr=n=>"₹"+Math.round(n/100)*100==="₹NaN"?"":"₹"+(Math.round(n/100)*100).toLocaleString("en-IN");
const ic=d=>`<svg viewBox="0 0 24 24"><path d="${d}"/></svg>`;
let st={c:0,p:2};
$("#fac").innerHTML=FAC.map(f=>`<div class="glass fac">${ic(f[0])}<h3>${f[1]}</h3><p>${f[2]}</p></div>`).join("");
["#city","#ct"].forEach(s=>$(s).innerHTML=CITIES.map((c,i)=>`<option value="${i}">${c.n}</option>`).join(""));
$("#pk").innerHTML=PK.map((p,i)=>`<option value="${i}">${p.n}</option>`).join("");
$("#pk").value=2;
$("#adds").innerHTML=ADD.map((a,i)=>`<label class="chip"><input type="checkbox" value="${i}"><span>${a[0]} +${inr(a[1])}</span></label>`).join("");
$("#cities").innerHTML=CITIES.map(c=>`<div class="glass city"><i><svg viewBox="0 0 24 24"><path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg></i><div><h3>${c.n}</h3><p>${c.v}</p></div></div>`).join("");
const mult=()=>CITIES[st.c].m*parseFloat($("#type").value);
const price=i=>PK[i].p*mult();
function paint(){
  const pm=mult();
  $("#packs").innerHTML=PK.map((p,i)=>`<div class="glass pk ${i==2?"feat":""} ${i==st.p?"on":""}" data-i="${i}">${p.t?`<span class="tag">${p.t}</span>`:""}<h3>${p.n}</h3><div class="price">${inr(p.p*pm)}</div><small class="note">in ${CITIES[st.c].n}</small><ul>${p.f.map(x=>`<li>${x}</li>`).join("")}</ul><button class="btn ${i==2?"":"ghost"}">Choose ${p.n}</button></div>`).join("");
  const d=Math.round((pm-1)*100);
  $("#cnote").textContent=d==0?"Base pricing applies in Kolkata.":(d>0?`Prices are ${d}% higher than the Kolkata base.`:`Prices are ${-d}% lower than the Kolkata base.`);
  $("#heroPrice").textContent=inr(price(st.p));
  $("#heroMeta").textContent=PK[st.p].n+" · "+CITIES[st.c].n;
  $("#city").value=$("#ct").value=st.c;$("#pk").value=st.p;
  const ad=[...document.querySelectorAll("#adds input:checked")].map(x=>ADD[x.value]);
  const addT=ad.reduce((s,a)=>s+a[1],0),gs=Math.max(0,(+$("#gs").value||0)-100)*180;
  const tot=price(st.p)+addT+gs;
  $("#lines").innerHTML=`<div class="ln"><span>${PK[st.p].n}</span><b>${inr(price(st.p))}</b></div><div class="ln"><span>Location</span><b>${CITIES[st.c].n}</b></div>`+ad.map(a=>`<div class="ln"><span>${a[0]}</span><b>${inr(a[1])}</b></div>`).join("")+(gs?`<div class="ln"><span>Guests above 100</span><b>${inr(gs)}</b></div>`:"");
  $("#total").textContent=inr(tot);
}
$("#city").onchange=e=>{st.c=+e.target.value;paint()};
$("#ct").onchange=e=>{st.c=+e.target.value;paint()};
$("#type").onchange=paint;$("#gs").oninput=paint;
$("#pk").onchange=e=>{st.p=+e.target.value;paint()};
$("#adds").onchange=paint;
$("#packs").onclick=e=>{const c=e.target.closest(".pk");if(!c)return;st.p=+c.dataset.i;paint();if(e.target.tagName=="BUTTON")$("#book").scrollIntoView({behavior:"smooth"})};
$("#go").onclick=()=>{
  const n=$("#nm").value.trim(),p=$("#ph").value.trim(),t=$("#toast");
  t.textContent=(!n||p.length<8)?"Add your name and a valid phone number to continue.":`Booked. A coordinator in ${CITIES[st.c].n} will call ${n} within 15 minutes.`;
  t.classList.add("show");setTimeout(()=>t.classList.remove("show"),4200);
};
const stg=$("#stage");
stg.onmousemove=e=>{const r=stg.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  stg.querySelectorAll(".pane").forEach((p,i)=>{const k=[6,14,10][i];p.style.transform=`rotateY(${x*k}deg) rotateX(${-y*k}deg) translate(${x*k*2}px,${y*k*2}px)`})};
stg.onmouseleave=()=>stg.querySelectorAll(".pane").forEach(p=>p.style.transform="");
paint();
