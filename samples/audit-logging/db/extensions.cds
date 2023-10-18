using from '@capire/incidents';
using {
  cuid,
  managed
} from '@sap/cds/common';

entity sap.capire.incidents.Addresses : cuid, managed {
  customer      : Association to sap.capire.incidents.Customers;
  city          : String;
  postCode      : String;
  streetAddress : String;
}

extend sap.capire.incidents.Customers with {
  creditCardNo : String(16) @assert.format: '^[1-9]\d{15}$';
  addresses    : Composition of many sap.capire.incidents.Addresses
                   on addresses.customer = $self;
};
