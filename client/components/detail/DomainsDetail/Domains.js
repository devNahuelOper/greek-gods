import React from "react";

const Domains = ({ domains, children }) => {
  return (
    <ul className="domains">
      {Boolean(domains.length) &&
        domains.map((domain) => <li key={domain}>{domain}</li>)}
      {!domains.length && <h4>&nbsp; None</h4>}
      {children}
    </ul>
  );
};

export default Domains;
