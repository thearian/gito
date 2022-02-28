# Gito - a git hook for more split commiting

> this repo is in development and the first version has not been released

## Why use gito? (the problem)
Git can not tract changes in between commits. That's where gito comes in.  
Gito simply commits every change saved on disk on a **different git history** *-as default-*
and can roll back to any point given in time if your text editor can't.

## Is it safe? (the challenge)
Gito has different architectures for different usage

### Orphan Arch -set as default-
This arch is by far the safest solution. It generates a completely different git history
and tracks every thing in there. *You can have a different history in the same repo*

### Git-inside
If you want you can demand gito to use your history but it is not recommended

### Self-host
You can track a directory even if it doesn't already have a `.git` dir with this arch
> but it will generate a `.git` dir