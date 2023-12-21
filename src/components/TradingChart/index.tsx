import { useTradingData } from 'hooks/useTradingData';

type Props = {
  symbol: string;
} & React.HtmlHTMLAttributes<HTMLDivElement>;

const TradingChart = (props: Props) => {
  const { tradingData } = useTradingData(props.symbol);

  if (tradingData.state === 'success') {
    return <div {...props}>{JSON.stringify(tradingData.data)}</div>;
  }

  return null;
};

export default TradingChart;
