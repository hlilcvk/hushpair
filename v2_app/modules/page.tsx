'use client'
import Link from 'next/link'
import { useState } from 'react'

const MODULES = [
  {id:'M01', name:'Identity & Access', area:'Core'},
  {id:'M03', name:'Matching & Trust Graph', area:'Matching'},
  {id:'M03-GEO', name:'Geo Discovery', area:'Geo'},
  {id:'M04', name:'Messaging & CQS', area:'Comms'},
  {id:'M19', name:'Event Intelligence Hub', area:'Events'},
  {id:'M20', name:'Announcement Engine', area:'Events'},
  {id:'M21', name:'Event-Based Matching', area:'Matching'},
  {id:'M22', name:'Ticketing Gateway', area:'Commerce'},
  {id:'M23', name:'Event Gifting', area:'Commerce'},
  {id:'M16', name:'Couple Experiences', area:'Comms'},
  {id:'M17', name:'Device Capability', area:'Comms'},
  {id:'M18', name:'Scenario Orchestrator', area:'Matching'},
  {id:'M08', name:'Quote & Pricing', area:'Ops'},
  {id:'M10', name:'Settlement Verifier', area:'Chain'},
  {id:'M15', name:'Token & Incentives', area:'Chain'},
  {id:'M11', name:'Treasury & Liquidity', area:'Chain'},
  {id:'CORE', name:'Policy Engine', area:'Core'}
]

export default function Modules(){
  const [filter, setFilter] = useState('All')
  const areas = ['All','Core','Matching','Geo','Events','Commerce','Comms','Chain','Ops']
  const list = MODULES.filter(m=> filter==='All' ? true : m.area===filter)

  return (
    <div className="container" style={{paddingTop:32, paddingBottom:32}}>
      <h1 className="h1">Modules</h1>

      <div style={{display:'flex', gap:8, marginTop:12, flexWrap:'wrap'}}>
        {areas.map(a=> (
          <button
            key={a}
            className={`btn btn-ghost ${filter===a ? 'btn-ghost-active' : ''}`}
            onClick={()=>setFilter(a)}
          >
            {a}
          </button>
        ))}
      </div>

      <div style={{marginTop:18}} className="grid-3">
        {list.map(m=>(
          <div key={m.id} className="surface">
            <strong>{m.id} — {m.name}</strong>
            <div style={{color:'var(--text-secondary)', marginTop:6}}>Area: {m.area}</div>

            <div style={{marginTop:12, display:'flex', gap:8}}>
              <Link href={`/modules/${encodeURIComponent(m.id.toLowerCase())}`}>
                <button className="btn btn-ghost">Open</button>
              </Link>
              <button className="btn btn-primary" type="button">Assign</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}