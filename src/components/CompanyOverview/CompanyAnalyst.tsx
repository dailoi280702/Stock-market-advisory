type Props = {
  data: CompanyOverview;
};

const CompanyAnalyst = ({ data }: Props) => {
  return (
    <>
      <h3 className="font-medium text-2xl mb-4">Analyst Recommendations</h3>
      <div className="mb-4">
        <p className="mb-2">
          <span className="font-bold text-gray-800">Analyst Target Price:</span>{' '}
          {data.AnalystTargetPrice}
        </p>
        {/* Add other analyst recommendations fields */}
      </div>
    </>
  );
};

export default CompanyAnalyst;
