# CAP Reference Apps for Calesi

Wellcome to the reference app monorepo for Calesi projects ()"Calesi" stands for CAP-level Service Interfaces).

We use this repository to develop both, the basic reference application on an incidents management use case, as well as enhancements to that showcasing how to use individual BTP services and features.

The folders in here are:

- **`incidents-app`**

    The incidents base application used for all examples         |

- **`services/...`**

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
cds w services/change-tracking
```



## Compose

In order to run the incidents app with more than one enhancement...



## Deploy
