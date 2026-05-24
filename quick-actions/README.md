# Cómo Instalar las Acciones Rápidas (Quick Actions)

Para poder hacer "Clic derecho -> Convertir a WebM" directamente en el Finder, sigue estos sencillos pasos para usar Automator en macOS:

1. Abre **Automator** (cmd + espacio -> Automator).
2. Haz clic en **Nuevo Documento** y selecciona **Acción Rápida** (Quick Action).
3. Arriba a la derecha, configura:
   - "El flujo de trabajo recibe la selección actual de: **archivos de película**" (o archivos de imagen/audio según la herramienta).
   - "en: **Finder**".
4. En el buscador de la izquierda, busca **Ejecutar AppleScript** (Run AppleScript) y arrástralo a la derecha.
5. Pega el siguiente código (asegúrate de borrar el contenido anterior):

```applescript
on run {input, parameters}
    tell application "Terminal"
        activate
        set fileList to ""
        repeat with currentFile in input
            set fileList to fileList & " " & quoted form of (POSIX path of currentFile)
        end repeat
        do script "~/.local/bin/vid2webm" & fileList
    end tell
    return input
end run
```

6. Guárdalo (cmd + S) con el nombre **"Convertir a WebM"**.

¡Listo! Ahora, si vas al Finder y haces clic derecho en cualquier video `.mp4`, verás la opción "Convertir a WebM" en el menú Acciones Rápidas.

*(Puedes hacer lo mismo para `img2webp` (usando archivos de imagen) y `wav2mp3` (usando archivos de audio), solo cambia la ruta `~/.local/bin/vid2webm` en el script por la herramienta correspondiente).*
