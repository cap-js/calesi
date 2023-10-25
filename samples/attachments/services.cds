using { sap.capire.incidents } from '@capire/incidents';
using { Image } from '@cap-js/attachments';

// Add customer avatars and annotate as type 'Image'
extend incidents.Customers with {
  avatar: Image;
}

// Same as in Incidents app, but with extra (image) column
// for customer avatars
// See: https://sapui5.hana.ondemand.com/sdk/#/topic/492bc791a7bd41cd9932fdf5d3aa2656.html
annotate ProcessorService.Incidents with @(
    UI.LineItem : [
        ...up to { Value : title },
        // This adds an 'avatar' image column before customer
        {
            $Type : 'UI.DataField',
            Value : customer.avatar,
            Label: '{i18n>Avatar}'
        },
        ...
    ]
);
