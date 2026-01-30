'use client'
import {useState} from 'react'

export default function Contact(){
  const [sent,setSent] = useState(false)
  return (
    <div className="container" id="contact-modal" style={{paddingTop:32, paddingBottom:32}}>
      <h1 className="h1">Contact</h1>
      {!sent ? (
        <form onSubmit={(e)=>{ e.preventDefault(); setSent(true) }} className="surface" style={{maxWidth:680}}>
          <label style={{display:'block', marginBottom:8}}>Ad / Name<input name="name" required className="input" style={{width:'100%', marginTop:6, padding:10, borderRadius:8, background:'transparent', border:'1px solid rgba(255,255,255,0.04)'}}/></label>
          <label style={{display:'block', marginBottom:8}}>Email<input name="email" type="email" required className="input" style={{width:'100%', marginTop:6, padding:10, borderRadius:8, background:'transparent', border:'1px solid rgba(255,255,255,0.04)'}}/></label>
          <label style={{display:'block', marginBottom:8}}>Company / Role<input name="company" className="input" style={{width:'100%', marginTop:6, padding:10, borderRadius:8, background:'transparent', border:'1px solid rgba(255,255,255,0.04)'}}/></label>
          <label style={{display:'block', marginBottom:8}}>Mesaj / Message<textarea name="message" rows={5} required style={{width:'100%', marginTop:6, padding:10, borderRadius:8, background:'transparent', border:'1px solid rgba(255,255,255,0.04)'}}/></label>
          <label style={{display:'flex', gap:8, alignItems:'center'}}><input type="checkbox" required/> <span style={{color:'var(--text-secondary)'}}>Consent to be contacted</span></label>
          <div style={{marginTop:12}}>
            <button className="btn btn-primary" type="submit">Send</button>
          </div>
        </form>
      ) : (
        <div className="surface" style={{maxWidth:680}}>
          <h3 className="h2">Başvurunuz alındı</h3>
          <div style={{color:'var(--text-secondary)'}}>Teşekkürler — en kısa sürede iletişime geçeceğiz.</div>
        </div>
      )}
    </div>
  )
}