import { InformationCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { RunningCalculations } from 'hooks/useCompareTickers';
import { HtmlHTMLAttributes } from 'react';
import { Tooltip } from 'react-tooltip';

type Props = {
  calculations: RunningCalculations;
} & HtmlHTMLAttributes<HTMLDivElement>;

const getRandomValue = (options: string[]) => {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
};

const AnalyticsStament = ({ calculations, ...divProps }: Props) => {
  const generateFakeData = () => {
    const symbols = Object.keys(calculations);
    const fakeData: { [symbol: string]: { decision: string; risk: string; analysis: string } } = {};

    symbols.forEach((symbol) => {
      const lastDate = Object.keys(calculations[symbol]).pop();
      const lastMean = calculations[symbol][lastDate!];

      const decision = lastMean > 0 ? 'Buy' : lastMean < 0 ? 'Sell' : 'Hold';

      const riskOptions = ['Low', 'Medium', 'High'];
      const analysisOptions = ['Outperforming', 'Neutral', 'Underperforming'];

      const risk = getRandomValue(riskOptions);
      const analysis = getRandomValue(analysisOptions);

      fakeData[symbol] = { decision, risk, analysis };
    });

    return fakeData;
  };

  const fakeData = generateFakeData();

  const betterInvestment = Object.keys(fakeData).reduce((better, symbol) => {
    if (!better || fakeData[symbol].decision === 'Buy') {
      return symbol;
    }

    const currentRisk = fakeData[symbol].risk;
    const currentDecision = fakeData[symbol].decision;

    const betterRisk = fakeData[better].risk;
    const betterDecision = fakeData[better].decision;

    if (
      (currentDecision === 'Buy' && betterDecision !== 'Buy') ||
      (currentDecision === 'Hold' && betterDecision === 'Sell') ||
      (currentDecision === 'Hold' &&
        betterDecision === 'Hold' &&
        currentRisk === 'Low' &&
        betterRisk !== 'Low')
    ) {
      return symbol;
    }

    return better;
  }, null as string | null);

  return (
    <div {...divProps}>
      <div className="flex items-center gap-2 mb-4">
        <SparklesIcon className="w-6 h-6 stroke-2 text-fuchsia-600" />
        <h2 className="text-lg font-semibold">Analytics Summary</h2>

        <div className="flex-1" />
        <InformationCircleIcon
          className="w-5 h-5 stroke-2 text-neutral-600"
          data-tooltip-id="analytics-summary-info"
        />

        <Tooltip
          id="analytics-summary-info"
          content="Please note that this is AI generated recommendation and is still an experimental feature. Best effort is used for this. We are not responsible for any losses."
        />
      </div>
      {Object.keys(fakeData).map((symbol) => (
        <div key={symbol} className="mb-4">
          <h3 className="text-md font-semibold">{symbol}</h3>
          <p>
            {`Based on recent trends, the decision for ${symbol} is to ${fakeData[
              symbol
            ].decision.toLowerCase()}. This comes with a ${fakeData[
              symbol
            ].risk.toLowerCase()} risk assessment and a comparative analysis suggesting it is ${fakeData[
              symbol
            ].analysis.toLowerCase()}.`}
          </p>
        </div>
      ))}
      {betterInvestment && (
        <p className="mt-4">
          <span className="font-medium text-fuchsia-600">Our recommendation:</span>{' '}
          {`Considering the decisions, ${betterInvestment} is considered the better investment.`}
        </p>
      )}
    </div>
  );
};

export default AnalyticsStament;
