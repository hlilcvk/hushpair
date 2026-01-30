import Link from 'next/link'

const MODULE_MAP: Record<string, {title: string; purpose: string; mvp: string[]; security: string[]; deps: string[]}> = {
  'm21': {
    title: 'M21 — Event-Based Matching Engine',
    purpose: 'Event intent üzerinden trust-gated eşleşme ve event thread üretimi.',
    mvp: ['Intent create/query/cancel', 'Per-event pair-unique matching', 'Event thread + safety context'],
    security: ['Rate-limit per-event', 'Canonical event doğrulama', 'PII minimizasyonu'],
    deps: ['Core Trust/Policy', 'M19 Canonical Events']
  },
  'm22': {
    title: 'M22 — Ticketing & Event Commerce Gateway',
    purpose: 'Deep-link, affiliate tracking, webhook doğrulama, reconciliation.',
    mvp: ['Vendor adapter v1', 'Webhook HMAC + replay', 'Conversion reconciliation job'],
    security: ['Secret mgmt', 'Idempotency keys', 'Immutable audit trail'],
    deps: ['M19', 'Core (stub treasury)']
  },
  'm16': {
    title: 'M16 — Couple Experiences Engine',
    purpose: 'Room + co-watch/co-play + session orchestration (match-gated).',
    mvp: ['Create/join/leave room', 'Playback state sync', 'Reconnect + abuse limits'],
    security: ['Trust gating', 'Signaling auth', 'Rate limits'],
    deps: ['M21', 'Core Auth/Policy']
  }
}

export default function ModuleDetail({ params }: { params: { id: string } }){
  const key = params.id.toLowerCase()
  const m = MODULE_MAP[key] ?? {
    title: `${params.id.toUpperCase()} — Module`,
    purpose: 'Module detail placeholder.',
    mvp: ['MVP bullets to be added'],
    security: ['Security notes to be added'],
    deps: ['Dependencies to be added']
  }

  return (
    <div className="container" style={{paddingTop:32, paddingBottom:32}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
        <h1 className="h1">{m.title}</h1>
        <Link href="/modules"><button className="btn btn-ghost">Back</button></Link>
      </div>

      <div className="surface" style={{marginTop:12}}>
        <h3 className="h2">Purpose</h3>
        <div style={{color:'var(--text-secondary)'}}>{m.purpose}</div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginTop:12}}>
        <div className="surface">
          <h3 className="h2">MVP</h3>
          <ul style={{color:'var(--text-secondary)', paddingLeft:18}}>
            {m.mvp.map((x,i)=><li key={i}>{x}</li>)}
          </ul>
        </div>
        <div className="surface">
          <h3 className="h2">Security</h3>
          <ul style={{color:'var(--text-secondary)', paddingLeft:18}}>
            {m.security.map((x,i)=><li key={i}>{x}</li>)}
          </ul>
        </div>
        <div className="surface">
          <h3 className="h2">Dependencies</h3>
          <ul style={{color:'var(--text-secondary)', paddingLeft:18}}>
            {m.deps.map((x,i)=><li key={i}>{x}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}