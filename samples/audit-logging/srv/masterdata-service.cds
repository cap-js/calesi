using { sap.capire.incidents as my } from '../db/extensions';

@requires: 'internal-user'
service MasterDataService {

  entity Customers as projection on my.Customers;

}
