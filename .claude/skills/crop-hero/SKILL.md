# Crop Hero Image

Crop a Gemini-generated image for use as a blog hero image. Removes the Gemini watermark star from the bottom-right corner and saves to the blog's public directory.

## Usage

Arguments: `<source-image-path> <post-slug>`

Example: `/crop-hero ~/Downloads/image.png agent-loops-local-models`

## Steps

1. Copy the source image to `public/<post-slug>-hero.png`
2. Use `sips -c <height> <width>` to crop 50px from the right edge (crops from center, so removes both edges equally — enough to eliminate the Gemini star in the bottom-right corner)
   - Get the original dimensions with `sips -g pixelHeight -g pixelWidth <file>`
   - New width = original width - 50
   - Height stays the same
3. Show the cropped image to the user for verification using the Read tool
4. If the blog post exists at `src/content/blog/<post-slug>.md` or `.mdx`, add `heroImage: /<post-slug>-hero.png` to the frontmatter if not already present
5. Report the final image dimensions
