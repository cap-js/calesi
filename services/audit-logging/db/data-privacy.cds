// Annotate entity Customers to contain personal data
using { sap.capire.incidents.Customers } from '@capire/incidents';

annotate Customers with @PersonalData: {
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

// // In addition we add a field for sensitive data
// extend Customers with {
//   creditCardNo : String @PersonalData.IsPotentiallySensitive;
// }

// Annotate entity Addresses to contain Customers details
using { sap.capire.incidents.Addresses } from '@capire/incidents';

annotate Addresses with @PersonalData: {
  EntitySemantics: 'DataSubjectDetails'
} {
  customer      @PersonalData.FieldSemantics: 'DataSubjectID';
  city          @PersonalData.IsPotentiallyPersonal;
  postCode      @PersonalData.IsPotentiallyPersonal;
  streetAddress @PersonalData.IsPotentiallyPersonal;
}

// Annotate entity Incidents to contain Customers-related data
using { sap.capire.incidents.Incidents } from '@capire/incidents';

annotate Incidents with @PersonalData: {
  EntitySemantics: 'Other'
} {
  customer @PersonalData.FieldSemantics: 'DataSubjectID';
}
