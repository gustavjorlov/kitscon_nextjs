import type { NextPage } from "next";
import Layout from "../components/Layout";
import fs from "fs/promises";
import path from "path";

export const getStaticProps = async () => {
  console.log("\n[about] getStaticProps");
  return {
    props: {
      file: await fs.readFile(path.resolve("README.md"), {
        encoding: "utf-8",
      }),
    },
  };
};

type AboutProps = {
  file: string;
};

const About: NextPage<AboutProps> = ({ file }) => {
  return (
    <Layout>
      <h3>Statically generated content - with external data</h3>
      <pre>{file}</pre>
    </Layout>
  );
};

export default About;
