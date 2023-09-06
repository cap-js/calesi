using { sap.capire.incidents } from '@capire/incidents';
using { Image } from '@cap-js/attachments';

// Add customer avatars and annotate as type 'Image'
extend incidents.Customers with {
  avatar: Image;
}

// Same as in Incidents app, but with extra (image) column
// for customer avatars
// See: https://sapui5.hana.ondemand.com/sdk/#/topic/492bc791a7bd41cd9932fdf5d3aa2656.html
annotate ProcessorsService.Incidents with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : title,
            Label : '{i18n>Title}',
        },
        {
            $Type : 'UI.DataField',
            Value : customer.avatar,
            Label: '{i18n>Avatar}'
        },
        // This adds an 'avatar' image column before customer
        {
            $Type : 'UI.DataField',
            Value : customer.name,
            Label : '{i18n>Customer}',
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