import { PublicLayout } from '.';
import { useEffect, useState } from 'react';

import { Button, Tooltip } from '@material-tailwind/react';

import { IoArrowBackSharp } from 'react-icons/io5';

import { apiGetAllNews } from '~/apis/news';
import { Typography } from '@material-tailwind/react';
import { formatDate } from '~/utils/contants';

// eslint-disable-next-line react/prop-types
const NewsList = ({ navigate }) => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const [news, setNews] = useState([]);

  const limit = 6;

  useEffect(() => {
    loadNews('công khai', limit, 0);
  }, []);

  const loadNews = async (status, limit, page) => {
    const response = await apiGetAllNews({ status, limit, page });
    if (response.success) {
      console.log(response.news.rows);
      setNews(response.news.rows);
      setTotalPage(response.totalPage);
    }
  };

  return (
    <>
      <PublicLayout>
        <div className="min-h-screen max-w-[1200px] md:mx-auto">
          <div className="mt-[50px] md:w-2/3 mx-auto rounded-md bg-white py-[25px] px-[20px]">
            <div className="relative">
              <button onClick={() => navigate('/')}>
                <span className="absolute top-[25px] cursor-pointer">
                  <IoArrowBackSharp size={22} className="text-main  " />
                </span>
              </button>
              <h2 className="font-semibold uppercase text-center text-main">
                Tin tức
              </h2>
            </div>

            <div className="  mt-[50px] mx-auto flex flex-col gap-y-5">
              {news.map((item) => (
                <div
                  key={item.newsId}
                  className="w-full h-[200px] rounded-md flex space-x-3 overflow-hidden cursor-pointer bg-gray-100"
                  onClick={() => navigate(`/news-detail/${item.newsId}`)}
                >
                  <div className="m-0 rounded-none w-[40%]">
                    <img
                      className="w-full h-full object-cover"
                      src={item?.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="w-[60%] p-4">
                    <Typography variant="h5" color="blue-gray">
                      <div className=" line-clamp-2">{item.title}</div>
                    </Typography>
                    <Tooltip content="Ngày đăng">
                      <Typography className="font-normal inline-block mt-4 text-sm">
                        {formatDate(item.createdAt)}
                      </Typography>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <div className="font-normal">
                {page} / {totalPage}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outlined"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => {
                    const x = page - 1;
                    loadNews('công khai', limit, x - 1);
                    setPage(page - 1);
                  }}
                >
                  Trước
                </Button>
                <Button
                  variant="outlined"
                  size="sm"
                  disabled={page >= totalPage ? true : false}
                  onClick={() => {
                    loadNews('công khai', limit, page);
                    setPage(page + 1);
                  }}
                >
                  Tiếp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PublicLayout>
    </>
  );
};

export default NewsList;
