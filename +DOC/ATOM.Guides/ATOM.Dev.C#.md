# C# Development with Atom
A very quick overview on how to develop C# with Atom.
Mainly focused on compiling and building your projects.

## Prerequisities
- VisualStudio, the Windows SDK or just the plain `csc.exe` file
- [`process-palette`](https://github.com/morassman/process-palette) package for atom by [morassman](https://github.com/morassman)
- Basic `json` knowledge

## Implementing csc.exe
[Quick Reference](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/compiler-options/command-line-building-with-csc-exe)

Add `csc.exe` to your PATH system variable

1. Locate your csc.exe root directory. For 64 Bit it's probably `C:\Windows\Microsoft.NET\Framework64\<version>`.
  For 32 bit it's probably `C:\Windows\Microsoft.NET\Framework\<version>`. Copy this path to your clipboard.
2. Press the Windows key > "env" > Enter > Click "Environment Variables" Button
3. Under the Systemvariables double click "Path" > Enter
4. Paste your path into the next empty row > Ok > Ok > Close
5. Test by opening `cmd` and entering `csc`

Configuring the `process-palette` package

Checkout the Quick Reference for more info on the capabilities of `csc.exe`.

Here are some useful commands which I preconfigured for `process-palette`.

> These commands use a directory `build` as an output for the executables and `lib` for library files.
Currently it doesn't create them by itself if they don't exist so create them beforehand. They must be on
the same level as your source `.cs` file.

These commands include

| Command                                               | Shortcut       |
| :---------------------------------------------------- | :------------- |
| Compile a single file                                 | f5             |
| Build a single file into an executable or dll library | f8,  f9        |
| Build a project                                       | f10            |

Add these commands to your `process-palette.json` file in your `.atom` folder (`C:/Users/<username>`) to
add them to your global configuration.
They need to be added in your `commands : [` array (make sure you check the commas after each command when you already have some commands configured)

```
{
  "namespace": "C#",
  "action": "Compile File",
  "command": "csc {fileNameExt}",
  "arguments": [],
  "cwd": "{fileDirAbsPath}",
  "inputDialogs": [],
  "env": {},
  "keystroke": "f5",
  "stream": true,
  "outputTarget": "panel",
  "outputBufferSize": 80000,
  "maxCompleted": 3,
  "autoShowOutput": true,
  "autoHideOutput": true,
  "scrollLockEnabled": true,
  "singular": true,
  "promptToSave": true,
  "saveOption": "none",
  "patterns": [
    "C#"
  ],
  "successOutput": "{stdout}",
  "errorOutput": "{stdout}\n{stderr}",
  "fatalOutput": "Failed to execute : {fullCommand}\n{stdout}\n{stderr}",
  "startMessage": null,
  "successMessage": "CSC Compiled \"{fileName}\" successfully!",
  "errorMessage": "Tried to compile \"{fileName}\".\nReturned with code {exitStatus}\n{stderr}",
  "fatalMessage": "Failed to execute : {fullCommand}\n{stdout}\n{stderr}",
  "menus": [],
  "startScript": null,
  "successScript": null,
  "errorScript": null,
  "scriptOnStart": false,
  "scriptOnSuccess": false,
  "scriptOnError": false,
  "notifyOnStart": false,
  "notifyOnSuccess": true,
  "notifyOnError": true,
  "input": null
},
{
  "namespace": "C#",
  "action": "Compile All",
  "command": "csc *.cs",
  "arguments": [],
  "cwd": "{fileDirAbsPath}",
  "inputDialogs": [],
  "env": {},
  "keystroke": "f10",
  "stream": true,
  "outputTarget": "panel",
  "outputBufferSize": 80000,
  "maxCompleted": 3,
  "autoShowOutput": true,
  "autoHideOutput": true,
  "scrollLockEnabled": true,
  "singular": true,
  "promptToSave": true,
  "saveOption": "none",
  "patterns": [
    "C#"
  ],
  "successOutput": "{stdout}",
  "errorOutput": "{stdout}\n{stderr}",
  "fatalOutput": "Failed to execute : {fullCommand}\n{stdout}\n{stderr}",
  "startMessage": "",
  "successMessage": "CSC Compiled all files successfully!",
  "errorMessage": "Tried to compile all files. Returned with code {exitStatus}\n{stderr}",
  "fatalMessage": "Failed to execute : {fullCommand}\n{stdout}\n{stderr}",
  "menus": [],
  "startScript": null,
  "successScript": null,
  "errorScript": null,
  "scriptOnStart": false,
  "scriptOnSuccess": false,
  "scriptOnError": false,
  "notifyOnStart": false,
  "notifyOnSuccess": true,
  "notifyOnError": true,
  "input": null
},
{
  "namespace": "C#",
  "action": "Build as Executable",
  "command": "csc -out:build/{fileName}.exe {fileNameExt}",
  "arguments": [],
  "cwd": "{fileDirAbsPath}",
  "inputDialogs": [],
  "env": {},
  "keystroke": "f8",
  "stream": true,
  "outputTarget": "panel",
  "outputBufferSize": 80000,
  "maxCompleted": 3,
  "autoShowOutput": true,
  "autoHideOutput": true,
  "scrollLockEnabled": true,
  "singular": true,
  "promptToSave": true,
  "saveOption": "none",
  "patterns": [
    "C#"
  ],
  "successOutput": "{stdout}",
  "errorOutput": "{stdout}\n{stderr}",
  "fatalOutput": "Failed to execute : {fullCommand}\n{stdout}\n{stderr}",
  "startMessage": null,
  "successMessage": "CSC Built \"{fileName}.exe\" Executable successfully!",
  "errorMessage": "Tried to build \"{fileName}.exe\" Executable.\nReturned with code {exitStatus}\n{stderr}",
  "fatalMessage": "Failed to execute : {fullCommand}\n{stdout}\n{stderr}",
  "menus": [],
  "startScript": null,
  "successScript": null,
  "errorScript": null,
  "scriptOnStart": false,
  "scriptOnSuccess": false,
  "scriptOnError": false,
  "notifyOnStart": false,
  "notifyOnSuccess": true,
  "notifyOnError": true,
  "input": null
},
{
  "namespace": "C#",
  "action": "Build as Library (DLL)",
  "command": "csc -target:library -out:lib/{fileName}.dll {fileNameExt}",
  "arguments": [],
  "cwd": "{fileDirAbsPath}",
  "inputDialogs": [],
  "env": {},
  "keystroke": "f9",
  "stream": true,
  "outputTarget": "panel",
  "outputBufferSize": 80000,
  "maxCompleted": 3,
  "autoShowOutput": true,
  "autoHideOutput": true,
  "scrollLockEnabled": true,
  "singular": true,
  "promptToSave": true,
  "saveOption": "none",
  "patterns": [
    "C#"
  ],
  "successOutput": "{stdout}",
  "errorOutput": "{stdout}\n{stderr}",
  "fatalOutput": "Failed to execute : {fullCommand}\n{stdout}\n{stderr}",
  "startMessage": null,
  "successMessage": "CSC Built \"{fileName}.dll\" Library successfully!",
  "errorMessage": "Tried to build \"{fileName}.dll\" Library.\nReturned with code {exitStatus}\n{stderr}",
  "fatalMessage": "Failed to execute : {fullCommand}\n{stdout}\n{stderr}",
  "menus": [],
  "startScript": null,
  "successScript": null,
  "errorScript": null,
  "scriptOnStart": false,
  "scriptOnSuccess": false,
  "scriptOnError": false,
  "notifyOnStart": false,
  "notifyOnSuccess": true,
  "notifyOnError": true,
  "input": null
}
```
