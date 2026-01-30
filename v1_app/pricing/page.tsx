export default function Pricing(){
  return (
    <div className="container" style={{paddingTop:32, paddingBottom:32}}>
      <h1 className="h1">Pricing</h1>

      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginTop:18}}>
        <div className="surface">
          <strong>Starter</strong>
          <div style={{color:'var(--text-secondary)', marginTop:8}}>Single region • Basic events • Request Access</div>
          <div style={{marginTop:12}}><button className="btn btn-primary">Request Access</button></div>
        </div>
        <div className="surface">
          <strong>Growth</strong>
          <div style={{color:'var(--text-secondary)', marginTop:8}}>Multi-region • Ticketing • Event intelligence</div>
          <div style={{marginTop:12}}><button className="btn btn-primary">Request Access</button></div>
        </div>
        <div className="surface">
          <strong>Enterprise</strong>
          <div style={{color:'var(--text-secondary)', marginTop:8}}>Treasury policies • SIEM • Custom integrations</div>
          <div style={{marginTop:12}}><button className="btn btn-primary">Request Access</button></div>
        </div>
      </div>
    </div>
  )
}