# ADR 1: Introduce Automated Testing to Improve Maintainability

## Context

The current version of the music tracks library is a single-page application (SPA) built with React and Vite, developed solo in about 5 days. The app includes features such as creating, editing, deleting, and filtering music tracks with support for modals and file uploads. While the implementation meets the functional requirements, it lacks automated tests. All validations and interactions were tested manually.

As the app grows or is modified (e.g., new features, design refactors, library updates), the absence of tests will make it harder to ensure stability and correctness without redoing extensive manual testing.

## Decision

1. We will introduce a testing setup for the project, starting with component tests using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) and [Vitest](https://vitest.dev/) as the test runner.
2. We will write tests for core user flows (e.g., creating, editing, and deleting a track), with an emphasis on data-testid attributes already present in the codebase.

The goal is to cover the most critical paths first and enable future confident refactoring or extending the code.

## Rationale

This decision improves **maintainability** by allowing changes to be tested programmatically, reducing the reliance on manual QA. It also prepares the project for potential future deployment.

React Testing Library is chosen because it encourages testing from the user’s perspective and integrates well with component-based UI. Vitest is chosen for its fast startup, great integration with Vite, and modern developer experience.

Also considered:
- **Not writing tests**: This would save short-term time but increase long-term maintenance costs.
- **End-to-end testing with Playwright or Cypress**: These powerful tools may be excessive for the current project scale and would add complexity without immediate benefit.

## Status

Proposed

## Consequences

**Positive:**
- Easier to refactor and add features without breaking existing functionality.
- Bugs can be caught earlier in development.
- Practice writing tests, as this is a learning journey 👩‍🎓

**Negative:**
- Initial effort required to configure and write tests.
- Time spent on test maintenance when features change.
- Slightly longer build/test pipeline in CI if added.
