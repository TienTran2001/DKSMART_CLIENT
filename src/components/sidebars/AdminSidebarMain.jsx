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

import { FiChevronDown } from 'react-icons/fi';
import { MdChevronRight } from 'react-icons/md';
import { adminSidebar } from '~/utils/contants';
import { NavLink } from 'react-router-dom';
import { IoMdLogOut } from 'react-icons/io';
import { ImProfile } from 'react-icons/im';
export default function AdminSidebarMain() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="min-h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" className="text-main font-bold">
          DKSMART
        </Typography>
      </div>
      <List>
        {adminSidebar.map((item) => (
          <Fragment key={item.id}>
            {item.type === 'SINGLE' && (
              <NavLink to={item.path}>
                {({ isActive }) => (
                  <Accordion open={isActive}>
                    <ListItem className="p-0" selected={isActive}>
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
        <ListItem>
          <ListItemPrefix>
            <ImProfile className="text-lg" />
          </ListItemPrefix>
          Thông tin tài khoản
        </ListItem>

        <ListItem>
          <ListItemPrefix>
            <IoMdLogOut className="text-xl" />
          </ListItemPrefix>
          Đăng xuất
        </ListItem>
      </List>
    </Card>
  );
}
