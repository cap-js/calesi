using { sap.capire.incidents } from '@capire/incidents';
using { Image, Attachments } from '@cap-js/attachments';

// extend incidents.Incidents with {
//   report: Attachments;
// }

extend incidents.Customers with {
  avatar: Image;
  imageType: String;
}

annotate ProcessorsService.Incidents with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : title,
            Label : '{i18n>Title}',
        },
        {
            $Type : 'UI.DataField',
            Value : customer.name,
            Label : '{i18n>Customer}',
        },
        {
            $Type : 'UI.DataField',
            Value : customer.avatar_imageUrl,
            Label: '{i18n>Avatar}',
            ![@UI.Importance] : #High
        },
        {
            $Type : 'UI.DataField',
            Value : status.descr,
            Criticality : status.criticality,
            Label : '{i18n>Status}',
        },
        {
            $Type : 'UI.DataField',
            Value : urgency.descr,
            Label : '{i18n>Urgency}',
        },
    ]
);