# Known bugs

### You can nudge the windows by quickly moving the corners.
  Not fixed, I have no idea how to fix this.
  It is caused by the way the minimum width and height is implemented.

### If a window accesses directly the active or minimised window list, the program will crash with an error
  You will need to check if the object is there before accessing it.

  This is due to a "bug" (that I'm not planning on fixing), when a window is deleted, both the update and the rendering function will fire once more
