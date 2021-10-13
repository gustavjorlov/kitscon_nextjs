import type { NextPage } from "next";
import Layout from "../components/Layout";
import Link from "next/link";
import fs from "fs/promises";

type Post = {
  slug: string;
  title: string;
};
export const upperFirst = (word: string) =>
  word[0].toUpperCase() + word.substr(1);

export const getServerSideProps = async () => {
  const files = await fs.readdir("./posts");
  console.log("\n[blog] getServerSideProps", files);

  return {
    props: {
      posts: files.map((fileName) => ({
        slug: fileName.split(".")[0],
        title: upperFirst(fileName.split(".")[0]),
      })),
    },
  };
};

type BlogProps = {
  posts: Post[];
};

const Blog: NextPage<BlogProps> = ({ posts }) => {
  return (
    <Layout>
      <h3>Server Side Rendered content</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.title}>
            <Link href={`/blog/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Blog;
