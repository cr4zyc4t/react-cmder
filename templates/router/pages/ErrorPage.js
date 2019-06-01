import React from "react";
import Section from "components/Section";

function ErrorPage({
  location,
}) {
  return (
    <Section>
      <h2>Error 404 - Not Found</h2>
      <p>It looks like we hit a snag.</p>
      <pre>{location.pathname}</pre>
    </Section>
  );
}

export default ErrorPage;