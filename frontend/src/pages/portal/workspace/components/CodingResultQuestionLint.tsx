function CodingResultQuestionLint({ lint }: { lint: string }) {
  const sortedResults = JSON.parse(lint)?.results.sort(
    (a: { line: string }, b: { line: string }) =>
      parseInt(a.line) - parseInt(b.line),
  )

  return (
    <div className="flex flex-col gap-2">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">Line</th>
            <th className="border border-gray-300 p-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {sortedResults.map(
            (result: { line: string; description: string }, index: number) => (
              <tr key={index} className="border-b">
                <td className="border border-gray-300 p-2 text-center">
                  {result.line}
                </td>
                <td className="border border-gray-300 p-2">
                  {result.description}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  )
}

export default CodingResultQuestionLint
