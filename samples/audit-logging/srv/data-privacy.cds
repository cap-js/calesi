using { sap.capire.incidents as my } from '@capire/incidents';
using { cuid, managed } from '@sap/cds/common';

entity sap.capire.incidents.Addresses : cuid, managed {
  customer      : Association to my.Customers;
  city          : String;
  postCode      : String;
  streetAddress : String;
}

extend my.Customers with {
  creditCardNo  : String(16) @assert.format: '^[1-9]\d{15}$';
  addresses     : Composition of many sap.capire.incidents.Addresses on addresses.customer = $self;
};

extend service ProcessorsService {
  entity Address as projection on sap.capire.incidents.Addresses;
}

annotate my.Customers with @PersonalData: {
  EntitySemantics: 'DataSubject',
  DataSubjectRole: 'Customer'
} {
  ID           @PersonalData.FieldSemantics: 'DataSubjectID';
  firstName    @PersonalData.IsPotentiallyPersonal;
  lastName     @PersonalData.IsPotentiallyPersonal;
  email        @PersonalData.IsPotentiallyPersonal;
  phone        @PersonalData.IsPotentiallyPersonal;
  creditCardNo @PersonalData.IsPotentiallySensitive;
}

annotate my.Addresses with @PersonalData: {
  EntitySemantics: 'DataSubjectDetails'
} {
  customer      @PersonalData.FieldSemantics: 'DataSubjectID';
  city          @PersonalData.IsPotentiallyPersonal;
  postCode      @PersonalData.IsPotentiallyPersonal;
  streetAddress @PersonalData.IsPotentiallyPersonal;
}

annotate my.Incidents with @PersonalData: {
  EntitySemantics: 'Other'
} {
  customer @PersonalData.FieldSemantics: 'DataSubjectID';
}
