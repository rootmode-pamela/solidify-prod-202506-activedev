import { LightningElement } from 'lwc';
import LightningConfirm from 'lightning/confirm';

export default class QuickBlendedRate extends LightningElement {

    rows = [{ id: 1, description: '', amount: '', interestRate: '', isLast: false }];
    uniqueId = 1;
    isFirstRow = true;
    totalAmount = 0;
    blendedRate = 0;
    addRowLengthExeed = false;
    
    connectedCallback() {
        this.rows[0].isLast = true;
    }
    
    addRow() {
        if (this.rows.length < 10) {
            this.uniqueId++;
            this.rows[this.rows.length - 1].isLast = false;
            this.rows = [...this.rows, { id: this.uniqueId, description: '', amount: '', interestRate: '', isLast: true }];
        } else {
            this.addRowLengthExeed = true;
            console.log("Maximum number of rows (10) reached.");
        }
    }    
    
    async handleDeleteRow(event) {

        const result = await LightningConfirm.open({
            label: 'Are you you sure?',
            message: 'Are you sure you want to delete this row?',
            theme: 'error'
        });

        if (result) {
            const index = event.target.dataset.index;
            this.rows.splice(index, 1);
            if (this.rows.length > 0) {
                this.rows[this.rows.length - 1].isLast = true;
                this.addRowLengthExeed = false;
            }
            this.calculatAmount();
            this.calculatInterest();
            this.rows = [...this.rows];
        }
    }

    handleAmountChange(event) {
        const { index, field } = event.target.dataset;
        let value = event.target.value;

        if (value) {
            value = parseFloat(value.replace(/[^0-9.-]/g, ''));
        }

        this.rows[index][field] = value;
        this.calculatAmount();
    }

    handleInterestChange(event) {
        const { index, field } = event.target.dataset;
        let value = event.target.value;

        if (value) {
            value = parseFloat(value.replace(/[^0-9.]/g, ''));
        }

        this.rows[index][field] = value;
        this.calculatInterest();
    }

    calculatAmount() {
        let totalAmount = 0;

        this.rows.forEach(row => {
            if (row.amount === 'NaN' || row.amount === undefined || row.amount === null || row.amount === '') 
            {
                row.amount = 0;
            }
            totalAmount += parseFloat(row.amount);
        });

        this.totalAmount = totalAmount;
    }

    calculatInterest() {
        let totalInterestRate = 0;
        this.rows.forEach(row => {
            if (row.interestRate === 'NaN' || row.interestRate === undefined || row.interestRate === null || row.interestRate === '') 
            {
                row.interestRate = 0;
            }
            totalInterestRate += parseFloat(row.interestRate);

        });

        this.blendedRate = (totalInterestRate / this.rows.length).toFixed(2);
    }

    updateLastRowProperty(isLast) {
        const lastRowIndex = this.rows.length - 1;
        this.rows[lastRowIndex].isLast = isLast;
    }

    closeModal() {
        this.dispatchEvent(new CustomEvent('closemodal'));
    }
}