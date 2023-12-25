import { ChevronDownIcon } from '@heroicons/react/24/solid';
import TradingChart, { ChartType } from 'components/TradingChart';
import { TradingPeriod, useTradingData } from 'hooks/useTradingData';
import { useEffect, useRef, useState } from 'react';
import { Tooltip } from 'react-tooltip';

type Props = {
  data: CompanyOverview;
};

type PeriodDropdownDrop = {
  period: TradingPeriod;
  setPeriod: (period: TradingPeriod) => void;
};

const PeriodDropdown = ({ period: period, setPeriod }: PeriodDropdownDrop) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMenuOpen]);

  const periods: { label: string; preriod: TradingPeriod }[] = [
    { label: 'Daily', preriod: 'daily' },
    { label: 'Weekly', preriod: 'weekly' },
    { label: 'Monthly', preriod: 'monthly' }
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="font-medium rounded-lg text-sm px-4 h-10 text-center inline-flex items-center hover:bg-neutral-200 border border-neutral-300"
        type="button"
        onClick={() => setIsMenuOpen((value) => !value)}
      >
        <p>{periods.find((p) => period === p.preriod)?.label}</p>
        <ChevronDownIcon className="ml-2 h-4 w-4 stroke-2" />
      </button>

      {isMenuOpen && (
        <div className="absolute top-full mt-2 z-10 w-48 bg-white divide-y divide-neutral-300 border border-gray-300 rounded-lg shadow">
          <ul className="text-sm py-3">
            {periods.map((p) => (
              <li
                key={p.preriod}
                onClick={() => {
                  setPeriod(p.preriod);
                  setIsMenuOpen(false);
                }}
                className={`px-3 py-2 cursor-pointer ${
                  period === p.preriod ? 'bg-neutral-200' : ''
                }`}
              >
                <p className="ms-2 text-sm font-medium text-neutral-600">{p.label}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

type ChartTypeDropdownProps = {
  type: ChartType;
  setChartType: (type: ChartType) => void;
};

const ChartTypeDropdown = ({ type, setChartType }: ChartTypeDropdownProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMenuOpen]);

  const types: { label: string; type: ChartType }[] = [
    { label: 'Stock Price', type: 'stockPrice' },
    { label: 'Total Volume', type: 'companyVolume' }
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="font-medium rounded-lg text-sm px-4 h-10 text-center inline-flex items-center hover:bg-neutral-200 border border-neutral-300"
        type="button"
        onClick={() => setIsMenuOpen((value) => !value)}
      >
        <p>{types.find((p) => type === p.type)?.label}</p>
        <ChevronDownIcon className="ml-2 h-4 w-4 stroke-2" />
      </button>

      {isMenuOpen && (
        <div className="absolute top-full mt-2 z-10 w-48 bg-white divide-y divide-neutral-300 border border-gray-300 rounded-lg shadow">
          <ul className="text-sm py-3">
            {types.map((t) => (
              <li
                key={t.type}
                onClick={() => {
                  setChartType(t.type);
                  setIsMenuOpen(false);
                }}
                className={`px-3 py-2 cursor-pointer ${type === t.type ? 'bg-neutral-200' : ''}`}
              >
                <p className="ms-2 text-sm font-medium text-neutral-600">{t.label}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const CompanyPerformance = ({ data }: Props) => {
  const { tradingData, period, setPeriod } = useTradingData('IBM'); // Use the symbol from CompanyOverview
  const [chartType, setChartType] = useState<ChartType>('stockPrice');

  return (
    <>
      <h3 className="font-medium text-2xl mb-4">Stock Performance</h3>

      <div className="flex items-center mb-4 gap-4">
        <PeriodDropdown period={period} setPeriod={setPeriod} />
        <ChartTypeDropdown type={chartType} setChartType={setChartType} />
      </div>

      {tradingData.state === 'loading' && (
        <div className="h-96 w-full mb-4 text-center">Loading data, please wait...</div>
      )}

      {tradingData.state === 'success' && (
        <TradingChart tradingdata={tradingData.data} className="h-96 mb-4" chartType={chartType} />
      )}

      <div className="grid grid-cols-2 gap-x-4">
        <div className="mb-4">
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="52-week-high-tooltip"
              data-tooltip-content="The highest trading price of the stock in the last 52 weeks."
              data-tooltip-place="top-start"
            >
              52-Week High:
            </span>{' '}
            {data['52WeekHigh']} {data.Currency}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="52-week-low-tooltip"
              data-tooltip-content="The lowest trading price of the stock in the last 52 weeks."
              data-tooltip-place="top-start"
            >
              52-Week Low:
            </span>{' '}
            {data['52WeekLow']} {data.Currency}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="50-day-moving-average-tooltip"
              data-tooltip-content="The average closing price of the stock over the last 50 trading days."
              data-tooltip-place="top-start"
            >
              50-Day Moving Average:
            </span>{' '}
            {data['50DayMovingAverage']} {data.Currency}
          </p>
        </div>

        {/* Additional Financial Metrics */}
        <div className="mb-4">
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="200-day-moving-average-tooltip"
              data-tooltip-content="The average closing price of the stock over the last 200 trading days."
              data-tooltip-place="top-start"
            >
              200-Day Moving Average:
            </span>{' '}
            {data['200DayMovingAverage']} {data.Currency}
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="shares-outstanding-tooltip"
              data-tooltip-content="The total number of shares of the company's stock currently held by all shareholders."
              data-tooltip-place="top-start"
            >
              Shares Outstanding:
            </span>{' '}
            {data.SharesOutstanding.toLocaleString()} shares
          </p>
          <p className="mb-2">
            <span
              className="font-bold text-gray-800"
              data-tooltip-id="beta-tooltip"
              data-tooltip-content="Beta measures the stock's volatility in relation to the overall market."
              data-tooltip-place="top-start"
            >
              Beta:
            </span>{' '}
            {data.Beta}
          </p>
        </div>
      </div>

      <Tooltip id="52-week-high-tooltip" />
      <Tooltip id="52-week-low-tooltip" />
      <Tooltip id="50-day-moving-average-tooltip" />
      <Tooltip id="200-day-moving-average-tooltip" />
      <Tooltip id="shares-outstanding-tooltip" />
      <Tooltip id="beta-tooltip" />
    </>
  );
};

export default CompanyPerformance;
