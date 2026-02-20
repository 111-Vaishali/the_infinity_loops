const FixesTable = ({ fixes }) => {
  if (!fixes || fixes.length === 0) return null;

  return (
    <div className="card fixes-table">
      <h3>Fixes Applied</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>File</th>
              <th>Bug Type</th>
              <th>Line</th>
              <th>Commit Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {fixes.map((fix, index) => (
              <tr key={index} className={fix.status === "Fixed" ? "row-success" : "row-error"}>
                <td className="file-name">{fix.file}</td>
                <td>
                  <span className={`bug-type ${fix.bug_type.toLowerCase()}`}>
                    {fix.bug_type}
                  </span>
                </td>
                <td className="line-number">{fix.line}</td>
                <td className="commit-msg">{fix.commit_message}</td>
                <td>
                  <span className={`status-badge ${fix.status === "Fixed" ? "success" : "error"}`}>
                    {fix.status === "Fixed" ? "✓ Fixed" : "✗ Failed"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FixesTable;
