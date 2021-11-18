# Web3JS 

<img src="./gitResources/1.png" align="right"
     alt="Web3JS  logo by Masood Zafar" width="150" height="90">

A backend API built in Hapijs that uses Web3Js to talk to Ethereum Blockchain and serves as a template for creating decentralized web apps.

* **Deposit** amount using smart contract's built-in function.
* **Withdraw** amount using smart contract's built-in function.
* **Approve** amount using smart contract's built-in function.
* **Get** balance of a token using web3js functions.
* **Get** list of tokens available on a contract.

## Technologies used in this project:

<img align="left" alt="JavaScript" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />
<img align="left" alt="Node.js" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />
<img src="./gitResources/5.png" img align="left" alt="Typescript" width="26px">
<img src="./gitResources/2.png" img align="left" alt="Hapi.js" width="26px">
<img src="./gitResources/3.png" img align="left" alt="postgres.js" width="26px">
<img src="./gitResources/4.png" img align="left" alt="sequelize.js" width="26px">


<br />

---

## Getting started:

To get started first go to the **server directory** and run the following command to install the required modules from npm: 

```shell
npm install
```
Then build the project using the following command:

```shell
npm run build
```

After building the project make sure to go to the directory **build** and then **server** and then **src** and open the **app.js** file and comment out the **createTables** and **connectSequelize**. Now run the project using the command:

```shell
npm run start
```
Now stop the server and comment out **createDatabase** and **connectSequelize** and uncomment  **createTables** run the start command written above. After the database and tables are created stop the server and comment out **createDatabase** and **createTables** and uncomment **connectSequelize** and run the server again.

To generate documention for the project run the command:

```shell
npm run doc
```

---

## Note

Feel free to download the project and build upon it. You can add
new features, refactor the code if you'd like. Happy coding!