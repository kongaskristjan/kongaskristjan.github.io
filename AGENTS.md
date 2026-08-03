# Agent instructions

Personal site for Kristjan Kongas, built with Jekyll and served by GitHub
Pages from the default branch.

## Always commit, always merge

Do not leave finished work sitting in the working tree or parked on a side
branch — it never reaches the site that way, because Pages deploys from the
default branch.

- Commit every change you make once it works. Do not wait to be asked.
- Merge the work into the default branch (`master` in this repo) before you
  report the task done. A short-lived branch is fine; leaving it unmerged is
  not.
- Delete the branch after merging.
- Push only when asked. Merging locally is the default; the user decides when
  it goes live.
- Write commit messages that explain why the change was made, not just what
  changed.

## Layout of the repo

- `index.html` — the home page: hero, the projects loop, the writing list
- `_data/projects.yml` — every project card's content; the loop in
  `index.html` renders it, so add projects here rather than in markup
- `_includes/`, `_layouts/` — templates; `fire-terminal.html` is the hand
  written code sample for fire-hpp
- `assets/css/main.css` — the whole stylesheet, plain CSS, no build step
- `assets/js/main.js` — small progressive enhancements only; the page must
  work with scripting off
- `_posts/` — writing, rendered through `_layouts/post.html`
- `vendor/`, `_site/`, `.jekyll-cache/` — stale 2019 artifacts, ignore them

## Design conventions

The site is deliberately restrained: one accent colour, used only for things
you can click. Structure comes from spacing and hairlines, not gradients,
glows or drop shadows. Project demos all sit in the same column. Keep new
work in that register.

## Verifying a change

There is no `ruby` or `bundler` in the sandbox, so `jekyll serve` is not
available. Render the Liquid subset with `python-liquid` instead and serve the
output over `http.server` with `Cache-Control: no-store`, then screenshot it.
Check both colour schemes and a narrow viewport before calling a visual change
done.
