import { PhysicalCardReader } from "./PhysicalCardReader";

export class CardReader {
	private cardReader: PhysicalCardReader;
	private validCard: boolean;
	private account = '';
	private pin = '';

	readCard() {
		return true;
	}

	getAccount(name: string) {
		return 1;
	}
	getPin(pin: string) {
		return 1;
	}

	ejectCard() {

	}
	eatCard() {

	}

}

export class KeyPad {
	private enabled = false;
	enable() {

	}
	disable() {

	}
	getKey() {
		return 'a';
	}
}

export class DisplayScreen {
	displayMsg(msg: string) {

	}
}

export class SuperKeypad {
	private keyPad: KeyPad;
	private display: DisplayScreen;

	displayMsg(msg: string) {

	}

	verifyPin(pin: string) {
		return false;
	}

	getTransaction(account: string, pin: string) {
		return new Transaction();
	}
}

export class Transaction {

}

export class CashDispenser {
	private cashOnHand = 0;
	enoughCash(amount: number) {
		return false;
	}

	dispense(amount: number) {
		return amount;
	}
}

export class DepositSlot {
	retriveEnvelope() {
		return true;
	}
}

export class ReceiptPrinter {
	print(transList: TransactionList) {

	}
}

export class TransactionList {

}

