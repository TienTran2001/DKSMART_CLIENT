import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { InputForm } from '~/components';
import ButtonDefault from '~/components/commons/ButtonDefault';
import SelectForm from '~/components/inputs/SelectForm';
import InputEditor from '~/components/inputs/InputEditor';
import { apiAddNews } from '~/apis/news';

// eslint-disable-next-line react/prop-types
const AddNews = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm();

  const handleAddNews = async (data) => {
    console.log('data: ', data);
    const payload = {
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl,
      source: data.source,
      status: data.status,
    };
    setLoading(true);
    const response = await apiAddNews(payload);
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
          reset();
        }
      });
    } else toast.error(response.message);
  };

  useEffect(() => {}, []);

  return (
    <div className=" mx-auto md:h-auto">
      <h1 className="text-2xl mb-5  font-bold">Tạo tin tức</h1>
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
                validate={
                  {
                    // required: 'Tiêu đề không được bỏ trống.',
                  }
                }
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

            <ButtonDefault
              disable={loading}
              className="bg-main"
              onClick={handleSubmit(handleAddNews)}
            >
              Tạo tin tức
            </ButtonDefault>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNews;
