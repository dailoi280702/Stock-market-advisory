import { useLoaderData } from 'react-router-dom';
import CompanyOverview from '../../components/CompanyOverview';

const CompanyDetail = () => {
  const data = useLoaderData() as CompanyOverview;

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4">
      <CompanyOverview data={data} />
    </div>
  );
};

export default CompanyDetail;
