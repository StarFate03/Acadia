// ─────────────────────────────────────────────────────────────
//  Game catalog — Acadia storefront
//  Cover / screenshot art is generated locally (see components/Artwork.jsx)
//  from each game's `hue`, so no external image assets are required.
//  Games flagged `playable: true` are playable in-browser (see pages/Play.jsx).
//
//  A game may optionally supply real artwork via `cover` (used for the tile,
//  hero and banner) and `screenshots` (the detail-page gallery). When omitted,
//  cover/screenshot art is generated locally from the game's `hue`.
// ─────────────────────────────────────────────────────────────

import novaCover from '../assets/nova-sweeper/hero.png'
import novaShot1 from '../assets/nova-sweeper/shot-1.png'
import novaShot2 from '../assets/nova-sweeper/shot-2.png'
import novaShot3 from '../assets/nova-sweeper/shot-3.png'
import novaShot4 from '../assets/nova-sweeper/shot-4.png'

import ashenCover from '../assets/ashen-sovereign/hero.png'
import ashenShot1 from '../assets/ashen-sovereign/shot-1.png'
import ashenShot2 from '../assets/ashen-sovereign/shot-2.png'
import ashenShot3 from '../assets/ashen-sovereign/shot-3.png'
import ashenShot4 from '../assets/ashen-sovereign/shot-4.png'

import alderCover from '../assets/tales-of-aldermoor/hero.png'
import alderShot1 from '../assets/tales-of-aldermoor/shot-1.png'
import alderShot2 from '../assets/tales-of-aldermoor/shot-2.png'
import alderShot3 from '../assets/tales-of-aldermoor/shot-3.png'
import alderShot4 from '../assets/tales-of-aldermoor/shot-4.png'

export const GENRES = [
  'Action',
  'Adventure',
  'RPG',
  'Strategy',
  'Simulation',
  'Puzzle',
  'Racing',
  'Roguelike',
  'Survival',
  'Shooter',
]

// System-requirement presets to keep the data tidy.
const REQS = {
  light: {
    minimum: {
      os: 'Windows 10 64-bit',
      cpu: 'Dual-core 2.4 GHz',
      ram: '4 GB',
      gpu: 'Integrated graphics, 1 GB',
      storage: '3 GB',
    },
    recommended: {
      os: 'Windows 11 64-bit',
      cpu: 'Quad-core 3.0 GHz',
      ram: '8 GB',
      gpu: 'Dedicated GPU, 2 GB',
      storage: '3 GB SSD',
    },
  },
  medium: {
    minimum: {
      os: 'Windows 10 64-bit',
      cpu: 'Quad-core 3.0 GHz',
      ram: '8 GB',
      gpu: 'GPU with 4 GB VRAM',
      storage: '25 GB',
    },
    recommended: {
      os: 'Windows 11 64-bit',
      cpu: '6-core 3.6 GHz',
      ram: '16 GB',
      gpu: 'GPU with 8 GB VRAM',
      storage: '25 GB SSD',
    },
  },
  heavy: {
    minimum: {
      os: 'Windows 10 64-bit',
      cpu: '6-core 3.4 GHz',
      ram: '16 GB',
      gpu: 'GPU with 8 GB VRAM',
      storage: '80 GB SSD',
    },
    recommended: {
      os: 'Windows 11 64-bit',
      cpu: '8-core 4.0 GHz',
      ram: '32 GB',
      gpu: 'GPU with 12 GB VRAM',
      storage: '80 GB NVMe SSD',
    },
  },
}

// ── Acadia Originals ────────────────────────────────────────
const originals = [
  {
    id: 'stellar-drift',
    title: 'Stellar Drift',
    type: 'original',
    publisher: 'Acadia Studios',
    hue: 212,
    genres: ['Adventure', 'Simulation'],
    tags: ['Space', 'Exploration', 'Open World', 'Relaxing', 'Singleplayer'],
    price: 39.99,
    releaseDate: '2026-03-18',
    featured: true,
    trending: true,
    newRelease: true,
    platforms: ['Windows', 'macOS'],
    reqs: REQS.medium,
    short: 'Chart an endless, hand-woven galaxy aboard a ship that is yours to rebuild.',
    description:
      'Stellar Drift is a meditative exploration sim set in a procedurally stitched galaxy. Salvage derelict stations, trade star-charts with drifting crews, and slowly rebuild a ship that carries the memory of everywhere you have been. There is no clock and no final boss — only the long, quiet pull of the next horizon.',
  },
  {
    id: 'ember-vanguard',
    title: 'Ember Vanguard',
    type: 'original',
    publisher: 'Acadia Studios',
    hue: 18,
    genres: ['Action', 'RPG'],
    tags: ['Fantasy', 'Co-op', 'Combat', 'Story Rich', 'Controller'],
    price: 49.99,
    releaseDate: '2026-05-02',
    featured: true,
    trending: true,
    newRelease: true,
    platforms: ['Windows'],
    reqs: REQS.heavy,
    short: 'Lead a fireborn order against a spreading, world-eating frost.',
    description:
      'Ember Vanguard is a tactical action-RPG about a dwindling order of flame-wardens holding the last warm valleys against an encroaching frost. Forge signature weapons, bond with companions whose stories change your route through the campaign, and fight side-by-side in three-player co-op.',
  },
  {
    id: 'neon-circuit',
    title: 'Neon Circuit',
    type: 'original',
    publisher: 'Acadia Arcade',
    hue: 285,
    genres: ['Racing', 'Action'],
    tags: ['Arcade', 'Fast-Paced', 'Multiplayer', 'Neon', 'Competitive'],
    price: 24.99,
    releaseDate: '2026-01-27',
    featured: false,
    trending: true,
    newRelease: false,
    platforms: ['Windows', 'macOS'],
    reqs: REQS.light,
    short: 'Anti-gravity street racing lit by a city that races back.',
    description:
      'Neon Circuit is a high-velocity anti-grav racer through a reactive megacity. Drift through collapsing tunnels, bank power off the track itself, and climb ranked ladders in eight-player online lobbies. Easy to pick up, brutal to master.',
  },
  {
    id: 'hollow-signal',
    title: 'Hollow Signal',
    type: 'original',
    publisher: 'Acadia Studios',
    hue: 160,
    genres: ['Adventure', 'Puzzle'],
    tags: ['Atmospheric', 'Mystery', 'Sci-Fi', 'Singleplayer', 'Story Rich'],
    price: 19.99,
    releaseDate: '2025-11-14',
    featured: false,
    trending: false,
    newRelease: false,
    platforms: ['Windows', 'macOS'],
    reqs: REQS.light,
    short: 'A lone technician answers a distress call that should not exist.',
    description:
      'Hollow Signal is a first-person mystery aboard a research array that stopped transmitting nine years ago. Restore power one deck at a time, piece together the crew’s final week from the logs they left behind, and decide how much of the signal you really want to hear.',
  },
  {
    id: 'terra-forge',
    title: 'Terra Forge',
    type: 'original',
    publisher: 'Acadia Studios',
    hue: 38,
    genres: ['Strategy', 'Simulation', 'Survival'],
    tags: ['Base Building', 'City Builder', 'Resource Management', 'Sandbox'],
    price: 34.99,
    releaseDate: '2026-06-20',
    featured: true,
    trending: false,
    newRelease: true,
    platforms: ['Windows'],
    reqs: REQS.medium,
    short: 'Terraform a dead world into a colony that can outlive you.',
    description:
      'Terra Forge is a colony-management sim about coaxing life from barren rock. Balance atmosphere, power, and the fragile moods of your settlers as you push a hostile planet — one greenhouse, one reactor, one hard winter at a time — toward something worth calling home.',
  },
  {
    id: 'petal-and-blade',
    title: 'Petal & Blade',
    type: 'original',
    publisher: 'Acadia Arcade',
    hue: 330,
    genres: ['Roguelike', 'Action'],
    tags: ['Roguelike', 'Fast-Paced', 'Pixel', 'Difficult', 'Replayable'],
    price: 14.99,
    releaseDate: '2025-09-30',
    featured: false,
    trending: true,
    newRelease: false,
    platforms: ['Windows', 'macOS'],
    reqs: REQS.light,
    short: 'A blossoming swordplay roguelike where every death rewrites the garden.',
    description:
      'Petal & Blade is a hand-animated action roguelike set in an ever-shifting garden-labyrinth. Chain katana strikes into blooming combos, collect seeds that mutate each run, and learn a boss’s tells over a hundred beautiful failures.',
  },
  {
    id: 'nova-sweeper',
    title: 'Nova Sweeper',
    type: 'original',
    publisher: 'Sense Interactive',
    hue: 145,
    genres: ['Puzzle'],
    tags: ['Minesweeper', 'Casual', 'Logic', 'Singleplayer', 'Free'],
    price: 0,
    releaseDate: '2026-08-01',
    featured: true,
    trending: true,
    newRelease: true,
    playable: true,
    cover: novaCover,
    screenshots: [novaShot1, novaShot2, novaShot3, novaShot4],
    platforms: ['Browser'],
    reqs: {
      minimum: {
        os: 'Any modern browser',
        cpu: 'Any',
        ram: '2 GB',
        gpu: 'Any',
        storage: 'None — plays in your browser',
      },
      recommended: {
        os: 'Latest Chrome / Edge / Firefox / Safari',
        cpu: 'Any',
        ram: '4 GB',
        gpu: 'Any',
        storage: 'None — plays in your browser',
      },
    },
    short: 'The classic mine-hunt, reimagined. Clear the field, flag the mines, beat the clock.',
    description:
      'Nova Sweeper is a crisp, modern take on the timeless logic puzzle. Reveal tiles to uncover the safe path, use the numbers to deduce where the mines hide, and flag them before you misstep. Three difficulties — Beginner, Intermediate, and Expert — plus a built-in timer to chase your best clear. Free, and playable instantly in your browser.',
  },
  {
    id: 'ashen-sovereign',
    title: 'Ashen Sovereign',
    type: 'original',
    publisher: 'Sense Interactive',
    hue: 12,
    genres: ['Action', 'RPG', 'Adventure'],
    tags: ['Open World', 'Dark Fantasy', 'Souls-like', 'Story Rich', 'Boss Fights', 'Controller', 'Singleplayer'],
    price: 10.99,
    releaseDate: '2026-07-15',
    featured: true,
    trending: true,
    newRelease: true,
    platforms: ['Windows'],
    reqs: REQS.heavy,
    cover: ashenCover,
    screenshots: [ashenShot1, ashenShot2, ashenShot3, ashenShot4],
    short: 'Claim a dying kingdom blade by blade in a punishing dark-fantasy epic.',
    description:
      'Ashen Sovereign is a sweeping dark-fantasy action-RPG set in a realm slowly turning to ash. Master a deliberate, weighty combat system built around stamina, parries, and devastating signature arts; roam a hand-crafted open world of ruined cathedrals and ember-lit wilds; and fell towering bosses that each demand you learn their rhythm. Forge your own path to the throne — as tyrant, savior, or something the ashes have never seen.',
  },
  {
    id: 'tales-of-aldermoor',
    title: 'Tales of Aldermoor',
    type: 'original',
    publisher: 'Sense Interactive',
    hue: 135,
    genres: ['RPG', 'Adventure'],
    tags: ['Pixel', 'Retro', 'JRPG', 'Turn-Based', 'Story Rich', 'Exploration', 'Singleplayer'],
    price: 14.99,
    releaseDate: '2026-06-28',
    featured: true,
    trending: true,
    newRelease: true,
    platforms: ['Windows', 'macOS'],
    reqs: REQS.light,
    cover: alderCover,
    screenshots: [alderShot1, alderShot2, alderShot3, alderShot4],
    short: 'A hand-pixeled JRPG of wandering heroes, turn-based duels, and a world worth saving.',
    description:
      'Tales of Aldermoor is a lovingly hand-pixeled RPG in the classic 16-bit mold. Gather a band of misfit heroes, master a tactical turn-based battle system, and journey across a vast overworld of hidden groves, storm-wracked coasts, and secret-laden dungeons. Branching sidequests, a sweeping chiptune-inspired score, and a story about ordinary people carrying an extraordinary burden.',
  },
]

// ── Marketplace (third-party) ────────────────────────────────
const marketplace = [
  {
    id: 'chrono-warden',
    title: 'Chrono Warden',
    type: 'marketplace',
    publisher: 'Lantern Bay Interactive',
    hue: 262,
    genres: ['Action', 'Adventure'],
    tags: ['Time Travel', 'Metroidvania', 'Singleplayer', 'Story Rich'],
    price: 29.99,
    releaseDate: '2026-02-11',
    featured: true,
    trending: true,
    newRelease: true,
    platforms: ['Windows'],
    reqs: REQS.medium,
    short: 'Rewind seconds, unlock centuries. A clockwork world unravels around you.',
    description:
      'Chrono Warden is an interconnected platform-adventure where rewinding time is your key, your weapon, and your greatest liability. Explore a collapsing clockwork kingdom, solve rooms that exist in two eras at once, and outrun the wardens who remember every loop you take.',
  },
  {
    id: 'harvest-hollow',
    title: 'Harvest Hollow',
    type: 'marketplace',
    publisher: 'Two Foxes Games',
    hue: 96,
    genres: ['Simulation', 'RPG'],
    tags: ['Farming', 'Cozy', 'Life Sim', 'Relaxing', 'Multiplayer'],
    price: 19.99,
    releaseDate: '2025-10-08',
    featured: false,
    trending: true,
    newRelease: false,
    platforms: ['Windows', 'macOS'],
    reqs: REQS.light,
    short: 'Inherit a sleepy valley farm and the little town that grew up around it.',
    description:
      'Harvest Hollow is a warm-hearted farming life-sim. Tend crops through four expressive seasons, win over a cast of neighbors with real routines, and rebuild a forgotten valley — solo or with friends in shared online farms.',
  },
  {
    id: 'iron-dominion',
    title: 'Iron Dominion',
    type: 'marketplace',
    publisher: 'Redline Collective',
    hue: 6,
    genres: ['Strategy'],
    tags: ['RTS', 'War', 'Competitive', 'Base Building', 'Multiplayer'],
    price: 44.99,
    releaseDate: '2026-04-15',
    featured: true,
    trending: false,
    newRelease: true,
    platforms: ['Windows'],
    reqs: REQS.heavy,
    short: 'Command sprawling armies across a fractured industrial frontier.',
    description:
      'Iron Dominion is a large-scale real-time strategy game of supply lines and hard tradeoffs. Out-produce, out-maneuver, and out-think rival commanders across destructible frontiers in tense ranked ladders and long skirmish campaigns.',
  },
  {
    id: 'lumen-depths',
    title: 'Lumen Depths',
    type: 'marketplace',
    publisher: 'Deepwater Studio',
    hue: 190,
    genres: ['Survival', 'Adventure'],
    tags: ['Underwater', 'Survival', 'Crafting', 'Atmospheric', 'Singleplayer'],
    price: 27.99,
    releaseDate: '2026-05-29',
    featured: false,
    trending: true,
    newRelease: true,
    platforms: ['Windows', 'macOS'],
    reqs: REQS.medium,
    short: 'Descend into a bioluminescent trench that does not want to be mapped.',
    description:
      'Lumen Depths is an underwater survival adventure. Manage oxygen and pressure as you dive an ancient trench, craft light against a dark that pushes back, and uncover why the last expedition never resurfaced.',
  },
  {
    id: 'pixel-brigade',
    title: 'Pixel Brigade',
    type: 'marketplace',
    publisher: 'Confetti Cannon',
    hue: 48,
    genres: ['Action', 'Shooter'],
    tags: ['Pixel', 'Co-op', 'Run and Gun', 'Retro', 'Local Multiplayer'],
    price: 12.99,
    releaseDate: '2025-08-19',
    featured: false,
    trending: false,
    newRelease: false,
    platforms: ['Windows', 'macOS'],
    reqs: REQS.light,
    short: 'Four-player, couch-friendly run-and-gun with a candy-colored arsenal.',
    description:
      'Pixel Brigade is a raucous retro run-and-gun built for the couch. Blast through handcrafted stages, swap absurd weapons on the fly, and revive downed teammates in frantic four-player local co-op.',
  },
  {
    id: 'silent-verdict',
    title: 'Silent Verdict',
    type: 'marketplace',
    publisher: 'Grey Harbor Games',
    hue: 220,
    genres: ['Adventure', 'Puzzle'],
    tags: ['Detective', 'Noir', 'Mystery', 'Story Rich', 'Choices Matter'],
    price: 22.99,
    releaseDate: '2026-03-05',
    featured: false,
    trending: false,
    newRelease: true,
    platforms: ['Windows', 'macOS'],
    reqs: REQS.light,
    short: 'A rain-soaked city, one impossible case, and a badge you barely trust.',
    description:
      'Silent Verdict is a noir detective adventure driven by deduction, not action. Interrogate suspects whose stories shift under pressure, assemble evidence boards that actually branch, and live with verdicts the city will not let you take back.',
  },
  {
    id: 'skybound-saga',
    title: 'Skybound Saga',
    type: 'marketplace',
    publisher: 'Highwind Forge',
    hue: 205,
    genres: ['RPG', 'Adventure'],
    tags: ['Open World', 'Fantasy', 'Exploration', 'Story Rich', 'Controller'],
    price: 54.99,
    releaseDate: '2026-06-03',
    featured: true,
    trending: true,
    newRelease: true,
    platforms: ['Windows'],
    reqs: REQS.heavy,
    short: 'Sail floating islands in a fantasy world that drifts apart as you play.',
    description:
      'Skybound Saga is a sprawling open-world RPG set across islands adrift in an endless sky. Captain an airship, recruit a crew with tangled histories, and shape a fracturing world through choices that ripple across a hundred hours of adventure.',
  },
  {
    id: 'void-runners',
    title: 'Void Runners',
    type: 'marketplace',
    publisher: 'Nullspace Labs',
    hue: 275,
    genres: ['Shooter', 'Roguelike'],
    tags: ['FPS', 'Roguelike', 'Fast-Paced', 'Difficult', 'Sci-Fi'],
    price: 24.99,
    releaseDate: '2026-01-16',
    featured: false,
    trending: true,
    newRelease: false,
    platforms: ['Windows'],
    reqs: REQS.medium,
    short: 'A relentless first-person roguelike through a shattered space station.',
    description:
      'Void Runners is a high-speed roguelike shooter set in the corridors of a station that rebuilds itself every run. Stack volatile upgrades, master movement that never stops, and push a little deeper into the void each time it kills you.',
  },
  {
    id: 'garden-of-cogs',
    title: 'Garden of Cogs',
    type: 'marketplace',
    publisher: 'Marbleworks',
    hue: 140,
    genres: ['Puzzle', 'Simulation'],
    tags: ['Puzzle', 'Relaxing', 'Automation', 'Sandbox', 'Cozy'],
    price: 16.99,
    releaseDate: '2025-12-04',
    featured: false,
    trending: false,
    newRelease: false,
    platforms: ['Windows', 'macOS'],
    reqs: REQS.light,
    short: 'Build gentle clockwork contraptions to grow an impossible garden.',
    description:
      'Garden of Cogs is a cozy engineering puzzler. Assemble whimsical clockwork machines to water, prune, and pollinate a growing garden — no timers, no fail states, just the quiet satisfaction of a contraption clicking perfectly into place.',
  },
]

// Some titles are free-to-play — mark a couple of marketplace games at 0.
marketplace.find((g) => g.id === 'void-runners').price = 0
marketplace.find((g) => g.id === 'pixel-brigade').price = 12.99

export const GAMES = [...originals, ...marketplace]

// ── Selectors ────────────────────────────────────────────────
export const getGameById = (id) => GAMES.find((g) => g.id === id)
export const getOriginals = () => GAMES.filter((g) => g.type === 'original')
export const getMarketplace = () => GAMES.filter((g) => g.type === 'marketplace')
export const getFeatured = () => GAMES.filter((g) => g.featured)
export const getTrending = () => GAMES.filter((g) => g.trending)
export const getNewReleases = () =>
  GAMES.filter((g) => g.newRelease).sort(
    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate),
  )

export const formatPrice = (price) =>
  price === 0 ? 'Free to Play' : `$${price.toFixed(2)}`
