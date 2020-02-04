async function main() {

	if (process.argv.length != 3) {
		console.log(`Usage ${process.argv[0]} CardSlotsATMSlots`);
		return 1;
	}

	let cardSlots = process.argv[1];
	let atmSlots = process.argv[0];

	let network = new Network();
	let myBank = new BankProxy(network);
	let a1 = new Atm(myBank, 'ATM1', 8500);

	await al.activate();
	myBank.remove();
	al.remove();
}

main();