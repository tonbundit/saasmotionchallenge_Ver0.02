const fs = require('fs');
const file = "c:\\saas-app-animation-challenge\\saas-motion-supabase.html";
let content = fs.readFileSync(file, 'utf8');

// 1. Add CSS
const cssToAdd = `
/* Description Additions */
.wc-desc { font-family: var(--sans); font-size: 11px; color: var(--muted); margin-bottom: 11px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.ac-desc { font-family: var(--sans); font-size: 14px; color: var(--text2); line-height: 1.5; margin-bottom: 18px; max-width: 90%; }
.pn-desc { font-family: var(--sans); font-size: 13px; color: var(--text2); line-height: 1.6; margin-bottom: 22px; padding: 16px; background: rgba(255,255,255,.03); border: 1px solid var(--border); border-radius: 11px; }
`;
if (!content.includes('.wc-desc')) {
    content = content.replace('/* Section */', cssToAdd + '/* Section */');
}

// 2. Modify WD array
content = content.replace(/\\{t:'([^']+)',tags:\\[(.*?)\\],days:\\[(.*?)\\]\\}/g, function(match, t, tags, days) {
    return "{t:'" + t + "',tags:[" + tags + "],desc:'เรียนรู้และฝึกฝนการทำผลงาน " + t + " พัฒนาทักษะด้าน Motion Design',days:[" + days + "]}";
});

// 3. Update renderGrid
content = content.replace(
    /<div class="wc-tags">\\$\\{data\\.tags\\.slice\\(0,2\\)\\.map\\(t=>`<span class="wc-tag">\\$\\{t\\}<\\/span>`\\)\\.join\\(''\\)\\}<\\/div>/g,
    '<div class="wc-tags">${data.tags.slice(0,2).map(t=>`<span class="wc-tag">${_s(t)}</span>`).join(\'\')}</div><div class="wc-desc">${_s(data.desc)}</div>'
);

// 4. Update renderBanner
const newBanner = `document.getElementById('actt').textContent=data.t;
  let acdescElem = document.getElementById('acdesc');
  if(!acdescElem) {
      acdescElem = document.createElement('div');
      acdescElem.id = 'acdesc';
      acdescElem.className = 'ac-desc';
      document.querySelector('.ac-top').after(acdescElem);
  }
  document.getElementById('acdesc').textContent = data.desc;`;

content = content.replace(/document\\.getElementById\\('actt'\\)\\.textContent=data\\.t;/g, newBanner);

// 5. Update inside panel
const newPanel = `document.getElementById('pntt').textContent=data.t;
  let pndesc = document.getElementById('pndesc');
  if(!pndesc) {
      pndesc = document.createElement('div');
      pndesc.id = 'pndesc';
      pndesc.className = 'pn-desc';
      const pnDl = document.getElementById('pndl');
      pnDl.parentNode.insertBefore(pndesc, pnDl);
  }
  pndesc.textContent = data.desc;`;

content = content.replace(/document\\.getElementById\\('pntt'\\)\\.textContent=data\\.t;/g, newPanel);

fs.writeFileSync(file, content, 'utf8');
console.log("Added descriptions to UI successfully");
