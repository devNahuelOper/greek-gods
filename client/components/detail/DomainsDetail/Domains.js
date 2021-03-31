import React from "react";

const Domains = ({ domains, children }) => {
  return (
    <>
      {Boolean(domains.length) &&
        domains.map((domain) => <li key={domain}>{domain}</li>)}
      {!domains.length && <h4>&nbsp; None</h4>}
      {children}
    </>
  );
};

export default Domains;
