import { Footer, Header } from '~/components';

// eslint-disable-next-line react/prop-types
const PublicLayout = ({ children }) => {
  return (
    <div className="bg-main-gray">
      <Header />
      {children}
      <div className="bg-white mt-[50px]">
        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
