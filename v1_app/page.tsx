import Link from 'next/link'
import DiagramBox from '../components/DiagramBox'

export default function Home(){
  return (
    <div className="container" style={{paddingTop:32, paddingBottom:32}}>
      <section style={{display:'grid',gridTemplateColumns:'1fr 420px', gap:24, alignItems:'center'}}>
        <div>
          <h1 className="h1">Trust × Context × Proof × Experience</h1>
          <p className="lead">Event-driven sosyal platform — on-chain ödemeler, privacy-first konum, contextual commerce.</p>
          <div style={{display:'flex', gap:12}}>
            <button className="btn btn-primary">Request Access</button>
            <Link href="/architecture"><button className="btn btn-ghost">View Architecture</button></Link>
          </div>
          <div style={{marginTop:28}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)', gap:12}}>
              <div className="surface" style={{padding:12}}>
                <strong>Trust Graph</strong>
                <div style={{color:'var(--text-secondary)', marginTop:6}}>Kullanıcı itibarı ve ilişki temelli güven.</div>
              </div>
              <div className="surface" style={{padding:12}}>
                <strong>Contextual Discovery</strong>
                <div style={{color:'var(--text-secondary)', marginTop:6}}>Etkinlik & konum odaklı keşif.</div>
              </div>
              <div className="surface" style={{padding:12}}>
                <strong>Proof-Based Settlement</strong>
                <div style={{color:'var(--text-secondary)', marginTop:6}}>Escrow ve on-chain kanıt akışları.</div>
              </div>
              <div className="surface" style={{padding:12}}>
                <strong>Couple Experiences</strong>
                <div style={{color:'var(--text-secondary)', marginTop:6}}>Co-watch / Co-play / session orchestration.</div>
              </div>
            </div>
          </div>
        </div>

        <aside>
          <DiagramBox title="Architecture Preview">
            <div style={{display:'grid', gap:8}}>
              <div style={{display:'flex', gap:8}}>
                <div style={{width:12,height:12,background:'var(--accent-purple)',borderRadius:4}}></div>
                <div style={{color:'var(--text-secondary)'}}>L0 Clients — Mobile / Web / Admin</div>
              </div>
              <div style={{display:'flex', gap:8}}>
                <div style={{width:12,height:12,background:'var(--accent-mint)',borderRadius:4}}></div>
                <div style={{color:'var(--text-secondary)'}}>L1 Edge — Gateway / WAF / Webhooks</div>
              </div>
              <div style={{display:'flex', gap:8}}>
                <div style={{width:12,height:12,background:'rgba(255,255,255,0.06)',borderRadius:4}}></div>
                <div style={{color:'var(--text-secondary)'}}>L2 Core — Modular Services + Event Bus</div>
              </div>
              <div style={{display:'flex', gap:8}}>
                <div style={{width:12,height:12,background:'rgba(255,255,255,0.04)',borderRadius:4}}></div>
                <div style={{color:'var(--text-secondary)'}}>L3 Chain — Solana Pay, HP Token</div>
              </div>
              <div style={{display:'flex', gap:8}}>
                <div style={{width:12,height:12,background:'rgba(255,255,255,0.03)',borderRadius:4}}></div>
                <div style={{color:'var(--text-secondary)'}}>L4 Data — Postgres / Bus / SIEM</div>
              </div>
              <div style={{marginTop:12}}>
                <Link href="/architecture"><button className="btn btn-ghost">Open Full Architecture</button></Link>
              </div>
            </div>
          </DiagramBox>

          <div style={{marginTop:18}}>
            <div className="surface" style={{padding:12}}>
              <strong className="h2">Live Use-Cases</strong>
              <div style={{display:'grid', gap:8, marginTop:8}}>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <div>Event Matching</div><div style={{color:'var(--text-secondary)'}}>Real-time intent</div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <div>Ticketing Gateway</div><div style={{color:'var(--text-secondary)'}}>Deep-link & reconciliation</div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <div>Event Gifting</div><div style={{color:'var(--text-secondary)'}}>Escrow-like redeem flows</div>
                </div>
              </div>
            </div>

            <div className="surface" style={{marginTop:12,padding:12}}>
              <strong className="h2">Security & Privacy</strong>
              <ul style={{color:'var(--text-secondary)', marginTop:6, paddingLeft:18}}>
                <li>Konum detayları asla açık profile’da paylaşılmaz.</li>
                <li>Event gifting yalnızca ilgili event-match içinde mümkündür.</li>
                <li>Single-use redeem token’lar; TTL & brute-force koruması.</li>
                <li>Webhook HMAC & replay protection.</li>
                <li>Append-only audit logs for matches & commerce.</li>
                <li>Policy engine enforces abuse/farming rules.</li>
              </ul>
            </div>
          </div>
        </aside>
      </section>

      <section style={{marginTop:40}}>
        <h3 className="h2">Modules Snapshot</h3>
        <div style={{display:'flex',gap:8,flexWrap:'wrap', marginTop:12}}>
          {['M16','M17','M18','M19','M20','M21','M22','M23','Core'].map(tag=>(
            <div key={tag} style={{padding:'8px 12px', background:'rgba(255,255,255,0.02)', borderRadius:8, color:'var(--text-secondary)', fontSize:13}}>{tag}</div>
          ))}
        </div>
      </section>
    </div>
  )
}