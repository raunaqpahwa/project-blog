import RSS from "rss";
import fs from "fs";
import path from "path";

import { BLOG_TITLE } from "./src/constants.js";
import { getBlogPostList } from "./src/helpers/file-helpers.js";

const feed = new RSS({
  title: BLOG_TITLE,
  description: "A wonderful blog about JavaScript",
  feed_url: "http://localhost:3000/rss.xml",
  site_url: "http://localhost:3000",
  managingEditor: "Josh Comeau",
  webMaster: "Josh Comeau",
  copyright: "2024 Josh Comeau",
  language: "en",
  categories: ["Web Programming", "Javascript", "React"],
  pubDate: "Aug 25, 2024 04:00:00 GMT",
  ttl: "60",
});

const posts = await getBlogPostList();

posts.forEach((post) => {
  feed.item({
    title: post.title,
    description: post.abstract,
    date: post.publishedOn,
  });
});

fs.writeFileSync(path.resolve(process.cwd(), "public", "rss.xml"), feed.xml());
