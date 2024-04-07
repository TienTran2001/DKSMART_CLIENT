import Slide from '~/components/commons/Slide';
import { AiTwotoneClockCircle, AiTwotoneCar } from 'react-icons/ai';
import { GiMechanicGarage } from 'react-icons/gi';
import { FaChevronCircleRight } from 'react-icons/fa';

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Tooltip,
} from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import CardCenter from '~/components/commons/CardCenter';
import { Fragment, useEffect, useState } from 'react';
import { apiGetAllCenter } from '~/apis/center';
import { PublicLayout } from '.';
import { apiGetAllNews } from '~/apis/news';
import { formatDate } from '~/utils/contants';

const categories = [
  {
    name: 'Đặt lịch đăng kiểm',
    icon: <AiTwotoneClockCircle className="text-[130px]" />,
    link: '/booking',
  },
  {
    name: 'Trung tâm đăng kiểm',
    icon: <GiMechanicGarage className="text-[130px] text-[#E6e6e6]" />,
    link: '/centers',
  },
  {
    name: 'Hồ sơ phương tiện',
    icon: <AiTwotoneCar className="text-[130px] text-black" />,
    link: '/vehicles',
  },
];

// eslint-disable-next-line react/prop-types
const Home = ({ navigate }) => {
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: 'linear',
  };

  const [centers, setCenters] = useState([]);
  const [news, setNews] = useState([]);
  console.log(news);
  useEffect(() => {
    loadCenters('', 2, 0);
    loadNews('công khai', 2, 0);
  }, []);
  const loadCenters = async (name, limit, page) => {
    const response = await apiGetAllCenter({ name, limit, page });
    if (response.success) {
      setCenters(response.centers.rows);
    }
  };
  const loadNews = async (status, limit, page) => {
    const response = await apiGetAllNews({ status, limit, page });
    if (response.success) {
      setNews(response.news.rows);
    }
  };
  return (
    <PublicLayout>
      <main className="max-w-[1200px] mt-[50px] mx-auto">
        <div className="w-full md:w-2/3 mx-auto px-3 md:px-0">
          <Slide settings={settings}></Slide>
        </div>
        <div className="w-full md:w-2/3 px-3 md:px-0 mt-[50px] mx-auto flex items-center justify-center md:justify-between flex-wrap gap-x-[10px] gap-y-[20px]">
          {categories.map((item, index) => (
            <Link key={index} to={item.link}>
              <Card className="mt-6 w-64 md:w-56">
                <CardHeader
                  color="blue-gray"
                  className="relative h-32 flex items-center justify-center"
                >
                  {item.icon}
                </CardHeader>
                <CardBody>
                  <Typography variant="h6" color="blue-gray" className="mb-2">
                    {item.name}
                  </Typography>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
        {/* danh sách trung tâm */}
        <div className="mt-[50px] w-full md:w-2/3 mx-auto rounded-md bg-white py-[25px] px-[20px]">
          <div className="flex items-center justify-between">
            <h2 className="uppercase text-sm md:text-base font-medium">
              Danh sách trung tâm đăng kiểm
            </h2>
            <Link to="/centers">
              <div className="text-sm md:text-md hover:text-main flex items-center gap-x-[10px]">
                <span>Xem tât cả</span>
                <FaChevronCircleRight className="text-base -translate-y-[1px]" />
              </div>
            </Link>
          </div>

          <div className="  mt-[20px] mx-auto flex flex-col gap-y-5">
            {centers.map((center) => (
              <Fragment key={center.centerId}>
                <CardCenter center={center} />
              </Fragment>
            ))}
          </div>
        </div>
        {/* danh sách tin tức */}
        <div className="mt-[50px] w-full md:w-2/3   mx-auto rounded-md bg-white py-[25px] px-[20px]">
          <div className="flex items-center gap-y-3 md:gap-y-0 justify-between">
            <h2 className="uppercase text-sm md:text-base font-medium">
              Tin tức
            </h2>
            <Link to="/news-list">
              <div className="text-sm md:text-md hover:text-main flex items-center gap-x-[10px]">
                <span>Xem tât cả</span>
                <FaChevronCircleRight className="text-base -translate-y-[1px]" />
              </div>
            </Link>
          </div>
          <div className="mt-5 flex gap-5 justify-around flex-wrap">
            {news.map((item) => (
              <Card
                key={item.newsId}
                className="w-[22rem] overflow-hidden cursor-pointer"
                onClick={() => navigate(`/news-detail/${item.newsId}`)}
              >
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none h-[200px] w-full"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={item?.imageUrl}
                    alt=""
                  />
                </CardHeader>
                <CardBody className="p-4">
                  <Typography variant="h5" color="blue-gray">
                    <div className=" line-clamp-2">{item.title}</div>
                  </Typography>
                  <Tooltip content="Ngày đăng">
                    <Typography className="font-normal inline-block mt-4 text-sm">
                      {formatDate(item.createdAt)}
                    </Typography>
                  </Tooltip>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </PublicLayout>
  );
};

export default Home;
