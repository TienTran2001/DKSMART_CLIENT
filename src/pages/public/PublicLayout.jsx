import { Footer, Header } from '~/components';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PublicLayout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-main-gray">
      <Header navigate={navigate} />
      {children}
      <div className="bg-white mt-[50px]">
        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
