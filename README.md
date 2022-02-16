# typescript-npm-package-tpl

Use this package to create a typescript based package for npm.

Ensure you update:
- package.json
- .github/ISSUE_TEMPLATE files
- githooks to your style
- CODE_OF_CONDUCT
- CONTRIBUTING
- LICENCE
- This readme file :)
- Any anything else.

## ttypescript:
This uses ttypescript which allows use of the ts-transform-paths plugin found in the tsconfig.
This basically transforms the output of any shortcuts (eg `@/myfile.ts`) to the full relative paths, without this the shortcuts break as node cannot resolve them.

## CI + Coverage
This is ready to go with travis and codecov, though you will need to create an account on both of these services and point them to the correct repos, but the travis.yml is about all you should need and the codecov as seen in the package.json file.

## Missed anything?
Create a pull request and get your input merged in, thanks.
