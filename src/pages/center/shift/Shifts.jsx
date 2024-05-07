import { useState, useEffect } from 'react';
import { Typography, IconButton, Tooltip } from '@material-tailwind/react';
import { IoPencilSharp } from 'react-icons/io5';
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import ButtonDefault from '~/components/commons/ButtonDefault';
import { apiDeleteShift, apiGetAllShift } from '~/apis/shift';
import { formatTime } from '~/utils/contants';

const TABLE_HEAD = ['Số thứ tự', 'Bắt đầu', 'Kết thúc', 'Thao tác'];

// eslint-disable-next-line react/prop-types
const Shifts = ({ navigate }) => {
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    loadShifts();
  }, []);

  const loadShifts = async () => {
    const response = await apiGetAllShift();
    console.log(response);
    if (response.success) {
      console.log(response);
      const { shifts } = response;
      setShifts(shifts.rows);
    }
  };

  const handleDeleteShift = async (shiftId) => {
    Swal.fire({
      title: '',
      text: 'Ban có chắc xóa ca này!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, xóa nó!',
      cancelButtonText: 'Thoát!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteShift(shiftId);
        if (response.success) {
          toast.success(response.message);
          loadShifts();
        } else toast.error(response.message);
      }
    });
  };

  return (
    <div className=" mx-auto md:h-auto">
      <h2 className=" mt-10 mb-5 text-2xl  font-bold">
        Danh sách ca đăng kiểm của trung tâm
      </h2>
      <div className="w-full  h-full bg-white mb-[100px] rounded-lg md:shadow ">
        <div className="flex pt-5 pr-7 justify-end gap-x-6">
          <ButtonDefault
            disable={false}
            variant="outlined"
            className=""
            onClick={() => loadShifts()}
          >
            Làm mới
          </ButtonDefault>
          <ButtonDefault
            disable={loading}
            className="bg-main"
            onClick={() => navigate(`/manage-center/create-shift`)}
          >
            Thêm ca
          </ButtonDefault>
        </div>
        <form className="p-0  ">
          <div className="space-y-8 ">
            <div className="md:flex block space-y-[10px] md:space-y-0 md:space-x-6 p-0  overflow-x-scroll justify-between">
              <table className="mt-2 w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shifts.map(({ shiftId, startTime, endTime }, index) => {
                    const classes = 'p-4 border-b border-blue-gray-50';

                    return (
                      <tr key={index}>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {index + 1}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {formatTime(startTime)}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {formatTime(endTime)}
                            </Typography>
                          </div>
                        </td>

                        <td className={classes}>
                          <Tooltip content="Sửa ca">
                            <IconButton
                              variant="text"
                              onClick={() =>
                                navigate(
                                  `/manage-center/update-shift/${shiftId}`
                                )
                              }
                            >
                              <IoPencilSharp className="text-xl" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip content="Xóa ca">
                            <IconButton
                              variant="text"
                              onClick={() => handleDeleteShift(shiftId)}
                            >
                              <AiFillDelete className="text-xl" />
                            </IconButton>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shifts;
