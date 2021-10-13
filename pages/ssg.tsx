import { useState } from "react";

export const getStaticProps = () => ({
  props: { title: "Reset" },
});

const SSG = ({ title }: { title: string }) => {
  const [upperCase, setUpperCase] = useState(false);
  return (
    <>
      <button onClick={setUpperCase.bind(null, !upperCase)}>Aa</button>
      <h1>{upperCase ? title.toUpperCase() : title}</h1>
    </>
  );
};
export default SSG;
