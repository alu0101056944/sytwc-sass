# SYTWC Sass Theory

Marcos Barrios, alu0101056944

## Description

<code>Sass</code> learning repository to prepare for an evaluation practice session of the *Sistemas y Tecnología Web: Cliente* subject.

## Project structure

```bash
.
├── README.md
├── web-server
└── www
    ├── assets
    └── styles             // Exercises description and solution files
        ├── README.md
        ├── exercise1.css
        └── exercise1_solution.scss

```

## Annotations

### `@extend` explanation

It models a "X also has everything of Y" relationship **relative to the specific selector combination that is using the `@extend` directive. The thing is, the final html may not have the extended class as parent, in which case the original rules will not apply. That's why a separate selector combination is generated for that specific order of selectors, so that the original specifity (less specific, so more cases apply) is kept.
