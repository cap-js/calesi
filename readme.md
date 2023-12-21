# Workspace Repo for Calesi Projects

We use this repo to develop, test and demo the calesi plugins. It is a monorepo with two workspaces configured in `package.json`:

```jsonc
"workspaces": [
  "incidents-app",
  "plugins/*"
],
```

- **`incidents-app`** is the reference app we use to showcase all calesi effects; added here as a *git submodule*.
- **`plugins/*`**  is place to put in your CAP plugin packages; as standard *git clones*.

As a monorepo it allows to refer to all packages in one of the above folders with standard npm dependencies. This is particularly helpful when your plugin is not yet published. 



## Clone the monorepo

To get started clone the repository and run npm install:

```sh
git clone --recursive https://github.com/cap-js/calesi.git
```



## Add a Pugin

Add your work-in-progress plugin repo into the `./plugins` folder:

```sh
git clone https://github.com/cap-js/attachments.git plugins/attachments
```



## Use it with Ref App

Use your plugin with the enclosed `incidents-app`  as if it had been released already:

```sh
cd incidents-app
```

```sh
npm add @cap-js/attachments #> will be linked to ../plugins/attachements
```

```sh
cds watch #... as usual
```

Go on adding plugin-specific content...

