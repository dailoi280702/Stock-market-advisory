import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';

type Props = {
  data: CompanyOverview;
};

const CompanyOverview = ({ data }: Props) => {
  const [activeTabs, setActiveTabs] = useState<Set<string>>(new Set(['basic', 'performance']));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isMenuOpen]);

  const tabs = [
    { id: 'basic', label: 'Basic Information' },
    { id: 'financial', label: 'Financial Metrics' },
    { id: 'statements', label: 'Financial Statements' },
    { id: 'performance', label: 'Stock Performance' },
    { id: 'valuation', label: 'Valuation Ratios' },
    { id: 'analyst', label: 'Analyst Recommendations' },
    { id: 'activity', label: 'Recent Stock Activity' }
  ];

  const renderTabContent = (id: string) => {
    switch (id) {
      case 'basic':
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
                  <span className="font-bold text-gray-800">Fiscal Year End:</span>{' '}
                  {data.FiscalYearEnd}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Latest Quarter:</span>{' '}
                  {data.LatestQuarter}
                </p>
              </div>
            </div>
            <p className="text-gray-800 mb-4">
              <span className="font-bold">Description:</span> {data.Description}
            </p>
          </>
        );
      case 'financial':
        return (
          <>
            <h3 className="font-medium text-2xl mb-4">Financial Metrics</h3>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="mb-4">
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Market Cap:</span>{' '}
                  {data.MarketCapitalization}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">EBITDA:</span> {data.EBITDA}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">P/E Ratio:</span> {data.PERatio}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">PEG Ratio:</span> {data.PEGRatio}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Book Value:</span> {data.BookValue}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Dividend Per Share:</span>{' '}
                  {data.DividendPerShare}
                </p>
              </div>
              <div className="mb-4">
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Dividend Yield:</span>{' '}
                  {data.DividendYield}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">EPS:</span> {data.EPS}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Revenue Per Share (TTM):</span>{' '}
                  {data.RevenuePerShareTTM}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Profit Margin:</span>{' '}
                  {data.ProfitMargin}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Operating Margin (TTM):</span>{' '}
                  {data.OperatingMarginTTM}
                </p>
              </div>
            </div>
          </>
        );

      case 'statements':
        return (
          <>
            <h3 className="font-medium text-2xl mb-4">Financial Statements</h3>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="mb-4">
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Revenue (TTM):</span> {data.RevenueTTM}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Gross Profit (TTM):</span>{' '}
                  {data.GrossProfitTTM}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Diluted EPS (TTM):</span>{' '}
                  {data.DilutedEPSTTM}
                </p>
              </div>
              <div className="mb-4">
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Quarterly Earnings Growth (YoY):</span>{' '}
                  {data.QuarterlyEarningsGrowthYOY}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Quarterly Revenue Growth (YoY):</span>{' '}
                  {data.QuarterlyRevenueGrowthYOY}
                </p>
              </div>
            </div>
          </>
        );

      case 'performance':
        return (
          <>
            <h3 className="font-medium text-2xl mb-4">Stock Performance</h3>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="mb-4">
                <p className="mb-2">
                  <span className="font-bold text-gray-800">52-Week High:</span>{' '}
                  {data['52WeekHigh']}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">52-Week Low:</span> {data['52WeekLow']}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">50-Day Moving Average:</span>{' '}
                  {data['50DayMovingAverage']}
                </p>
              </div>
              <div className="mb-4">
                <p className="mb-2">
                  <span className="font-bold text-gray-800">200-Day Moving Average:</span>{' '}
                  {data['200DayMovingAverage']}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Shares Outstanding:</span>{' '}
                  {data.SharesOutstanding}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Beta:</span> {data.Beta}
                </p>
              </div>
            </div>
          </>
        );

      case 'valuation':
        return (
          <>
            <h3 className="font-medium text-2xl mb-4">Valuation Ratios</h3>
            <div className="grid grid-cols-2 gap-x-4">
              <div className="mb-4">
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Trailing P/E Ratio:</span>{' '}
                  {data.TrailingPE}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Forward P/E Ratio:</span>{' '}
                  {data.ForwardPE}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Price-to-Sales Ratio (TTM):</span>{' '}
                  {data.PriceToSalesRatioTTM}
                </p>
              </div>
              <div className="mb-4">
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Price-to-Book Ratio:</span>{' '}
                  {data.PriceToBookRatio}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Enterprise Value to Revenue:</span>{' '}
                  {data.EVToRevenue}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-800">Enterprise Value to EBITDA:</span>{' '}
                  {data.EVToEBITDA}
                </p>
              </div>
            </div>
          </>
        );

      case 'analyst':
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

      case 'activity':
        return (
          <>
            <h3 className="font-medium text-2xl mb-4">Recent Stock Activity</h3>
            <div className="mb-4">
              <p className="mb-2">
                <span className="font-bold text-gray-800">Dividend Date:</span> {data.DividendDate}
              </p>
              <p className="mb-2">
                <span className="font-bold text-gray-800">Ex-Dividend Date:</span>{' '}
                {data.ExDividendDate}
              </p>
              {/* Add other recent stock activity fields */}
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const toggleTab = (id: string) => {
    setActiveTabs((prevTabs) => {
      const newTabs = new Set(prevTabs);

      if (newTabs.has(id)) {
        newTabs.delete(id);
      } else {
        newTabs.add(id);
      }

      if (newTabs.size === 0) {
        newTabs.add('basic');
      }

      return newTabs;
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="relative" ref={menuRef}>
        <button
          className="font-medium rounded-lg text-sm px-4 h-10 text-center inline-flex items-center hover:bg-neutral-200 border border-neutral-300"
          type="button"
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          <p>Overview</p>
          <ChevronDownIcon className="ml-2 h-4 w-4 stroke-2" />
        </button>

        {isMenuOpen && (
          <div className="absolute top-full mt-2 z-10 w-48 bg-white divide-y divide-neutral-300 border border-gray-300 rounded-lg shadow">
            <ul className="p-3 space-y-3 text-sm">
              {tabs.map((tab) => (
                <li key={tab.id}>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-neutral-100 border-gray-300 rounded"
                      checked={activeTabs.has(tab.id)}
                      onChange={() => toggleTab(tab.id)}
                    />
                    <label
                      className="ms-2 text-sm font-medium text-neutral-600"
                      onClick={() => toggleTab(tab.id)}
                    >
                      {tab.label}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        {tabs
          .filter((tab) => activeTabs.has(tab.id))
          .map((tab) => (
            <div
              key={tab.id}
              className="rounded-lg h-8 bg-neutral-200 flex items-center pl-4 pr-3 gap-2"
            >
              {tab.label}
              <button
                onClick={() => toggleTab(tab.id)}
                className="p-1 rounded-full hover:bg-neutral-300"
              >
                <XMarkIcon className="h-4 w-4 stroke-2" />
              </button>
            </div>
          ))}
      </div>

      <div className="mt-8 flex flex-col gap-8">
        {tabs
          .filter((tab) => activeTabs.has(tab.id))
          .map((tab) => (
            <div key={tab.id}>{renderTabContent(tab.id)}</div>
          ))}
      </div>
    </div>
  );
};

export default CompanyOverview;
