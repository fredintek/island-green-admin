"use client";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Popconfirm, Select, Table, Tooltip } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

type Props = {};

const iconClasses = [
  "icon-pin",
  "icon-email",
  "icon-telephone",
  "icon-data",
  "icon-magnifying-glass",
  "icon-construction-worker",
  "icon-roof",
  "icon-joist",
  "icon-roof-1",
  "icon-roof-2",
  "icon-shield",
  "icon-mission",
  "icon-tick",
  "icon-phone-call",
  "icon-location",
  "icon-message",
  "icon-approved",
  "icon-labour-day",
  "icon-asbestos",
  "icon-tick-1",
  "icon-award",
  "icon-roof-3",
  "icon-construction-worker-1",
  "icon-support",
  "icon-analysis",
  "icon-asbestos-1",
  "icon-roof-4",
  "icon-right-arrow",
  "icon-left-arrow",
  "icon-top-arrow",
  "icon-bottom-arrow",
  "icon-roof-5",
  "icon-confirmation",
  "icon-online-registration",
];

const ReasonSection = (props: Props) => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editingReason, setEditingReason] = useState(null);
  const [reasonData, setReasonData] = useState<any>([
    {
      titleTr: "Kaliteli Ürün",
      titleEn: "Quality Product",
      titleRu: "Качественный продукт",
      contentTr:
        "Her zaman en kaliteli ürünleri ve en son teknoloji malzemeleri kullanarak üretim yapıyoruz.",
      contentEn:
        "We always produce using the highest quality products and state-of-the-art materials.",
      contentRu:
        "Мы всегда производим продукцию, используя самые качественные материалы и передовые технологии.",
      icon: "icon-roof-2",
    },
    {
      titleTr: "Mükemmel Konum",
      titleEn: "Perfect Location",
      titleRu: "Идеальное расположение",
      contentTr: "Her zaman en özel ve eşsiz lokasyonlarda yer alıyoruz.",
      contentEn: "We are always in the most special and unique locations.",
      contentRu: "Мы всегда находимся в самых особенных и уникальных местах.",
      icon: "icon-mission",
    },
    {
      titleTr: "Memnuniyet Garantisi",
      titleEn: "Satisfaction Guarantee",
      titleRu: "Гарантия удовлетворенности",
      contentTr:
        "Amacımız sadece satış yapmak değil, müşterilerimizi ailemizin bir parçası haline getirerek sürdürülebilir bir ilişki kurmaktır. Bu nedenle, memnuniyet önceliğimizdir.",
      contentEn:
        "Our goal is not just to make sales but to establish a sustainable relationship by making our customers part of our family. Therefore, satisfaction is our priority.",
      contentRu:
        "Наша цель — не просто продажи, а установление устойчивых отношений, делая наших клиентов частью нашей семьи. Поэтому удовлетворенность клиентов является нашим приоритетом.",
      icon: "icon-shield",
    },
    {
      titleTr: "Uzman Ekip",
      titleEn: "Expert Team",
      titleRu: "Экспертная команда",
      contentTr:
        "Deneyimli, eğitimli ve müşteri memnuniyetine önem veren bir ekip.",
      contentEn:
        "A team that is experienced, educated, and cares about customer satisfaction.",
      contentRu:
        "Команда, обладающая опытом, образованием и заботящаяся об удовлетворенности клиентов.",
      icon: "icon-construction-worker",
    },
  ]);

  const iconOptions = iconClasses.map((icon) => ({
    value: icon,
    label: <span className={`${icon} text-2xl text-red-500`} />,
  }));

  const handleEdit = (record: any) => {
    form.setFieldsValue(record);
    setEditingReason(record);
    setOpenModal(true);
  };

  const handleFormSubmit = (values: any) => {
    // Handle form submission
    console.log("Form submitted:", values);
  };

  const reasonsColumn = [
    {
      title: "Title (tr)",
      dataIndex: "titleTr",
      key: "titleTr",
    },
    {
      title: "Title (en)",
      dataIndex: "titleEn",
      key: "titleEn",
    },
    {
      title: "Title (ru)",
      dataIndex: "titleRu",
      key: "titleRu",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <div className="flex items-center gap-4 text-lg text-gray-500">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => handleEdit(record)}
          >
            <Tooltip title="Edit">
              <EditOutlined />
            </Tooltip>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="p-6 bg-white shadow-md rounded-md">
        <p className="text-[22px] text-secondaryShade font-bold uppercase mb-6">
          Reasons Section
        </p>

        {/* content */}
        <Table
          columns={reasonsColumn}
          dataSource={reasonData}
          scroll={{ x: 768 }}
        />
      </div>

      {/* add/edit project */}
      <Modal
        onCancel={() => {
          setOpenModal(false);
          setEditingReason(null);
        }}
        onClose={() => {
          setOpenModal(false);
          setEditingReason(null);
        }}
        open={openModal}
        width={{
          xs: "100%",
        }}
        footer={null}
        className="normal-modal"
      >
        <Form onFinish={handleFormSubmit} layout="vertical" form={form}>
          <div className="grid grid-cols-fluid-1 gap-4">
            <Form.Item
              label="Title (Turkish)"
              name="titleTr"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <Input size="large" placeholder="Enter title in Turkish" />
            </Form.Item>
            <Form.Item
              label="Title (English)"
              name="titleEn"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <Input size="large" placeholder="Enter title in English" />
            </Form.Item>
            <Form.Item
              label="Title (Russian)"
              name="titleRu"
              rules={[{ required: true, message: "Title is required!" }]}
            >
              <Input size="large" placeholder="Enter title in Russian" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-fluid-1 gap-4">
            <Form.Item
              rules={[{ required: true, message: "Content is required!" }]}
              label="Content (Turkish)"
              name="contentTr"
            >
              <TextArea
                style={{ resize: "none" }}
                rows={10}
                placeholder="Enter content in Turkish"
              />
            </Form.Item>
            <Form.Item
              label="Content (English)"
              name="contentEn"
              rules={[{ required: true, message: "Content is required!" }]}
            >
              <TextArea
                style={{ resize: "none" }}
                rows={10}
                placeholder="Enter content in English"
              />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Content is required!" }]}
              label="Content (Russian)"
              name="contentRu"
            >
              <TextArea
                style={{ resize: "none" }}
                rows={10}
                placeholder="Enter content in Russian"
              />
            </Form.Item>
          </div>

          {/* icon */}
          <Form.Item
            rules={[{ required: true, message: "Icon is required!" }]}
            label="Select Icon"
            name="icon"
          >
            <Select
              options={iconOptions}
              size="large"
              className="w-full max-w-[900px]"
              placeholder="Select an icon"
            />
          </Form.Item>

          <button
            onClick={() => form.submit()}
            type="button"
            className="ml-auto mt-4 px-6 py-2 rounded-md text-white cursor-pointer flex items-center justify-center bg-secondaryShade border border-secondaryShade hover:bg-transparent hover:text-secondaryShade transition-colors duration-300"
          >
            <p className="uppercase font-medium">save</p>
          </button>
        </Form>
      </Modal>
    </>
  );
};

export default ReasonSection;
