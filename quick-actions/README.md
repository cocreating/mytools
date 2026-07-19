# Finder Quick Actions

Each `.applescript` file launches one mytools command on the files selected in Finder.

1. Open **Automator** → **New Document** → **Quick Action**.
2. Set “Workflow receives current” to the appropriate files (movie, image, or audio) in **Finder**.
3. Add **Run AppleScript**.
4. Replace its contents with a matching template from this folder.
5. Save it, e.g. “Convert to WebM”.

Templates use `~/.local/bin`, the default location created by `install.sh`. They open Terminal so progress and errors remain visible. Add flags to the `do script` line if you want a personal preset, for example `vid2webm -w 1280`.
