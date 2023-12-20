type Props = {
  data: CompanyOverview;
};

const CompanyActivity = ({ data }: Props) => {
  return (
    <>
      <h3 className="font-medium text-2xl mb-4">Recent Stock Activity</h3>
      <div className="mb-4">
        <p className="mb-2">
          <span className="font-bold text-gray-800">Dividend Date:</span> {data.DividendDate}
        </p>
        <p className="mb-2">
          <span className="font-bold text-gray-800">Ex-Dividend Date:</span> {data.ExDividendDate}
        </p>
        {/* Add other recent stock activity fields */}
      </div>
    </>
  );
};

export default CompanyActivity;
