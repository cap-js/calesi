using {sap.capire.incidents.Customers} from '@capire/incidents';

extend Customers with {
  creditCardNo : String(16) @assert.format: '^[1-9]\d{15}$';
}
