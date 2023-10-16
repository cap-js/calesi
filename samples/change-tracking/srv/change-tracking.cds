using {
  sap.capire.incidents as my,
  ProcessorService
} from './processor-service';

annotate sap.capire.incidents.Incidents @title: 'Incidents';
annotate sap.capire.incidents.Conversations @title: 'Conversations';

annotate my.Incidents @changelog: [ customer.name, createdAt ] {
  customer @changelog: [ customer.name ] @title: 'Customer';
  title  @changelog;
  status @changelog;
}

annotate my.Conversations @changelog: [ author, timestamp ] {
  message  @changelog @title: 'Message';
}
