export default function Privacy(){
  return (
    <div className="container" style={{paddingTop:32, paddingBottom:32}}>
      <h1 className="h1">Privacy</h1>
      <p className="lead">Privacy-first yaklaşım: coarse geo, minimal PII, consent logging, auditability.</p>

      <div className="surface">
        <h3 className="h2">Principles</h3>
        <ul style={{color:'var(--text-secondary)', paddingLeft:18}}>
          <li>Konum: hücre bazlı (geo_cell), açık profilde kesin koordinat yok.</li>
          <li>Event & gifting: bağlam dışına çıkmaz, tekil token + TTL.</li>
          <li>Loglar: PII redaction; güvenlik olayları SIEM’e.</li>
          <li>Consent: opt-in/opt-out kayıtlı.</li>
        </ul>
      </div>
    </div>
  )
}