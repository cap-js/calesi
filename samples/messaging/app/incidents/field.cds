using ProcessorService as service from '../../srv/processor-service';
using from './annotations.cds';
annotate service.Incidents with @(
    UI.FieldGroup #GeneratedGroup1 : {
        Data : [...,
        {
                $Type : 'UI.DataField',
                Value : customer.email,
                Label : '{i18n>email}'
        }
    ]
});

annotate service.Customers with {
    email @readonly
};