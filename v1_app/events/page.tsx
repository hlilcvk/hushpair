export default function Events(){
  return (
    <div className="container" style={{paddingTop:32, paddingBottom:32}}>
      <h1 className="h1">Events</h1>

      <section style={{marginTop:18}}>
        <h3 className="h2">Event Intelligence (M19)</h3>
        <p className="lead">Ingest, normalize, dedupe, and score events. Canonical event registry sağlanır.</p>
      </section>

      <section style={{marginTop:18}}>
        <h3 className="h2">Announcements (M20)</h3>
        <p className="lead">Opt-in, noise budget ve geo-segmentation ile hedefli mesajlaşma.</p>
      </section>

      <section style={{marginTop:18}}>
        <h3 className="h2">Event Matching (M21)</h3>
        <p className="lead">Intent, trust gating ve event-thread’leri match kararına dahil eder.</p>
      </section>

      <section style={{marginTop:18}}>
        <h3 className="h2">Ticketing (M22)</h3>
        <p className="lead">Deep-link, webhook security ve conversion reconciliation</p>
      </section>
    </div>
  )
}