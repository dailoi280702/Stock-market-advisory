type Props = {
  data: CompanyOverview;
};

const CompanyBasicInfo = ({ data }: Props) => {
  return (
    <>
      <h3 className="font-medium text-2xl mb-4">Basic Information</h3>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="mb-4">
          <p className="mb-2">
            <span className="font-bold text-gray-800">Symbol:</span> {data.Symbol}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Name:</span> {data.Name}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">CIK:</span> {data.CIK}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Exchange:</span> {data.Exchange}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Currency:</span> {data.Currency}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Country:</span> {data.Country}
          </p>
        </div>
        <div className="mb-4">
          <p className="mb-2">
            <span className="font-bold text-gray-800">Sector:</span> {data.Sector}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Industry:</span> {data.Industry}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Address:</span> {data.Address}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Fiscal Year End:</span> {data.FiscalYearEnd}
          </p>
          <p className="mb-2">
            <span className="font-bold text-gray-800">Latest Quarter:</span> {data.LatestQuarter}
          </p>
        </div>
      </div>
      <p className="text-gray-800 mb-4">
        <span className="font-bold">Description:</span> {data.Description}
      </p>
    </>
  );
};

export default CompanyBasicInfo;
