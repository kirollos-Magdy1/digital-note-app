# digital-note-app

This is a simple `Node js` console application. each note has a title and body and they are saved in a `JSON` file.
User can implement CRUD operations from the console using `Yargs` package

### Dependences 
1. install node js from https://nodejs.org/en/download/
2. install Yars package, head to terminal and run the command `npm install yargs` 

## How to use it
* Type the following commands in terminal to implement each operation
-----------
## Create note

`node app.js add --title="mytitle" --body="mybody"`
-----------

------
## Read notes

`node app.js show`
-------------

-----------
## Update note
updating a note's body only by selecting title name

`node app.js update --title="mytitle" --body="newBody"`

updating both title and body

`node app.js update --title="mytitle" --body="newBody --newTitle="myNewTitle"`

-----------

## Delete note
`node app.js remove --title="mytitle"`

-----------
