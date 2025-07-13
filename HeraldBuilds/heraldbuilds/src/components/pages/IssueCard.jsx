export default function IssueCard({ issue }) {
  return (
    <div className="issue-card">
      <h3 className="issue-title">
        <i
          className="fa-solid fa-triangle-exclamation"
          style={{ color: "#FFD43B" }}
        ></i>{" "}
        {issue.title}
      </h3>
      <p className={`severity ${issue.severity.toLowerCase()}`}>
        <strong>Severity:</strong> {issue.severity}
      </p>

      <h4 className="symptom-header">Symptoms:</h4>
      <ul className="symptom-list">
        {issue.commonSymptoms.map((s, i) => (
          <li key={i}>
            <span className="symptom-tag">{s}</span>
          </li>
        ))}
      </ul>

      <h4 className="solutions-header">Solutions:</h4>
      <ol className="solution-list">
        {issue.solutions.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </div>
  );
}
