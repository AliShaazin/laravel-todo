import React from "react";

type Props = {
  title: string;
  description: string;
};
const Header = ({ title, description }: Props) => {
  return (
    <section className="py-20 flex items-center flex-col">
      <h1 className="text-4xl font-bold text-gray-600">{title}</h1>
      <p className="text-lg text-gray-500">{description}</p>
    </section>
  );
};

export default Header;
