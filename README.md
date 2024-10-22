# Super Repo Manager (srm)
=================

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/super-repo-manager.svg)](https://npmjs.org/package/super-repo-manager)
[![Downloads/week](https://img.shields.io/npm/dw/super-repo-manager.svg)](https://npmjs.org/package/super-repo-manager)

Effortlessly manage Git submodules, subtrees, and metadata with ease using this npm module.


Super Repo Manager (SRM) is a powerful CLI tool designed to simplify the management of subrepositories within your projects. Whether you're managing multiple dependencies, collaborating with a team, or ensuring robust access controls, SRM streamlines the process with ease.

=================
## Features
- Subrepository Management: Keep track of multiple repositories within your project using a single configuration file.
- Role-Based Access Control (RBAC): Define users and groups with specific repository access permissions, ensuring project confidentiality and security.
- Automated Synchronization: Automatically syncs the current repository branch across users' computers based on their access rights.
- Open Source: Licensed under the MIT license, SRM encourages contributions and community involvement.

### Getting Started
Installation
<br />
Install srm globally via npm:

```bash
npm install -g super-repo-manager
```

### Contributing
Contributions are welcome! Fork the repository, make your changes, and submit a pull request. Please ensure your code follows our coding standards and includes tests where applicable.

### License
SRM is licensed under the MIT License. See [LICENSE](https://github.com/jafarijason/super-repo-manager?tab=MIT-1-ov-file#readme) for details.

### Support
For support, bug reports, or feature requests, please [open an issue](https://github.com/jafarijason/super-repo-manager/issues).



<!-- toc -->
* [Super Repo Manager (srm)](#super-repo-manager-srm)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g super-repo-manager
$ srm COMMAND
running command...
$ srm (--version)
super-repo-manager/1.0.38 darwin-arm64 node-v20.13.1
$ srm --help [COMMAND]
USAGE
  $ srm COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`srm autocomplete [SHELL]`](#srm-autocomplete-shell)
* [`srm help [COMMAND]`](#srm-help-command)
* [`srm init`](#srm-init)
* [`srm my`](#srm-my)
* [`srm plugins`](#srm-plugins)
* [`srm plugins add PLUGIN`](#srm-plugins-add-plugin)
* [`srm plugins:inspect PLUGIN...`](#srm-pluginsinspect-plugin)
* [`srm plugins install PLUGIN`](#srm-plugins-install-plugin)
* [`srm plugins link PATH`](#srm-plugins-link-path)
* [`srm plugins remove [PLUGIN]`](#srm-plugins-remove-plugin)
* [`srm plugins reset`](#srm-plugins-reset)
* [`srm plugins uninstall [PLUGIN]`](#srm-plugins-uninstall-plugin)
* [`srm plugins unlink [PLUGIN]`](#srm-plugins-unlink-plugin)
* [`srm plugins update`](#srm-plugins-update)
* [`srm repo [ACTION]`](#srm-repo-action)
* [`srm repo add`](#srm-repo-add)
* [`srm update`](#srm-update)
* [`srm version`](#srm-version)

## `srm autocomplete [SHELL]`

Display autocomplete installation instructions.

```
USAGE
  $ srm autocomplete [SHELL] [-r]

ARGUMENTS
  SHELL  (zsh|bash|powershell) Shell type

FLAGS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

DESCRIPTION
  Display autocomplete installation instructions.

EXAMPLES
  $ srm autocomplete

  $ srm autocomplete bash

  $ srm autocomplete zsh

  $ srm autocomplete powershell

  $ srm autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v3.1.5/src/commands/autocomplete/index.ts)_

## `srm help [COMMAND]`

Display help for srm.

```
USAGE
  $ srm help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for srm.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.4/src/commands/help.ts)_

## `srm init`

initialize a new srm repo

```
USAGE
  $ srm init [-f]

FLAGS
  -f, --force

DESCRIPTION
  initialize a new srm repo

EXAMPLES
  $ srm init
```

_See code: [src/commands/init/index.ts](https://github.com/jafarijason/super-repo-manager/blob/v1.0.38/src/commands/init/index.ts)_

## `srm my`

run command on projects related to your username

```
USAGE
  $ srm my [-p <value> | -p <value>]

FLAGS
  -p, --group=<value>
  -p, --project=<value>

DESCRIPTION
  run command on projects related to your username

EXAMPLES
  $ srm my
```

_See code: [src/commands/my/index.ts](https://github.com/jafarijason/super-repo-manager/blob/v1.0.38/src/commands/my/index.ts)_

## `srm plugins`

List installed plugins.

```
USAGE
  $ srm plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ srm plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.3/src/commands/plugins/index.ts)_

## `srm plugins add PLUGIN`

Installs a plugin into srm.

```
USAGE
  $ srm plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into srm.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the SRM_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the SRM_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ srm plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ srm plugins add myplugin

  Install a plugin from a github url.

    $ srm plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ srm plugins add someuser/someplugin
```

## `srm plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ srm plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ srm plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.3/src/commands/plugins/inspect.ts)_

## `srm plugins install PLUGIN`

Installs a plugin into srm.

```
USAGE
  $ srm plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into srm.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the SRM_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the SRM_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ srm plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ srm plugins install myplugin

  Install a plugin from a github url.

    $ srm plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ srm plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.3/src/commands/plugins/install.ts)_

## `srm plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ srm plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ srm plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.3/src/commands/plugins/link.ts)_

## `srm plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ srm plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ srm plugins unlink
  $ srm plugins remove

EXAMPLES
  $ srm plugins remove myplugin
```

## `srm plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ srm plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.3/src/commands/plugins/reset.ts)_

## `srm plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ srm plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ srm plugins unlink
  $ srm plugins remove

EXAMPLES
  $ srm plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.3/src/commands/plugins/uninstall.ts)_

## `srm plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ srm plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ srm plugins unlink
  $ srm plugins remove

EXAMPLES
  $ srm plugins unlink myplugin
```

## `srm plugins update`

Update installed plugins.

```
USAGE
  $ srm plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.3.3/src/commands/plugins/update.ts)_

## `srm repo [ACTION]`

```
USAGE
  $ srm repo [ACTION]

ARGUMENTS
  ACTION  add|remove|update repository
```

_See code: [src/commands/repo/index.ts](https://github.com/jafarijason/super-repo-manager/blob/v1.0.38/src/commands/repo/index.ts)_

## `srm repo add`

add child repository

```
USAGE
  $ srm repo add -n <value> -p <value> -u <value> -s <value> -c <value>

FLAGS
  -c, --current-branch=<value>  (required)
  -n, --repo-name=<value>       (required)
  -p, --relative-path=<value>   (required)
  -s, --source-branch=<value>   (required)
  -u, --repo-url=<value>        (required)

DESCRIPTION
  add child repository

EXAMPLES
  $ srm repo add
```

_See code: [src/commands/repo/add.ts](https://github.com/jafarijason/super-repo-manager/blob/v1.0.38/src/commands/repo/add.ts)_

## `srm update`

update srm

```
USAGE
  $ srm update [-v]

FLAGS
  -v, --version

DESCRIPTION
  update srm

EXAMPLES
  $ srm update
```

_See code: [src/commands/update/index.ts](https://github.com/jafarijason/super-repo-manager/blob/v1.0.38/src/commands/update/index.ts)_

## `srm version`

srm version

```
USAGE
  $ srm version [--json]

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  srm version

EXAMPLES
  $ srm version
```

_See code: [src/commands/version/index.ts](https://github.com/jafarijason/super-repo-manager/blob/v1.0.38/src/commands/version/index.ts)_
<!-- commandsstop -->
