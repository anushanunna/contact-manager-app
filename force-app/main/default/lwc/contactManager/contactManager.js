import { LightningElement, wire, track } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import deleteContact from '@salesforce/apex/ContactController.deleteContact';
import { refreshApex } from '@salesforce/apex';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ContactManager extends LightningElement {
    @track contacts;
    @track selectedContactId;
    @track isModalOpen = false;

    @wire(getContacts)
    wiredContacts(result) {
        this.contacts = result.data;
        this.wiredResult = result;
    }

    handleNewContact() {
        this.selectedContactId = null;
        this.isModalOpen = true;
    }

    handleEdit(event) {
        this.selectedContactId = event.target.dataset.id;
        this.isModalOpen = true;
    }

    handleDelete(event) {
        deleteContact({ contactId: event.target.dataset.id })
            .then(() => {
                this.showToast('Success', 'Contact Deleted', 'success');
                return refreshApex(this.wiredResult);
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    handleModalSuccess() {
        this.isModalOpen = false;
        return refreshApex(this.wiredResult);
    }

    closeModal() {
        this.isModalOpen = false;
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}