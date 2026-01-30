export default function Gifting(){
  return (
    <div className="container" style={{paddingTop:32, paddingBottom:32}}>
      <h1 className="h1">Gifting</h1>

      <section style={{marginTop:18}}>
        <h3 className="h2">Event-context gifting rules</h3>
        <ul style={{color:'var(--text-secondary)'}}>
          <li>Hediyeler yalnızca aynı event-match içinde verilmelidir.</li>
          <li>Token/fiat escrow-like delivery states ile yönetilir.</li>
        </ul>
      </section>

      <section style={{marginTop:18}}>
        <h3 className="h2">Gift Types</h3>
        <ul style={{color:'var(--text-secondary)'}}>
          <li>Digital gestures</li>
          <li>Venue redeemable (QR)</li>
          <li>Ticket upgrades</li>
        </ul>
      </section>

      <section style={{marginTop:18}}>
        <h3 className="h2">Escrow States</h3>
        <div className="surface" style={{padding:12}}>
          <div>created → paid → delivered → redeemed / refunded</div>
        </div>
      </section>

      <section style={{marginTop:18}}>
        <h3 className="h2">Abuse Controls</h3>
        <div style={{color:'var(--text-secondary)'}}>Limits, TTL, single-use tokens and policy enforcement ensure safe gifting flows.</div>
      </section>
    </div>
  )
}