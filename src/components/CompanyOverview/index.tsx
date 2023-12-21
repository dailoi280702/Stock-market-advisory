import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import CompanyBasicInfo from './CompanyBasicInfo';
import CompanyFinancialInfo from './CompanyFinacialInfo';
import CompanyStatement from './CompanyStatement';
import CompanyPerformance from './CompanyPerformance';
import CompanyValuation from './CompanyValuation';
import CompanyAnalyst from './CompanyAnalyst';
import CompanyActivity from './CompanyActivity';
import { useWishList } from 'hooks/useWishlist';

type Props = {
  data: CompanyOverview;
};

const CompanyOverview = ({ data }: Props) => {
  const { subcribe, unsubcribe, wishlist } = useWishList();
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
        return <CompanyBasicInfo data={data} />;
      case 'financial':
        return <CompanyFinancialInfo data={data} />;
      case 'statements':
        return <CompanyStatement data={data} />;
      case 'performance':
        return <CompanyPerformance data={data} />;
      case 'valuation':
        return <CompanyValuation data={data} />;
      case 'analyst':
        return <CompanyAnalyst data={data} />;
      case 'activity':
        return <CompanyActivity data={data} />;
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
      <div className="flex justify-between items-center">
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

        {wishlist.state == 'success' ? (
          wishlist.data.length && wishlist.data.includes(data.Symbol) ? (
            <button
              onClick={() => unsubcribe(data.Symbol)}
              className="rounded-full h-10 px-4 text-sm font-medium hover:bg-neutral-200 text-red-600"
            >
              Remove from wishlist
            </button>
          ) : (
            <button
              onClick={() => subcribe(data.Symbol)}
              className="rounded-full h-10 px-4 text-sm font-medium hover:bg-neutral-200 text-blue-600"
            >
              Add to wishlist
            </button>
          )
        ) : null}
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
