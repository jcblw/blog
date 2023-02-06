import { DiscussionEmbed } from "disqus-react";

export const Comments = ({
  slug,
  title,
  shortname,
}: {
  slug: string;
  title: string;
  shortname: string;
}) => {
  const disqusConfig = {
    identifier: slug, // Single post id
    title: title, // Single post title
  };

  return <DiscussionEmbed shortname={shortname} config={disqusConfig} />;
};
