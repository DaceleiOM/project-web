import { Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import React from "react";

export default function Navbar() {

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Perfil",
    },
    {
      key: "2",
      label: "Salir",
    },
  ];

  return (
    <Header className={`w-full fixed flex justify-between shadow-sm !bg-white`}>
      <div
        className={`w-[120px] flex items-center justify-center`}
      >
        Logo
      </div>
      {/* Items navbar */}
      <Menu mode="horizontal" className={`flex-1 !border-b-0 justify-end`}>
        <Menu.Item>Inicio</Menu.Item>
      </Menu>
      {/* Options user isAuth */}
      <Dropdown menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            Usuario
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </Header>
  );
}
