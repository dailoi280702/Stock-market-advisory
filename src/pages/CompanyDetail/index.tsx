import CompanyOverview from 'components/CompanyOverview';
import { useLoaderData, useParams } from 'react-router-dom';

const CompanyDetail = () => {
  const { symbol } = useParams();
  const data = useLoaderData() as CompanyOverview;
  data.Symbol = symbol ? symbol : 'IBM';

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4">
      <CompanyOverview data={data} />
    </div>
  );
};

export default CompanyDetail;
