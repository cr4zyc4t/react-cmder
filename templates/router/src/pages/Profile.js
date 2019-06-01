import React from "react";
import Section from "components/Section";

function Profile({
  user,
  ...props
}) {
  return (
    <Section>
      <h2>Profile: {props.match.params.user || "you"}</h2>
      <p>This is some text about {user || "you"}.</p>
      <pre>{JSON.stringify({
        user,
        ...props,
      }, null, 2)}
      </pre>
    </Section>
  );
}

export default Profile;