export default function DiagramBox({title, children}:{title:string, children:React.ReactNode}){
  return (
    <div className="surface" style={{borderRadius:12}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center', marginBottom:12}}>
        <h3 className="h2">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  )
}