# Useful LINUX Commands
### Fast User 
Run the Command before this one as Root.

`$ sudo !!`
___
Opens quick console to run a command.

`ctrl + x + e`
___

Run a command and not have it in the `$ history`.
`$  ls -l` (Leading Space)
___

Fix a really long command that got messed up. Opens last command in editor
`$ fc`
___

Make multiple folders with one command
Makes six folders:
`$ mkdir -p folder/{sub1, sub2}/{subA, subB, subC}`
Also works with numerical ranges.
Creates 10'000 folders:
`$ mkdir -p folder/{1..100}/{1..100}`
