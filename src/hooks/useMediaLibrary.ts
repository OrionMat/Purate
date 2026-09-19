import { useState } from 'react'
import { initialMedia } from '../data/media'
import type { MediaItem, MediaStatus, MediaType, Sort } from '../types/media'
// Keep the original storage key so rebranding preserves existing library edits.
const key = 'tasteai-library'
export function useMediaLibrary() {
 const [error,setError]=useState('')
 const [items,setItems]=useState<MediaItem[]>(()=>{
  try { const saved=JSON.parse(localStorage.getItem(key)||'[]'); return initialMedia.map(item=>{
   const change=Array.isArray(saved)?saved.find((entry: MediaItem)=>entry.id===item.id):undefined
   return change?{...item,status:['queued','watching','completed','dropped'].includes(change.status)?change.status:item.status,rating:typeof change.rating==='number'&&change.rating>=1&&change.rating<=5?change.rating:undefined,notes:typeof change.notes==='string'?change.notes:''}:item
  }) } catch { return initialMedia }
 })
 function update(item: MediaItem) {
  const next=items.map(current=>current.id===item.id?item:current)
  setItems(next)
  try {localStorage.setItem(key,JSON.stringify(next));setError('')} catch {setError('Your browser could not save these changes. They will last until you reload.')}
 }
 function filter(type:MediaType,status:MediaStatus,genre:string,query:string,sort:Sort) {
  return items.filter(item=>item.type===type&&item.status===status&&(genre==='All genres'||item.genres.includes(genre))&&item.title.toLowerCase().includes(query.toLowerCase())).sort((a,b)=>sort==='Title'?a.title.localeCompare(b.title):sort==='Year'?b.year-a.year:sort==='Rating'?(b.rating||0)-(a.rating||0):b.addedAt.localeCompare(a.addedAt))
 }
 return {items,update,filter,error}
}
