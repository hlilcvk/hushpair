export default function Security(){
  return (
    <div className="container" style={{paddingTop:32, paddingBottom:32}}>
      <h1 className="h1">Security</h1>

      <section style={{marginTop:18}}>
        <h3 className="h2">Threat Surface</h3>
        <ul style={{color:'var(--text-secondary)'}}>
          <li>Auth & Session</li>
          <li>Webhooks & Integrations</li>
          <li>Payments & Escrow</li>
          <li>Geo & Events</li>
          <li>Gifting</li>
        </ul>
      </section>

      <section style={{marginTop:18}}>
        <h3 className="h2">Mandatory Controls</h3>
        <ul style={{color:'var(--text-secondary)'}}>
          <li>HMAC + replay protection for webhooks</li>
          <li>Rate limits & policy engine enforcement</li>
          <li>KMS-backed secrets & key rotation</li>
          <li>Append-only audit log for matches & transactions</li>
        </ul>
      </section>

      <section style={{marginTop:18}}>
        <h3 className="h2">Privacy</h3>
        <div style={{color:'var(--text-secondary)'}}>Coarse geo targeting, explicit consent logging, minimal PII in match flows.</div>
      </section>
    </div>
  )
}