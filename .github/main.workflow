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
  args = "lint"
  needs = ["Install"]
}

action "Typescript lint" {
  uses = "actions/npm@e7aaefe"
  args = "tsc"
  needs = ["Install"]
}

action "Test" {
  uses = "actions/npm@e7aaefe"
  needs = ["Install"]
  args = "test"
}

action "Publish" {
  uses = "actions/npm@e7aaefe"
  needs = ["Lint", "Typescript lint", "Test"]
  args = "release"
  secrets = ["GITHUB_TOKEN", "NPM_TOKEN"]
}
