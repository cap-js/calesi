using { ProcessorService } from './processor-service';

extend projection ProcessorService.Incidents with actions {
  @(
    cds.odata.bindingparameter.name: '_it',
    Common.SideEffects             : {TargetProperties: ['_it/status_code']}
  )
  action confirmIncident()
};

annotate ProcessorService.Incidents with @(
  UI.LineItem      : [
    ...up to
    {Value: urgency.descr},
    {
      $Type : 'UI.DataFieldForAction',
      Action: 'ProcessorService.confirmIncident',
      Label : '{i18n>Confirmation}',
    },
    ...
  ],
  UI.Identification: [{
    $Type : 'UI.DataFieldForAction',
    Action: 'ProcessorService.confirmIncident',
    Label : '{i18n>Confirmation}'
  }],
);

annotate ProcessorService with @(requires: [
  'support',
  'customer'
]);

annotate ProcessorService.Incidents with @(restrict: [
  {
    grant: [
      'READ',
      'CREATE',
      'UPDATE',
      'DELETE',
      'confirmIncident'
    ],
    to   : ['customer'],
    where: 'createdBy = $user'
  },
  {
    grant: [
      'READ',
      'CREATE',
      'UPDATE',
      'DELETE',
      'confirmIncident'
    ],
    to   : ['support']
  }
]);

event ProcessorService.changeStatus:  {
    title : String;
    oldStatus : String;
    newStatus  : String;
}
