import { useEffect, useRef, useState, type DragEvent } from 'react'
import { Check, Film, Grip, Plus, RotateCcw, Sparkles, X } from 'lucide-react'
import { Poster } from './MediaCard'
import type { MediaItem } from '../types/media'

const films: MediaItem[] = [
  { id: 'mashup-0', type: 'movie', title: 'Indiana Jones: Raiders of the Lost Ark', year: 1981, genres: ['Adventure'], status: 'queued', addedAt: '', description: '', poster: 'https://image.tmdb.org/t/p/w500/ceG9VzoRAVGwivFU403Wc3AHRys.jpg' },
  { id: 'mashup-1', type: 'movie', title: 'Star Wars: Episode I — The Phantom Menace', year: 1999, genres: ['Sci-Fi'], status: 'queued', addedAt: '', description: '', poster: 'https://image.tmdb.org/t/p/w500/6wkfovpn7Eq8dYNKaG5PY3q2oq6.jpg' },
]
const stages = ['Finding the adventure…', 'Crossing cinematic universes…', 'Adding a little Purate magic…']

export default function MashupStudio() {
  const [selected, setSelected] = useState<string[]>([])
  const [phase, setPhase] = useState<'choose' | 'mixing' | 'ready'>('choose')
  const [stage, setStage] = useState(0)
  const [over, setOver] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const playRef = useRef<HTMLVideoElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const pointerStart = useRef<{ x: number; y: number; moved: boolean } | null>(null)
  const suppressClick = useRef(false)
  const [dragging, setDragging] = useState<{ id: string; x: number; y: number } | null>(null)

  useEffect(() => {
    if (phase !== 'mixing') return
    const first = setTimeout(() => setStage(1), 1100)
    const second = setTimeout(() => setStage(2), 2300)
    const finish = setTimeout(() => setPhase('ready'), 3600)
    return () => { clearTimeout(first); clearTimeout(second); clearTimeout(finish) }
  }, [phase])

  useEffect(() => {
    if (phase === 'ready') {
      resultRef.current?.scrollIntoView({ block: 'nearest' })
      playRef.current?.focus({ preventScroll: true })
    }
  }, [phase])

  function add(id: string) {
    if (phase !== 'choose' || !films.some(film => film.id === id)) return
    setSelected(current => current.includes(id) ? current : [...current, id])
  }

  function drop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setOver(false)
    add(event.dataTransfer.getData('text/plain'))
  }

  function reset() {
    setPhase('choose'); setSelected([]); setStage(0); setVideoError(false)
  }

  return <section className="mashup-studio" aria-labelledby="mashup-title">
    <div className="studio-topline"><span><Sparkles size={15}/> THE PURATE STUDIO</span><span className="studio-badge">TWO WORLDS. ONE STORY.</span></div>
    <h1 id="mashup-title">Purate your favourite<br/><em>content!</em></h1>
    <p className="studio-intro">A little adventure. A galaxy far, far away.<br/>Bring two favourites together and see what happens.</p>

    {phase === 'choose' && <>
      <div className="studio-step"><span>01</span> Pick your ingredients <small>Drag or click to add</small></div>
      <div className="mashup-sources">
        {films.map(film => {
          const added = selected.includes(film.id)
          return <button key={film.id} className={`mashup-source ${added ? 'is-added' : ''}`} disabled={added}
            aria-label={added ? `${film.title} added to canvas` : `Add ${film.title} to canvas`}
            onPointerDown={event => {
              if (event.button !== 0) return
              pointerStart.current = { x: event.clientX, y: event.clientY, moved: false }
              suppressClick.current = false
              event.currentTarget.setPointerCapture(event.pointerId)
            }}
            onPointerMove={event => {
              const start = pointerStart.current
              if (!start) return
              if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 6) start.moved = true
              if (!start.moved) return
              setDragging({ id: film.id, x: event.clientX, y: event.clientY })
              const rect = canvasRef.current?.getBoundingClientRect()
              setOver(!!rect && event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom)
            }}
            onPointerUp={event => {
              const moved = pointerStart.current?.moved
              const rect = canvasRef.current?.getBoundingClientRect()
              if (moved && rect && event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) add(film.id)
              suppressClick.current = !!moved
              pointerStart.current = null; setDragging(null); setOver(false)
            }}
            onPointerCancel={() => { pointerStart.current = null; setDragging(null); setOver(false) }}
            onClick={() => { if (!suppressClick.current) add(film.id); suppressClick.current = false }}>
            <Poster item={film}/><div className="source-copy"><small>{film.year} · {film.genres[0]}</small><strong>{film.title}</strong><span>{added ? <><Check size={13}/> On your canvas</> : <><Grip size={13}/> Drag into the canvas</>}</span></div>
          </button>
        })}
      </div>
      <div className="studio-step"><span>02</span> Make something unexpected <small>{selected.length} / 2 films</small></div>
    </>}

    {dragging && <div className="dragging-poster" style={{ left: dragging.x, top: dragging.y }} aria-hidden="true"><Poster item={films.find(film => film.id === dragging.id)!}/></div>}
    {phase !== 'ready' ? <div ref={canvasRef} className={`mashup-canvas ${over ? 'drag-over' : ''} ${phase === 'mixing' ? 'is-mixing' : ''}`}
      role="region" aria-label="Mash-up canvas" onDragOver={event => { if (phase === 'choose') { event.preventDefault(); event.dataTransfer.dropEffect = 'copy'; setOver(true) } }}
      onDragLeave={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOver(false) }} onDrop={drop}>
      <div className="canvas-films">{[0, 1].map(index => {
        const film = films.find(item => item.id === selected[index])
        return <div className={`canvas-slot slot-${index} ${film ? 'occupied' : ''}`} key={index}>
          {film ? <><Poster item={film}/>{phase === 'choose' && <button className="remove-film" aria-label={`Remove ${film.title} from canvas`} onClick={() => setSelected(current => current.filter(id => id !== film.id))}><X size={14}/></button>}</> : <><Film size={26}/><span>Drop a film here</span></>}
        </div>
      })}<div className="canvas-plus">{phase === 'mixing' ? <Sparkles size={25}/> : <Plus size={24}/>}</div></div>
      <div className="canvas-caption" role="status" aria-live="polite">{phase === 'mixing' ? stages[stage] : selected.length === 2 ? 'An unlikely duo. An unforgettable mash-up.' : 'Your next great mash-up starts here.'}</div>
      {phase === 'mixing' && <div className="purate-progress"><i/></div>}
    </div> : <div className="mashup-result" ref={resultRef}>
      <div className="result-heading"><span><Check size={16}/> Freshly purated</span><small>INDIANA JONES × STAR WARS</small></div>
      <video ref={playRef} tabIndex={0} controls playsInline preload="metadata" aria-label="Indiana Jones and Star Wars mash-up video" onError={() => setVideoError(true)}>
        <source src="/media/starwars-indiana.mp4" type="video/mp4"/>
        Your browser does not support this video. <a href="/media/starwars-indiana.mp4">Open the mash-up</a>.
      </video>
      {videoError ? <p role="alert">The video could not load. <a href="/media/starwars-indiana.mp4" target="_blank" rel="noreferrer">Open the video directly</a> or try again.</p> : <p>Two iconic worlds. One unexpected adventure.<br/>Press play to discover your creation.</p>}
    </div>}

    <div className="studio-actions">{phase === 'ready' ? <button className="primary-button purate-button" onClick={reset}><RotateCcw size={17}/> Make another mash-up</button> : <button className="primary-button purate-button" disabled={selected.length !== 2 || phase === 'mixing'} onClick={() => { setStage(0); setPhase('mixing') }}><Sparkles size={19}/>{phase === 'mixing' ? 'Purating…' : 'Purate'}{phase === 'choose' && <span>Let worlds collide</span>}</button>}<small>{phase === 'choose' ? 'Choose both films to unlock the magic.' : phase === 'mixing' ? 'Good things happen when stories come together.' : 'Made with a little imagination. And Purate.'}</small></div>
  </section>
}
