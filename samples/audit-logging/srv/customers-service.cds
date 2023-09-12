using {sap.capire.incidents as my} from '@capire/incidents';
using {
  cuid,
  managed
} from '@sap/cds/common';

entity sap.capire.incidents.Addresses : cuid, managed {
  customer      : Association to my.Customers;
  city          : String;
  postCode      : String;
  streetAddress : String;
}

extend my.Customers with {
  creditCardNo : String(16) @assert.format: '^[1-9]\d{15}$';
  addresses    : Composition of many my.Addresses
                   on addresses.customer = $self;
};

@requires: 'system-user'
service CustomersService {

  entity Customers as projection on my.Customers;
  entity Addresses as projection on my.Addresses;

}
