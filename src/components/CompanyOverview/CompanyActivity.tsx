import { Tooltip } from 'react-tooltip';

type Props = {
  data: CompanyOverview;
};

const CompanyActivity = ({ data }: Props) => {
  return (
    <>
      <h3 className="font-medium text-2xl mb-4">Recent Stock Activity</h3>
      <div className="mb-4">
        <p className="mb-2">
          <span
            className="font-bold text-gray-800"
            data-tooltip-id="dividend-date-tooltip"
            data-tooltip-content="The date on which the company's dividend is scheduled to be paid."
            data-tooltip-place="top-start"
          >
            Dividend Date:
          </span>{' '}
          {data.DividendDate}
        </p>
        <p className="mb-2">
          <span
            className="font-bold text-gray-800"
            data-tooltip-id="ex-dividend-date-tooltip"
            data-tooltip-content="The first day on which the stock trades without the right to receive the upcoming dividend payment."
            data-tooltip-place="top-start"
          >
            Ex-Dividend Date:
          </span>{' '}
          {data.ExDividendDate}
        </p>
        {/* Add other recent stock activity fields */}
      </div>

      <Tooltip id="dividend-date-tooltip" />
      <Tooltip id="ex-dividend-date-tooltip" />
      {/* Add more tooltips for other fields */}
    </>
  );
};

export default CompanyActivity;
