(function(){
  'use strict';
  const cases=[{key:'moonlit_case001_bright_proto_v08b',url:'/dungdung-mystery/',name:'CASE 001 달빛 악보 실종사건'},{key:'ddmystery_case002_save_v1',url:'/dungdung-mystery/cases/case-002/',name:'CASE 002 봉인된 심사표'}];
  function saved(c){try{const s=JSON.parse(localStorage.getItem(c.key)||'null');return s&&typeof s==='object'&&(s.started||s.solved||(Array.isArray(s.clues)&&s.clues.length))?s:null;}catch(e){return null;}}
  function update(){const active=cases.map((c,i)=>({c,i,state:saved(c)})).filter(x=>x.state);const resume=document.querySelector('#resume');if(resume){resume.disabled=!active.length;document.querySelector('#resumeLabel').textContent=active.length?active.map(x=>x.c.name+(x.state.solved?' · 해결':' · 진행 중')).join(' / '):'이어하기는 이 브라우저에 수사 기록이 있을 때 열립니다.';resume.onclick=()=>{if(active.length===1)location.href=active[0].c.url;else location.href='cases.html?resume=1';};}
  const resumeOnly=new URLSearchParams(location.search).get('resume')==='1';if(resumeOnly&&document.querySelector('.section-title')){document.querySelector('.section-title h1').textContent='어떤 사건을 이어갈까요?';document.querySelector('.section-title p').textContent='이 브라우저에 저장된 수사 기록을 불러옵니다.';}
  document.querySelectorAll('[data-case]').forEach(card=>{const i=Number(card.dataset.case),s=saved(cases[i]);card.hidden=resumeOnly&&!s;const badge=card.querySelector('.saved');badge.hidden=!s;if(s)badge.textContent=s.solved?'✓ 해결한 사건 · 기록 다시 보기':'● 진행 중 · 확보한 단서 '+(s.clues?.length||0)+'개';const link=card.querySelector('.start-case');link.textContent=s?'기록 이어서 열기 →':'이 사건 시작하기 →';link.href=cases[i].url;});
  if(resumeOnly&&!active.length){document.querySelector('#empty').hidden=false;}
  }
  addEventListener('pageshow',update);addEventListener('storage',update);update();
})();
