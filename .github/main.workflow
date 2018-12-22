workflow "Fabulator NPM Workflow" {
  on = "push"
  resolves = ["Publish"]
}

action "Install" {
  uses = "actions/npm@e7aaefe"
  runs = "ci"
}

action "Lint" {
  uses = "actions/npm@e7aaefe"
  runs = "lint"
  needs = ["Install"]
}

action "Typescript lint" {
  uses = "actions/npm@e7aaefe"
  runs = "tsc"
  needs = ["Install"]
}

action "Test" {
  uses = "actions/npm@e7aaefe"
  needs = ["Install"]
  runs = "test"
}

action "Publish" {
  uses = "actions/npm@e7aaefe"
  needs = ["Lint", "Typescript lint", "Test"]
  runs = "release"
  secrets = ["GITHUB_TOKEN", "NPM_TOKEN"]
}
