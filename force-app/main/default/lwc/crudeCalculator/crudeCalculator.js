import { LightningElement, track } from 'lwc';

export default class ModalCalculator extends LightningElement 
{
    @track result = 0;
    inputs = [0, 0, 0]; 

    handleChange(event) 
    {
        try 
        {
            const { name, value } = event.target;
            const index = parseInt(name.replace('input', '')) - 1;
            this.inputs[index] = parseFloat(value);
            this.calculateResult();
            //console.log('this.inputs ::: ' , this.inputs);
        } 
        catch (error) 
        {
            console.error('Error in handleChange:', error);
        }
    }

    calculateResult() 
    {
        try 
        {
            const [input1, input2, input3] = this.inputs;
                
            if (!input1 || !input2 || !input3 || isNaN(input1) || isNaN(input2) || isNaN(input3) || input3 === 0) 
            {
                this.result = 0;
            } 
            else 
            {
                const rawResult = (input1 * input3) / input2;
                this.result = rawResult.toFixed(2);
            }
        } 
        catch (error) 
        {
            console.error('Error in calculateResult:', error);
            this.result = 'Error occurred';
        }
    }
    
    handleClear() {
        this.template.querySelectorAll('lightning-input').forEach(element => {
            element.value = null;
        });
        this.result = 0;
    }

    closeModal(event) {
        this.dispatchEvent(new CustomEvent('closemodal'));
    }
}