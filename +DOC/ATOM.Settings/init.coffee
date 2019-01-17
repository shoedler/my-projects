# Your init script
# S. Schödler, 10.12.2018, 09:54:29
# -------------------------------
# Atom will evaluate this file each time a new window is opened. It is run
# after packages are loaded/activated and after the previous editor state
# has been restored.
#
# atom.workspace.observeTextEditors (editor) ->
#   editor.onDidSave ->
#     console.log "Saved! #{editor.getPath()}"

atom.commands.add 'atom-workspace', 'find-and-replace:show-and-find-next-selected': ->
    atom.commands.dispatch(atom.views.getView(atom.workspace), "project-find:show");
    atom.commands.dispatch(atom.views.getView(atom.workspace), "find-and-replace:find-next-selected");

atom.commands.add 'atom-workspace', 'find-and-replace:show-and-find-previous-selected': ->
    atom.commands.dispatch(atom.views.getView(atom.workspace), "project-find:show");
    atom.commands.dispatch(atom.views.getView(atom.workspace), "find-and-replace:find-previous-selected");

atom.commands.add 'atom-workspace', 'markdown-preview:toggle-fullscreen': ->
    atom.commands.dispatch(atom.views.getView(atom.workspace), "markdown-preview:toggle");
    sleep 500;
    atom.commands.dispatch(atom.views.getView(atom.workspace), "window:focus-pane-on-right");
    atom.commands.dispatch(atom.views.getView(atom.workspace), "pane:move-active-item-to-top-of-stack");
    atom.commands.dispatch(atom.views.getView(atom.workspace), "tabs:close-tab");
    atom.commands.dispatch(atom.views.getView(atom.workspace), "pane:reopen-closed-item");
sleep = (ms) ->
  start = new Date().getTime()
  continue while new Date().getTime() - start < ms
