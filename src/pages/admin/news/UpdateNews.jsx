import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { useParams } from 'react-router-dom';
import SelectForm from '~/components/inputs/SelectForm';
import { apiGetNews, apiUpdateNews } from '~/apis/news';
import InputEditor from '~/components/inputs/InputEditor';
import { formatDate } from '~/utils/contants';

// eslint-disable-next-line react/prop-types
const UpdateNews = () => {
  const { newsId } = useParams();
  const [loading, setLoading] = useState(false);
  const [initValue, setInitValue] = useState('');

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    getNews(newsId);
  }, []);

  const getNews = async (newsId) => {
    const response = await apiGetNews(newsId);
    if (response.success) {
      const { news } = response;
      setValue('title', news.title);
      setInitValue(news.content);
      setValue('imageUrl', news.imageUrl);
      setValue('content', news.content);
      setValue('source', news.source);
      setValue('createdAt', formatDate(news.createdAt));
      const sta = news.status === 'ẩn' ? '1' : '2';
      setValue('status', sta);
    }
  };

  const handleUpdateNews = async (data) => {
    const payload = {
      title: data.title,
      content: data.content,
      source: data.source,
      imageUrl: data.imageUrl,
      status: data.status,
    };

    console.log(payload);
    setLoading(true);
    const response = await apiUpdateNews(payload, newsId);
    setLoading(false);
    if (response.success) {
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: response.message,
        showConfirmButton: true,
        confirmButtonText: 'Thoát',
      }).then((isConfirm) => {
        if (isConfirm) {
          //
        }
      });
    } else toast.error(response.message);
  };

  return (
    <div className=" mx-auto md:h-auto">
      <h1 className="text-2xl mb-5  font-bold">Cập nhật tin tức</h1>
      <div className="w-full h-full bg-white rounded-lg md:shadow  md:mt-0 ">
        <form className="p-6  sm:p-8">
          <div className="space-y-8 ">
            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
              <InputForm
                label="*Tiêu đề"
                register={register}
                id="title"
                placeholder="Nhập tiêu đề"
                containerClassName="w-full"
                validate={{
                  required: 'Tiêu đề không được bỏ trống.',
                }}
                errors={errors}
              />
            </div>
            <div className="">
              <InputEditor
                label="*Nội dung"
                id="content"
                setValue={setValue}
                initialValue={initValue}
                register={register}
                validate={{
                  required: 'Nội dung không được bỏ trống.',
                }}
                errors={errors}
              />
            </div>
            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
              <InputForm
                label="Ảnh thumbnail"
                register={register}
                id="imageUrl"
                placeholder="Link ảnh"
                containerClassName="w-full"
                validate={{}}
                errors={errors}
              />
            </div>
            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
              <InputForm
                label="Nguồn"
                register={register}
                id="source"
                placeholder="Dẫn nguồn"
                containerClassName="w-full"
                validate={
                  {
                    // required: 'Tiêu đề không được bỏ trống.',
                  }
                }
                errors={errors}
              />
            </div>

            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
              <SelectForm
                label="Trạng thái"
                value="2"
                id="status"
                register={register}
                validate={{
                  required: 'Trạng thái không được bỏ trống.',
                }}
                errors={errors}
              >
                <option value="" className="!py-2" disabled>
                  Chọn trạng thái
                </option>
                <option value="2">Công khai</option>
                <option value="1">Ẩn</option>
              </SelectForm>
            </div>
            <div className="md:flex md:w-1/3 block space-y-[10px] md:space-y-0 md:space-x-6  justify-between">
              <InputForm
                label="Ngày đăng"
                register={register}
                id="createdAt"
                placeholder=""
                readOnly
                containerClassName="w-full"
                inputClassName="cursor-not-allowed"
                validate={
                  {
                    // required: 'Tiêu đề không được bỏ trống.',
                  }
                }
                errors={errors}
              />
            </div>

            <ButtonDefault
              disable={loading}
              className="bg-main"
              onClick={handleSubmit(handleUpdateNews)}
            >
              Cập nhật tin tức
            </ButtonDefault>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateNews;
