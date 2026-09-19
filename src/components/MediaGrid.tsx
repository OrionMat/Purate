import type { MediaItem } from '../types/media'
import MediaCard from './MediaCard'
export default function MediaGrid({items,onSelect}:{items:MediaItem[];onSelect:(item:MediaItem)=>void}){return <div className="media-grid">{items.map(item=><MediaCard key={item.id} item={item} onClick={()=>onSelect(item)}/>)}</div>}
