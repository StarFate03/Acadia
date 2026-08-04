import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react'

// A self-contained, fully playable Minesweeper.
// Left-click (or tap) reveals; right-click (or Flag mode + tap) flags.
// First click is always safe. No external assets.

const DIFFICULTIES = {
  beginner: { label: 'Beginner', rows: 9, cols: 9, mines: 10 },
  intermediate: { label: 'Intermediate', rows: 16, cols: 16, mines: 40 },
  expert: { label: 'Expert', rows: 16, cols: 30, mines: 99 },
}

const NUMBER_COLORS = {
  1: 'text-blue-400',
  2: 'text-emerald-400',
  3: 'text-red-400',
  4: 'text-indigo-300',
  5: 'text-amber-500',
  6: 'text-cyan-300',
  7: 'text-pink-400',
  8: 'text-slate-300',
}

function makeEmptyBoard(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacent: 0,
    })),
  )
}

function neighbors(r, c, rows, cols) {
  const out = []
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue
      const nr = r + dr
      const nc = c + dc
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) out.push([nr, nc])
    }
  }
  return out
}

// Place mines after the first click, keeping the clicked cell (and its
// neighbors) mine-free so the opening is never an instant loss.
function placeMines(board, rows, cols, mines, safeR, safeC) {
  const b = board.map((row) => row.map((cell) => ({ ...cell })))
  const forbidden = new Set([`${safeR},${safeC}`])
  neighbors(safeR, safeC, rows, cols).forEach(([r, c]) => forbidden.add(`${r},${c}`))

  let placed = 0
  const maxMines = Math.min(mines, rows * cols - forbidden.size)
  while (placed < maxMines) {
    const r = Math.floor(Math.random() * rows)
    const c = Math.floor(Math.random() * cols)
    if (b[r][c].mine || forbidden.has(`${r},${c}`)) continue
    b[r][c].mine = true
    placed++
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (b[r][c].mine) continue
      b[r][c].adjacent = neighbors(r, c, rows, cols).filter(
        ([nr, nc]) => b[nr][nc].mine,
      ).length
    }
  }
  return b
}

function floodReveal(board, r, c, rows, cols) {
  const b = board.map((row) => row.map((cell) => ({ ...cell })))
  const stack = [[r, c]]
  while (stack.length) {
    const [cr, cc] = stack.pop()
    const cell = b[cr][cc]
    if (cell.revealed || cell.flagged) continue
    cell.revealed = true
    if (cell.adjacent === 0 && !cell.mine) {
      neighbors(cr, cc, rows, cols).forEach(([nr, nc]) => {
        if (!b[nr][nc].revealed) stack.push([nr, nc])
      })
    }
  }
  return b
}

function countFlags(board) {
  let n = 0
  board.forEach((row) => row.forEach((cell) => cell.flagged && n++))
  return n
}

function hasWon(board, mines) {
  let revealed = 0
  let total = 0
  board.forEach((row) =>
    row.forEach((cell) => {
      total++
      if (cell.revealed && !cell.mine) revealed++
    }),
  )
  return revealed === total - mines
}

const initialState = (diffKey) => {
  const { rows, cols } = DIFFICULTIES[diffKey]
  return {
    diffKey,
    board: makeEmptyBoard(rows, cols),
    status: 'ready', // ready | playing | won | lost
    started: false,
  }
}

function reducer(state, action) {
  const { rows, cols, mines } = DIFFICULTIES[state.diffKey]

  switch (action.type) {
    case 'reset':
      return initialState(action.diffKey ?? state.diffKey)

    case 'reveal': {
      const { r, c } = action
      if (state.status === 'won' || state.status === 'lost') return state
      let board = state.board
      let started = state.started

      // Seed mines on first reveal.
      if (!started) {
        board = placeMines(board, rows, cols, mines, r, c)
        started = true
      }

      const cell = board[r][c]
      if (cell.revealed || cell.flagged) return state

      if (cell.mine) {
        const revealedAll = board.map((row) =>
          row.map((cel) => ({ ...cel, revealed: cel.mine ? true : cel.revealed })),
        )
        revealedAll[r][c].exploded = true
        return { ...state, board: revealedAll, started, status: 'lost' }
      }

      const next = floodReveal(board, r, c, rows, cols)
      const status = hasWon(next, mines) ? 'won' : 'playing'
      // On win, auto-flag remaining mines for a tidy finish.
      const finalBoard =
        status === 'won'
          ? next.map((row) =>
              row.map((cel) => (cel.mine ? { ...cel, flagged: true } : cel)),
            )
          : next
      return { ...state, board: finalBoard, started, status }
    }

    case 'flag': {
      const { r, c } = action
      if (state.status === 'won' || state.status === 'lost') return state
      const cell = state.board[r][c]
      if (cell.revealed) return state
      const board = state.board.map((row, ri) =>
        row.map((cel, ci) =>
          ri === r && ci === c ? { ...cel, flagged: !cel.flagged } : cel,
        ),
      )
      return { ...state, board, started: state.started }
    }

    default:
      return state
  }
}

export default function Minesweeper() {
  const [flagMode, setFlagMode] = useReducer((m) => !m, false)
  const [state, dispatch] = useReducer(reducer, 'beginner', initialState)
  const { board, status, diffKey } = state
  const { rows, cols, mines } = DIFFICULTIES[diffKey]

  // Timer
  const [seconds, tick] = useReducer((s, a) => (a === 'reset' ? 0 : s + 1), 0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (status === 'playing') {
      if (!timerRef.current) {
        timerRef.current = setInterval(() => tick('inc'), 1000)
      }
    } else {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    return () => clearInterval(timerRef.current)
  }, [status])

  const flagsUsed = useMemo(() => countFlags(board), [board])
  const minesLeft = mines - flagsUsed

  const reset = useCallback(
    (key) => {
      tick('reset')
      clearInterval(timerRef.current)
      timerRef.current = null
      dispatch({ type: 'reset', diffKey: key })
    },
    [],
  )

  const onCellClick = (r, c) => {
    if (flagMode) dispatch({ type: 'flag', r, c })
    else dispatch({ type: 'reveal', r, c })
  }

  const onCellContext = (e, r, c) => {
    e.preventDefault()
    dispatch({ type: 'flag', r, c })
  }

  const face = status === 'won' ? '😎' : status === 'lost' ? '💀' : '🙂'

  return (
    <div className="mx-auto w-full max-w-fit">
      {/* Difficulty selector */}
      <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
        {Object.entries(DIFFICULTIES).map(([key, d]) => (
          <button
            key={key}
            type="button"
            onClick={() => reset(key)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              key === diffKey
                ? 'bg-accent-500 text-white'
                : 'bg-ink-700 text-slate-300 hover:bg-ink-600'
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Status bar */}
      <div className="mb-3 flex items-center justify-between gap-4 rounded-lg border border-ink-600/60 bg-ink-800 px-4 py-2">
        <span className="min-w-[3.5rem] font-mono text-lg font-bold text-accent-300">
          💣 {String(Math.max(minesLeft, 0)).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={() => reset(diffKey)}
          aria-label="New game"
          className="grid h-9 w-9 place-items-center rounded-md bg-ink-700 text-xl hover:bg-ink-600"
        >
          {face}
        </button>
        <span className="min-w-[3.5rem] text-right font-mono text-lg font-bold text-accent-300">
          ⏱ {String(seconds).padStart(3, '0')}
        </span>
      </div>

      {/* Touch helper */}
      <div className="mb-3 flex items-center justify-center">
        <button
          type="button"
          onClick={setFlagMode}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            flagMode
              ? 'bg-amber-500 text-black'
              : 'bg-ink-700 text-slate-300 hover:bg-ink-600'
          }`}
          aria-pressed={flagMode}
        >
          🚩 Flag mode {flagMode ? 'ON' : 'OFF'}
          <span className="hidden text-slate-400 sm:inline">
            (or right-click to flag)
          </span>
        </button>
      </div>

      {/* Board */}
      <div className="overflow-x-auto pb-2">
        <div
          className="mx-auto grid w-max gap-px rounded-lg bg-ink-600 p-1"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => {
              const key = `${r}-${c}`
              const base =
                'h-8 w-8 select-none text-sm font-bold flex items-center justify-center transition-colors'
              if (!cell.revealed) {
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => onCellClick(r, c)}
                    onContextMenu={(e) => onCellContext(e, r, c)}
                    disabled={status === 'won' || status === 'lost'}
                    className={`${base} rounded-sm bg-ink-700 hover:bg-ink-600 active:bg-ink-500 disabled:hover:bg-ink-700`}
                  >
                    {cell.flagged ? '🚩' : ''}
                  </button>
                )
              }
              // Revealed
              return (
                <div
                  key={key}
                  className={`${base} rounded-sm ${
                    cell.exploded ? 'bg-red-500/80' : 'bg-ink-900'
                  }`}
                >
                  {cell.mine ? (
                    '💣'
                  ) : cell.adjacent > 0 ? (
                    <span className={NUMBER_COLORS[cell.adjacent]}>{cell.adjacent}</span>
                  ) : (
                    ''
                  )}
                </div>
              )
            }),
          )}
        </div>
      </div>

      {/* Result banner */}
      {(status === 'won' || status === 'lost') && (
        <div
          className={`mt-4 rounded-lg border px-4 py-3 text-center text-sm font-semibold ${
            status === 'won'
              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
              : 'border-red-500/40 bg-red-500/10 text-red-300'
          }`}
        >
          {status === 'won'
            ? `Cleared in ${seconds}s! Nicely done.`
            : 'Boom — you hit a mine.'}{' '}
          <button
            type="button"
            onClick={() => reset(diffKey)}
            className="underline underline-offset-2 hover:no-underline"
          >
            Play again
          </button>
        </div>
      )}
    </div>
  )
}
