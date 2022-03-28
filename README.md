*This documentation is work in progress*


# Window-API
This is a Window API for TIC80 which grants users/players freely customizable windows and programmers a relatively easy proramming interface.
The API is backwards compatible, you can use it from TIC80 v0.80.

**This API is not released yet. Currently it's in the stage of `working prototype`. The code will be golfed down to take up the least space possible.**
*The API needs to be tested before releasing*

## Functions
I tried to make the api as easy-to-use as possible so the basics you need to know to are 3 functions: `render()` `new Window()` and `windows.add()`.
- render() handles everything. You only need to call it in every `TIC()` cycle once. Render does not accept parameters.
- new Window() is the Window object constructor. You can find more info on that later.
- windows.add(<window object>) is the same as `windows.active.push(<Window object>)`. It registers and starts rendering a window object on the next cycle.

## Windows' scope
The windows' render and update functions can freely access any global variable or set them, although the API uses a few variables, ao you can't access those from outside the Windows and they reset each cycle.
These variables are:
- m :contains the untranslated mouse output capped at screen cordinates + a helper function, not available in the update function
- w :the window object
- H :temporary variable
- K :temporary variable
- Z :temporary variable
- C :temporary variable (the count of windows in the update function)
Temporary variables are actively used by the API

## The Window() constructor and window data
You can access the window's data in the `this` keyword. This makes dynamic windows possible and keep their context separated.
The local w variable also contains the window object because that's the variable the rendering script uses.

The constructor takes 14 arguments:
`new Window(x,y,w,h,title,render,buttons,update,frame color,inner color,)`

- x *number*
    Sets the X position of the top left corner of the window. Default value is 0.
- y *number*
    Sets the Y position of the top left corner of the window. Default value is 0.
- w *number*
    Sets the width of the window. Default value is 30, and this value cannot go below 25.
- h *number*
    Sets the height of the window. Default value is 20 and it cannot go below 16.
- title *string*
    Sets the title of the window. If the title won't fit in the window it will be shortened and ... will be appended.
    The default value is an empty string.
    This value will be available in the window object under the `title` property.
- render *function*
    This is the rendering function.
    You can use it as a normal TIC80 program since every drawing command will be translated to match the window position.
    The mouse() input is translated as well. The window's code only can detect user input if the window is focused. There's a builtin frame counter for this function and it only updates when the render function is called. You can access it with `this.td`.
    The default value is a function that contiously clears the screen with color 0.
    The function is accessable at the window object's `rnd` property.
- buttons *number less than 8*
    This is a flag for the window buttons. If the bit is set the button is shown.
        0x1: Close button. If clicked on destroys the window, unless the `onclose` function returns `true`.
        0x2: Fullscreen button.
        0x4: Minimize button. If clicked on it will minimize the window. When the window is minimized it's render function is not called.
    The default value is is 1 (Close button only)
- update *function*
    This is the function that runs every rendering cycle even if the window is minimized. It does not have access to any input or drawing command when the window is minimized.
    You can check if the window is minimised by running a drawing command in the update cycle (Note that it will render if the window is not minimized.) Every drawing command return 0 if they are called while the window is minimized, nothing otherwise.
    This function has a builtin frame counter as well. It is increased every update call, and is accessable through `this.t`.
    The function is accessable with the `this.upd` property.
- resizeable *boolean*
    Defines if the window is resizeable by the user.
    If false, fixes the window size and the window cannot be resized by mouse.
    Accessable with `this.re` property.
    Default value is true.
- frame color *number less than 16, matches the palette*
    This is the frame color. If the value is over 16 only the last 4 bit will be considered as the color code.
    You can set the default value in `windows.fc`, and the default inculded in the code is `15`.
    Every new window created defaults the frame color to `window.fc`.
    Accessable through `this.fc`
- inner color *number less than 16, matches the palette*
    This is the inner and button color of the window. If the value is over 16 only the last 4 bit will be considered as the color code.
    You can set the default value in `windows.ic`, and the default inculded in the code is `13`.
    Every new window created defaults the inner color to `window.ic`.
    Accessable through `this.ic`
- onclose *function*
    An event handler function, called when the close button is pressed. If the function returns true, the window stays open.
    Accessable through `this.onclose`
- gotfocus *function*
    An event handler called when the window is focused. Accessable with `this.Fg`.
- lostfocus *function*
    An event handler called when selected window is no longer focused. Accessible with `this.Fl`.


