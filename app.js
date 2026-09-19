const $=id=>document.getElementById(id);
function esc(s){return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]))}
const profiles={
 alltagsrebell:{label:'@alltagsrebell',vibe:'trocken, arrogant, sarkastisch, alltagsnah',cta:'Wenn du das auch kennst: speichern oder der Person schicken, die sofort weiß, wer gemeint ist.',tags:['#alltagsrebell','#sarkasmus','#ehrlich','#alltag','#realtalk']},
 kopfvibes:{label:'@kopfvibes',vibe:'absurd, frech, menschlich, leicht bekloppt',cta:'Wenn dein Kopf auch manchmal solche Überstunden macht: willkommen im Club.',tags:['#kopfvibes','#humor','#sarkasmus','#alltag','#gedanken']},
 mamarocktdas:{label:'@mamarocktdas',vibe:'schlagfertige Mama-WhatsApp, trocken, direkt',cta:'Markier die Mama, die bei dem Satz nicht mal nachfragen muss.',tags:['#mamarealtalk','#mamaleben','#mentalload','#mamahumor','#elternalltag']},
 steffi:{label:'@steffistuemer.official',vibe:'selbstbewusst, klar, frech, pointiert',cta:'Speicher dir das für den Moment, in dem du wieder an dir statt an der Situation zweifelst.',tags:['#realtalk','#selbstbewusst','#mindset','#sarkasmus','#klartext']},
 epa:{label:'EPA',vibe:'premium, emotional, klar, frech',cta:'Wenn du mehr davon willst, antworte mit „EPA“. ',tags:['#epa','#businessmindset','#sichtbarkeit','#onlinebusiness','#realtalk']},
 aqua:{label:'Aqua Global',vibe:'aufklärend, ruhig-dringlich, leicht sarkastisch',cta:'Wenn du mehr zu deinem Leitungswasser wissen willst, schreib „WASSER“. ',tags:['#wasser','#trinkwasser','#wasserwissen','#aufklärung','#gesundeleben']}
};
const banks={
 hard:[['Du bist nicht zu empfindlich.','Du hast nur aufgehört, Respektlosigkeit als „ist halt so“ zu verkaufen.'],['Manche nennen es Abstand.','Ich nenne es: endlich keine Gratis-Therapie mehr für fremdes Chaos.'],['Du hast dich nicht verändert.','Du erklärst dich nur nicht mehr jedem, der dich absichtlich falsch verstehen will.'],['Die Wahrheit ist nicht immer kompliziert.','Manchmal ist die Person einfach genau so, wie sie sich verhält.']],
 dialog:[['„Du bist aber still geworden.“','„Nein. Ich verschwende nur weniger Wörter an Menschen mit selektivem Hörvermögen.“'],['„Du nimmst alles so persönlich.“','„Komisch. Du meinst es persönlich und ich soll es sportlich nehmen?“'],['„Meld dich doch auch mal.“','„Hab ich. Immer. Deshalb teste ich gerade die Gegenrichtung.“'],['„Früher warst du lockerer.“','„Früher hatte ich auch weniger Beweise.“']],
 short:[['Ich bin nicht nachtragend.','Ich hab nur ein verdammt gutes Archiv.'],['Ich brauche keine Rache.','Konsequenzen arbeiten auch ohne mich.'],['Ich hab keinen schlechten Tag.','Ich hab nur heute weniger Geduld für Unsinn.'],['Manche Menschen sind ein Kapitel.','Andere nur ein Tippfehler.']],
 story:[['Ich dachte lange, ich müsste nur geduldiger sein.','Dann fiel mir auf: Geduld löst keine Muster. Grenzen schon.'],['Früher habe ich jedes Schweigen erklärt.','Heute lasse ich Menschen ruhig merken, wie sich ihre eigene Energie anfühlt.'],['Ich wollte immer Harmonie.','Bis ich verstanden habe, dass Harmonie ohne Respekt nur hübsch verpackter Stress ist.'],['Ich habe nicht plötzlich weniger Menschen.','Ich habe nur aufgehört, Anwesenheit mit Verbundenheit zu verwechseln.']]
};
const extraBanks={
 alltagsrebell:{
  hard:[['Ich muss mich nicht ändern, damit du dich wohler fühlst.','Ich ändere höchstens meine Geduld mit dir.'],['Nein ist ein vollständiger Satz.','Trotzdem schreiben mir Leute drei Absätze, warum das nicht gilt.'],['Ich bin nicht kompliziert.','Ich hab nur aufgehört, für jeden verständlich zu sein.'],['Du darfst gern anderer Meinung sein.','Ändert nur nichts daran, dass ich Recht habe.'],['Manche Leute verwechseln Meinung mit Fakt.','Ich verwechsle ihre Meinung mit Hintergrundgeräusch.'],['Du kannst gern beleidigt sein.','Beleidigt sein ist kostenlos, Recht haben leider nicht.'],['Ich schulde niemandem eine Erklärung für meine Grenzen.','Höchstens ein knappes „Nein“, wenn ich gut gelaunt bin.'],['Ich bin nicht schwierig.','Ich hab nur ein Limit, das andere nie testen mussten.']],
  dialog:[['„Musst du immer so schroff sein?“','„Nein. Aber du fragst auch nicht jedes Mal so freundlich.“'],['„Kannst du nicht einfach normal reagieren?“','„Das war normal. Du bist nur unnormal empfindlich für Wahrheit.“'],['„Warum bist du so kalt?“','„Weil du erwärmst, was du eigentlich abkühlen solltest.“'],['„Ich hab’s nicht so gemeint.“','„Du hast es genau so gesagt. Meinen kam erst hinterher, als Notausgang.“'],['„Du übertreibst mal wieder.“','„Und du unterschätzt mal wieder, was du gerade gesagt hast.“']],
  short:[['Ich bin nicht unhöflich.','Ich bin nur effizient mit meiner Geduld.'],['Manche brauchen ein Zeichen.','Ich brauch nur eine Wiederholung.'],['Ich streite nicht mehr.','Ich dokumentiere nur noch.'],['Nicht jede Stille ist ein Streit.','Manche ist einfach nur Ruhe vor dir.'],['Ich bin nicht distanziert.','Ich bin nur wählerisch geworden.']],
  story:[['Früher hab ich mich für jede Reaktion gerechtfertigt.','Heute merke ich: manche Erklärung ist einfach verschwendete Energie.'],['Ich dachte, laut sein bedeutet stark sein.','Mittlerweile weiß ich: das ruhigste „Nein“ trifft am härtesten.'],['Ich hab lange gedacht, Verständnis heißt: alles hinnehmen.','Heute weiß ich: Verständnis ohne Grenze ist nur ein anderes Wort für Ausnutzen.']]
 }
};
function poolFor(account,type){return banks[type].concat((extraBanks[account]&&extraBanks[account][type])||[])}
let variation=0,last=null,batch=[];
function toast(t){$('toast').textContent=t;$('toast').classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>$('toast').classList.remove('show'),1300)}
async function copy(t){try{await navigator.clipboard.writeText(t);toast('Kopiert.')}catch{toast('Kopieren nicht möglich.')}}
function topicVariant(type,topic,seed,tone){
 if(!topic)return null;
 const tv={hard:[`${topic}: Du musst nicht alles verstehen, um zu merken, dass es dir nicht guttut.`,`${topic}: Irgendwann ist „noch eine Chance“ einfach nur Wiederholung mit Hoffnung.`,`${topic}: Nicht jede Erklärung verdient noch eine Diskussion.`],dialog:[`„Warum reagierst du bei ${topic} so?“`,`„Kannst du bei ${topic} nicht einfach drüberstehen?“`,`„Musst du ${topic} wirklich so ernst nehmen?“`],short:[`${topic}?`,`Kleine Erinnerung zu ${topic}:`,`Thema heute: ${topic}.`],story:[`Ich dachte lange bei ${topic}, ich müsste nur geduldiger sein.`,`Bei ${topic} habe ich irgendwann etwas verstanden:`,`Das Verrückte an ${topic}:`]};
 return tv[type][(seed+tone)%3]
}
function computeScore(h,p,topic,tone){
 const vals=[['Neugier',Math.min(98,62+Math.min(topic.length,16)+tone*3)],['Klarheit',Math.min(98,78+(h.length<72?8:0))],['Emotion',Math.min(99,60+tone*7+(/[!?]/.test(h)?5:0))],['Share-Faktor',Math.min(97,58+tone*5+(p.length<110?8:0))]];
 const total=Math.round(vals.reduce((a,x)=>a+x[1],0)/4);
 return{vals,total}
}
function renderScore(vals,total){
 $('score').textContent=total;
 $('metrics').innerHTML=vals.map(v=>`<div class="metric"><div class="metricName">${v[0]}</div><div class="bar"><span style="width:${v[1]}%"></span></div><div class="metricNum">${v[1]}</div></div>`).join('');
 $('scoreTip').textContent=total>=85?'Starker Einstieg. Pointe früh bringen und nicht überladen.':total>=72?'Solide. Kürzerer erster Satz kann den Scrollstop verbessern.':'Zu weich. Mehr Reibung oder klareren Widerspruch testen.'
}
function makeReel(account,type,topic,tone,seed){
 const p=profiles[account],pool=poolFor(account,type);
 const item=pool[(seed+tone+topic.length)%pool.length];
 let hook=item[0],punch=item[1];
 const tv=topicVariant(type,topic,seed,tone); if(tv)hook=tv;
 const parts=[hook,punch];
 if(topic&&type!=='short')parts.push(`Und falls du gerade an „${topic}“ denkst: genau das meine ich.`);
 if(tone===5)parts.push('Und nein: Das ist nicht hart. Das ist nur klar.');
 const script=parts.join('\n\n');
 const caption=`${hook}\n\n${p.vibe.charAt(0).toUpperCase()+p.vibe.slice(1)} – genau so soll sich der Content anfühlen.\n\n${p.cta}\n\n${p.tags.join(' ')}`;
 const {vals,total}=computeScore(hook,punch,topic,tone);
 return{createdAt:new Date().toISOString(),account:p.label,accountKey:account,contentType:type,topic,hardness:tone,hook,script,caption,score:total,scoreVals:vals}
}
function generate(){
 const account=$('account').value,type=$('type').value,topic=$('topic').value.trim().replace(/\s+/g,' '),tone=+$('tone').value;
 const r=makeReel(account,type,topic,tone,variation);
 $('hook').textContent=r.hook;$('script').textContent=r.script;$('caption').textContent=r.caption;
 last=r; renderScore(r.scoreVals,r.score)
}
function diagnose(){const v=+$('views').value||0,r=+$('retention').value||0,s=+$('shares').value||0;if(!v&&!r&&!s){$('diagnosis').textContent='Trag mindestens eine Kennzahl ein.';return}const a=[];if(r&&r<30)a.push('• Retention zu niedrig: Hook in 1–2 Sekunden klar machen.');else if(r<50&&r)a.push('• Retention mittel: wahrscheinlich zu viel Weg bis zur Pointe.');else if(r>=50)a.push('• Retention stark: jetzt Share-/Save-Reiz und Themenwahl prüfen.');if(v<500&&v&&r>=45)a.push('• Wenig Views trotz guter Retention: Thema oder erster Frame ist wahrscheinlich zu unscheinbar.');if(v>=500&&r<35)a.push('• Ausspielung kam, aber Zuschauer springen ab: Problem liegt eher im Reel selbst.');if(s===0)a.push('• Keine Shares/Saves: Es fehlt ein Satz, bei dem jemand sofort an eine konkrete Person denkt.');if(s>=10)a.push('• Shares/Saves gut: Kern beibehalten und nur Hook/Thema variieren.');a.push('• Nächster Test: gleiche Aussage, Hook 30–40 % kürzer und Pointe früher.');$('diagnosis').textContent=a.join('\n')}

function generateBatchFn(){
 let n=+$('batchCount').value||7; n=Math.min(Math.max(n,1),20); $('batchCount').value=n;
 const account=$('account').value,topic=$('topic').value.trim().replace(/\s+/g,' '),tone=+$('tone').value;
 const types=['hard','short','dialog','story'];
 batch=[];
 for(let i=0;i<n;i++){const type=types[i%types.length];batch.push(makeReel(account,type,topic,tone,i*7+3))}
 batch.sort((a,b)=>b.score-a.score);
 renderBatch(account)
}
function renderBatch(account){
 const p=profiles[account];
 $('batchList').innerHTML=batch.map((r,i)=>`<div class="reelItem"><div class="reelHead"><b>#${i+1} · ${r.contentType} · ${p.label}</b><span class="reelScore">${r.score}</span></div><div class="reelHook">${esc(r.hook)}</div><div class="reelScript">${esc(r.script)}</div><button data-i="${i}" class="ghost reelCopy">Reel kopieren</button></div>`).join('');
 $('batchStatus').textContent=`${batch.length} Reels generiert, sortiert nach Score. Bestes Reel zuerst posten.`;
 document.querySelectorAll('.reelCopy').forEach(b=>b.onclick=()=>{const r=batch[+b.dataset.i];copy(`HOOK\n${r.hook}\n\nSKRIPT\n${r.script}\n\nCAPTION\n${r.caption}`)})
}

function analyzeProfileFn(){
 const followers=+$('gFollowers').value||0,views=+$('gViews').value||0,retention=+$('gRetention').value||0,shares=+$('gShares').value||0,posts=+$('gPosts').value||0;
 if(!followers&&!views&&!retention&&!shares&&!posts){$('growthResult').textContent='Trag mindestens eine Kennzahl ein.';$('growthScoreBadge').textContent='–';return}
 const viewRate=views/Math.max(followers,1);
 const shareRate=shares/Math.max(views,1);
 const retentionScore=Math.min(100,retention*2);
 const reachScore=Math.min(100,viewRate*40);
 const shareScore=Math.min(100,shareRate*2000);
 const freqScore=Math.min(100,posts*100/7);
 const total=Math.round(retentionScore*.35+reachScore*.3+shareScore*.2+freqScore*.15);
 $('growthScoreBadge').textContent=total;
 const dims=[['Retention',retentionScore,'Hook zu schwach oder Pointe kommt zu spät. Ersten Satz auf unter 6 Wörter kürzen und die Pointe in den ersten 3 Sekunden ziehen.'],['Reichweite',reachScore,'Views hängen zu stark am eigenen Follower-Kreis. Themen wählen, bei denen sich Fremde sofort wiedererkennen, und Hook noch polarisierender formulieren.'],['Share-Faktor',shareScore,'Zu wenig Saves/Shares. Am Ende einen Satz einbauen, bei dem man sofort an eine konkrete Person denkt („markier die Person, die…“).'],['Frequenz',freqScore,'Zu wenige Postings pro Woche. Für explosives Wachstum mindestens 5–7 Reels/Woche, davon mehrere „short“-Formate für maximale Reichweite.']];
 dims.sort((a,b)=>a[1]-b[1]);
 const out=[];
 out.push(`Wachstums-Score: ${total}/100 für @alltagsrebell${followers?` (${followers} Follower)`:''}.`);
 out.push('');
 out.push('Größter Engpass zuerst:');
 dims.slice(0,2).forEach(d=>out.push(`• ${d[0]} (${Math.round(d[1])}/100): ${d[2]}`));
 out.push('');
 out.push('Plan zum Explodieren:');
 out.push('• Content-Mix: 40% Hart aber ehrlich, 30% Kurzer Scrollstopper, 20% Dialog/Konter, 10% Mini-Story.');
 out.push('• Rhythmus: 1x täglich posten, bevorzugt 18–21 Uhr, jedes Reel mit Auto-Batch generieren und nur das High-Score-Reel des Tages posten.');
 out.push('• Jede Caption endet mit einer klaren „Markier/Speicher“-Aufforderung, keine offene Frage ohne Anlass zu antworten.');
 out.push('• Auf jeden Kommentar mit einer ebenso pointierten Zeile antworten – das treibt die Kommentarzahl und damit die Ausspielung.');
 out.push('• Alle 3–4 Tage ein bestehendes High-Score-Reel als Variante neu texten (gleiche Pointe, neue Hook) und erneut testen.');
 $('growthResult').textContent=out.join('\n')
}

$('tone').addEventListener('input',e=>$('toneValue').textContent=e.target.value+'/5');
$('generate').onclick=()=>{variation=0;generate()};
$('variation').onclick=()=>{variation++;generate()};
$('diagnose').onclick=diagnose;
$('focusBtn').onclick=()=>document.body.classList.toggle('focus');
document.querySelectorAll('[data-copy]').forEach(b=>b.onclick=()=>copy($(b.dataset.copy).textContent));
$('copyAll').onclick=()=>last?copy(`HOOK\n${last.hook}\n\nSKRIPT\n${last.script}\n\nCAPTION\n${last.caption}`):toast('Erst Reel generieren.');
$('generateBatch').onclick=generateBatchFn;
$('copyBatch').onclick=()=>batch.length?copy(batch.map((r,i)=>`#${i+1} (${r.contentType}, Score ${r.score})\nHOOK\n${r.hook}\n\nSKRIPT\n${r.script}\n\nCAPTION\n${r.caption}`).join('\n\n---\n\n')):toast('Erst Batch generieren.');
$('sendBatchMake').onclick=async()=>{const u=localStorage.getItem('viralReelWebhook');if(!batch.length)return toast('Erst Batch generieren.');if(!u)return toast('Erst Make-Webhook speichern.');try{const res=await fetch(u,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({batch})});if(!res.ok)throw 0;toast('Batch an Make gesendet.')}catch{toast('Senden fehlgeschlagen.')}};
$('analyzeProfile').onclick=analyzeProfileFn;
$('saveWebhook').onclick=()=>{const u=$('webhook').value.trim();if(!u){localStorage.removeItem('viralReelWebhook');$('webhookStatus').textContent='Webhook entfernt.';return}localStorage.setItem('viralReelWebhook',u);$('webhookStatus').textContent='Webhook lokal gespeichert.';toast('Webhook gespeichert.')};
$('sendMake').onclick=async()=>{const u=localStorage.getItem('viralReelWebhook');if(!last)return toast('Erst Reel generieren.');if(!u)return toast('Erst Make-Webhook speichern.');try{const res=await fetch(u,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(last)});if(!res.ok)throw 0;toast('An Make gesendet.')}catch{toast('Senden fehlgeschlagen.')}};
const saved=localStorage.getItem('viralReelWebhook');if(saved){$('webhook').value=saved;$('webhookStatus').textContent='Webhook lokal gespeichert.'}
generate();
