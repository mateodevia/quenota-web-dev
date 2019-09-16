# QueNota

Web application "Que Nota", it is a React app and have also API REST to connect to a MongoDB with information of students and some courses offer by Universidad de los Andes in Colombia.

![screenShotQueNota](https://raw.githubusercontent.com/cabeltran10/quenota-web-dev/master/img/queNota.png)

<hr>

## Running the website

Since this application is not a static application, you should have some thinks to do before you can start.

<hr>

### Requirements

#### Node.js

If you don't have Node.js installed, just go to the following page and continue with the instructions: <a href="https://nodejs.org/es/download/"> Node.js WebSite </a>

#### MongoDB

Because you are going to run it locally, you should have install MongoDB. To install it just go to: <a href="https://www.mongodb.com/download-center/community">MongoDB Community Server</a>

Once you have it installed, run:

```
mongod
```

So the local DB start and let you connect to it

### Important information

You need to create a
`.env`
file in root of the proyect, in this file you should add the
`DATABASE_URL=<yourDatabaseURL>`

For example `DATABASE_URL=mongodb://localhost/quenota`

So the program will know where is the data base. If you have access to an Atlas Cluster you can add it also there, that information will never get into a repository at least you change de `.gitignore` file.

Because is not possible to give you access to the created database, you can find a sample of poblation to the data base in the directory `rest`. It's a small sample but so you can know how to put some data. In this same directory you could find the other samples to test de API REST.

You could find all the courses used to the real database in the directory `data` in a `.csv` file if you want to try something with this proyect.

## Start

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

<hr>

## Author

Camilo Beltran and Carlos Mendoza

<hr>

## Link

<a href="https://quenota-web-dev.herokuapp.com/">QueNota Web Application</a>

<hr>

<h2>Licence</h2>
<p>The MIT License (MIT)</p>
<p>Copyright (c) Camilo Beltran and Carlos Mendoza</p>
<p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:</p>
<p>The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.</p>
<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</p>
