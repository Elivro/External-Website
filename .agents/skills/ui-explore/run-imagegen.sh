#!/usr/bin/env bash
# Generate ONE UI mockup via Codex CLI's built-in $imagegen skill.
#
#   run-imagegen.sh <prompt-file> <out-png> [ref-image ...]
#
# Codex can exit 0 having produced nothing at all (observed: empty assistant turn,
# no image, no error). Exit code is therefore worthless — we assert the PNG exists
# and retry once.
set -uo pipefail

[ $# -lt 2 ] && { echo "usage: run-imagegen.sh <prompt-file> <out-png> [ref-image ...]" >&2; exit 2; }
PROMPT="$1"; OUT="$2"; shift 2

REF=()
for f in "$@"; do REF+=(-i "$(cygpath -w "$f" 2>/dev/null || echo "$f")"); done

mkdir -p "$(dirname "$OUT")"
rm -f "$OUT"
BASE="${OUT%.png}"
WINOUT="$(cygpath -w "$OUT" 2>/dev/null || echo "$OUT")"

{
  cat "$PROMPT"
  printf '\n\nUse the imagegen skill. Save the final PNG to exactly this absolute path:\n%s\nThen print "RESULT: <path>". Do not read, create or modify any other file.\n' "$WINOUT"
} > "$BASE.prompt.md"

# The driving model only reads a screenshot and calls the image tool — the picture
# comes from the image model either way. Cheapest vision-capable tier is enough.
MODEL="${IMAGEGEN_MODEL:-gpt-5.6-luna}"

for attempt in 1 2; do
  codex exec -m "$MODEL" "${REF[@]}" - < "$BASE.prompt.md" > "$BASE.codex.log" 2>&1
  if [ -s "$OUT" ]; then
    # ~1MB per mockup; compress so agents can read it (CLAUDE.md forbids reading raw screenshots)
    ROOT="$(git rev-parse --show-toplevel 2>/dev/null)"
    [ -n "$ROOT" ] && PYTHONIOENCODING=utf-8 python "$ROOT/scripts/compress-image.py" "$OUT" >/dev/null 2>&1
    echo "OK $OUT"
    exit 0
  fi
  echo "attempt $attempt produced no image, retrying" >&2
done

echo "FAIL: no image at $OUT after 2 attempts — see $BASE.codex.log" >&2
exit 1
