import CompanyOverview from 'components/CompanyOverview';
import { useLoaderData } from 'react-router-dom';

const CompanyDetail = () => {
  const data = useLoaderData() as CompanyOverview;

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4">
      <CompanyOverview data={data} />
    </div>
  );
};

export default CompanyDetail;
