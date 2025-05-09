import { LightningElement, api } from 'lwc';

export default class ContactForm extends LightningElement {
    @api contactId;

    handleSuccess() {
        this.dispatchEvent(new CustomEvent('success'));
    }

    handleCancel() {
        this.dispatchEvent(new CustomEvent('cancel'));
    }
}