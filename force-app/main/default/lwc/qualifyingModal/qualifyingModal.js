import {LightningElement, track, api} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class QualifyingModal extends LightningElement {
    @api recordId;
    @api typeOfRecord = 'Scenario';
    @track isLoading;

    get isScenario() {
        return this.typeOfRecord === 'Scenario'
    }
    get isMortgage() {
        return this.typeOfRecord === 'Mortgage'
    }

    closeModal(event) {
        this.dispatchEvent(new CustomEvent('closemodal'));
    }
    handleSuccess(event) {
        this.dispatchEvent(new CustomEvent('success'));
        this.isLoading = false;
    }
    handleChangeIncome(event) {
        const idList = ["incBorrowerBase", "incCoBorrowerBase", "incBorrowerOvertime", "incCoBorrowerOvertime",
            "incBorrowerBonuses", "incCoBorrowerBonuses", "incBorrowerCommission", "incCoBorrowerCommission",
            "incBorrowerOther", "incCoBorrowerOther"];
        let inputFieldTotal = this.template.querySelector('[data-id="totalIncome"]');
        inputFieldTotal.value = this.calculateTotalByFieldNames(idList);
    }
    handleChangeIncomeMortgage(event) {
        const idListBor = ["incBorrowerBase","incBorrowerOther"];
        const idListCo = ["incCoBorrowerBase","incCoBorrowerOther"];
        const idList = ["additionalApplicantInc", "incSubjectPropertyNet",
            "encompassTotalOtherInc", "encompassTotalBaseInc"]

        let inputFieldBorTotal = this.template.querySelector('[data-id="borrowerTotalIncome"]');
        let inputFieldBorTotalVal = this.calculateTotalByFieldNames(idListBor);
        let inputFieldCoTotal = this.template.querySelector('[data-id="coBorrowerTotalIncome"]');
        let inputFieldCoTotalVal = this.calculateTotalByFieldNames(idListCo);
        let inputFieldTotal = this.template.querySelector('[data-id="totalIncome"]');
        let inputFieldTotalVal = inputFieldBorTotalVal + inputFieldCoTotalVal + this.calculateTotalByFieldNames(idList);

        inputFieldBorTotal.value = inputFieldBorTotalVal;
        inputFieldCoTotal.value = inputFieldCoTotalVal;
        inputFieldTotal.value = inputFieldTotalVal;
    }
    handleChangeIncomeMortgageItemized(event) {
        const idListOvertime = ["incBorrowerOvertime","incCoBorrowerOvertime"];
        const idListBonuses = ["incBorrowerBonuses","incCoBorrowerBonuses"];
        const idListCommission = ["incBorrowerCommission","incCoBorrowerCommission"];
        const idListOther = ["incBorrowerOtherItemized", "incCoBorrowerOtherItemized"]

        let inputFieldBorTotal = this.template.querySelector('[data-id="incTotalOvertime"]');
        let inputFieldCoTotal = this.template.querySelector('[data-id="incTotalBonuses"]');
        let inputFieldTotal = this.template.querySelector('[data-id="incTotalCommission"]');
        let inputFieldOtherTotal = this.template.querySelector('[data-id="encompassTotalOtherIncItemized"]');

        inputFieldBorTotal.value = this.calculateTotalByFieldNames(idListOvertime);
        inputFieldCoTotal.value = this.calculateTotalByFieldNames(idListBonuses);
        inputFieldTotal.value = this.calculateTotalByFieldNames(idListCommission);
        inputFieldOtherTotal.value = this.calculateTotalByFieldNames(idListOther);
    }
    handleChangeAssets(event) {
        const idList = ["scenarioLiquidAssets", "scenarioInvestments", "scenarioRetirement_Assets", "scenarioGiftFunds"];
        let inputFieldTotal = this.template.querySelector('[data-id="totalAssets"]');
        inputFieldTotal.value = this.calculateTotalByFieldNames(idList);
    }
    handleChangeAssetsMortgage(event) {
        const idList = ["bankRetirementStocks", "otherAssets", "scenarioGiftFunds"];
        let inputFieldTotal = this.template.querySelector('[data-id="totalAssets"]');
        inputFieldTotal.value = this.calculateTotalByFieldNames(idList);
    }
    handleChangeDebts(event) {
        const idList = ["primaryHousingTotal", "allOthProp", "allOtherPayment"];
        let inputFieldTotal = this.template.querySelector('[data-id="totalDebts"]');
        inputFieldTotal.value = this.calculateTotalByFieldNames(idList);
    }
    handleChangeDebtsMortgage(event) {
        const idList = ["primaryHousingTotal","subjectNegFlow", "allOthProp", "allOtherPayment"];
        let inputFieldTotal = this.template.querySelector('[data-id="totalDebts"]');
        inputFieldTotal.value = this.calculateTotalByFieldNames(idList);
    }

    calculateTotalByFieldNames(fieldList) {
        let sum = 0;
        fieldList.forEach(id => {
            let inputField = this.template.querySelector('[data-id="' + id + '"]');
            const inputValue = inputField.value;
            sum += !inputValue ? 0 : parseFloat(inputValue);
        })
        return sum;
    }

    handleSubmit(event){
        this.isLoading = true;
    }

    handleError(event) {
        this.isLoading = false;
        const evt = new ShowToastEvent({
            title: "Error!",
            message: "Record is not updated.",
            variant: "error",
        });
        this.dispatchEvent(evt);
    }
}