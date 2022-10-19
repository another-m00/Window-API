# Known bugs

### You can nudge the windows by quickly moving the corners.
  Not fixed, I have no idea how to fix this.
  It is caused by the way the minimum width and height is implemented.

### If you drag the window out of the screen it misbehaves
  Currently if one of the coordinates of the window position is negative, the window jumps to the other side of the screen, making it barely reachable.
  This is caused by the rendering code that filters invalid positions. If it's demanded I'll change this to allow the windows to be dragged offscreen.

  *Note:* there is no way implemented to bring back a window that is completely offscreen. You might add ths function.

### The code is a complete mess
   Yes. I tried to write a code that is somewhat efficient, and small. I may have failed.
