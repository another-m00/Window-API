# Known bugs

### You can nudge the windows by quickly moving the corners.
  Not fixed, I have no idea how to fix this.
  It is caused by the way the minimum width and height is implemented.

### If you drag the window out of the screen it misbehaves
  Currently if one of the coordinates of the window position is negative, the window jumps to the other side of the screen, making it barely reachable.
  This is caused by the rendering code that filters invalid positions. If it's demanded I'll change this to allow the windows to be dragged offscreen.

  *Note:* there is no way implemented to bring back a window that is completely offscreen. You might add ths function.

### Clicking the fullscreen button on an already fullscreen window won't reset the window's previous size
  This will be fixed sooner or later.

### The code is a complete mess
   Yes. I tried to write a code that is somewhat efficient, and small. I may have failed.

### A window without calling cls won't work
  This is because the window doesnt store it's inner drawings, if you drag around a window that does'nt call cls() in each rendering frame, the already drawn parts won't move or will conflict with the other windows. Basically a whole reseign of the api is needed to implement the memory copying.