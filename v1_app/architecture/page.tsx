import DiagramBox from '../../components/DiagramBox'

export default function Architecture(){
  return (
    <div className="container" style={{paddingTop:32, paddingBottom:32}}>
      <h1 className="h1">Architecture</h1>

      <section style={{marginTop:18}}>
        <h3 className="h2">L0–L4</h3>
        <p className="lead">L0 Client → L1 Edge → L2 Core → L3 Chain → L4 Data katmanlarıyla modüler ve güvenli bir topoğrafya.</p>
      </section>

      <section style={{marginTop:18}}>
        <DiagramBox title="System Topology">
          <div style={{display:'grid', gap:12}}>
            <div className="surface">
              <strong>L0 Clients</strong>
              <div style={{color:'var(--text-secondary)'}}>Mobile, Web, Admin, Event UX</div>
            </div>
            <div className="surface">
              <strong>L1 Edge</strong>
              <div style={{color:'var(--text-secondary)'}}>Gateway, WAF, Bot Defense, Webhooks</div>
            </div>
            <div className="surface">
              <strong>L2 Services</strong>
              <div style={{color:'var(--text-secondary)'}}>Modular services (M01..M23), Event Bus, Policy Engine</div>
            </div>
            <div className="surface">
              <strong>L3 Chain</strong>
              <div style={{color:'var(--text-secondary)'}}>Solana Pay, HP Token, Multisig Treasury</div>
            </div>
            <div className="surface">
              <strong>L4 Data</strong>
              <div style={{color:'var(--text-secondary)'}}>Postgres, Redis, Object Storage, Message Bus, SIEM, KMS</div>
            </div>
          </div>
        </DiagramBox>
      </section>

      <section style={{marginTop:18}}>
        <h3 className="h2">Key Guarantees</h3>
        <ul style={{color:'var(--text-secondary)'}}>
          <li>Single-use references for gifting/tickets</li>
          <li>Pair-unique threads & matches with append-only audit</li>
          <li>Policy-enforced abuse prevention</li>
        </ul>
        <div style={{marginTop:12}}>
          <button className="btn btn-ghost">Download Spec</button>
        </div>
      </section>
    </div>
  )
}