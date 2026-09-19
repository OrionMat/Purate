import type { MediaItem } from '../types/media'
import Dialog from './Dialog'
import AIPanel from './AIPanel'
import MashupStudio from './MashupStudio'

export default function PurateWorkspace({ items, onClose, onSelect }: {
  items: MediaItem[]; onClose: () => void; onSelect: (item: MediaItem) => void
}) {
  return <Dialog label="Ask Purate" onClose={onClose} className="purate-workspace">
    <MashupStudio/>
    <AIPanel items={items} onClose={onClose} onSelect={onSelect}/>
  </Dialog>
}
