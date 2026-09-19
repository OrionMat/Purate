import type { MediaItem, MediaStatus, MediaType } from '../types/media'
export type { MediaItem, MediaStatus, MediaType } from '../types/media'
type Seed = [string, number, string, string, string?, number?, string?]
const movies: Seed[] = [
 ['Fackham Hall',2025,'Comedy','A delightfully improper upstairs-downstairs comedy, where an eccentric aristocratic family discovers that keeping up appearances is a full-time occupation.','https://www.impawards.com/intl/uk/2025/posters/fackham_hall.jpg',97,'Jim O’Hanlon'],
 ['One Battle After Another',2025,'Action,Thriller','An exhausted revolutionary is pulled back into a world he thought he had left behind when his daughter goes missing.','https://www.impawards.com/2025/posters/one_battle_after_another_ver4.jpg',162,'Paul Thomas Anderson'],
 ['The Truman Show',1998,'Drama,Comedy','Truman Burbank has a perfect life. A little too perfect. When cracks appear in his everyday reality, he sets out to discover what lies beyond the horizon.','vuza0WqY239yBXOadKlGwJsZJFE.jpg',103,'Peter Weir'],
 ['Sinners',2025,'Thriller,Drama','Twin brothers return to their hometown to start again, only to discover that a greater darkness has been waiting to welcome them back.','yqsCU5XOP2mkbFamzAqbqntmfav.jpg',137,'Ryan Coogler'],
 ['Dune: Part Two',2024,'Sci-Fi,Action','Paul Atreides joins the Fremen and faces a choice between the person he loves and the fate of the universe.','1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',166,'Denis Villeneuve'],
 ['Blade Runner 2049',2017,'Sci-Fi,Thriller','A new blade runner uncovers a long-buried secret that leads him to a former officer who has been missing for decades.','gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',164,'Denis Villeneuve'],
 ['Arrival',2016,'Sci-Fi,Drama','A linguist is recruited to communicate with mysterious visitors, and discovers a language that changes everything.','x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg',116,'Denis Villeneuve'],
 ['The Grand Budapest Hotel',2014,'Comedy,Drama','A legendary concierge and his trusted lobby boy become entangled in a stolen painting, a family fortune, and a changing Europe.','eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',100,'Wes Anderson'],
 ['Interstellar',2014,'Sci-Fi,Drama','A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.','gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',169,'Christopher Nolan'],
 ['Oppenheimer',2023,'Drama','The story of J. Robert Oppenheimer and the impossible moral weight of a world-changing scientific discovery.','ptpr0kGAckfQkJeJIt8st5dglvd.jpg',180,'Christopher Nolan'],
 ['Parasite',2019,'Thriller,Drama','Two families become bound together in a darkly comic story of aspiration, class, and the spaces between them.','7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',132,'Bong Joon-ho'],
 ['Whiplash',2014,'Drama','An ambitious young drummer is pushed to his limits by a teacher whose methods blur the line between excellence and obsession.','7fn624j5lj3xTme2SgiLCeuedmO.jpg',107,'Damien Chazelle'],
 ['The Social Network',2010,'Drama','An idea born in a dorm room becomes a global phenomenon, fracturing friendships along the way.','n0ybibhJtQ5icDqTp8eRytcIHJx.jpg',120,'David Fincher'],
 ['The Prestige',2006,'Thriller,Drama','Two rival magicians sacrifice everything in pursuit of the ultimate illusion.','bdN3gXuIZYaJP7ftKK2sU0nPtEA.jpg',130,'Christopher Nolan'],
 ['The Dark Knight',2008,'Action,Crime','Gotham’s masked protector confronts an agent of chaos who tests the city’s faith in its heroes.','qJ2tW6WMUDux911r6m7haRef0WH.jpg',152,'Christopher Nolan'],
 ['Everything Everywhere All at Once',2022,'Sci-Fi,Comedy','An exhausted laundromat owner is swept into a multiverse adventure about family, possibility, and finding meaning.','w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg',139,'Daniel Kwan & Daniel Scheinert'],
]
const tv: Seed[] = [
 ['Severance',2022,'Sci-Fi,Thriller','Office workers have their work and personal memories surgically divided. One employee begins to question the bargain.'],
 ['The Bear',2022,'Drama,Comedy','A young chef returns to Chicago to transform his family’s sandwich shop, one chaotic service at a time.'],
 ['Succession',2018,'Drama','The children of a media patriarch compete for power, approval, and control of a sprawling empire.'],
 ['Breaking Bad',2008,'Crime,Thriller','A chemistry teacher’s desperate decision pulls his family into an increasingly dangerous double life.'],
 ['Dark',2017,'Sci-Fi,Thriller','A missing child reveals impossible connections across four families and several generations.'],
 ['Fleabag',2016,'Comedy,Drama','A sharp, funny Londoner navigates grief, intimacy, and the things she cannot bring herself to say.'],
 ['The Last of Us',2023,'Drama,Action','Two unlikely companions cross a transformed America, finding hope in a world that has lost its way.'],
 ['Slow Horses',2022,'Thriller,Crime','A dysfunctional team of British intelligence agents gets a second chance at saving the day.'],
]
const books: Seed[] = [
 ['Dune',1965,'Sci-Fi','Politics, ecology, and prophecy collide on a desert planet that holds the most valuable substance in the universe.','',undefined,'Frank Herbert'],
 ['Tomorrow, and Tomorrow, and Tomorrow',2022,'Drama','Two friends build imaginary worlds together while struggling to understand their own.','',undefined,'Gabrielle Zevin'],
 ['Project Hail Mary',2021,'Sci-Fi','A lone astronaut wakes without his memories, facing an ingenious mission to save life on Earth.','',undefined,'Andy Weir'],
 ['The Secret History',1992,'Thriller,Drama','An outsider joins a rarefied circle of classics students whose obsession with beauty takes a sinister turn.','',undefined,'Donna Tartt'],
 ['Normal People',2018,'Drama','Two young people move in and out of each other’s lives, exploring connection, class, and growing up.','',undefined,'Sally Rooney'],
 ['The Hitchhiker’s Guide to the Galaxy',1979,'Sci-Fi,Comedy','An ordinary Thursday becomes an extraordinary journey through the absurdity of the universe.','',undefined,'Douglas Adams'],
 ['1984',1949,'Sci-Fi,Thriller','A quiet act of resistance in a society where even thought is subject to surveillance.','',undefined,'George Orwell'],
 ['The Thursday Murder Club',2020,'Crime,Comedy','Four friends in a retirement village turn their weekly cold-case hobby into a very real investigation.','',undefined,'Richard Osman'],
]
function seed(rows: Seed[], type: MediaType): MediaItem[] {
 return rows.map(([title,year,genres,description,poster,runtime,creator],i) => ({
  id:`${type}-${i}`,type,title,year,genres:genres.split(','),description,
  poster:poster?.startsWith('https://')?poster:poster?`https://image.tmdb.org/t/p/w500/${poster}`:'', runtime,
  ...(type==='book'?{author:creator}:{director:creator}),
  status:(i<4?'queued':i%3===0?'watching':i%5===0?'dropped':'completed') as MediaStatus,
  addedAt:new Date(Date.UTC(2026,8,19-i)).toISOString(), rating:i>=4?3+i%3:undefined,
 }))
}
export const initialMedia = [...seed(movies,'movie'),...seed(tv,'tv'),...seed(books,'book')]

