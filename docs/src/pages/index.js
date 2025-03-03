import React, { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';

function HomepageHeader() {
  const history = useHistory();

  useEffect(() => {
    history.push("/docs/docs/intro");
  }, [history]);
  return null;
}

export default function Home() {
  return (
    <HomepageHeader />
  );
}
