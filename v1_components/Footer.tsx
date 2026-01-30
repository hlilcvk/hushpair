import Link from 'next/link'

export default function Footer(){
  return (
    <div style={{paddingTop:24, paddingBottom:40}}>
      <div style={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <strong style={{fontFamily:'Space Grotesk'}}>HUSHPair</strong>
          <div style={{color:'var(--text-secondary)', marginTop:6}}>Event-driven social coordination — trust-first, privacy-by-design.</div>
        </div>
        <div style={{display:'flex', gap:16}}>
          <Link href="/privacy" style={{color:'var(--text-secondary)'}}>Privacy</Link>
          <Link href="/terms" style={{color:'var(--text-secondary)'}}>Terms</Link>
        </div>
      </div>
      <div className="footer">© {new Date().getFullYear()} HUSHPair — All rights reserved.</div>
    </div>
  )
}