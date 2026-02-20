const FixesTable = ({ fixes }) => {
  if (!fixes || fixes.length === 0) return null;

const FixesTable = ({ fixes }) => {
  if (!fixes || fixes.length === 0) return null;

  return (
    <div className="card fixes-table">
      <div className="card-header">
        <svg className="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
        </svg>
        <h3>Fixes Applied</h3>
      </div>
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
};
export default FixesTable;
