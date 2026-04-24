# Validate Blog Post

Check blog post frontmatter for required fields before publishing. Run this before committing any new or modified blog post.

## Required frontmatter fields

Every blog post in `src/content/blog/` must have:

- `title` — post title
- `description` — short summary for meta tags
- `date` — publish date in YYYY-MM-DD format
- `status` — must be `draft` or `published`
- `slug` — URL path, must start with `/` (e.g. `/claude-design-odie`). Should match the filename without extension.

## Optional fields

- `heroImage` — path to hero image (e.g. `/odie-hero.png`)

## How to validate

1. Read the target `.mdx` or `.md` file in `src/content/blog/`
2. Parse the YAML frontmatter between the `---` delimiters
3. Check each required field exists and is non-empty
4. Check `slug` starts with `/`
5. Check `date` is a valid date
6. Check `status` is either `draft` or `published`
7. If `slug` is missing, suggest one based on the filename: `/${filename-without-extension}`
8. Report any missing or invalid fields and offer to fix them

## When to run

- Before committing a new blog post
- Before changing a post's status from `draft` to `published`
- When the user asks to validate or check a post

## Arguments

Pass the filename or path to validate. If no argument is given, validate all posts in `src/content/blog/`.
