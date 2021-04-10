const valueinputElement = document.getElementById('valueinput');
const valuebtnElement = document.getElementById('valuebtn');
const valueElement = document.getElementById('value');

let value;
const stringinputElement = document.getElementById('stringinput');
const stringbtnElement = document.getElementById('stringbtn');
const stringElement = document.getElementById('string');

let string;
const web3 = new Web3('ws://127.0.0.1:7545');

let currentAccount;

const updateAccount = async () => currentAccount = await web3.eth.getAccounts().then(res=>res[0]);

updateAccount();

const displayValue = (num) => {
    value = num;
    valueElement.innerHTML = value;
}

const StorageContract = new web3.eth.Contract(StorageAbi, StorageAddress);

const getInitialValue = async () => {
    const value = await StorageContract.methods.getValue().call();
    displayValue(value);
}
getInitialValue();

const updateValue = async (value) => {
    console.log(currentAccount)
    await StorageContract.methods.setValue(value).send(
        {
            from: currentAccount,
            gas: 600000,
            gasPrice: 3000000000
        }
    )
}

const handleOnSubmit = () => {
    console.log(string,value);
    updatedetails(string,value);
}

const handleOnChange = (event) => {
    value = event.target.value;
    string = event.target.string;
    
    console.log(string,value);
}
var seconds = new Date().getTime() / 1000;
const listenToValueUpdate = (log) => {
    const {returnValues} = log;
    const {updater, value} = returnValues;
    alert(`ENTER YOUR NAME: ${string}. Updated by:- ${updater}.`);
    displayString(string);
    alert(`ENTER YOUR COLLEGE NAME: ${string}. Updated by:- ${updater}.`);
    displayString(string);
    alert(`ENTER YOUR PASSING YEAR: ${value}. Updated by:- ${updater}.`);
    displayValue(value);
    alert(`ENTER YOUR CONTRACT NUMBER: ${value}. Updated by:- ${updater}.`);
    displayValue(value);
    alert(`ENTER YOUR EMAIL ID: ${string}. Updated by:- ${updater}.`);
    displayString(string);

}

valueinputElement.addEventListener('change',handleOnChange);
valuebtnElement.addEventListener('click',handleOnSubmit);
StorageContract.events.ValueUpdated().on('data',listenToValueUpdate);