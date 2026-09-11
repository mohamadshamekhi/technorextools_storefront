# Working style — token discipline

- No preamble, no postamble, no "I'll now…". Answer, act, stop. Match the user's language.
- Don't re-read a file you just wrote/edited — the tool already confirmed it. Don't echo file
  contents back to explain a change; point to `path:line`.
- Read narrowly: `rg` / `Grep` with a pattern, or `Read` with `offset`/`limit`. Never `cat` a
  whole large file to find one thing.
- Batch independent tool calls in one turn. Skip redundant verification — run
  `typecheck`/`lint`/`build` once at the end, not after every edit.
- Don't restate the plan, the file tree, or rules from these docs back to the user.
- Prose in `cloud.md` and code comments stays terse — no marketing adjectives.
- Reach for a subagent only when the user asks; a cold spawn re-derives context.
