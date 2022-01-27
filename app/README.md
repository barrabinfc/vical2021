# Architecture

A blog reading from markdown files at folder `posts/`.
Markdown files are transformed to semantic type `Page`.

- Blog is accessible at /garden
- \$slug render individual page
- index render all posts() at folder X

# Notes

Remix doesn't has a loader for postcss files, so we compile pcss->css files
on task `build:css`. Generated css files are imported in react components/layouts
via the `links` property.
