export default function Company(){
  return (
    <div className="container" style={{paddingTop:32, paddingBottom:32}}>
      <h1 className="h1">Company</h1>
      <p className="lead">Misyon: Güven odaklı, event-centered sosyal koordinasyon platformu inşa etmek.</p>

      <section style={{marginTop:18}}>
        <h3 className="h2">Roadmap — vNext-MVP (90 days)</h3>
        <ul style={{color:'var(--text-secondary)'}}>
          <li>Sprint 0: Setup, infra, security baseline (2 hafta)</li>
          <li>Sprint 1–3: M21 & M22 primary (6 hafta)</li>
          <li>Sprint 4–6: M16 + M18/M19/M20 (6 hafta)</li>
          <li>Sprint 7–8: M17/M23/Core integration & hardening (4 hafta)</li>
        </ul>
      </section>
    </div>
  )
}