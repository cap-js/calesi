using { sap.capire.incidents } from '@capire/incidents';
using { Image } from '@cap-js/attachments';

// Add customer avatars and annotate as type 'Image'
extend incidents.Customers with {
  avatar: Image;
}

annotate ProcessorService.Incidents with @(
    UI.LineItem : [
        ...up to { Value : title },
        // This adds an 'avatar' image column before customer
        {
            $Type : 'UI.DataField',
            Value : customer.avatar_url,
            Label: '{i18n>Avatar}'
        },
        ...
    ]
);
