public with sharing class ContactController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts() {
        return [SELECT Id, FirstName, LastName, Email, Phone FROM Contact LIMIT 100];
    }

    @AuraEnabled
    public static Contact createContact(Contact con) {
        insert con;
        return con;
    }

    @AuraEnabled
    public static Contact updateContact(Contact con) {
        update con;
        return con;
    }

    @AuraEnabled
    public static void deleteContact(Id contactId) {
        delete [SELECT Id FROM Contact WHERE Id = :contactId];
    }
}