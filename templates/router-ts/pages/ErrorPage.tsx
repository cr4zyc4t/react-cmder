import React from "react";
import Section from "components/Section";

interface ErrorPageProps {
  location: {
    pathname: string;
  };
}

function ErrorPage({ location }: ErrorPageProps) {
  return (
    <Section>
      <h2>Error 404 - Not Found</h2>
      <p>It looks like we hit a snag.</p>
      <pre>{location.pathname}</pre>
    </Section>
  );
}

export default ErrorPage;