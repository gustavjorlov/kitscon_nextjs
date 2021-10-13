import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  GetStaticPropsContext,
} from "next";
import fs from "fs/promises";
import Layout from "../../components/Layout";
import { upperFirst } from "../blog";

export const getStaticPaths: GetStaticPaths = async () => {
  const fileNames = await fs.readdir("./posts");
  console.log("\n[slug] getStaticPaths", fileNames);
  return {
    fallback: "blocking",
    paths: fileNames.map((name) => ({
      params: { slug: name.split(".")[0] },
    })),
  };
};

const readFileBySlug = (slug: string): Promise<string> => {
  return fs.readFile("./posts/" + slug + ".md", {
    encoding: "utf-8",
  });
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const slug: string = params?.slug as string;
  console.log("\n[slug] getStaticProps", slug);
  try {
    return {
      props: {
        text: await readFileBySlug(slug),
        title: `${upperFirst(slug)} - uppdaterad ${new Date()
          .toTimeString()
          .substr(0, 8)}`,
      },
      revalidate: 15,
    };
  } catch (e) {
    return {
      props: { title: (e as Error).name, text: (e as Error).message },
    };
  }
};

type BlogPostProps = {
  params: Record<"id", string>;
  text: string;
  title: string;
};

const BlogPost: NextPage<BlogPostProps> = ({ params, title, text }) => {
  return (
    <Layout>
      <h1>{title}</h1>
      <pre>{text}</pre>
    </Layout>
  );
};

export default BlogPost;
