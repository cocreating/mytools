on run {input, parameters}
    set fileList to ""
    repeat with currentFile in input
        set fileList to fileList & " " & quoted form of (POSIX path of currentFile)
    end repeat
    tell application "Terminal"
        activate
        do script "~/.local/bin/wav2mp3" & fileList
    end tell
    return input
end run
