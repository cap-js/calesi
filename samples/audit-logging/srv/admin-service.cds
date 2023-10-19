using {sap.capire.incidents as my} from '../db/extensions';

@requires: 'admin'
service AdminService {

  entity Customers as projection on my.Customers;

}
