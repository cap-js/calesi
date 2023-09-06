# Change Tracking

### TODOs

- [x] [Revise annotations and improve automation](#revise-annotations-and-improve-automation)
- [ ] [Fails with `cds deploy -2 sqlite`](https://github.tools.sap/cap/cds-dk/pull/1974)
- [ ] [Fails with `cds build`, hence HANA](https://github.tools.sap/cap/cds-dk/pull/1974)
- [ ] Optimize Implementation → [phase 1](https://github.com/cap-js/change-tracking/pull/1), phase 2
- [ ] Reviews with SME
- [x] Tests 2b green
- [x] Tests 2b green with better-sqilte



#### Revise Annotation & Improve Automation

- [x] Renamed namespace `sap.sme.changelog` → `sap.changelog`
- [x] Renamed annotation `@changehistory` → `@changelog`
- [x] Renamed annotation `@changehistory.objectID` → `@changelog.keys`
- [x] Association `changes` is added automatically
- [x] `@UI.Facet` is added automatically
- [x] Introduced aspect `sap.changelog.aspect` → used in `cds-plugin.js`
- [x] We can also add `@changelog` to service entities now
- [x] Auto-add `cds.requires.change-tracking.model` → no `using` from`@cap-js/change-tracking` anymore
- [x] Run tests provided by SME → they're green
- [ ] Get rid of `sap.changelog.ChangeLog` and `sap.changelog.ChangeView` (@I534083)
- [ ] How to lazy-load changes on UI? 
- [ ] Make UI facets configurable (@D034457)
- [ ] Revisit columns (auto-expand or keep as is)
- [ ] Revisit concept of individual log-entries per field (for bulk changes, evaluate json for changelog) 



## Setup

```sh
npm add @cap-js/change-tracking
```

The package is a cds-plugin and thereby auto-wires many things so configurations and annotations are reduced to a minimum. 



## Annotate your Models

Add `@changelog` annotations to entities that shall be change-tracked, for example like this:

```cds
annotate Incidents with @changelog.keys: [ID]  {
  title  @changelog;
  status @changelog;
};
```



## Run the Application

Start the server as usual, e.g.:

```sh
cds watch
```

Navigate to an Incident →  edit it → save → see the change in the change log facet
