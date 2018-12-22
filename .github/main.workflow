workflow "Fabulator NPM Workflow" {
  on = "push"
  resolves = ["Publish"]
}

action "Install" {
  uses = "actions/npm@e7aaefe"
  args = "ci"
}

action "Lint" {
  uses = "actions/npm@e7aaefe"
  args = "run lint"
  needs = ["Install"]
}

action "Typescript lint" {
  uses = "actions/npm@e7aaefe"
  args = "run tsc"
  needs = ["Install"]
}

action "Test" {
  uses = "actions/npm@e7aaefe"
  needs = ["Install"]
  args = "run test"
}

action "Publish" {
  uses = "docker://node:10"
  runs = "npm"
  needs = ["Lint", "Typescript lint", "Test"]
  args = "run release"
  secrets = ["GITHUB_TOKEN", "NPM_TOKEN"]
}
