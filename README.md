#Introduction

The NODE version is specified to support 14.x and up as I got issues when requiring just 12.x
Please change the minimum required version to 12.x if you run into any issues. It's defined in package.json, under 'engines' and 'node'

With that said, before you start the program you should make sure you have the latest version of Yarn and Node installed,
so head to the terminal and get going by typing in `npm install` and `yarn install`.
Before you run the server it's important to run `YARN BUILD` before `YARN START. This is because the project is set up to read from bundle.js,
which doesn't exist before running this command.

The server runs on port 8080 localhost, if your preferred coding program doesn't automatically open the webpage in your browser,
just head to http://localhost:8080 after you have started the server. Make sure nothing else is occupying that port while using the webpage.

To see the tests you can type in `yarn test` in the terminal.



##Sources:

https://www.youtube.com/watch?v=Zb2mQyQRwqc --- for learning how to set up a project without 'Create a React App'

https://github.com/arcuri82/web_development_and_api_design --- for everything we learned in class. Everything that's taken
from the repository is commented in the code.