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

const Home = () => {
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
  useEffect(() => {
    loadCenter();
  }, []);
  const loadCenter = async () => {
    const res = await apiGetAllCenter(2, 0);
    if (res.success) {
      setCenters(res.centers.rows);
    }
  };
  return (
    <PublicLayout>
      <main className="max-w-[1200px] mt-[50px] mx-auto">
        <div className="w-2/3 mx-auto">
          <Slide settings={settings}></Slide>
        </div>
        <div className=" w-2/3 mt-[50px] mx-auto flex items-center justify-between flex-wrap gap-x-[10px] gap-y-[20px]">
          {categories.map((item, index) => (
            <Link key={index} to={item.link}>
              <Card className="mt-6 w-56">
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
        <div className="mt-[50px] w-2/3 mx-auto rounded-md bg-white py-[25px] px-[20px]">
          <div className="flex items-center justify-between">
            <h2 className="uppercase font-medium">
              Danh sách trung tâm đăng kiểm
            </h2>
            <Link to="/centers">
              <div className="text-sm hover:text-main flex items-center gap-x-[10px]">
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
        <div className="mt-[50px] w-2/3 mx-auto rounded-md bg-white py-[25px] px-[20px]">
          <div className="flex items-center justify-between">
            <h2 className="uppercase font-medium">Tin tức</h2>
            <Link to="">
              <div className="text-sm hover:text-main flex items-center gap-x-[10px]">
                <span>Xem tât cả</span>
                <FaChevronCircleRight className="text-base -translate-y-[1px]" />
              </div>
            </Link>
          </div>
          <div className="mt-5 flex  justify-around flex-wrap">
            <Card className="w-[22rem] overflow-hidden">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none w-full"
              >
                <img
                  className="w-full h-full object-cover"
                  src="https://images2.thanhnien.vn/thumb_w/640/528068263637045248/2023/3/24/edit-dang-kiem-moi-1-1679626264764657096428.png"
                  alt=""
                />
              </CardHeader>
              <CardBody className="p-4">
                <Typography variant="h5" color="blue-gray">
                  Từ ngày 15/02/2024, áp dụng quy định mới về đăng kiểm ô tô,
                  chủ xe cần biết
                </Typography>
                <Tooltip content="Ngày đăng">
                  <Typography className="font-normal inline-block mt-4 text-sm">
                    23/02/2024
                  </Typography>
                </Tooltip>
              </CardBody>
            </Card>
            <Card className="w-[22rem] overflow-hidden">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="m-0 rounded-none"
              >
                <img
                  src="https://baogiaothong.mediacdn.vn/603483875699699712/2024/2/3/3dc97821d5877fc57cb246304efbf028-17069318006261624489448.jpg"
                  alt=""
                />
              </CardHeader>
              <CardBody className="p-4">
                <Typography variant="h5" color="blue-gray">
                  Mua ô tô cũ biển trắng chuyển sang biển vàng có cần đăng kiểm
                  lại?
                </Typography>
                <Tooltip content="Ngày đăng">
                  <Typography className="font-normal inline-block mt-4 text-sm">
                    25/01/2024
                  </Typography>
                </Tooltip>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
};

export default Home;
