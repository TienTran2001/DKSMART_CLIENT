import React, { Fragment } from 'react';
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import Swal from 'sweetalert2';

import { FiChevronDown } from 'react-icons/fi';
import { MdChevronRight } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { IoMdLogOut } from 'react-icons/io';
import { ImProfile } from 'react-icons/im';
import { useUserStore } from '~/store/useUserStore';
import { GiHomeGarage } from 'react-icons/gi';

// eslint-disable-next-line react/prop-types
export default function AdminSidebarMain({ navigate, navSidebar = [], rou }) {
  const [open, setOpen] = React.useState(0);
  const { current } = useUserStore();

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const handleLogout = () => {
    Swal.fire({
      title: '',
      text: 'Bạn muốn đăng xuất!',
      showCancelButton: true,
      confirmButtonColor: '#0000FF',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đăng xuất',
      cancelButtonText: 'Đóng!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('dksmart');
        navigate('');
        window.location.reload();
      }
    });
  };
  return (
    <Card className="min-h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" className="text-main font-bold">
          DKSMART
        </Typography>
      </div>
      <div className="py-5 px-4 font-bold text-base rounded-xl text-center bg-[#edeff1]">
        {current?.roleId == 1 && <span>Quản trị hệ thống</span>}
        {current?.roleId == 3 && <span>Quản trị trung tâm đăng kiểm</span>}
        {current?.roleId == 4 && <span>Trung tâm đăng kiểm</span>}
      </div>
      <List>
        {navSidebar.map((item) => (
          <Fragment key={item.id}>
            {item.type === 'SINGLE' && (
              <NavLink to={item.path}>
                {({ isActive }) => (
                  <Accordion open={isActive}>
                    <ListItem className="p-0 " selected={isActive}>
                      <AccordionHeader
                        onClick={() => handleOpen(item.id)}
                        className="border-b-0 p-3"
                      >
                        <ListItemPrefix>{item.icon}</ListItemPrefix>
                        <Typography
                          color="blue-gray"
                          className="mr-auto font-normal"
                        >
                          {item.name}
                        </Typography>
                      </AccordionHeader>
                    </ListItem>
                  </Accordion>
                )}
              </NavLink>
            )}
            {item.type == 'PARENT' && (
              <Accordion
                open={open === item.id}
                icon={
                  <FiChevronDown
                    className={`mx-auto h-4 w-4 transition-transform ${
                      open === item.id ? 'rotate-180' : ''
                    }`}
                  />
                }
              >
                <ListItem className="p-0" selected={open === item.id}>
                  <AccordionHeader
                    onClick={() => handleOpen(item.id)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>{item.icon}</ListItemPrefix>
                    <Typography
                      color="blue-gray"
                      className="mr-auto font-normal"
                    >
                      {item.name}
                    </Typography>
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0">
                    {item.sub.map((el) => (
                      <Fragment key={el.id}>
                        <NavLink to={el.path}>
                          <ListItem>
                            <ListItemPrefix>
                              <MdChevronRight />
                            </ListItemPrefix>
                            {el.name}
                          </ListItem>
                        </NavLink>
                      </Fragment>
                    ))}
                  </List>
                </AccordionBody>
              </Accordion>
            )}
          </Fragment>
        ))}

        <hr className="my-2 border-blue-gray-50" />
        <NavLink to={`/${rou}/profile`}>
          <ListItem>
            <ListItemPrefix>
              <ImProfile className="text-lg" />
            </ListItemPrefix>
            Thông tin tài khoản
          </ListItem>
        </NavLink>
        {current?.roleId == 3 && (
          <NavLink to={`/${rou}/center`}>
            <ListItem>
              <ListItemPrefix>
                <GiHomeGarage className="text-lg" />
              </ListItemPrefix>
              Thông tin trung tâm
            </ListItem>
          </NavLink>
        )}
        <ListItem onClick={() => handleLogout()}>
          <ListItemPrefix>
            <IoMdLogOut className="text-xl" />
          </ListItemPrefix>
          Đăng xuất
        </ListItem>
      </List>
    </Card>
  );
}
