import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Check, ChevronDown } from 'lucide-react'
export default function Dropdown({label,value,options,onChange,icon,accent=false}:{label:string;value:string;options:{value:string;label:string}[];onChange:(value:string)=>void;icon?:ReactNode;accent?:boolean}) {
 const [open,setOpen]=useState(false);const ref=useRef<HTMLDivElement>(null)
 useEffect(()=>{function close(e:PointerEvent){if(!ref.current?.contains(e.target as Node))setOpen(false)}function key(e:KeyboardEvent){if(e.key==='Escape')setOpen(false)}document.addEventListener('pointerdown',close);document.addEventListener('keydown',key);return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',key)}},[])
 return <div className="dropdown" ref={ref}><button className={`toolbar-button ${accent?'accent':''}`} aria-label={label} aria-expanded={open} onClick={()=>setOpen(!open)}>{icon}<span>{label}</span><ChevronDown size={17} className={open?'rotate':''}/></button>{open&&<div className="dropdown-menu" role="group" aria-label={`${label} options`}>{options.map(option=><button key={option.value} className={value===option.value?'chosen':''} onClick={()=>{onChange(option.value);setOpen(false)}}>{option.label}{value===option.value&&<Check size={16}/>}</button>)}</div>}</div>
}
