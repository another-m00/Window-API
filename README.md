*This documentation is work in progress*


# Window-API
This is a Window API for TIC80 which grants users/players freely customizable windows and programmers a relatively easy proramming interface.

**This API is not released yet. Currently it's in the stage of `working prototype`. The code will be golfed down to take up the least space possible.**
*The API needs to be tested before releasing*

## Functions
I tried to make the api as easy-to-use as possible so the basics you need to know to are 3 functions: `render()` `new Window()` and `windows.add()`.
- render() handles everything. You only need to call it in every `TIC()` cycle once. Render does not accept parameters.
- new Window() is the Window object constructor. You can find more info on that later.
- windows.add(window object) is the same as `windows.active.push(<Window object>)`. It registers and starts rendering a window object on the next cycle.

## Windows' scope
Each window accesses it's own TIC API. That means, each API command is customised and translated to draw on the window only

## The Window() constructor and window data
You can access the window's data in the `this` keyword. This makes dynamic windows possible and keep their context separated.

