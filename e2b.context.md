

Documentation
Dashboard
GitHub (6,300+ ⭐️)
lafoste4@asu.edu

Running your first Sandbox
This guide will show you how to start your first E2B Sandbox.

1. Create E2B account
Every new E2B account get $100 in credits. You can sign up here.

2. Set your environment variables
Navigate to the E2B Dashboard.
Copy your API key.
Paste your E2B API key into your .env file.
.env
E2B_API_KEY=e2b_***

Copy
Copied!
3. Install E2B SDK
Install the E2B SDK to your project by running the following command in your terminal.


JavaScript & TypeScript

Python
Terminal
npm i @e2b/code-interpreter dotenv

Copy
Copied!
4. Write code for starting Sandbox
We'll write the minimal code for starting Sandbox, executing Python inside it and listing all files inside the root directory.


JavaScript & TypeScript

Python
index.ts
import 'dotenv/config'
import { Sandbox } from '@e2b/code-interpreter'

const sbx = await Sandbox.create() // By default the sandbox is alive for 5 minutes
const execution = await sbx.runCode('print("hello world")') // Execute Python inside the sandbox
console.log(execution.logs)

const files = await sbx.files.list('/')
console.log(files)

Copy
Copied!
5. Start your first E2B Sandbox
Run the code with the following command:


JavaScript & TypeScript

Python
Terminal
npx tsx ./index.ts



Documentation
Dashboard
GitHub (6,300+ ⭐️)
lafoste4@asu.edu

Upload & downloads files
E2B Sandbox allows you to upload and downloads file to and from the Sandbox.

An alternative way to get your data to the sandbox is to create a custom sandbox template.

Upload file

JavaScript & TypeScript

Python
import { Sandbox } from '@e2b/code-interpreter'

// Read local file
const content = fs.readFileSync('/local/file')

const sbx = await Sandbox.create()
// Upload file to the sandbox to path '/home/user/my-file'
await sbx.files.write('/home/user/my-file', content)

Copy
Copied!
Upload multiple files
Currently, if you want to upload multiple files, you need to upload each one of the separately. We're working on a better solution.


JavaScript & TypeScript

Python
import { Sandbox } from '@e2b/code-interpreter'

// Read local files
const fileA = fs.readFileSync('/local/file/a')
const fileB = fs.readFileSync('/local/file/b')

const sbx = await Sandbox.create()
// Upload file A to the sandbox to path '/home/user/my-file-a'
await sbx.files.write('/home/user/my-file-a', content)
// Upload file B to the sandbox to path '/home/user/my-file-b'
await sbx.files.write('/home/user/my-file-b', content)

Copy
Copied!
Upload directory
We currently don't support an easy way to upload a whole directory. You need to upload each file separately.

We're working on a better solution.

Download file
To download a file, you need to first get the file's content and then write it to a local file.


JavaScript & TypeScript

Python
import { Sandbox } from '@e2b/code-interpreter'

const sbx = await Sandbox.create()
// Download file from the sandbox to path '/home/user/my-file'
const content = await sbx.files.read('/home/user/my-file')
// Write file to local path
fs.writeFileSync('/local/file', content)

Copy
Copied!
Download multiple files
To download multiple files, you need to download each one of them separately from the sandbox.

We're working on a better solution.


JavaScript & TypeScript

Python
import { Sandbox } from '@e2b/code-interpreter'

const sbx = await Sandbox.create()
// Download file A from the sandbox to path '/home/user/my-file'
const contentA = await sbx.files.read('/home/user/my-file-a')
// Write file A to local path
fs.writeFileSync('/local/file/a', contentA)

// Download file B from the sandbox to path '/home/user/my-file'
const contentB = await sbx.files.read('/home/user/my-file-b')
// Write file B to local path
fs.writeFileSync('/local/file/b', contentB)

Copy
Copied!
Download directory
We currently don't support an easy way to download a whole directory. You need to download each file separately.



Documentation
Dashboard
GitHub (6,300+ ⭐️)
lafoste4@asu.edu

Install custom packages
There are two ways to install custom packages in the E2B Sandbox.

Create custom sandbox with preinstalled packages.
Install packages during the sandbox runtime.
Create a custom sandbox
Use this option if you know beforehand what packages you need in the sandbox.

Prerequisites:

E2B CLI
Docker running
Custom sandbox template is a Docker image that we automatically convert to a sandbox that you can then start with our SDK.
1. Install E2B CLI

Install the E2B CLI globally on your machine with NPM.

Terminal
npm i -g @e2b/cli

Copy
Copied!
2. Login to E2B CLI

Before you can create a custom sandbox, you need to login to E2B CLI.

Terminal
e2b auth login

Copy
Copied!
2. Initialize a sandbox template

Terminal
e2b sandbox template init

Copy
Copied!
3. Specify the packages you need in e2b.Dockerfile

Edit the E2B Dockerfile to install the packages you need.

You need to use the e2bdev/code-interpreter:latest base image.
e2b.Dockerfile
FROM e2bdev/code-interpreter:latest

RUN pip install cowsay
RUN npm install cowsay

Copy
Copied!
4. Build the sandbox template

Run the following command to build the sandbox template.

Terminal
e2b sandbox template build -c "/root/.jupyter/start-up.sh"

Copy
Copied!
This will take a while, as it convert the Docker image to a sandbox which is a small VM. At the end of the process you will see the sandbox ID like this:

Running postprocessing. It can take up to few minutes.

Postprocessing finished.

✅ Building sandbox template YOUR_TEMPLATE_ID finished.

Copy
Copied!
5. Start your custom sandbox

Now you can pass the template ID to the SDK to start your custom sandbox.


JavaScript & TypeScript

Python
import { Sandbox } from '@e2b/code-interpreter'

const sbx = Sandbox.create({
  template: 'YOUR_TEMPLATE_ID',
})

Copy
Copied!
Install packages during the sandbox runtime
Use this option if don't know beforehand what packages you need in the sandbox. You can install packages with the package manager of your choice.

The packages installed during the runtime are available only in the running sandbox instance. When you start a new sandbox instance, the packages are not be available.
1. Install Python packages with PIP


JavaScript & TypeScript

Python
import { Sandbox } from '@e2b/code-interpreter'

const sbx = Sandbox.create()
sbx.commands.run('pip install cowsay') // This will install the cowsay package
sbx.runCode(`
  import cowsay
  cowsay.cow("Hello, world!")
`)

Copy
Copied!
2. Install Node.js packages with NPM


JavaScript & TypeScript

Python
import { Sandbox } from '@e2b/code-interpreter'

const sbx = Sandbox.create()
sbx.commands.run('npm install cowsay') // This will install the cowsay package
sbx.runCode(`
  const cowsay = require('cowsay')
  console.log(cowsay.say({ text: 'Hello, world!' }))
`, { language: 'javascript' })



Documentation
Dashboard
GitHub (6,300+ ⭐️)
lafoste4@asu.edu

Sandbox lifecycle
When you start the sandbox, it stays alive for 5 minutes by default but you can change it by passing the timeout parameter. After the time passes, the sandbox will be automatically shutdown.


JavaScript & TypeScript

Python
import { Sandbox } from '@e2b/code-interpreter'

// Create sandbox with and keep it running for 60 seconds.
// 🚨 Note: The units are milliseconds.
const sandbox = await Sandbox.create({
  timeoutMs: 60_000, 
})

Copy
Copied!
Change sandbox timeout during runtime
You can change the sandbox timeout when it's running by calling the the setTimeout method in JavaScript or set_timeout method in Python.

When you call the set timeout method, the sandbox timeout will be reset to the new value that you specified.

This can be useful if you want to extend the sandbox lifetime when it's already running. You can for example start with a sandbox with 1 minute timeout and then periodically call set timout every time user interacts with it in your app.


JavaScript & TypeScript

Python
import { Sandbox } from '@e2b/code-interpreter'

// Create sandbox with and keep it running for 60 seconds.
const sandbox = await Sandbox.create({ timeoutMs: 60_000 })

// Change the sandbox timeout to 30 seconds.
// 🚨 The new timeout will be 30 seconds from now.
await sandbox.setTimeout(30_000)

Copy
Copied!
Shutdown sandbox
You can shutdown the sandbox any time even before the timeout is up by calling the kill method.


JavaScript & TypeScript

Python
import { Sandbox } from '@e2b/code-interpreter'

// Create sandbox with and keep it running for 60 seconds.
const sandbox = await Sandbox.create({ timeoutMs: 60_000 })

// Shutdown the sandbox immediately.
await sandbox.kill()



Documentation
Dashboard
GitHub (6,300+ ⭐️)
lafoste4@asu.edu

Read & write files
Reading files
You can read files from the sandbox filesystem using the files.reado() method.


JavaScript & TypeScript

Python
import { Sandbox } from '@e2b/code-interpreter'
const sandbox = await Sandbox.create()
const fileContent = await sandbox.files.read('/path/to/file')

Copy
Copied!
Writing files
You can write files to the sandbox filesystem using the files.write() method.


JavaScript & TypeScript

Python
import { Sandbox } from '@e2b/code-interpreter'
const sandbox = await Sandbox.create()
await sandbox.files.write('/path/to/file', 'file content')



Documentation
Dashboard
GitHub (6,300+ ⭐️)
lafoste4@asu.edu

Watch sandbox directory for changes
You can watch a directory for changes using the files.watchDir() method in JavaScript and files.watch_dir() method in Python.


JavaScript & TypeScript

Python
import { Sandbox, FilesystemEventType } from '@e2b/code-interpreter'

const sandbox = await Sandbox.create()
const dirname = '/home/user'

// Start watching directory for changes
const handle = await sandbox.files.watchDir(dirname, async (event) => { 
  console.log(event) 
  if (event.type === FilesystemEventType.WRITE) { 
    console.log(`wrote to file ${event.name}`) 
  } 
}) 

// Trigger file write event
await sandbox.files.write(`${dirname}/my-file`, 'hello')



Documentation
Dashboard
GitHub (6,300+ ⭐️)
lafoste4@asu.edu

Upload data to sandbox
You can upload data to the sandbox using the files.write() method.


JavaScript & TypeScript

Python
import fs from 'fs'
import { Sandbox } from '@e2b/code-interpreter'

const sandbox = await Sandbox.create()

// Read file from local filesystem
const content = fs.readFileSync('/local/path')
// Upload file to sandbox
await sandbox.files.write('/path/in/sandbox', content)



Documentation
Dashboard
GitHub (6,300+ ⭐️)
lafoste4@asu.edu

Download data from sandbox
You can download data from the sandbox using the files.read() method.


JavaScript & TypeScript

Python
import fs from 'fs'
import { Sandbox } from '@e2b/code-interpreter'

const sandbox = await Sandbox.create()

// Read file from sandbox
const content = await sandbox.files.read('/path/in/sandbox')
// Write file to local filesystem
fs.writeFileSync('/local/path', content)

Running commands in sandbox
You can run terminal commands inside the sandbox using the commands.run() method.


JavaScript & TypeScript

Python
import { Sandbox } from '@e2b/code-interpreter'

const sandbox = await Sandbox.create()
const result = await sandbox.commands.run('ls -l')
console.log(result)