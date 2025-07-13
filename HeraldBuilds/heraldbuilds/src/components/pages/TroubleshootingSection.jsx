import { useEffect, useState } from "react";
import IssueCard from "./IssueCard";

export default function TroubleshootingSection({ file, title }) {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetch(`/${file}`)
      .then((res) => res.json())
      .then((data) => setIssues(data));
  }, [file]);

  return (
    <section>
      <h2 className="section-title">{title}</h2>
      {issues.map((issue, index) => (
        <IssueCard key={index} issue={issue} />
      ))}
    </section>
  );
}
