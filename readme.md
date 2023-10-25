# CAP Reference Apps for Calesi

Welcome to the reference app monorepo for Calesi projects ("Calesi" stands for CAP-level Service Interfaces).

We use this repository to develop both, the basic reference application on an incidents management use case, as well as enhancements to that showcasing how to use individual BTP services and features.

The folders in here are:

- **`incidents-app`**

    The incidents base application used for all examples

- **`samples/...`**

    Enhancements to the incidents-app showcasing how to use individual services, like change tracking, audit logging, messaging, and so forth...

- **`plugins/...`**

    A place to put in your CAP plugin packages to be used

As a monorepo it allows to refer to all packages in one of the above folders.



## Setup

To get started clone the repository and run npm install:

```sh
git clone --recursive https://github.com/cap-js/calesi.git
cd calesi
```

```sh
npm i
```



## Run

Run the basic incidents app:

```sh
cds w incidents-app
```

Run the incidents app with **one** of the enhancements:

```sh
cds w samples/change-tracking
```



## Compose

In order to run the incidents app with more than one enhancement...

- TODO...

## Deploy

- TODO...



## Contribute

Follow these steps to add a new Calesi case:

1. Clone this repository as given above
1. Add a new subfolder in `samples/`, e.g.:
   ```sh
   cds init samples/change-tracking
   ```
1. Add the plugin
    1. If the service plugin is not yet released, clone the repo into a respective subfolder in `plugins/`, e.g.
        ```sh
        git clone https://github.com/cap-js/change-tracking plugins/change-tracking
        ```
    1. If/ once the plugin is released, add the root package.json's workspaces config, i.e., `samples/<plugin>`
1. Run `npm install` to npm link all dependencies
