import { useState } from "react";

const Badge = ({ label, color }) => {
  const colors = {
    purple: { bg: "#EEEDFE", text: "#3C3489", border: "#AFA9EC" },
    teal:   { bg: "#E1F5EE", text: "#085041", border: "#5DCAA5" },
    coral:  { bg: "#FAECE7", text: "#712B13", border: "#F0997B" },
    amber:  { bg: "#FAEEDA", text: "#633806", border: "#EF9F27" },
    blue:   { bg: "#E6F1FB", text: "#0C447C", border: "#85B7EB" },
    green:  { bg: "#EAF3DE", text: "#27500A", border: "#97C459" },
    red:    { bg: "#FCEBEB", text: "#791F1F", border: "#F09595" },
    gray:   { bg: "#F1EFE8", text: "#444441", border: "#B4B2A9" },
  };
  const c = colors[color] || colors.gray;
  return <span style={{ display:"inline-block", padding:"2px 10px", borderRadius:20, fontSize:12, fontWeight:500, background:c.bg, color:c.text, border:`1px solid ${c.border}`, marginRight:6, marginBottom:4 }}>{label}</span>;
};

const Card = ({ children, accent }) => {
  const accents = { info:"#E6F1FB", warning:"#FAEEDA", danger:"#FCEBEB", success:"#EAF3DE", purple:"#EEEDFE", default:"var(--color-background-secondary)" };
  const borders = { info:"#85B7EB", warning:"#EF9F27", danger:"#F09595", success:"#97C459", purple:"#AFA9EC", default:"var(--color-border-secondary)" };
  return <div style={{ border:`1px solid ${borders[accent]||borders.default}`, borderRadius:10, padding:"12px 16px", marginBottom:14, background:accents[accent]||accents.default, fontSize:13, lineHeight:1.7, color:"var(--color-text-primary)" }}>{children}</div>;
};

const Table = ({ headers, rows }) => (
  <div style={{ overflowX:"auto", marginBottom:18 }}>
    <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
      <thead><tr>{headers.map(h => <th key={h} style={{ padding:"7px 10px", textAlign:"left", fontWeight:500, borderBottom:"1px solid var(--color-border-secondary)", color:"var(--color-text-secondary)", whiteSpace:"nowrap" }}>{h}</th>)}</tr></thead>
      <tbody>{rows.map((row, i) => (
        <tr key={i} style={{ background: i%2===0?"transparent":"var(--color-background-secondary)" }}>
          {row.map((cell, j) => <td key={j} style={{ padding:"7px 10px", borderBottom:"1px solid var(--color-border-tertiary)", color:"var(--color-text-primary)", verticalAlign:"top" }}>{cell}</td>)}
        </tr>
      ))}</tbody>
    </table>
  </div>
);

const SH = ({ title, sub }) => (
  <div style={{ marginBottom:20 }}>
    <h2 style={{ fontSize:20, fontWeight:500, margin:"0 0 4px", color:"var(--color-text-primary)" }}>{title}</h2>
    {sub && <p style={{ margin:0, color:"var(--color-text-secondary)", fontSize:13 }}>{sub}</p>}
  </div>
);

const Divider = () => <hr style={{ border:"none", borderTop:"1px solid var(--color-border-tertiary)", margin:"22px 0" }}/>;

const ARROW = `<defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>`;

const DiagramOverview = () => (
  <svg width="100%" viewBox="0 0 680 600" dangerouslySetInnerHTML={{__html: ARROW + `
  <rect x="60" y="10" width="600" height="46" rx="8" fill="#F1EFE8" stroke="#B4B2A9" stroke-width="0.5"/>
  <text font-size="11" fill="#444441" font-weight="500" x="70" y="24">CLIENT</text>
  <rect x="76" y="26" width="90" height="24" rx="5" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="121" y="38" text-anchor="middle">iOS/Android</text>
  <rect x="174" y="26" width="76" height="24" rx="5" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="212" y="38" text-anchor="middle">Web PWA</text>
  <rect x="258" y="26" width="76" height="24" rx="5" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="296" y="38" text-anchor="middle">Desktop</text>
  <rect x="342" y="26" width="86" height="24" rx="5" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="385" y="38" text-anchor="middle">Agent portal</text>
  <rect x="436" y="26" width="80" height="24" rx="5" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="476" y="38" text-anchor="middle">Staff portal</text>
  <line x1="340" y1="56" x2="340" y2="72" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="60" y="72" width="600" height="46" rx="8" fill="#F1EFE8" stroke="#B4B2A9" stroke-width="0.5"/>
  <text font-size="11" fill="#444441" font-weight="500" x="70" y="86">EDGE</text>
  <rect x="76" y="88" width="110" height="24" rx="5" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="131" y="100" text-anchor="middle">CloudFront CDN</text>
  <rect x="196" y="88" width="80" height="24" rx="5" fill="#F7C1C1" stroke="#E24B4A" stroke-width="0.5"/><text font-size="11" fill="#501313" x="236" y="100" text-anchor="middle">AWS WAF</text>
  <rect x="286" y="88" width="110" height="24" rx="5" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/><text font-size="11" fill="#412402" x="341" y="100" text-anchor="middle">DDoS shield</text>
  <rect x="406" y="88" width="130" height="24" rx="5" fill="#C0DD97" stroke="#639922" stroke-width="0.5"/><text font-size="11" fill="#173404" x="471" y="100" text-anchor="middle">Static cache (CDN)</text>
  <line x1="340" y1="118" x2="340" y2="134" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="60" y="134" width="600" height="46" rx="8" fill="#FAECE7" stroke="#F0997B" stroke-width="0.5"/>
  <text font-size="11" fill="#712B13" font-weight="500" x="70" y="148">GATEWAY</text>
  <rect x="76" y="150" width="130" height="24" rx="5" fill="#F5C4B3" stroke="#D85A30" stroke-width="0.5"/><text font-size="11" fill="#4A1B0C" x="141" y="162" text-anchor="middle">API Gateway (AWS)</text>
  <rect x="216" y="150" width="106" height="24" rx="5" fill="#F5C4B3" stroke="#D85A30" stroke-width="0.5"/><text font-size="11" fill="#4A1B0C" x="269" y="162" text-anchor="middle">Kong on EKS</text>
  <rect x="332" y="150" width="126" height="24" rx="5" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/><text font-size="11" fill="#412402" x="395" y="162" text-anchor="middle">JWT auth RS256</text>
  <rect x="468" y="150" width="140" height="24" rx="5" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/><text font-size="11" fill="#412402" x="538" y="162" text-anchor="middle">Rate limit (Redis)</text>
  <line x1="340" y1="180" x2="340" y2="196" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="60" y="196" width="600" height="76" rx="8" fill="#EEEDFE" stroke="#AFA9EC" stroke-width="0.5"/>
  <text font-size="11" fill="#3C3489" font-weight="500" x="70" y="210">ORCHESTRATION</text>
  <rect x="76" y="214" width="128" height="48" rx="5" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="11" fill="#26215C" x="140" y="230" text-anchor="middle" font-weight="500">Session manager</text><text font-size="10" fill="#3C3489" x="140" y="246" text-anchor="middle">Redis · history · TTL</text>
  <rect x="216" y="214" width="128" height="48" rx="5" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="11" fill="#26215C" x="280" y="230" text-anchor="middle" font-weight="500">Intent classifier</text><text font-size="10" fill="#3C3489" x="280" y="246" text-anchor="middle">Tier · source · model</text>
  <rect x="356" y="214" width="128" height="48" rx="5" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="11" fill="#26215C" x="420" y="230" text-anchor="middle" font-weight="500">Permission guard</text><text font-size="10" fill="#3C3489" x="420" y="246" text-anchor="middle">User type → scope</text>
  <rect x="496" y="214" width="130" height="48" rx="5" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="11" fill="#26215C" x="561" y="230" text-anchor="middle" font-weight="500">Prompt builder</text><text font-size="10" fill="#3C3489" x="561" y="246" text-anchor="middle">RAG+MCP→LLM</text>
  <line x1="340" y1="272" x2="340" y2="288" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="60" y="288" width="600" height="76" rx="8" fill="#FAEEDA" stroke="#EF9F27" stroke-width="0.5"/>
  <text font-size="11" fill="#633806" font-weight="500" x="70" y="302">AI LAYER</text>
  <rect x="76" y="306" width="128" height="48" rx="5" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/><text font-size="11" fill="#412402" x="140" y="322" text-anchor="middle" font-weight="500">LiteLLM router</text><text font-size="10" fill="#633806" x="140" y="338" text-anchor="middle">Claude/GPT/Gemini</text>
  <rect x="216" y="306" width="128" height="48" rx="5" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="11" fill="#04342C" x="280" y="322" text-anchor="middle" font-weight="500">RAG pipeline</text><text font-size="10" fill="#085041" x="280" y="338" text-anchor="middle">Pinecone · BM25</text>
  <rect x="356" y="306" width="128" height="48" rx="5" fill="#F5C4B3" stroke="#D85A30" stroke-width="0.5"/><text font-size="11" fill="#4A1B0C" x="420" y="322" text-anchor="middle" font-weight="500">MCP tools ×18</text><text font-size="10" fill="#712B13" x="420" y="338" text-anchor="middle">Live API data</text>
  <rect x="496" y="306" width="130" height="48" rx="5" fill="#B5D4F4" stroke="#378ADD" stroke-width="0.5"/><text font-size="11" fill="#042C53" x="561" y="322" text-anchor="middle" font-weight="500">Semantic cache</text><text font-size="10" fill="#0C447C" x="561" y="338" text-anchor="middle">40–60% cost save</text>
  <line x1="340" y1="364" x2="340" y2="380" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="60" y="380" width="600" height="54" rx="8" fill="#F1EFE8" stroke="#B4B2A9" stroke-width="0.5"/>
  <text font-size="11" fill="#444441" font-weight="500" x="70" y="394">DATA</text>
  <rect x="76" y="398" width="96" height="30" rx="5" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/><text font-size="11" fill="#412402" x="124" y="413" text-anchor="middle">Redis cluster</text>
  <rect x="182" y="398" width="96" height="30" rx="5" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="230" y="413" text-anchor="middle">RDS Postgres</text>
  <rect x="288" y="398" width="96" height="30" rx="5" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="336" y="413" text-anchor="middle">DynamoDB</text>
  <rect x="394" y="398" width="96" height="30" rx="5" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="11" fill="#04342C" x="442" y="413" text-anchor="middle">Pinecone</text>
  <rect x="500" y="398" width="96" height="30" rx="5" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="548" y="413" text-anchor="middle">S3</text>
  <line x1="340" y1="434" x2="340" y2="450" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="60" y="450" width="600" height="46" rx="8" fill="#E1F5EE" stroke="#5DCAA5" stroke-width="0.5"/>
  <text font-size="11" fill="#085041" font-weight="500" x="70" y="464">ASYNC WORKERS</text>
  <rect x="76" y="468" width="90" height="24" rx="5" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="11" fill="#04342C" x="121" y="480" text-anchor="middle">SQS queue</text>
  <rect x="176" y="468" width="100" height="24" rx="5" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="11" fill="#04342C" x="226" y="480" text-anchor="middle">Celery workers</text>
  <rect x="286" y="468" width="120" height="24" rx="5" fill="#C0DD97" stroke="#639922" stroke-width="0.5"/><text font-size="11" fill="#173404" x="346" y="480" text-anchor="middle">Email/PDF/WhatsApp</text>
  <rect x="416" y="468" width="120" height="24" rx="5" fill="#C0DD97" stroke="#639922" stroke-width="0.5"/><text font-size="11" fill="#173404" x="476" y="480" text-anchor="middle">RAG refresh (6h)</text>
  <rect x="546" y="468" width="80" height="24" rx="5" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="586" y="480" text-anchor="middle">Datadog</text>
  <line x1="340" y1="496" x2="340" y2="512" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="60" y="512" width="600" height="46" rx="8" fill="#F1EFE8" stroke="#B4B2A9" stroke-width="0.5"/>
  <text font-size="11" fill="#444441" font-weight="500" x="70" y="526">RAYNA SYSTEMS (existing APIs — MCP wraps these)</text>
  <rect x="76" y="530" width="106" height="24" rx="5" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="129" y="542" text-anchor="middle">Booking engine</text>
  <rect x="192" y="530" width="120" height="24" rx="5" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="252" y="542" text-anchor="middle">Operational module</text>
  <rect x="322" y="530" width="110" height="24" rx="5" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="377" y="542" text-anchor="middle">Agent portal API</text>
  <rect x="442" y="530" width="110" height="24" rx="5" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="497" y="542" text-anchor="middle">Pricing / catalog</text>
  <rect x="562" y="530" width="60" height="24" rx="5" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="592" y="542" text-anchor="middle">CRM</text>
  <text font-size="10" fill="#888780" x="340" y="578" text-anchor="middle">SSE/WebSocket streaming response flows back up through Orchestration → Gateway → Edge → Client</text>
`}}/>
);

const DiagramRequestFlow = () => (
  <svg width="100%" viewBox="0 0 680 760" dangerouslySetInnerHTML={{__html: ARROW + `
  <rect x="220" y="10" width="240" height="38" rx="8" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="12" fill="#2C2C2A" x="340" y="29" text-anchor="middle" font-weight="500">User sends query</text><text font-size="10" fill="#5F5E5A" x="340" y="42" text-anchor="middle">"show me dubai tours"</text>
  <line x1="340" y1="48" x2="340" y2="70" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="180" y="70" width="320" height="44" rx="8" fill="#F5C4B3" stroke="#D85A30" stroke-width="0.5"/><text font-size="12" fill="#4A1B0C" x="340" y="88" text-anchor="middle" font-weight="500">API gateway + Kong</text><text font-size="10" fill="#712B13" x="340" y="104" text-anchor="middle">JWT decode · user_type tag · rate limit check (Redis)</text>
  <line x1="340" y1="114" x2="340" y2="136" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="180" y="136" width="320" height="44" rx="8" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/><text font-size="12" fill="#412402" x="340" y="154" text-anchor="middle" font-weight="500">Redis cache check</text><text font-size="10" fill="#633806" x="340" y="170" text-anchor="middle">key: hash(query + user_type) · check for exact match</text>
  <line x1="180" y1="158" x2="100" y2="158" stroke="#BA7517" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="14" y="140" width="86" height="36" rx="6" fill="#C0DD97" stroke="#639922" stroke-width="0.5"/><text font-size="10" fill="#173404" x="57" y="156" text-anchor="middle" font-weight="500">CACHE HIT</text><text font-size="9" fill="#27500A" x="57" y="168" text-anchor="middle">return instantly</text>
  <line x1="340" y1="180" x2="340" y2="202" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <text font-size="10" fill="#BA7517" x="356" y="194">MISS ↓</text>
  <rect x="180" y="202" width="320" height="44" rx="8" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="12" fill="#26215C" x="340" y="220" text-anchor="middle" font-weight="500">Intent classifier</text><text font-size="10" fill="#3C3489" x="340" y="236" text-anchor="middle">Stage 1: keyword gate &lt;5ms → Stage 2: distilBERT ~30ms</text>
  <line x1="340" y1="246" x2="340" y2="268" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="180" y="268" width="320" height="44" rx="8" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="12" fill="#26215C" x="340" y="286" text-anchor="middle" font-weight="500">Session manager</text><text font-size="10" fill="#3C3489" x="340" y="302" text-anchor="middle">Load history from Redis · inject last N turns into prompt</text>
  <line x1="340" y1="312" x2="340" y2="334" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <text font-size="10" fill="#534AB7" x="260" y="326">parallel asyncio.gather ↓</text>
  <rect x="30" y="334" width="174" height="44" rx="8" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="12" fill="#04342C" x="117" y="352" text-anchor="middle" font-weight="500">RAG pipeline</text><text font-size="10" fill="#085041" x="117" y="368" text-anchor="middle">Pinecone top-5 chunks</text>
  <rect x="253" y="334" width="174" height="44" rx="8" fill="#F5C4B3" stroke="#D85A30" stroke-width="0.5"/><text font-size="12" fill="#4A1B0C" x="340" y="352" text-anchor="middle" font-weight="500">MCP tool router</text><text font-size="10" fill="#712B13" x="340" y="368" text-anchor="middle">search_products + get_pricing</text>
  <rect x="476" y="334" width="174" height="44" rx="8" fill="#B5D4F4" stroke="#378ADD" stroke-width="0.5"/><text font-size="12" fill="#042C53" x="563" y="352" text-anchor="middle" font-weight="500">Semantic cache</text><text font-size="10" fill="#0C447C" x="563" y="368" text-anchor="middle">cosine similarity check</text>
  <path d="M117 378 L117 420 L280 420" fill="none" stroke="#1D9E75" stroke-width="1" marker-end="url(#ar)"/>
  <line x1="340" y1="378" x2="340" y2="420" stroke="#993C1D" stroke-width="1" marker-end="url(#ar)"/>
  <path d="M563 378 L563 420 L400 420" fill="none" stroke="#185FA5" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="160" y="420" width="360" height="52" rx="8" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="12" fill="#26215C" x="340" y="440" text-anchor="middle" font-weight="500">LLM orchestrator</text><text font-size="10" fill="#3C3489" x="340" y="456" text-anchor="middle">System prompt + history + RAG context + tool results assembled</text><text font-size="10" fill="#3C3489" x="340" y="468" text-anchor="middle">Model selected by tier → stream response via SSE</text>
  <line x1="340" y1="472" x2="340" y2="494" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="180" y="494" width="320" height="36" rx="8" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/><text font-size="12" fill="#412402" x="340" y="516" text-anchor="middle" font-weight="500">Write result to Redis cache (TTL by data type)</text>
  <line x1="340" y1="530" x2="340" y2="552" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="180" y="552" width="320" height="44" rx="8" fill="#C0DD97" stroke="#639922" stroke-width="0.5"/><text font-size="12" fill="#173404" x="340" y="570" text-anchor="middle" font-weight="500">Streamed response to user</text><text font-size="10" fill="#27500A" x="340" y="586" text-anchor="middle">SSE token-by-token · product card · deep-link to raynatours.com</text>
  <line x1="500" y1="574" x2="580" y2="574" stroke="#888780" stroke-width="0.5" stroke-dasharray="3 2" marker-end="url(#ar)"/>
  <rect x="580" y="558" width="90" height="32" rx="6" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="10" fill="#2C2C2A" x="625" y="574" text-anchor="middle">Session save</text><text font-size="9" fill="#5F5E5A" x="625" y="584" text-anchor="middle">async</text>
  <rect x="60" y="616" width="560" height="26" rx="6" fill="#F1EFE8" stroke="#B4B2A9" stroke-width="0.5"/>
  <text font-size="10" fill="#5F5E5A" x="340" y="634" text-anchor="middle">For "show me dubai tours" → SIMPLE tier → Gemini Flash → RAG (descriptions) + MCP (live price) → assemble → stream</text>
  <rect x="60" y="650" width="560" height="82" rx="8" fill="#FAEEDA" stroke="#EF9F27" stroke-width="0.5"/>
  <text font-size="11" fill="#633806" x="340" y="666" text-anchor="middle" font-weight="500">Cache TTL rules by data type</text>
  <rect x="76" y="674" width="100" height="50" rx="5" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="10" fill="#085041" x="126" y="692" text-anchor="middle" font-weight="500">RAG results</text><text font-size="10" fill="#0F6E56" x="126" y="706" text-anchor="middle">TTL: 24h</text>
  <rect x="186" y="674" width="100" height="50" rx="5" fill="#F5C4B3" stroke="#D85A30" stroke-width="0.5"/><text font-size="10" fill="#712B13" x="236" y="692" text-anchor="middle" font-weight="500">Product catalog</text><text font-size="10" fill="#993C1D" x="236" y="706" text-anchor="middle">TTL: 5min</text>
  <rect x="296" y="674" width="100" height="50" rx="5" fill="#F5C4B3" stroke="#D85A30" stroke-width="0.5"/><text font-size="10" fill="#712B13" x="346" y="692" text-anchor="middle" font-weight="500">Live pricing</text><text font-size="10" fill="#993C1D" x="346" y="706" text-anchor="middle">TTL: 60s</text>
  <rect x="406" y="674" width="110" height="50" rx="5" fill="#F7C1C1" stroke="#E24B4A" stroke-width="0.5"/><text font-size="10" fill="#791F1F" x="461" y="692" text-anchor="middle" font-weight="500">Booking/driver</text><text font-size="10" fill="#A32D2D" x="461" y="706" text-anchor="middle">TTL: 0 never</text>
  <rect x="526" y="674" width="80" height="50" rx="5" fill="#B5D4F4" stroke="#378ADD" stroke-width="0.5"/><text font-size="10" fill="#0C447C" x="566" y="692" text-anchor="middle" font-weight="500">Web search</text><text font-size="10" fill="#185FA5" x="566" y="706" text-anchor="middle">TTL: 15min</text>
`}}/>
);

const DiagramIntentClassifier = () => (
  <svg width="100%" viewBox="0 0 680 620" dangerouslySetInnerHTML={{__html: ARROW + `
  <rect x="220" y="10" width="240" height="36" rx="8" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="12" fill="#2C2C2A" x="340" y="33" text-anchor="middle" font-weight="500">Raw user message</text>
  <line x1="340" y1="46" x2="340" y2="66" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="160" y="66" width="360" height="44" rx="8" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/><text font-size="12" fill="#412402" x="340" y="84" text-anchor="middle" font-weight="500">Stage 1 — keyword gate</text><text font-size="10" fill="#633806" x="340" y="100" text-anchor="middle">Regex + keyword rules · &lt;5ms · zero LLM cost · catches ~50% of queries</text>
  <line x1="340" y1="110" x2="340" y2="130" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="160" y="130" width="360" height="44" rx="8" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="12" fill="#26215C" x="340" y="148" text-anchor="middle" font-weight="500">Stage 2 — lightweight model</text><text font-size="10" fill="#3C3489" x="340" y="164" text-anchor="middle">distilBERT or GPT-4o-mini · ~30ms · only for ambiguous queries</text>
  <line x1="340" y1="174" x2="340" y2="194" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="160" y="194" width="360" height="36" rx="8" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="12" fill="#26215C" x="340" y="217" text-anchor="middle" font-weight="500">Output: intent_type + tier + data_source</text>
  <path d="M200 230 L80 272" fill="none" stroke="#534AB7" stroke-width="1" marker-end="url(#ar)"/>
  <path d="M258 230 L210 272" fill="none" stroke="#534AB7" stroke-width="1" marker-end="url(#ar)"/>
  <line x1="340" y1="230" x2="340" y2="272" stroke="#534AB7" stroke-width="1" marker-end="url(#ar)"/>
  <path d="M422 230 L470 272" fill="none" stroke="#534AB7" stroke-width="1" marker-end="url(#ar)"/>
  <path d="M480 230 L600 272" fill="none" stroke="#534AB7" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="14" y="272" width="132" height="54" rx="8" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="11" fill="#04342C" x="80" y="292" text-anchor="middle" font-weight="500">Product search</text><text font-size="10" fill="#085041" x="80" y="308" text-anchor="middle">SIMPLE · RAG+MCP</text>
  <rect x="158" y="272" width="132" height="54" rx="8" fill="#F5C4B3" stroke="#D85A30" stroke-width="0.5"/><text font-size="11" fill="#4A1B0C" x="224" y="292" text-anchor="middle" font-weight="500">Post-booking</text><text font-size="10" fill="#712B13" x="224" y="308" text-anchor="middle">STANDARD · MCP+auth</text>
  <rect x="274" y="272" width="132" height="54" rx="8" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="11" fill="#26215C" x="340" y="292" text-anchor="middle" font-weight="500">Quotation</text><text font-size="10" fill="#3C3489" x="340" y="308" text-anchor="middle">COMPLEX · RAG+MCP</text>
  <rect x="418" y="272" width="132" height="54" rx="8" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="11" fill="#04342C" x="484" y="292" text-anchor="middle" font-weight="500">FAQ / policy</text><text font-size="10" fill="#085041" x="484" y="308" text-anchor="middle">SIMPLE · RAG only</text>
  <rect x="534" y="272" width="132" height="54" rx="8" fill="#B5D4F4" stroke="#378ADD" stroke-width="0.5"/><text font-size="11" fill="#042C53" x="600" y="292" text-anchor="middle" font-weight="500">External</text><text font-size="10" fill="#0C447C" x="600" y="308" text-anchor="middle">STANDARD · Web</text>
  <path d="M80 326 L80 386 L276 386" fill="none" stroke="#1D9E75" stroke-width="0.8" marker-end="url(#ar)"/>
  <path d="M224 326 L224 370 L292 370 L292 386" fill="none" stroke="#993C1D" stroke-width="0.8" marker-end="url(#ar)"/>
  <line x1="340" y1="326" x2="340" y2="386" stroke="#534AB7" stroke-width="0.8" marker-end="url(#ar)"/>
  <path d="M484 326 L484 370 L388 370 L388 386" fill="none" stroke="#1D9E75" stroke-width="0.8" marker-end="url(#ar)"/>
  <path d="M600 326 L600 386 L404 386" fill="none" stroke="#185FA5" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="160" y="386" width="360" height="44" rx="8" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/><text font-size="12" fill="#412402" x="340" y="404" text-anchor="middle" font-weight="500">Model selector</text><text font-size="10" fill="#633806" x="340" y="420" text-anchor="middle">tier + thinking_mode + user_type → model + fallback chain</text>
  <path d="M236 430 L130 464" fill="none" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <path d="M296 430 L274 464" fill="none" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <path d="M384 430 L406 464" fill="none" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <path d="M444 430 L550 464" fill="none" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="14" y="464" width="152" height="54" rx="8" fill="#C0DD97" stroke="#639922" stroke-width="0.5"/><text font-size="11" fill="#173404" x="90" y="482" text-anchor="middle" font-weight="500">SIMPLE</text><text font-size="10" fill="#27500A" x="90" y="498" text-anchor="middle">Gemini Flash 2.0</text>
  <rect x="178" y="464" width="152" height="54" rx="8" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/><text font-size="11" fill="#412402" x="254" y="482" text-anchor="middle" font-weight="500">STANDARD</text><text font-size="10" fill="#633806" x="254" y="498" text-anchor="middle">Claude Haiku</text>
  <rect x="350" y="464" width="152" height="54" rx="8" fill="#F5C4B3" stroke="#D85A30" stroke-width="0.5"/><text font-size="11" fill="#4A1B0C" x="426" y="482" text-anchor="middle" font-weight="500">COMPLEX</text><text font-size="10" fill="#712B13" x="426" y="498" text-anchor="middle">Claude Sonnet</text>
  <rect x="514" y="464" width="152" height="54" rx="8" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="11" fill="#26215C" x="590" y="482" text-anchor="middle" font-weight="500">THINKING</text><text font-size="10" fill="#3C3489" x="590" y="498" text-anchor="middle">Claude Opus / o1</text>
  <rect x="60" y="534" width="560" height="30" rx="6" fill="#FAEEDA" stroke="#EF9F27" stroke-width="0.5"/>
  <text font-size="10" fill="#633806" x="340" y="554" text-anchor="middle">If confidence &lt; 0.7 → ask one clarifying question first · do not fire LLM or tools · cheapest path</text>
  <rect x="60" y="572" width="560" height="30" rx="6" fill="#EEEDFE" stroke="#AFA9EC" stroke-width="0.5"/>
  <text font-size="10" fill="#3C3489" x="340" y="592" text-anchor="middle">Always injected every call: user_type · history window · language · thinking_mode · permissions · timestamp</text>
`}}/>
);

const DiagramRAG = () => (
  <svg width="100%" viewBox="0 0 680 560" dangerouslySetInnerHTML={{__html: ARROW + `
  <text font-size="12" fill="#085041" font-weight="500" x="170" y="18" text-anchor="middle">INGESTION (offline, every 6h)</text>
  <text font-size="12" fill="#3C3489" font-weight="500" x="510" y="18" text-anchor="middle">RETRIEVAL (real-time)</text>
  <line x1="340" y1="6" x2="340" y2="550" stroke="var(--color-border-tertiary)" stroke-width="0.5" stroke-dasharray="4 3"/>
  <rect x="14" y="28" width="120" height="36" rx="6" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="74" y="50" text-anchor="middle" font-weight="500">raynatours.com</text>
  <rect x="144" y="28" width="120" height="36" rx="6" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="204" y="50" text-anchor="middle" font-weight="500">Policy docs</text>
  <line x1="74" y1="64" x2="74" y2="84" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <line x1="204" y1="64" x2="204" y2="84" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="24" y="84" width="290" height="36" rx="8" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="12" fill="#04342C" x="169" y="100" text-anchor="middle" font-weight="500">Web scraper (Playwright)</text><text font-size="10" fill="#085041" x="169" y="112" text-anchor="middle">respects robots.txt · runs every 6h</text>
  <line x1="169" y1="120" x2="169" y2="140" stroke="#1D9E75" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="24" y="140" width="290" height="36" rx="8" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="12" fill="#04342C" x="169" y="156" text-anchor="middle" font-weight="500">Chunker</text><text font-size="10" fill="#085041" x="169" y="168" text-anchor="middle">512 tokens · 50 overlap · RecursiveTextSplitter</text>
  <line x1="169" y1="176" x2="169" y2="196" stroke="#1D9E75" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="24" y="196" width="290" height="36" rx="8" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="12" fill="#04342C" x="169" y="212" text-anchor="middle" font-weight="500">Metadata tagger</text><text font-size="10" fill="#085041" x="169" y="224" text-anchor="middle">source_url · doc_type · lang · product_id · scraped_at</text>
  <line x1="169" y1="232" x2="169" y2="252" stroke="#1D9E75" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="24" y="252" width="290" height="36" rx="8" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="12" fill="#04342C" x="169" y="268" text-anchor="middle" font-weight="500">Embedder (text-embedding-3-small)</text><text font-size="10" fill="#085041" x="169" y="280" text-anchor="middle">1536-dim · batch 100 · MUST match retrieval</text>
  <line x1="100" y1="288" x2="100" y2="308" stroke="#1D9E75" stroke-width="0.8" marker-end="url(#ar)"/>
  <line x1="238" y1="288" x2="238" y2="308" stroke="#1D9E75" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="24" y="308" width="130" height="34" rx="6" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="11" fill="#04342C" x="89" y="325" text-anchor="middle" font-weight="500">Pinecone upsert</text>
  <rect x="164" y="308" width="150" height="34" rx="6" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="11" fill="#04342C" x="239" y="325" text-anchor="middle" font-weight="500">BM25 keyword index</text>
  <rect x="350" y="28" width="316" height="34" rx="8" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="12" fill="#2C2C2A" x="508" y="50" text-anchor="middle" font-weight="500">User query arrives</text>
  <line x1="508" y1="62" x2="508" y2="82" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="350" y="82" width="316" height="36" rx="8" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="12" fill="#26215C" x="508" y="98" text-anchor="middle" font-weight="500">Query embedder (same model!)</text>
  <line x1="508" y1="118" x2="508" y2="138" stroke="#7F77DD" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="350" y="138" width="140" height="34" rx="6" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="11" fill="#26215C" x="420" y="156" text-anchor="middle" font-weight="500">Dense (Pinecone)</text>
  <rect x="526" y="138" width="140" height="34" rx="6" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="11" fill="#26215C" x="596" y="156" text-anchor="middle" font-weight="500">BM25 keyword</text>
  <path d="M420 172 L490 212" fill="none" stroke="#7F77DD" stroke-width="0.8" marker-end="url(#ar)"/>
  <path d="M596 172 L526 212" fill="none" stroke="#7F77DD" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="380" y="212" width="256" height="34" rx="8" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="12" fill="#26215C" x="508" y="230" text-anchor="middle" font-weight="500">RRF merge → top-5</text>
  <line x1="508" y1="246" x2="508" y2="266" stroke="#7F77DD" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="380" y="266" width="256" height="34" rx="8" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="12" fill="#26215C" x="508" y="284" text-anchor="middle" font-weight="500">Metadata filter + freshness</text>
  <line x1="508" y1="300" x2="508" y2="320" stroke="#7F77DD" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="380" y="320" width="256" height="34" rx="8" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="12" fill="#26215C" x="508" y="338" text-anchor="middle" font-weight="500">Context builder</text>
  <line x1="508" y1="354" x2="508" y2="374" stroke="#7F77DD" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="380" y="374" width="256" height="34" rx="8" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/><text font-size="12" fill="#412402" x="508" y="396" text-anchor="middle" font-weight="500">Injected into LLM prompt</text>
  <rect x="14" y="360" width="316" height="48" rx="8" fill="#FCEBEB" stroke="#F09595" stroke-width="0.5"/>
  <text font-size="11" fill="#791F1F" x="172" y="378" text-anchor="middle" font-weight="500">Hard constraint</text>
  <text font-size="10" fill="#A32D2D" x="172" y="396" text-anchor="middle">0 results → "I don't have that info" · never infer</text>
  <rect x="14" y="420" width="316" height="60" rx="8" fill="#E1F5EE" stroke="#5DCAA5" stroke-width="0.5"/>
  <text font-size="11" fill="#085041" x="172" y="438" text-anchor="middle" font-weight="500">Pinecone namespaces</text>
  <text font-size="10" fill="#0F6E56" x="24" y="456">tours · hotels · visas · transfers · faq</text>
  <text font-size="10" fill="#0F6E56" x="24" y="472">policies · destination_guides · cruises</text>
`}}/>
);

const DiagramMCP = () => (
  <svg width="100%" viewBox="0 0 680 580" dangerouslySetInnerHTML={{__html: ARROW + `
  <rect x="190" y="10" width="300" height="34" rx="8" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/><text font-size="12" fill="#412402" x="340" y="32" text-anchor="middle" font-weight="500">LLM emits tool_call JSON</text>
  <line x1="340" y1="44" x2="340" y2="64" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="150" y="64" width="380" height="38" rx="8" fill="#F5C4B3" stroke="#D85A30" stroke-width="0.5"/><text font-size="12" fill="#4A1B0C" x="340" y="80" text-anchor="middle" font-weight="500">MCP tool router</text><text font-size="10" fill="#712B13" x="340" y="94" text-anchor="middle">validate schema · check user permission · dispatch</text>
  <line x1="150" y1="83" x2="110" y2="83" stroke="#BA7517" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="14" y="68" width="96" height="30" rx="6" fill="#C0DD97" stroke="#639922" stroke-width="0.5"/><text font-size="10" fill="#173404" x="62" y="87" text-anchor="middle" font-weight="500">Cache HIT</text>
  <line x1="340" y1="102" x2="340" y2="122" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="150" y="122" width="380" height="30" rx="8" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/><text font-size="12" fill="#412402" x="340" y="142" text-anchor="middle" font-weight="500">Redis cache intercept · key: tool_name+hash(params)</text>
  <line x1="340" y1="152" x2="340" y2="172" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="150" y="172" width="380" height="26" rx="8" fill="#F5C4B3" stroke="#D85A30" stroke-width="0.5"/><text font-size="12" fill="#4A1B0C" x="340" y="190" text-anchor="middle" font-weight="500">Async execution pool — asyncio.gather</text>
  <rect x="14" y="208" width="190" height="110" rx="8" fill="#E1F5EE" stroke="#5DCAA5" stroke-width="0.5"/>
  <text font-size="11" fill="#085041" x="109" y="226" text-anchor="middle" font-weight="500">Product &amp; Discovery</text>
  <text font-size="10" fill="#0F6E56" x="24" y="244">search_products</text>
  <text font-size="10" fill="#0F6E56" x="24" y="258">check_availability</text>
  <text font-size="10" fill="#0F6E56" x="24" y="272">get_pricing</text>
  <text font-size="10" fill="#0F6E56" x="24" y="286">fetch_reviews · check_weather</text>
  <text font-size="10" fill="#0F6E56" x="24" y="300">check_visa_req</text>
  <rect x="245" y="208" width="190" height="110" rx="8" fill="#FAECE7" stroke="#F0997B" stroke-width="0.5"/>
  <text font-size="11" fill="#712B13" x="340" y="226" text-anchor="middle" font-weight="500">Booking &amp; Financial</text>
  <text font-size="10" fill="#993C1D" x="255" y="244">create_booking · process_payment</text>
  <text font-size="10" fill="#993C1D" x="255" y="258">modify_booking · cancel_booking</text>
  <text font-size="10" fill="#993C1D" x="255" y="272">generate_invoice</text>
  <text font-size="10" fill="#993C1D" x="255" y="286">track_commission</text>
  <rect x="476" y="208" width="190" height="110" rx="8" fill="#EEEDFE" stroke="#AFA9EC" stroke-width="0.5"/>
  <text font-size="11" fill="#3C3489" x="571" y="226" text-anchor="middle" font-weight="500">Ops &amp; Delivery</text>
  <text font-size="10" fill="#534AB7" x="486" y="244">generate_voucher</text>
  <text font-size="10" fill="#534AB7" x="486" y="258">send_notification</text>
  <text font-size="10" fill="#534AB7" x="486" y="272">build_itinerary · calculate_markup</text>
  <text font-size="10" fill="#534AB7" x="486" y="286">create_deep_link</text>
  <text font-size="10" fill="#534AB7" x="486" y="300">escalate_human</text>
  <line x1="109" y1="318" x2="109" y2="346" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <line x1="340" y1="318" x2="340" y2="346" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <line x1="571" y1="318" x2="571" y2="346" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="100" y="346" width="480" height="38" rx="8" fill="#F7C1C1" stroke="#E24B4A" stroke-width="0.5"/><text font-size="12" fill="#791F1F" x="340" y="363" text-anchor="middle" font-weight="500">Timeout + retry layer</text><text font-size="10" fill="#A32D2D" x="340" y="377" text-anchor="middle">5s hard timeout · 3 retries · exponential backoff · each tool independent</text>
  <line x1="340" y1="384" x2="340" y2="404" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="150" y="404" width="380" height="34" rx="8" fill="#F5C4B3" stroke="#D85A30" stroke-width="0.5"/><text font-size="12" fill="#4A1B0C" x="340" y="421" text-anchor="middle" font-weight="500">Result aggregator → feed back to LLM context</text>
  <rect x="14" y="454" width="652" height="30" rx="8" fill="#FCEBEB" stroke="#F09595" stroke-width="0.5"/>
  <text font-size="11" fill="#791F1F" x="340" y="474" text-anchor="middle" font-weight="500">Failure fallback: all retries fail → surface deep_link to raynatours.com · never silently fail</text>
  <rect x="14" y="494" width="652" height="30" rx="8" fill="#FAEEDA" stroke="#EF9F27" stroke-width="0.5"/>
  <text font-size="10" fill="#854F0B" x="340" y="514" text-anchor="middle">TTLs: search/pricing 60s · availability 30s · reviews 15min · booking ops 0 never · visa 1h</text>
`}}/>
);

const DiagramSession = () => (
  <svg width="100%" viewBox="0 0 680 500" dangerouslySetInnerHTML={{__html: ARROW + `
  <text font-size="12" fill="#888780" x="340" y="16" text-anchor="middle">LLM has no memory between calls — session manager creates the illusion of continuity</text>
  <rect x="14" y="26" width="130" height="36" rx="8" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="79" y="44" text-anchor="middle" font-weight="500">User message 1</text><text font-size="9" fill="#5F5E5A" x="79" y="56" text-anchor="middle">"show me dubai tours"</text>
  <rect x="14" y="76" width="130" height="36" rx="8" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="79" y="94" text-anchor="middle" font-weight="500">User message 2</text><text font-size="9" fill="#5F5E5A" x="79" y="106" text-anchor="middle">"which has desert safari?"</text>
  <rect x="14" y="126" width="130" height="36" rx="8" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="11" fill="#2C2C2A" x="79" y="144" text-anchor="middle" font-weight="500">User message 3</text><text font-size="9" fill="#5F5E5A" x="79" y="156" text-anchor="middle">"quote me 4 pax 10 march"</text>
  <line x1="144" y1="44" x2="170" y2="44" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <line x1="144" y1="94" x2="170" y2="94" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <line x1="144" y1="144" x2="170" y2="144" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="170" y="26" width="160" height="156" rx="8" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/>
  <text font-size="11" fill="#412402" x="250" y="44" text-anchor="middle" font-weight="500">Session manager</text>
  <text font-size="10" fill="#633806" x="180" y="62">1. Load session from Redis</text>
  <text font-size="10" fill="#633806" x="180" y="78">2. Get history window</text>
  <text font-size="10" fill="#633806" x="180" y="94">3. Append new message</text>
  <text font-size="10" fill="#633806" x="180" y="110">4. Build messages array</text>
  <text font-size="10" fill="#633806" x="180" y="126">5. Fire LLM call</text>
  <text font-size="10" fill="#633806" x="180" y="142">6. Save response async</text>
  <text font-size="10" fill="#633806" x="180" y="158">7. Reset TTL (30min)</text>
  <line x1="330" y1="104" x2="360" y2="104" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="360" y="26" width="306" height="156" rx="8" fill="#EEEDFE" stroke="#AFA9EC" stroke-width="0.5"/>
  <text font-size="11" fill="#3C3489" x="513" y="44" text-anchor="middle" font-weight="500">What LLM receives on message 3</text>
  <text font-size="9" font-family="monospace" fill="#534AB7" x="370" y="62">system: "You are Rayna Bot [user_type]</text>
  <text font-size="9" font-family="monospace" fill="#534AB7" x="370" y="76"> [RAG context injected]"</text>
  <text font-size="9" font-family="monospace" fill="#534AB7" x="370" y="92">messages: [</text>
  <text font-size="9" font-family="monospace" fill="#3C3489" x="370" y="106"> {user: "show me dubai tours"},</text>
  <text font-size="9" font-family="monospace" fill="#3C3489" x="370" y="120"> {asst: "Here are tours..."},</text>
  <text font-size="9" font-family="monospace" fill="#3C3489" x="370" y="134"> {user: "which has desert safari?"},</text>
  <text font-size="9" font-family="monospace" fill="#3C3489" x="370" y="148"> {asst: "Desert Adventure..."},</text>
  <text font-size="9" font-family="monospace" fill="#7F77DD" x="370" y="162"> {user: "quote me 4 pax 10 march"} ←now</text>
  <rect x="14" y="200" width="652" height="50" rx="8" fill="#E1F5EE" stroke="#5DCAA5" stroke-width="0.5"/>
  <text font-size="11" fill="#085041" x="340" y="218" text-anchor="middle" font-weight="500">History window per user type</text>
  <rect x="24" y="228" width="140" height="14" rx="4" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="9" fill="#04342C" x="94" y="239" text-anchor="middle">Guest: last 5 turns</text>
  <rect x="174" y="228" width="140" height="14" rx="4" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="9" fill="#04342C" x="244" y="239" text-anchor="middle">Customer: last 8 turns</text>
  <rect x="324" y="228" width="140" height="14" rx="4" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="9" fill="#04342C" x="394" y="239" text-anchor="middle">Agent: last 10 turns</text>
  <rect x="474" y="228" width="182" height="14" rx="4" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="9" fill="#04342C" x="565" y="239" text-anchor="middle">Staff: last 15 turns</text>
  <rect x="14" y="264" width="316" height="66" rx="8" fill="#FAEEDA" stroke="#EF9F27" stroke-width="0.5"/>
  <text font-size="11" fill="#633806" x="172" y="282" text-anchor="middle" font-weight="500">Redis session object</text>
  <text font-size="9" font-family="monospace" fill="#854F0B" x="24" y="298">session_id · user_id · user_type · lang</text>
  <text font-size="9" font-family="monospace" fill="#854F0B" x="24" y="312">history[] · session_summary · token_count</text>
  <rect x="350" y="264" width="316" height="66" rx="8" fill="#EEEDFE" stroke="#AFA9EC" stroke-width="0.5"/>
  <text font-size="11" fill="#3C3489" x="508" y="282" text-anchor="middle" font-weight="500">Long session compression</text>
  <text font-size="10" fill="#534AB7" x="360" y="298">Turns exceed window → drop oldest</text>
  <text font-size="10" fill="#534AB7" x="360" y="314">Summary kept: "Dubai 4pax Desert Safari"</text>
  <rect x="14" y="344" width="652" height="30" rx="6" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/>
  <text font-size="11" fill="#412402" x="340" y="364" text-anchor="middle" font-weight="500">TTL: 30min rolling — idle 30min = evicted · token spike → PagerDuty alert</text>
  <rect x="14" y="384" width="316" height="30" rx="6" fill="#E1F5EE" stroke="#5DCAA5" stroke-width="0.5"/>
  <text font-size="10" fill="#085041" x="172" y="404" text-anchor="middle">Redis: active window · DynamoDB: full transcript</text>
  <rect x="350" y="384" width="316" height="30" rx="6" fill="#FCEBEB" stroke="#F09595" stroke-width="0.5"/>
  <text font-size="10" fill="#791F1F" x="508" y="404" text-anchor="middle">Multi-device: keyed by user_id not device</text>
`}}/>
);

const DiagramQuotation = () => (
  <svg width="100%" viewBox="0 0 680 580" dangerouslySetInnerHTML={{__html: ARROW + `
  <rect x="140" y="10" width="400" height="38" rx="8" fill="#D3D1C7" stroke="#888780" stroke-width="0.5"/><text font-size="12" fill="#2C2C2A" x="340" y="28" text-anchor="middle" font-weight="500">Quotation trigger</text><text font-size="10" fill="#5F5E5A" x="340" y="40" text-anchor="middle">"quote me 4 pax Dubai 5 days tours + hotel + transfer"</text>
  <line x1="340" y1="48" x2="340" y2="68" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="140" y="68" width="400" height="44" rx="8" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="12" fill="#26215C" x="340" y="86" text-anchor="middle" font-weight="500">NLU parameter extractor</text><text font-size="10" fill="#3C3489" x="340" y="102" text-anchor="middle">pax:4 · dest:Dubai · nights:5 · services:[tours,hotel,transfer] · dates:from context</text>
  <line x1="340" y1="112" x2="340" y2="132" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="140" y="132" width="400" height="36" rx="8" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/><text font-size="12" fill="#412402" x="340" y="150" text-anchor="middle" font-weight="500">Missing parameter check</text><text font-size="10" fill="#633806" x="340" y="162" text-anchor="middle">if dates/pax missing → ask first · save all API cost until known</text>
  <line x1="340" y1="168" x2="340" y2="188" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="140" y="188" width="400" height="36" rx="8" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="12" fill="#26215C" x="340" y="206" text-anchor="middle" font-weight="500">Rate resolver</text><text font-size="10" fill="#3C3489" x="340" y="218" text-anchor="middle">B2C→retail · Agent→net rate · Staff→agent rate on behalf</text>
  <line x1="340" y1="224" x2="340" y2="244" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <rect x="140" y="244" width="400" height="26" rx="8" fill="#F5C4B3" stroke="#D85A30" stroke-width="0.5"/><text font-size="12" fill="#4A1B0C" x="340" y="261" text-anchor="middle" font-weight="500">Parallel MCP calls — asyncio.gather</text>
  <path d="M254 270 L160 302" fill="none" stroke="#993C1D" stroke-width="0.8" marker-end="url(#ar)"/>
  <line x1="340" y1="270" x2="340" y2="302" stroke="#993C1D" stroke-width="0.8" marker-end="url(#ar)"/>
  <path d="M426 270 L520 302" fill="none" stroke="#993C1D" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="54" y="302" width="186" height="40" rx="8" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="11" fill="#04342C" x="147" y="320" text-anchor="middle" font-weight="500">check_availability</text><text font-size="10" fill="#085041" x="147" y="334" text-anchor="middle">tours + hotel + transfer</text>
  <rect x="254" y="302" width="172" height="40" rx="8" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="11" fill="#04342C" x="340" y="320" text-anchor="middle" font-weight="500">get_pricing</text><text font-size="10" fill="#085041" x="340" y="334" text-anchor="middle">live rates per pax</text>
  <rect x="440" y="302" width="186" height="40" rx="8" fill="#9FE1CB" stroke="#1D9E75" stroke-width="0.5"/><text font-size="11" fill="#04342C" x="533" y="320" text-anchor="middle" font-weight="500">calculate_markup</text><text font-size="10" fill="#085041" x="533" y="334" text-anchor="middle">B2B margin + commission</text>
  <path d="M147 342 L290 382" fill="none" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <line x1="340" y1="342" x2="340" y2="382" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <path d="M533 342 L390 382" fill="none" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="140" y="382" width="400" height="44" rx="8" fill="#CECBF6" stroke="#7F77DD" stroke-width="0.5"/><text font-size="12" fill="#26215C" x="340" y="400" text-anchor="middle" font-weight="500">Quotation assembler</text><text font-size="10" fill="#3C3489" x="340" y="416" text-anchor="middle">line items · total · validity 24hr · API-sourced prices only</text>
  <line x1="340" y1="426" x2="340" y2="446" stroke="#888780" stroke-width="1" marker-end="url(#ar)"/>
  <path d="M270 470 L160 504" fill="none" stroke="#534AB7" stroke-width="0.8" marker-end="url(#ar)"/>
  <path d="M410 470 L520 504" fill="none" stroke="#534AB7" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="140" y="446" width="400" height="24" rx="6" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/><text font-size="11" fill="#412402" x="340" y="463" text-anchor="middle" font-weight="500">Two outputs fire simultaneously</text>
  <rect x="24" y="504" width="262" height="40" rx="8" fill="#C0DD97" stroke="#639922" stroke-width="0.5"/><text font-size="11" fill="#173404" x="155" y="520" text-anchor="middle" font-weight="500">Inline chat card (SSE)</text><text font-size="10" fill="#27500A" x="155" y="536" text-anchor="middle">summary + Book Now deep-link</text>
  <rect x="394" y="504" width="262" height="40" rx="8" fill="#B5D4F4" stroke="#378ADD" stroke-width="0.5"/><text font-size="11" fill="#042C53" x="525" y="520" text-anchor="middle" font-weight="500">PDF via SQS + Celery</text><text font-size="10" fill="#0C447C" x="525" y="536" text-anchor="middle">WeasyPrint → S3 → SES email</text>
`}}/>
);

const DiagramScale = () => (
  <svg width="100%" viewBox="0 0 680 480" dangerouslySetInnerHTML={{__html: ARROW + `
  <rect x="14" y="10" width="652" height="50" rx="8" fill="#E1F5EE" stroke="#5DCAA5" stroke-width="0.5"/>
  <text font-size="11" fill="#085041" x="340" y="28" text-anchor="middle" font-weight="500">Scale: 5K concurrent = 50 pods × 100 async conns · Redis 100K ops/sec · Pinecone serverless</text>
  <text font-size="10" fill="#0F6E56" x="340" y="44" text-anchor="middle">Bottleneck: LLM token throughput (not FastAPI) · Semantic cache is primary defence</text>
  <rect x="14" y="74" width="310" height="100" rx="8" fill="#FAEEDA" stroke="#EF9F27" stroke-width="0.5"/>
  <text font-size="11" fill="#633806" x="169" y="92" text-anchor="middle" font-weight="500">HPA auto-scaling</text>
  <text font-size="10" fill="#854F0B" x="24" y="110">FastAPI: min 10 · max 60 · CPU &gt;60%</text>
  <text font-size="10" fill="#854F0B" x="24" y="126">LiteLLM: min 3 · max 20 · queue depth</text>
  <text font-size="10" fill="#854F0B" x="24" y="142">Celery: min 5 · max 40 · SQS depth</text>
  <text font-size="10" fill="#854F0B" x="24" y="158">Kong: min 3 · max 10 · req/s &gt;500</text>
  <rect x="356" y="74" width="310" height="100" rx="8" fill="#EEEDFE" stroke="#AFA9EC" stroke-width="0.5"/>
  <text font-size="11" fill="#3C3489" x="511" y="92" text-anchor="middle" font-weight="500">Rate limit tiers</text>
  <text font-size="10" fill="#534AB7" x="366" y="110">Guest: 20 req/min · tools limited</text>
  <text font-size="10" fill="#534AB7" x="366" y="126">Customer: 60 req/min</text>
  <text font-size="10" fill="#534AB7" x="366" y="142">Agent: 200 req/min · 24/7</text>
  <text font-size="10" fill="#534AB7" x="366" y="158">Staff: 500 req/min · unlimited tools</text>
  <rect x="14" y="188" width="652" height="110" rx="8" fill="#FAECE7" stroke="#F0997B" stroke-width="0.5"/>
  <text font-size="11" fill="#712B13" x="340" y="206" text-anchor="middle" font-weight="500">Circuit breaker — LLM providers</text>
  <rect x="24" y="214" width="190" height="74" rx="6" fill="#C0DD97" stroke="#639922" stroke-width="0.5"/><text font-size="11" fill="#173404" x="119" y="232" text-anchor="middle" font-weight="500">CLOSED (normal)</text><text font-size="10" fill="#27500A" x="119" y="248" text-anchor="middle">All calls through</text>
  <rect x="244" y="214" width="192" height="74" rx="6" fill="#F7C1C1" stroke="#E24B4A" stroke-width="0.5"/><text font-size="11" fill="#791F1F" x="340" y="232" text-anchor="middle" font-weight="500">OPEN (5 fails / 10s)</text><text font-size="10" fill="#A32D2D" x="340" y="248" text-anchor="middle">Claude→GPT→Gemini→degraded</text>
  <rect x="456" y="214" width="196" height="74" rx="6" fill="#FAC775" stroke="#BA7517" stroke-width="0.5"/><text font-size="11" fill="#412402" x="554" y="232" text-anchor="middle" font-weight="500">HALF-OPEN (30s)</text><text font-size="10" fill="#633806" x="554" y="248" text-anchor="middle">Probe → success=CLOSED</text>
  <line x1="214" y1="251" x2="244" y2="251" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <line x1="436" y1="251" x2="456" y2="251" stroke="#888780" stroke-width="0.8" marker-end="url(#ar)"/>
  <rect x="14" y="314" width="652" height="76" rx="8" fill="#C0DD97" stroke="#639922" stroke-width="0.5"/>
  <text font-size="11" fill="#173404" x="340" y="332" text-anchor="middle" font-weight="500">5 cost control levers</text>
  <rect x="24" y="340" width="116" height="42" rx="6" fill="#EAF3DE" stroke="#97C459" stroke-width="0.5"/><text font-size="10" fill="#27500A" x="82" y="358" text-anchor="middle" font-weight="500">1. Semantic cache</text><text font-size="9" fill="#3B6D11" x="82" y="374" text-anchor="middle">40–60% saved</text>
  <rect x="150" y="340" width="116" height="42" rx="6" fill="#EAF3DE" stroke="#97C459" stroke-width="0.5"/><text font-size="10" fill="#27500A" x="208" y="358" text-anchor="middle" font-weight="500">2. Model routing</text><text font-size="9" fill="#3B6D11" x="208" y="374" text-anchor="middle">80% Gemini Flash</text>
  <rect x="276" y="340" width="116" height="42" rx="6" fill="#EAF3DE" stroke="#97C459" stroke-width="0.5"/><text font-size="10" fill="#27500A" x="334" y="358" text-anchor="middle" font-weight="500">3. Compress prompt</text><text font-size="9" fill="#3B6D11" x="334" y="374" text-anchor="middle">LLMLingua 30–40%</text>
  <rect x="402" y="340" width="116" height="42" rx="6" fill="#EAF3DE" stroke="#97C459" stroke-width="0.5"/><text font-size="10" fill="#27500A" x="460" y="358" text-anchor="middle" font-weight="500">4. Tool cache</text><text font-size="9" fill="#3B6D11" x="460" y="374" text-anchor="middle">Redis TTL per tool</text>
  <rect x="528" y="340" width="130" height="42" rx="6" fill="#EAF3DE" stroke="#97C459" stroke-width="0.5"/><text font-size="10" fill="#27500A" x="593" y="358" text-anchor="middle" font-weight="500">5. Token budgets</text><text font-size="9" fill="#3B6D11" x="593" y="374" text-anchor="middle">hard cap per tier</text>
  <rect x="14" y="404" width="652" height="30" rx="6" fill="#FCEBEB" stroke="#F09595" stroke-width="0.5"/>
  <text font-size="10" fill="#791F1F" x="340" y="424" text-anchor="middle">p95 &gt;5s · error &gt;1% · Redis &gt;80% · LLM cost 2×avg · circuit OPEN · SQS &gt;500 → PagerDuty</text>
`}}/>
);

// ── TECH STACK SECTION ──────────────────────────────────────────────────────

const TechStackItem = ({ name, version, why, color }) => {
  const colors = {
    purple: { bg: "#EEEDFE", text: "#3C3489", border: "#AFA9EC", dot: "#7F77DD" },
    teal:   { bg: "#E1F5EE", text: "#085041", border: "#5DCAA5", dot: "#1D9E75" },
    coral:  { bg: "#FAECE7", text: "#712B13", border: "#F0997B", dot: "#D85A30" },
    amber:  { bg: "#FAEEDA", text: "#633806", border: "#EF9F27", dot: "#BA7517" },
    blue:   { bg: "#E6F1FB", text: "#0C447C", border: "#85B7EB", dot: "#378ADD" },
    green:  { bg: "#EAF3DE", text: "#27500A", border: "#97C459", dot: "#639922" },
    red:    { bg: "#FCEBEB", text: "#791F1F", border: "#F09595", dot: "#E24B4A" },
    gray:   { bg: "#F1EFE8", text: "#444441", border: "#B4B2A9", dot: "#888780" },
  };
  const c = colors[color] || colors.gray;
  return (
    <div style={{ border:`1px solid ${c.border}`, borderRadius:10, padding:"10px 14px", background:c.bg, marginBottom:8 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
        <div style={{ width:8, height:8, borderRadius:"50%", background:c.dot, flexShrink:0 }}/>
        <span style={{ fontWeight:600, fontSize:13, color:c.text }}>{name}</span>
        {version && <span style={{ fontSize:11, color:c.dot, marginLeft:2 }}>{version}</span>}
      </div>
      <div style={{ fontSize:12, color:"var(--color-text-secondary)", lineHeight:1.5, paddingLeft:16 }}>{why}</div>
    </div>
  );
};

const TechStackGroup = ({ title, icon, items, color }) => {
  const headerColors = {
    purple:"#534AB7", teal:"#1D9E75", coral:"#D85A30", amber:"#BA7517",
    blue:"#378ADD", green:"#639922", red:"#E24B4A", gray:"#888780",
  };
  return (
    <div style={{ marginBottom:24 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
        <span style={{ fontSize:18 }}>{icon}</span>
        <h3 style={{ fontSize:15, fontWeight:600, margin:0, color: headerColors[color]||"var(--color-text-primary)" }}>{title}</h3>
      </div>
      {items.map((item, i) => <TechStackItem key={i} {...item} color={color}/>)}
    </div>
  );
};

const TechStackContent = () => {
  const [activeTab, setActiveTab] = useState("backend");
  const tabs = [
    { id:"backend", label:"Backend" },
    { id:"frontend", label:"Frontend" },
    { id:"ai", label:"AI & LLM" },
    { id:"data", label:"Data & Cache" },
    { id:"infra", label:"Infra & DevOps" },
    { id:"async", label:"Async & Jobs" },
  ];

  const stacks = {
    backend: [
      {
        title:"Core Framework", icon:"⚙️", color:"purple",
        items:[
          { name:"Python", version:"3.12+", why:"Primary language. Async-first ecosystem, best AI/ML library support." },
          { name:"FastAPI", version:"0.115+", why:"Async ASGI framework. Native SSE streaming, Pydantic validation, OpenAPI auto-docs. 3× faster than Flask at concurrency." },
          { name:"Uvicorn", version:"0.32+", why:"ASGI server. 4 workers per pod. Handles async SSE connections efficiently." },
          { name:"Pydantic v2", version:"2.9+", why:"Request/response validation. Auto-coercion, strict typing for all tool schemas and LLM outputs." },
        ]
      },
      {
        title:"API Gateway & Auth", icon:"🔐", color:"coral",
        items:[
          { name:"Kong Gateway", version:"3.8+", why:"API gateway on EKS. JWT plugin, rate limiting, request transformation, circuit breaker. Replaces AWS API Gateway for custom middleware." },
          { name:"AWS API Gateway", version:"v2 HTTP", why:"Edge entry point. Routes to Kong on EKS. Handles SSL termination and regional routing." },
          { name:"PyJWT + python-jose", version:"3.4+", why:"JWT RS256 signing/validation in FastAPI middleware. Scoped claims per user type." },
          { name:"Authlib", version:"1.3+", why:"OAuth 2.0 flows for agent and staff login. Handles token issuance and refresh." },
        ]
      },
      {
        title:"HTTP Client & Tools", icon:"🔧", color:"amber",
        items:[
          { name:"httpx", version:"0.28+", why:"Async HTTP client for MCP tool calls. Timeout, retry, connection pooling. Replaces requests for async contexts." },
          { name:"tenacity", version:"9.0+", why:"Retry with exponential backoff for all MCP tool calls. Configurable per-tool." },
          { name:"asyncio", version:"Built-in", why:"Parallel MCP tool execution via asyncio.gather. Core concurrency primitive." },
        ]
      }
    ],
    frontend: [
      {
        title:"Web & App Framework", icon:"🖥️", color:"blue",
        items:[
          { name:"Next.js", version:"14 (App Router)", why:"SSR + streaming UI. App Router enables React Server Components and native streaming response support for SSE." },
          { name:"React", version:"18+", why:"Component model. useTransition + Suspense for streaming chat bubbles without full re-renders." },
          { name:"TypeScript", version:"5.6+", why:"Type safety across frontend. Shared types with backend via auto-generated OpenAPI client." },
        ]
      },
      {
        title:"UI & Styling", icon:"🎨", color:"teal",
        items:[
          { name:"Tailwind CSS", version:"3.4+", why:"Utility-first. No CSS bundle overhead. RTL support for Arabic interface via `dir='rtl'` + tailwind-rtl plugin." },
          { name:"Radix UI", version:"1.1+", why:"Accessible headless components. ProductCard, QuotationCard, ThinkingModeToggle built on Radix primitives." },
          { name:"Framer Motion", version:"11+", why:"Token-by-token streaming animation. Smooth message bubble entry. Thinking mode indicator." },
        ]
      },
      {
        title:"Streaming & State", icon:"📡", color:"purple",
        items:[
          { name:"EventSource API", version:"Browser native", why:"SSE client for streaming LLM tokens. Handles reconnection automatically." },
          { name:"Zustand", version:"5.0+", why:"Lightweight global state. Chat history, session state, thinking mode toggle — no Redux overhead." },
          { name:"TanStack Query", version:"5.0+", why:"Server state for non-streaming endpoints: product cards, quotation status, booking data." },
        ]
      },
      {
        title:"Mobile", icon:"📱", color:"green",
        items:[
          { name:"React Native", version:"0.76+", why:"iOS + Android from shared codebase. New Architecture (JSI) for better SSE streaming performance." },
          { name:"Expo", version:"52+", why:"Managed workflow. OTA updates, push notifications, deep-link URL scheme support." },
        ]
      }
    ],
    ai: [
      {
        title:"LLM Routing", icon:"🤖", color:"amber",
        items:[
          { name:"LiteLLM", version:"1.52+", why:"Unified interface for Claude, GPT, Gemini, Grok. Fallback chains, retry logic, provider-level circuit breakers. Self-hosted gateway on EKS." },
          { name:"Claude (Anthropic)", version:"Haiku / Sonnet / Opus", why:"Primary LLM. Haiku for STANDARD tier, Sonnet for COMPLEX, Opus for THINKING mode." },
          { name:"Gemini Flash 2.0", version:"Google AI", why:"SIMPLE tier — 10× cheaper than GPT-4o. ~80% of all queries routed here." },
          { name:"GPT-4o / GPT-4o-mini", version:"OpenAI", why:"Fallback for Claude. GPT-4o-mini as STANDARD fallback. GPT-4o as COMPLEX fallback." },
          { name:"Grok", version:"xAI", why:"Thinking mode alternative. User-selectable for real-time data queries." },
        ]
      },
      {
        title:"RAG & Embeddings", icon:"🔍", color:"teal",
        items:[
          { name:"Pinecone", version:"Serverless", why:"Vector database. Serverless tier auto-scales to 5K concurrent queries. Namespaces per service line. p95 query < 50ms." },
          { name:"text-embedding-3-small", version:"OpenAI", why:"1536-dim embeddings. Best cost/quality for travel content. ~$0.02/1M tokens. MUST be same model for ingest and retrieval." },
          { name:"LangChain", version:"0.3+", why:"RecursiveTextSplitter for chunking. 512 token chunks, 50 overlap. Also used for document loaders." },
          { name:"Elasticsearch", version:"8.16+", why:"BM25 keyword index parallel to Pinecone. Hybrid search via RRF merge improves recall by ~15%." },
          { name:"LLMLingua", version:"0.2+", why:"Prompt compression. Removes low-information tokens from RAG chunks before LLM injection. 30–40% token reduction." },
          { name:"GPTCache", version:"0.1.44+", why:"Semantic response caching. Cosine similarity > 0.92 → return cached response. 40–60% LLM call elimination." },
        ]
      },
      {
        title:"Web Scraping", icon:"🕷️", color:"coral",
        items:[
          { name:"Playwright", version:"1.49+", why:"Async browser automation. Scrapes JavaScript-rendered raynatours.com pages. Runs headless on EKS." },
          { name:"BeautifulSoup4", version:"4.12+", why:"HTML parsing for scraped content. Extracts structured product data from page HTML." },
          { name:"APScheduler", version:"3.11+", why:"Schedules RAG refresh jobs every 6h. Also handles quotation expiry cleanup and cache warm-up." },
        ]
      }
    ],
    data: [
      {
        title:"Primary Cache", icon:"⚡", color:"amber",
        items:[
          { name:"Redis", version:"7.4+ (ElastiCache)", why:"Session storage (30min TTL), response cache, rate limit counters (sliding window), JWT denylist, tool result cache. ElastiCache r7g.xlarge cluster, 3 read replicas. 100K ops/sec." },
          { name:"redis-py (async)", version:"5.2+", why:"Async Redis client for FastAPI. Pipeline batching for session R/W. aioredis compatibility layer." },
        ]
      },
      {
        title:"Relational Database", icon:"🗄️", color:"gray",
        items:[
          { name:"PostgreSQL", version:"16+ (RDS)", why:"Bookings, agents, financial transactions, user accounts. Multi-AZ deployment. Read replica for analytics queries. pgvector extension available if Pinecone is supplemented." },
          { name:"SQLAlchemy", version:"2.0+ (async)", why:"Async ORM. Core + ORM hybrid. Connection pooling via asyncpg driver." },
          { name:"Alembic", version:"1.14+", why:"DB migrations. Version-controlled schema changes. Auto-generates from SQLAlchemy models." },
        ]
      },
      {
        title:"NoSQL / Document", icon:"📋", color:"blue",
        items:[
          { name:"DynamoDB", version:"AWS managed", why:"Chat history (full transcripts), staff audit logs (immutable append-only), session metadata. Single-digit ms at any scale. On-demand billing." },
          { name:"S3", version:"AWS managed", why:"Quotation PDFs, vouchers, tickets, conversation transcripts, RAG scraped content archives. Lifecycle rules for auto-archival." },
        ]
      }
    ],
    infra: [
      {
        title:"Cloud & Orchestration", icon:"☁️", color:"blue",
        items:[
          { name:"AWS", version:"me-south-1 (UAE)", why:"Primary cloud. UAE data residency compliance. Services: EKS, RDS, ElastiCache, S3, SES, SQS, CloudFront, WAF, API Gateway." },
          { name:"Amazon EKS", version:"1.31+", why:"Kubernetes for FastAPI, LiteLLM, Kong pods. HPA auto-scaling. Node groups: general (m7g) + memory-optimised (r7g) for Redis." },
          { name:"Terraform", version:"1.10+", why:"Infrastructure as code. All AWS resources version-controlled. Workspace per environment (dev/staging/prod)." },
          { name:"Helm", version:"3.16+", why:"Kubernetes package manager. Chart per service. Values files per environment. LiteLLM, Kong, FastAPI all deployed as Helm charts." },
        ]
      },
      {
        title:"CI/CD & Containers", icon:"🚀", color:"teal",
        items:[
          { name:"GitHub Actions", version:"Latest", why:"CI/CD pipelines. Test → build → push to ECR → Helm deploy. Blue/green deployments on EKS." },
          { name:"Amazon ECR", version:"AWS managed", why:"Container registry. Image scanning on push. Lifecycle policies for old image cleanup." },
          { name:"Docker", version:"27+", why:"Container runtime. Multi-stage builds for minimal image size. Python 3.12-slim base." },
        ]
      },
      {
        title:"Monitoring & Observability", icon:"📊", color:"purple",
        items:[
          { name:"Datadog", version:"Agent 7+", why:"APM, infrastructure metrics, LLM token cost tracking per model/user/intent. Custom dashboards for p95 latency, cache hit rates, circuit breaker states." },
          { name:"PagerDuty", version:"Latest", why:"On-call alerting. Triggered by Datadog when: p95 > 5s, error rate > 1%, circuit OPEN, cost spike 2×avg." },
          { name:"ELK Stack", version:"8.16+", why:"Centralised logging. Elasticsearch + Logstash + Kibana. All FastAPI access logs, LLM call logs, tool execution logs." },
          { name:"CloudWatch", version:"AWS managed", why:"AWS-native metrics. EKS cluster health, RDS performance insights, ElastiCache memory. Feeds into Datadog." },
        ]
      },
      {
        title:"Security", icon:"🔒", color:"red",
        items:[
          { name:"AWS WAF", version:"v2", why:"Web application firewall. Rate limiting at edge. Blocks SQL injection, bad bots, suspicious IPs before CloudFront." },
          { name:"AWS Shield Standard", version:"Always-on", why:"DDoS protection at no extra cost. Automatically protects CloudFront and API Gateway." },
          { name:"Secrets Manager", version:"AWS managed", why:"All API keys (Claude, OpenAI, Gemini, Grok), DB passwords, JWT private keys. Rotation policies per secret." },
        ]
      }
    ],
    async: [
      {
        title:"Message Queue & Workers", icon:"📬", color:"teal",
        items:[
          { name:"Amazon SQS", version:"AWS managed", why:"Async task queue. PDF generation, email dispatch, WhatsApp notifications. FIFO queues for ordered processing. DLQ for failed tasks." },
          { name:"Celery", version:"5.4+", why:"Distributed task queue workers. Connects to SQS via kombu. Scales 5–40 workers via HPA on EKS. Beat scheduler for periodic tasks." },
          { name:"Redis (as broker)", version:"7.4+", why:"Celery broker for low-latency tasks. SQS for durable tasks. Hybrid broker strategy: Redis for speed, SQS for reliability." },
        ]
      },
      {
        title:"Email & Notifications", icon:"📧", color:"green",
        items:[
          { name:"Amazon SES", version:"AWS managed", why:"Transactional email. Quotation PDFs, booking confirmations, vouchers. High deliverability in UAE/GCC region. Templated emails." },
          { name:"WhatsApp Business API", version:"Cloud API v20+", why:"WhatsApp notifications for booking confirmations and vouchers. send_notification MCP tool dispatches via Celery worker." },
          { name:"WeasyPrint", version:"62+", why:"HTML-to-PDF generation for quotation PDFs and vouchers. Runs as Celery task. QR code support for vouchers." },
        ]
      },
      {
        title:"Scheduled Jobs", icon:"⏰", color:"amber",
        items:[
          { name:"APScheduler", version:"3.11+", why:"Periodic task scheduling within FastAPI process. RAG content refresh every 6h, quotation expiry cleanup, cache warm-up jobs." },
          { name:"Celery Beat", version:"5.4+", why:"Distributed cron-style scheduling for heavy jobs. Scraper runs, embedding batch jobs, commission report generation." },
        ]
      }
    ]
  };

  return (
    <div>
      <SH title="Tech Stack" sub="Every library, framework and service — with version numbers and the reason each was chosen" />
      <div style={{ display:"flex", gap:6, marginBottom:20, flexWrap:"wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding:"6px 16px", borderRadius:20, fontSize:13, fontWeight:500, cursor:"pointer", border:"1px solid",
            borderColor: activeTab===t.id ? "#7F77DD" : "var(--color-border-secondary)",
            background: activeTab===t.id ? "#EEEDFE" : "var(--color-background-secondary)",
            color: activeTab===t.id ? "#3C3489" : "var(--color-text-secondary)",
            transition:"all 0.12s"
          }}>{t.label}</button>
        ))}
      </div>
      {stacks[activeTab].map((group, i) => <TechStackGroup key={i} {...group}/>)}
    </div>
  );
};

// ── SECTIONS ────────────────────────────────────────────────────────────────

const sections = [
  { id:"techstack",  label:"Tech stack" },
  { id:"overview",   label:"System overview" },
  { id:"reqflow",    label:"Request flow" },
  { id:"intent",     label:"Intent classifier" },
  { id:"rag",        label:"RAG pipeline" },
  { id:"mcp",        label:"MCP tool router" },
  { id:"session",    label:"Chat history & memory" },
  { id:"quotation",  label:"Quotation engine" },
  { id:"scale",      label:"Scale & failure" },
  { id:"cost",       label:"Cost strategy" },
];

const content = {
  techstack: <TechStackContent />,
  overview: (
    <div>
      <SH title="System Overview" sub="All 7 layers — every component and how they connect" />
      <DiagramOverview />
      <Divider />
      <Table headers={["Layer","Components","Responsibility"]} rows={[
        ["1 — Client","iOS · Android · Web PWA · Desktop · Portals","SSE streaming, WebSocket, REST"],
        ["2 — Edge","CloudFront · WAF · DDoS · Static cache","Blocks bad traffic, serves static from CDN"],
        ["3 — Gateway","API Gateway · Kong · JWT RS256 · Redis rate limit","Auth, rate limiting, user-type tagging"],
        ["4 — Orchestration","Session mgr · Intent classifier · Permission guard · Prompt builder","Routes every query to correct source and model"],
        ["5 — AI Layer","LiteLLM · RAG pipeline · MCP router · Semantic cache","All intelligence: retrieval, tools, LLM calls"],
        ["6 — Data","Redis · RDS Postgres · DynamoDB · Pinecone · S3","Persistence, caching, vector search, files"],
        ["7 — Async","SQS · Celery · APScheduler · Datadog","PDF, email, WhatsApp, RAG refresh, monitoring"],
      ]}/>
      <Card accent="info"><strong>Core rule:</strong> Bot never touches Rayna databases directly. MCP tools wrap existing APIs. All transactional actions go to raynatours.com via deep-link.</Card>
    </div>
  ),
  reqflow: (
    <div>
      <SH title="Request Flow — end to end" sub="Exact journey for every query" />
      <DiagramRequestFlow />
      <Divider />
      <Table headers={["Step","What happens","Latency"]} rows={[
        ["1. Gateway","JWT decoded, user_type tagged, rate limit checked","2–5ms"],
        ["2. Cache check","Redis key = hash(query+user_type). 40–60% stop here.","1–2ms"],
        ["3. Intent classify","Keyword gate → distilBERT → SIMPLE tier + RAG+MCP","30–50ms"],
        ["4. Session load","Last N turns from Redis injected into messages[]","2–5ms"],
        ["5. Parallel fetch","asyncio.gather: RAG top-5 + MCP tools simultaneously","150–400ms"],
        ["6. LLM call","Context assembled → Gemini Flash → SSE stream","700ms–2s"],
        ["7. Cache write","Redis write + DynamoDB session save (async)","non-blocking"],
      ]}/>
    </div>
  ),
  intent: (
    <div>
      <SH title="Intent Classifier" sub="Two-stage design — determines model, data source, cost tier before any LLM fires" />
      <DiagramIntentClassifier />
      <Divider />
      <Table headers={["Intent","Tier","Data source","Signals","Model"]} rows={[
        ["Product search","SIMPLE","RAG + MCP",'"show me" "list"',"Gemini Flash"],
        ["Post-booking","STANDARD","MCP only · auth",'"my booking" "pickup"',"Claude Haiku"],
        ["Quotation","COMPLEX","RAG + MCP both",'"quote me" "plan trip"',"Claude Sonnet"],
        ["FAQ / policy","SIMPLE","RAG only",'"what is" "policy"',"Gemini Flash"],
        ["External","STANDARD","Web search",'"weather" "visa"',"Claude Haiku"],
      ]}/>
      <Card accent="warning">Confidence &lt; 0.7 → ask clarifying question first. Zero cost until intent is clear.</Card>
    </div>
  ),
  rag: (
    <div>
      <SH title="RAG Pipeline" sub="Offline ingestion every 6h + real-time hybrid retrieval per query" />
      <DiagramRAG />
      <Divider />
      <Table headers={["Namespace","Content","TTL","Refresh"]} rows={[
        ["tours","Descriptions, inclusions, pickup points","24h","Every 6h"],
        ["hotels","Room types, amenities","24h","Every 6h"],
        ["faq","FAQ page content","24h","Every 6h"],
        ["policies","Cancellation, T&C, payment","24h","Daily"],
        ["destination_guides","Dubai, Abu Dhabi etc","48h","Daily"],
        ["visas","General visa overview","6h","Every 6h"],
      ]}/>
      <Card accent="danger"><strong>Hard constraint:</strong> 0 Pinecone results → "I don't have that info". Never infer from training data.</Card>
    </div>
  ),
  mcp: (
    <div>
      <SH title="MCP Tool Router" sub="18 tools wrapping existing Rayna APIs — parallel, cached, retried, fallback" />
      <DiagramMCP />
      <Divider />
      <Table headers={["Tool","Cache TTL","Auth","Notes"]} rows={[
        ["search_products","5min","No","Parallel with get_pricing on product queries"],
        ["check_availability","30sec","No","Short TTL — slots change fast"],
        ["get_pricing","60sec","No","Live rates — never serve stale price"],
        ["fetch_reviews / check_weather","15–30min","No","Longer TTL — changes slowly"],
        ["check_visa_req","1hr","No","External gov data"],
        ["create_booking / process_payment","0 never","Yes","Always live — no cache ever"],
        ["modify/cancel_booking","0 never","Yes","Mutation ops — always live"],
        ["generate_voucher / send_notification","0 never","Yes","Operational module — always live"],
        ["generate_invoice / track_commission","0 / 5min","Agent/Staff","Financial data"],
        ["build_itinerary / calculate_markup","10min / 5min","No / Agent","Logic + rates"],
        ["create_deep_link","1hr","No","URL rarely changes"],
        ["escalate_human","0 never","No","CRM handoff — always live"],
      ]}/>
    </div>
  ),
  session: (
    <div>
      <SH title="Chat History & Session Memory" sub="LLMs are stateless — session manager injects history into every call" />
      <DiagramSession />
      <Divider />
      <Card accent="info"><strong>Key insight:</strong> Every LLM API call is independent. Session manager loads history from Redis and injects it as the messages[] array on every single call.</Card>
      <Table headers={["User type","Window","Why"]} rows={[
        ["B2C Guest","Last 5 turns","Short sessions, minimal context needed"],
        ["B2C Customer","Last 8 turns","Post-booking back-and-forth"],
        ["Agent","Last 10 turns","Multi-service quotation building"],
        ["Staff","Last 15 turns","Complex multi-step operations"],
      ]}/>
      <Card accent="warning"><strong>Cost discipline:</strong> Every token in history costs money every call. Window limits strictly enforced. Compressed summary preserves context when old turns are dropped.</Card>
    </div>
  ),
  quotation: (
    <div>
      <SH title="Quotation Engine" sub="NLU extraction + rate resolver + parallel MCP calls + PDF delivery" />
      <DiagramQuotation />
      <Divider />
      <Table headers={["Rule","Detail"]} rows={[
        ["Pricing source","Always live API. Never RAG, never cached."],
        ["Validity","24 hours. Re-quote if expired."],
        ["Partial availability","Show what's available, ask for alternatives."],
        ["Guest quotation","Email required before PDF sent."],
        ["Staff for agent","Agent-specific rate card. Audit logged."],
      ]}/>
    </div>
  ),
  scale: (
    <div>
      <SH title="Scale & Failure Handling" sub="5K concurrent, HPA rules, circuit breakers, cost levers" />
      <DiagramScale />
      <Divider />
      <Card accent="info"><strong>Real bottleneck:</strong> Not FastAPI — LLM token throughput limits. Semantic cache (lever 1) is your primary defence.</Card>
      <Table headers={["Alert","Threshold","Action"]} rows={[
        ["p95 latency","> 5 seconds","PagerDuty page"],
        ["Error rate","> 1% over 2 min","Alert"],
        ["Redis memory","> 80%","Scale up"],
        ["LLM cost","> 2× 10min avg","Alert — injection check"],
        ["Circuit breaker","Any OPEN","Immediate page"],
        ["SQS depth","> 500 msgs","Celery scale"],
      ]}/>
    </div>
  ),
  cost: (
    <div>
      <SH title="Cost Strategy" sub="5 levers — ~70–80% reduction vs naive routing" />
      <Card accent="warning"><strong>At scale:</strong> 5K users × 1K tokens × $3/1M (Sonnet) = $900/hr naive. With 5 levers: ~$180–270/hr.</Card>
      <Table headers={["Lever","Mechanism","Saving"]} rows={[
        ["1. Semantic cache","GPTCache cosine similarity. Same-intent queries share one LLM call.","40–60% calls eliminated"],
        ["2. Model routing","80% → Gemini Flash (10× cheaper). Only complex → Sonnet.","~65% cost cut"],
        ["3. Prompt compression","LLMLingua on RAG chunks before injection.","15–25% input tokens"],
        ["4. Tool caching","MCP results cached in Redis per TTL.","Rayna API load -60–80%"],
        ["5. Token budgets","Hard caps: SIMPLE 600 · STANDARD 1,500 · COMPLEX 4,000.","Runaway prevention"],
        ["Combined","All 5 levers together","~70–80% vs naive"],
      ]}/>
      <Card accent="danger"><strong>Thinking mode risk:</strong> Opus/o1 cost spikes. Consider daily per-user cap or premium tier gate.</Card>
    </div>
  ),
};

export default function App() {
  const [active, setActive] = useState("techstack");
  return (
    <div style={{ display:"flex", minHeight:700, fontFamily:"var(--font-sans)", fontSize:14 }}>
      <div style={{ width:190, minWidth:190, borderRight:"1px solid var(--color-border-tertiary)", padding:"14px 0", background:"var(--color-background-secondary)", flexShrink:0 }}>
        <div style={{ padding:"0 14px 10px", fontSize:11, fontWeight:500, color:"var(--color-text-tertiary)", letterSpacing:"0.06em" }}>RAYNA BOT LLD</div>
        {sections.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)} style={{
            display:"block", width:"100%", textAlign:"left", padding:"7px 14px",
            fontSize:13, fontWeight:active===s.id?500:400, border:"none", cursor:"pointer",
            background:active===s.id?"var(--color-background-primary)":"transparent",
            color:active===s.id?"var(--color-text-primary)":"var(--color-text-secondary)",
            borderLeft:active===s.id?"2px solid #7F77DD":"2px solid transparent",
            transition:"all 0.12s"
          }}>
            {s.id === "techstack" && <span style={{ marginRight:6, fontSize:12 }}>⚡</span>}
            {s.label}
          </button>
        ))}
        <div style={{ padding:"14px 14px 4px", marginTop:8, borderTop:"1px solid var(--color-border-tertiary)" }}>
          <div style={{ fontSize:11, color:"var(--color-text-tertiary)" }}>Phase 1 · AWS · FastAPI</div>
          <div style={{ fontSize:11, color:"var(--color-text-tertiary)" }}>Next.js · Pinecone · Redis</div>
        </div>
      </div>
      <div style={{ flex:1, padding:"24px 28px", overflowY:"auto" }}>
        {content[active]}
      </div>
    </div>
  );
}