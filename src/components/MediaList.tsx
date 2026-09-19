import { Star, ArrowUpRight } from 'lucide-react'
import { label, type MediaItem } from '../types/media'
import { Poster } from './MediaCard'
export default function MediaList({items,onSelect}:{items:MediaItem[];onSelect:(item:MediaItem)=>void}){return <div className="media-list">{items.map(item=><button key={item.id} className="media-row" onClick={()=>onSelect(item)}><Poster item={item}/><div className="row-title"><strong>{item.title}</strong><span>{item.year} · {item.genres.join(' / ')}</span></div><span className="status-tag">{label(item.status)}</span><span className="row-rating"><Star size={16}/>{item.rating?`${item.rating}/5`:'—'}</span><ArrowUpRight size={18}/></button>)}</div>}
