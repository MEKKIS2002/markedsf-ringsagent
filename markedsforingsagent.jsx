import { useState, useRef } from "react";

const G = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Jost:wght@300;400;500&display=swap');`;

const S = `
${G}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Jost',sans-serif;background:#f8f6f3}
:root{
  --bg:#f8f6f3;--white:#ffffff;--ink:#1a1916;--mid:#7a7670;
  --pale:#e8e4de;--line:#dedad4;--gold:#8a7a5a;
}
.app{min-height:100vh;background:var(--bg);color:var(--ink);font-family:'Jost',sans-serif}
.header{background:var(--white);border-bottom:1px solid var(--line);padding:0 48px;display:flex;align-items:center;justify-content:space-between;height:64px;gap:24px}
.logo{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;letter-spacing:3px;text-transform:uppercase;color:var(--ink);white-space:nowrap}
.logo em{font-style:normal;color:var(--gold)}
.api-row{display:flex;align-items:center;gap:12px;flex:1;max-width:420px}
.api-input{flex:1;background:transparent;border:none;border-bottom:1px solid var(--line);color:var(--ink);padding:6px 0;font-family:'Jost',sans-serif;font-size:13px;letter-spacing:0.3px;outline:none;transition:border 0.2s}
.api-input::placeholder{color:var(--mid)}
.api-input:focus{border-bottom-color:var(--ink)}
.api-ok{font-size:11px;letter-spacing:1px;text-transform:uppercase;color:var(--gold);white-space:nowrap}
.nav{background:var(--white);border-bottom:1px solid var(--line);padding:0 48px;display:flex}
.tab{padding:16px 28px 14px;font-family:'Jost',sans-serif;font-size:12px;font-weight:400;letter-spacing:1.5px;text-transform:uppercase;border:none;background:transparent;color:var(--mid);border-bottom:1px solid transparent;cursor:pointer;transition:all 0.2s;transform:translateY(1px)}
.tab:hover{color:var(--ink)}
.tab.active{color:var(--ink);border-bottom-color:var(--ink)}
.main{padding:56px 48px;max-width:860px}
.page-title{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:300;letter-spacing:1px;color:var(--ink);margin-bottom:6px;line-height:1.2}
.page-sub{font-size:13px;color:var(--mid);letter-spacing:0.3px;margin-bottom:40px}
label{display:block;font-size:11px;font-weight:400;letter-spacing:1.5px;text-transform:uppercase;color:var(--mid);margin-bottom:8px}
textarea,select,input[type="text"],input[type="number"]{width:100%;background:var(--white);border:1px solid var(--line);color:var(--ink);padding:12px 14px;font-family:'Jost',sans-serif;font-size:13px;letter-spacing:0.2px;outline:none;transition:border 0.2s;resize:vertical;border-radius:0}
textarea:focus,select:focus,input:focus{border-color:var(--ink)}
.field{margin-bottom:24px}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-bottom:24px}
.chips{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:24px}
.chip{padding:6px 16px;border:1px solid var(--line);font-size:11px;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all 0.2s;color:var(--mid);background:transparent;font-family:'Jost',sans-serif}
.chip:hover{border-color:var(--ink);color:var(--ink)}
.chip.on{background:var(--ink);color:var(--white);border-color:var(--ink)}
.btn{background:var(--ink);color:var(--white);border:none;padding:13px 32px;font-family:'Jost',sans-serif;font-size:11px;font-weight:400;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:opacity 0.2s}
.btn:hover{opacity:0.75}
.btn:disabled{opacity:0.3;cursor:not-allowed}
.btn-ghost{background:transparent;color:var(--mid);border:1px solid var(--line);padding:7px 16px;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;font-family:'Jost',sans-serif;transition:all 0.2s}
.btn-ghost:hover{border-color:var(--ink);color:var(--ink)}
.result-box{margin-top:32px;background:var(--white);border:1px solid var(--line)}
.result-head{padding:14px 20px;border-bottom:1px solid var(--line);display:flex;align-items:center;justify-content:space-between}
.result-tag{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gold)}
.result-body{padding:24px;white-space:pre-wrap;line-height:1.8;font-size:13px;color:var(--ink)}
.loading{display:flex;align-items:center;gap:12px;padding:20px 0;color:var(--mid);font-size:11px;letter-spacing:1.5px;text-transform:uppercase}
.dot{width:5px;height:5px;background:var(--ink);animation:p 1.2s infinite}
.dot:nth-child(2){animation-delay:.2s}.dot:nth-child(3){animation-delay:.4s}
@keyframes p{0%,100%{opacity:.15}50%{opacity:1}}
.err{color:#8a3a3a;font-size:12px;padding:10px 14px;border:1px solid #dcc;background:#fdf8f8;margin-top:12px}
.drop{border:1px solid var(--line);padding:40px;text-align:center;cursor:pointer;transition:all 0.2s;background:var(--white);margin-bottom:24px}
.drop:hover,.drop.over{border-color:var(--ink)}
.drop-txt{color:var(--mid);font-size:12px;letter-spacing:0.5px}
.drop-txt strong{display:block;font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;color:var(--ink);margin-bottom:6px}
.preview{max-width:100%;max-height:260px;object-fit:contain}
.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-top:24px}
.cal-head{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--mid);text-align:center;padding:8px 0;border-bottom:1px solid var(--line)}
.cal-card{background:var(--white);border:1px solid var(--line);padding:14px 10px;min-height:130px;font-size:11px;line-height:1.6;color:var(--mid);cursor:pointer;transition:border 0.2s}
.cal-card:hover{border-color:var(--ink)}
.cal-date{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--ink);margin-bottom:4px}
.cal-type{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:6px}
.cal-empty{background:var(--bg);border:1px solid var(--line);min-height:130px}
.img-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;margin:14px 0}
.img-card{background:var(--white);border:1px solid var(--line);overflow:hidden;cursor:default;transition:border 0.2s;position:relative}
.img-card:hover{border-color:var(--mid)}
.img-thumb{width:100%;aspect-ratio:1;object-fit:cover;display:block}
.img-name{padding:7px 9px;font-size:10px;letter-spacing:0.3px;color:var(--mid);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.img-rm{position:absolute;top:5px;right:5px;width:20px;height:20px;background:var(--white);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:10px;cursor:pointer;opacity:0;transition:opacity 0.2s}
.img-card:hover .img-rm{opacity:1}
.num-badge{position:absolute;top:5px;left:5px;background:rgba(26,25,22,0.65);color:#fff;padding:2px 7px;font-size:10px;letter-spacing:0.5px}
.order-badge{position:absolute;top:5px;left:5px;background:var(--ink);color:#fff;width:22px;height:22px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:500}
`;

async function callClaude(key, msgs, sys) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": key, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, system: sys, messages: msgs })
  });
  const d = await r.json();
  if (d.error) throw new Error(d.error.message);
  return d.content.map(b => b.text || "").join("");
}

function CopyBtn({ text }) {
  const [c, setC] = useState(false);
  return <button className="btn-ghost" onClick={() => { navigator.clipboard.writeText(text); setC(true); setTimeout(() => setC(false), 1500); }}>{c ? "Kopiert ✓" : "Kopier"}</button>;
}

const TONES = ["Profesjonell", "Uformell", "Humoristisk", "Inspirerende", "Eksklusivt"];
const PLAT = ["Instagram", "Facebook", "LinkedIn", "TikTok"];
const DAYS = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];

function CaptionTab({ k }) {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Profesjonell");
  const [plat, setPlat] = useState("Instagram");
  const [extra, setExtra] = useState("");
  const [res, setRes] = useState(""); const [load, setLoad] = useState(false); const [err, setErr] = useState("");
  const go = async () => {
    if (!k) { setErr("Legg til API-nøkkel øverst."); return; }
    if (!topic.trim()) { setErr("Beskriv innlegget."); return; }
    setErr(""); setLoad(true); setRes("");
    try {
      const r = await callClaude(k, [{ role: "user", content: `Lag 3 caption-varianter til ${plat}.\nTema: ${topic}\nTone: ${tone}\n${extra ? `Tillegg: ${extra}` : ""}\nMerk VARIANT 1, VARIANT 2, VARIANT 3 tydelig. Inkluder emneknagger.` }], "Du er en ekspert norsk markedsføringskopist. Skriv alltid på norsk.");
      setRes(r);
    } catch (e) { setErr(e.message); }
    setLoad(false);
  };
  return <div>
    <p className="page-title">Caption-generator</p>
    <p className="page-sub">Tre unike tekstforslag tilpasset plattform og tone</p>
    <label>Plattform</label>
    <div className="chips">{PLAT.map(p => <button key={p} className={`chip${plat === p ? " on" : ""}`} onClick={() => setPlat(p)}>{p}</button>)}</div>
    <div className="field"><label>Beskriv innlegget</label><textarea rows={3} placeholder="F.eks: Vi lanserer ny sommerkollesjson med linplagg i naturfarger..." value={topic} onChange={e => setTopic(e.target.value)} /></div>
    <label>Tone</label>
    <div className="chips">{TONES.map(t => <button key={t} className={`chip${tone === t ? " on" : ""}`} onClick={() => setTone(t)}>{t}</button>)}</div>
    <div className="field"><label>Tilleggsinfo (valgfritt)</label><textarea rows={2} placeholder="CTA, rabattkode, lenke i bio..." value={extra} onChange={e => setExtra(e.target.value)} /></div>
    <button className="btn" onClick={go} disabled={load}>{load ? "Genererer…" : "Generer captions"}</button>
    {err && <p className="err">{err}</p>}
    {load && <div className="loading"><div className="dot" /><div className="dot" /><div className="dot" />Skriver captions</div>}
    {res && <div className="result-box"><div className="result-head"><span className="result-tag">Dine caption-varianter</span><CopyBtn text={res} /></div><div className="result-body">{res}</div></div>}
  </div>;
}

function ImageTab({ k }) {
  const [img, setImg] = useState(null); const [mime, setMime] = useState("image/jpeg");
  const [plat, setPlat] = useState("Instagram"); const [tone, setTone] = useState("Profesjonell");
  const [res, setRes] = useState(""); const [load, setLoad] = useState(false); const [err, setErr] = useState("");
  const [over, setOver] = useState(false); const ref = useRef();
  const load2 = f => { if (!f) return; setMime(f.type || "image/jpeg"); const r = new FileReader(); r.onload = e => setImg(e.target.result.split(",")[1]); r.readAsDataURL(f); setRes(""); setErr(""); };
  const go = async () => {
    if (!k) { setErr("Legg til API-nøkkel øverst."); return; } if (!img) { setErr("Last opp et bilde."); return; }
    setErr(""); setLoad(true); setRes("");
    try {
      const r = await callClaude(k, [{ role: "user", content: [{ type: "image", source: { type: "base64", media_type: mime, data: img } }, { type: "text", text: `Analyser bildet og lag 3 ${plat}-captions med tone: ${tone}. Start med bildebeskrivelse, deretter VARIANT 1, VARIANT 2, VARIANT 3 med emneknagger.` }] }], "Du er en norsk markedsføringskopist og visuell strateg. Skriv alltid på norsk.");
      setRes(r);
    } catch (e) { setErr(e.message); }
    setLoad(false);
  };
  return <div>
    <p className="page-title">Bildeanalyse</p>
    <p className="page-sub">Last opp et bilde — agenten skriver captions basert på det den ser</p>
    <div className={`drop${over ? " over" : ""}`} onDragOver={e => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={e => { e.preventDefault(); setOver(false); load2(e.dataTransfer.files[0]); }} onClick={() => ref.current.click()}>
      {img ? <img className="preview" src={`data:${mime};base64,${img}`} alt="" /> : <div className="drop-txt"><strong>Dra bilde hit</strong>eller klikk for å velge</div>}
      <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={e => load2(e.target.files[0])} />
    </div>
    <div className="row2">
      <div><label>Plattform</label><div className="chips" style={{ marginBottom: 0 }}>{PLAT.map(p => <button key={p} className={`chip${plat === p ? " on" : ""}`} onClick={() => setPlat(p)}>{p}</button>)}</div></div>
      <div><label>Tone</label><div className="chips" style={{ marginBottom: 0 }}>{TONES.slice(0, 3).map(t => <button key={t} className={`chip${tone === t ? " on" : ""}`} onClick={() => setTone(t)}>{t}</button>)}</div></div>
    </div>
    <button className="btn" onClick={go} disabled={load || !img} style={{ marginTop: 8 }}>{load ? "Analyserer…" : "Analyser og lag tekst"}</button>
    {err && <p className="err">{err}</p>}
    {load && <div className="loading"><div className="dot" /><div className="dot" /><div className="dot" />Analyserer bilde</div>}
    {res && <div className="result-box"><div className="result-head"><span className="result-tag">Analyse og captions</span><CopyBtn text={res} /></div><div className="result-body">{res}</div></div>}
  </div>;
}

function OrderTab({ k }) {
  const [imgs, setImgs] = useState([]);
  const [plat, setPlat] = useState("Instagram");
  const [goal, setGoal] = useState("");
  const [res, setRes] = useState(""); const [load, setLoad] = useState(false); const [err, setErr] = useState("");
  const [over, setOver] = useState(false); const [order, setOrder] = useState([]);
  const ref = useRef();

  const loadFiles = files => {
    Array.from(files).forEach(f => {
      if (!f.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = e => setImgs(prev => [...prev, { name: f.name, mime: f.type, data: e.target.result.split(",")[1], url: e.target.result }]);
      reader.readAsDataURL(f);
    });
  };

  const go = async () => {
    if (!k) { setErr("Legg til API-nøkkel øverst."); return; }
    if (imgs.length < 2) { setErr("Last opp minst 2 bilder."); return; }
    setErr(""); setLoad(true); setRes(""); setOrder([]);
    try {
      const content = [];
      imgs.forEach((img, i) => {
        content.push({ type: "text", text: `BILDE ${i + 1}: "${img.name}"` });
        content.push({ type: "image", source: { type: "base64", media_type: img.mime, data: img.data } });
      });
      content.push({ type: "text", text: `Du har sett ${imgs.length} bilder.\nPlattform: ${plat}${goal ? `\nKampanjemål: ${goal}` : ""}\n\nGi følgende:\n1. Kort beskrivelse av hvert bilde (Bilde 1, Bilde 2 osv.)\n2. Anbefalt publiseringsrekkefølge. Skriv dette slik: "Anbefalt rekkefølge: X, X, X"\n3. Begrunnelse for rekkefølgen (visuell flyt, storytelling, engasjement)\n4. Caption-ide for hvert bilde i anbefalt rekkefølge\n\nSkriv på norsk.` });
      const r = await callClaude(k, [{ role: "user", content }], "Du er en visuell innholdsstrateg for sosiale medier. Optimaliser publiseringsrekkefølge for best engasjement og visuell flyt på feedet. Skriv alltid på norsk.");
      setRes(r);
      const m = r.match(/[Aa]nbefalt\s+rekkef[ø|o]lge[:\s]+([0-9,\s]+)/);
      if (m) {
        const nums = m[1].split(/[,\s]+/).map(n => parseInt(n.trim()) - 1).filter(n => !isNaN(n) && n >= 0 && n < imgs.length);
        if (nums.length > 0) setOrder(nums);
      }
    } catch (e) { setErr(e.message); }
    setLoad(false);
  };

  const orderedImgs = order.length > 0 ? order.map(i => ({ ...imgs[i], origIdx: i })) : [];

  return <div>
    <p className="page-title">Bilderrekkefølge</p>
    <p className="page-sub">Last opp bildene fra mappen din — agenten analyserer og foreslår optimal publiseringsrekkefølge for feeden</p>

    <div className={`drop${over ? " over" : ""}`} style={{ minHeight: 110 }}
      onDragOver={e => { e.preventDefault(); setOver(true); }}
      onDragLeave={() => setOver(false)}
      onDrop={e => { e.preventDefault(); setOver(false); loadFiles(e.dataTransfer.files); }}
      onClick={() => ref.current.click()}>
      <div className="drop-txt"><strong>Dra bilder hit</strong>Velg hele mappen på én gang — hold ⌘ eller Ctrl for å markere flere</div>
      <input ref={ref} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={e => loadFiles(e.target.files)} />
    </div>

    {imgs.length > 0 && <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <label style={{ margin: 0 }}>{imgs.length} bilder lastet opp</label>
        <button className="btn-ghost" onClick={() => { setImgs([]); setRes(""); setOrder([]); }}>Fjern alle</button>
      </div>
      <div className="img-grid">
        {imgs.map((img, i) => <div key={i} className="img-card">
          <img className="img-thumb" src={img.url} alt={img.name} />
          <div className="img-name">{img.name}</div>
          <div className="img-rm" onClick={() => setImgs(prev => prev.filter((_, idx) => idx !== i))}>✕</div>
          <div className="num-badge">{i + 1}</div>
        </div>)}
      </div>
    </>}

    <div className="row2" style={{ marginTop: imgs.length > 0 ? 16 : 0 }}>
      <div><label>Plattform</label><div className="chips" style={{ marginBottom: 0 }}>{PLAT.map(p => <button key={p} className={`chip${plat === p ? " on" : ""}`} onClick={() => setPlat(p)}>{p}</button>)}</div></div>
      <div className="field"><label>Kampanjemål (valgfritt)</label><input type="text" placeholder="F.eks. produktlansering, sesong, storytelling..." value={goal} onChange={e => setGoal(e.target.value)} /></div>
    </div>

    <button className="btn" onClick={go} disabled={load || imgs.length < 2}>{load ? "Analyserer…" : "Analyser rekkefølge"}</button>
    {err && <p className="err">{err}</p>}
    {load && <div className="loading"><div className="dot" /><div className="dot" /><div className="dot" />Analyserer {imgs.length} bilder</div>}

    {res && <>
      {orderedImgs.length > 0 && <>
        <div style={{ marginTop: 32, marginBottom: 10 }}><label>Anbefalt rekkefølge</label></div>
        <div className="img-grid">
          {orderedImgs.map((img, pos) => <div key={pos} className="img-card">
            <img className="img-thumb" src={img.url} alt={img.name} />
            <div className="img-name">{img.name}</div>
            <div className="order-badge">{pos + 1}</div>
          </div>)}
        </div>
      </>}
      <div className="result-box" style={{ marginTop: 24 }}>
        <div className="result-head"><span className="result-tag">Analyse og strategi</span><CopyBtn text={res} /></div>
        <div className="result-body">{res}</div>
      </div>
    </>}
  </div>;
}

function CalendarTab({ k }) {
  const [brand, setBrand] = useState(""); const [plat, setPlat] = useState("Instagram");
  const [focus, setFocus] = useState(""); const [posts, setPosts] = useState("5");
  const [cal, setCal] = useState(null); const [raw, setRaw] = useState("");
  const [load, setLoad] = useState(false); const [err, setErr] = useState("");
  const go = async () => {
    if (!k) { setErr("Legg til API-nøkkel øverst."); return; }
    if (!brand.trim()) { setErr("Beskriv bedriften."); return; }
    setErr(""); setLoad(true); setCal(null); setRaw("");
    try {
      const r = await callClaude(k, [{ role: "user", content: `Lag ukentlig innleggskalender for ${plat} for: ${brand}.\n${focus ? `Tema: ${focus}\n` : ""}Antall innlegg: ${posts}.\nReturner KUN JSON: {"innlegg":[{"dag":"Man","dato":1,"type":"Post","tema":"...","caption_ide":"...","tidspunkt":"09:00"}]}` }], "Du er sosiale medier-strateg. Returner KUN gyldig JSON, ingenting annet, ingen backticks.");
      setRaw(r);
      const clean = r.replace(/```json|```/g, "").trim();
      setCal(JSON.parse(clean).innlegg || []);
    } catch (e) { setErr("Parse-feil – prøv igjen. " + e.message); }
    setLoad(false);
  };
  const byDay = cal ? DAYS.reduce((a, d) => { a[d] = cal.find(p => p.dag === d); return a; }, {}) : {};
  return <div>
    <p className="page-title">Innleggskalender</p>
    <p className="page-sub">En ferdig ukeplan med innholdsideer og tidspunkter</p>
    <div className="row2">
      <div className="field"><label>Bedrift / merkevare</label><textarea rows={2} placeholder="Beskriv hva dere selger og til hvem..." value={brand} onChange={e => setBrand(e.target.value)} /></div>
      <div className="field"><label>Ukens tema (valgfritt)</label><textarea rows={2} placeholder="Lanseringer, kampanjer, sesong..." value={focus} onChange={e => setFocus(e.target.value)} /></div>
    </div>
    <div className="row2">
      <div><label>Plattform</label><div className="chips" style={{ marginBottom: 0 }}>{PLAT.map(p => <button key={p} className={`chip${plat === p ? " on" : ""}`} onClick={() => setPlat(p)}>{p}</button>)}</div></div>
      <div className="field"><label>Antall innlegg</label><input type="number" min="1" max="7" value={posts} onChange={e => setPosts(e.target.value)} /></div>
    </div>
    <button className="btn" onClick={go} disabled={load}>{load ? "Planlegger…" : "Lag ukeplan"}</button>
    {err && <p className="err">{err}</p>}
    {load && <div className="loading"><div className="dot" /><div className="dot" /><div className="dot" />Lager innleggsplan</div>}
    {cal && <>
      <div className="cal-grid" style={{ marginTop: 32 }}>
        {DAYS.map(d => <div key={d} className="cal-head">{d}</div>)}
        {DAYS.map(d => { const p = byDay[d]; return p ? <div key={d} className="cal-card"><div className="cal-date">{p.dato || ""}</div><div className="cal-type">{p.type}</div><div style={{ fontWeight: 500, color: "var(--ink)", fontSize: 11, marginBottom: 4 }}>{p.tema}</div><div style={{ fontSize: 11, color: "var(--mid)", lineHeight: 1.5 }}>{p.caption_ide}</div>{p.tidspunkt && <div style={{ marginTop: 8, fontSize: 10, color: "var(--gold)", letterSpacing: "0.5px" }}>{p.tidspunkt}</div>}</div> : <div key={d} className="cal-empty" />; })}
      </div>
      <div className="result-box" style={{ marginTop: 16 }}>
        <div className="result-head"><span className="result-tag">Råtekst</span><CopyBtn text={raw} /></div>
        <div className="result-body" style={{ fontSize: 12 }}>{raw}</div>
      </div>
    </>}
  </div>;
}

export default function App() {
  const [tab, setTab] = useState("caption");
  const [key, setKey] = useState("");
  return <div className="app">
    <style>{S}</style>
    <div className="header">
      <div className="logo">markeds<em>agent</em></div>
      <div className="api-row">
        <input className="api-input" type="password" placeholder="Anthropic API-nøkkel" value={key} onChange={e => setKey(e.target.value)} />
        {key && <span className="api-ok">Aktiv</span>}
      </div>
    </div>
    <div className="nav">
      {[["caption", "Caption"], ["image", "Bildeanalyse"], ["order", "Bilderrekkefølge"], ["calendar", "Ukeplan"]].map(([id, label]) =>
        <button key={id} className={`tab${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>{label}</button>
      )}
    </div>
    <div className="main">
      {tab === "caption" && <CaptionTab k={key} />}
      {tab === "image" && <ImageTab k={key} />}
      {tab === "order" && <OrderTab k={key} />}
      {tab === "calendar" && <CalendarTab k={key} />}
    </div>
  </div>;
}
