Drop Titan background video clips in this folder.

RULE: filename must exactly match the Titan's `slug` in the database, as an .mp4 file.
Example: the Armored Titan's slug is "armored-titan" -> file must be named armored-titan.mp4

If a Titan has no matching file here, that Titan's detail page will just
fall back to showing its portrait image instead (nothing breaks).

Expected filenames (13 Titans):
founding-titan.mp4
attack-titan.mp4
colossal-titan.mp4
armored-titan.mp4
female-titan.mp4
beast-titan.mp4
jaw-titan.mp4
cart-titan.mp4
war-hammer-titan.mp4
pure-titan.mp4
abnormal-titan.mp4
smiling-titan.mp4
wall-titan.mp4

TIP: keep each clip small (a few MB, ~10-15s, no audio track, 720p is plenty)
since it autoplays and loops on page load. Ask Claude to batch-optimize a
folder of raw clips down to web-friendly size if you have a lot to process.
