export default function Product(){
  return (
    <div className="container" style={{paddingTop:32, paddingBottom:32}}>
      <h1 className="h1">Product</h1>
      <p className="lead">HUSHPair, etkinlik ve konum merkezli sosyal koordinasyon için tasarlanmış bir platformdur. Güven grafiği, event intelligence ve proof-based settlement mekanizmalarını birleştirir.</p>

      <section style={{marginTop:28}}>
        <h3 className="h2">User Journeys</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)', gap:12, marginTop:12}}>
          <div className="surface">
            <strong>Discover → Match → Room → Ticket → Gift → Attend</strong>
            <div style={{color:'var(--text-secondary)', marginTop:8}}>Event keşfi, match ve private experience ile sonlanır.</div>
          </div>
          <div className="surface">
            <strong>Geo Discovery → Scenario → Meet-up</strong>
            <div style={{color:'var(--text-secondary)', marginTop:8}}>Coarse location and scenario orchestration.</div>
          </div>
          <div className="surface">
            <strong>Co-watch / Co-play</strong>
            <div style={{color:'var(--text-secondary)', marginTop:8}}>Senkron deneyimler match-gate ile birlikte.</div>
          </div>
          <div className="surface">
            <strong>Token incentives (claim-only)</strong>
            <div style={{color:'var(--text-secondary)', marginTop:8}}>İlk aşamada claim-only token teşvikleri.</div>
          </div>
        </div>
      </section>

      <section style={{marginTop:28}}>
        <h3 className="h2">Feature Matrix</h3>
        <div className="surface" style={{padding:14}}>
          <div style={{display:'flex', gap:12}}>
            <div style={{flex:1}}>
              <strong>Core</strong>
              <ul style={{color:'var(--text-secondary)'}}>
                <li>Identity & Auth</li>
                <li>Messaging</li>
                <li>Policy Engine</li>
              </ul>
            </div>
            <div style={{flex:1}}>
              <strong>vNext++</strong>
              <ul style={{color:'var(--text-secondary)'}}>
                <li>Event Intelligence (M19)</li>
                <li>Event-Based Matching (M21)</li>
                <li>Couple Experiences (M16)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section style={{marginTop:28}}>
        <h3 className="h2">Integrations</h3>
        <div className="surface" style={{display:'flex', gap:16, padding:12}}>
          <div style={{flex:1, color:'var(--text-secondary)'}}>Ticketing adapters (BiletVendor)</div>
          <div style={{flex:1, color:'var(--text-secondary)'}}>Venue APIs</div>
          <div style={{flex:1, color:'var(--text-secondary)'}}>Wallets & Solana Pay</div>
        </div>
      </section>
    </div>
  )
}