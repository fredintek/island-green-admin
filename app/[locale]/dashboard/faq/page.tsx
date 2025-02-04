"use client";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Popconfirm, Table, Tooltip, Upload } from "antd";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";

type Props = {};

const page = (props: Props) => {
  // Dynamically load the ReactQuill component (to prevent SSR issues)
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill-new"), { ssr: false }),
    []
  );
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<any>(null);
  const [faqData, setFaqData] = useState<any[]>([
    {
      titleEn:
        "What are the Title Deed Types in Northern Cyprus and the differences between them?",
      contentEn:
        'In Northern Cyprus, the word "kokan" is generally used instead of the word "tapu". In our country, the types of kokan vary and there are 3 different types of kokan in total.<br /><br />1. Turkish<br /><br />2. Equivalent Title Deed<br /><br />3. Allocation Form',
      titleTr:
        "Kuzey Kıbrıs'ta Tapu Çeşitleri Nelerdir ve Aralarındaki Farklar Nelerdir?",
      contentTr:
        'Kuzey Kıbrıs\'ta "tapu" kelimesi yerine genellikle "kokan" kelimesi kullanılır. Ülkemizde kokan çeşitleri farklılık göstermektedir ve toplamda 3 farklı kokan türü bulunmaktadır.<br /><br />1. Türk Tapusu<br /><br />2. Eşdeğer Tapu<br /><br />3. Tahsis Tapusu',
      titleRu:
        "Какие существуют виды прав собственности в Северном Кипре и в чем их различия?",
      contentRu:
        'В Северном Кипре вместо слова "tapu" обычно используется слово "kokan". В нашей стране существуют разные виды kokan, и всего их три.<br /><br />1. Турецкий<br /><br />2. Эквивалентный титул<br /><br />3. Форма распределения',
    },
    {
      titleEn: "What is the Stamp Duty and Who Pays It?",
      contentEn:
        "Title Deed Fee: It is a fee calculated as 4% of the sales price declared in the title deed for all real estates sold such as residences, workplaces, plots, fields, lands, etc.<br /><br />Who Pays the Title Deed Fee: According to the decision of the Council of Ministers, 20 per thousand (2%) of the real estate is collected separately from the seller and the buyer.",
      titleTr: "Damga Vergisi Nedir ve Kim Öder?",
      contentTr:
        "Tapu Harcı: Konut, iş yeri, arsa, tarla, arazi gibi satılan tüm gayrimenkuller için tapuda beyan edilen satış bedelinin %4'ü olarak hesaplanan bir harçtır.<br /><br />Tapu Harcını Kim Öder: Bakanlar Kurulu kararına göre, taşınmazın %2’si satıcıdan ve %2’si alıcıdan ayrı ayrı tahsil edilmektedir.",
      titleRu: "Что такое гербовый сбор и кто его оплачивает?",
      contentRu:
        "Сбор за право собственности: Это сбор, рассчитываемый как 4% от заявленной в титуле собственности цены продажи всех продаваемых объектов недвижимости, таких как жилье, офисы, участки, поля и земли.<br /><br />Кто платит гербовый сбор: Согласно решению Совета Министров, 20 промилле (2%) от стоимости недвижимости взимается отдельно с продавца и покупателя.",
    },
    {
      titleEn: "Can I buy real estate without coming to Northern Cyprus?",
      contentEn:
        "Yes. It can be obtained with a power of attorney issued in accordance with TRNC legislation.",
      titleTr: "Kuzey Kıbrıs'a Gelmeden Gayrimenkul Satın Alabilir Miyim?",
      contentTr:
        "Evet. KKTC mevzuatına uygun olarak düzenlenmiş bir vekaletname ile alınabilir.",
      titleRu: "Могу ли я купить недвижимость, не приезжая в Северный Кипр?",
      contentRu:
        "Да. Это можно сделать по доверенности, оформленной в соответствии с законодательством ТРСК.",
    },
  ]);

  const handleEdit = (record: any) => {
    form.setFieldsValue(record);
    setEditingFaq(record);
    setOpenModal(true);
  };

  const handleDelete = (record: any) => {
    console.log("Record Deleted", record);
  };

  const handleFormSubmit = (values: any) => {
    console.log("values", values);
  };

  const faqColumn = [
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
          <button type="button" className="cursor-pointer">
            <Popconfirm
              title="Are you sure you want to delete this project?"
              onConfirm={() => handleDelete(record)}
            >
              <DeleteOutlined />
            </Popconfirm>
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="p-6 bg-white dark:bg-[#1e293b] shadow-md rounded-md">
        <p className="text-[22px] text-secondaryShade dark:text-primaryShade font-bold uppercase mb-6">
          FAQ Section
        </p>

        <div>
          <button
            onClick={() => {
              setOpenModal(true);
              setEditingFaq(null);
              form.resetFields();
            }}
            type="button"
            className="mb-4 px-6 py-2 rounded-md text-white cursor-pointer flex gap-2 items-center justify-center bg-secondaryShade dark:bg-primaryShade border border-secondaryShade dark:border-primaryShade hover:bg-transparent hover:text-secondaryShade dark:hover:bg-transparent dark:hover:text-primaryShade transition-colors duration-300"
          >
            <PlusOutlined className="text-lg" />
            <p className="uppercase font-medium text-sm">Add FAQ</p>
          </button>
          <Table
            columns={faqColumn}
            dataSource={faqData}
            scroll={{ x: 768 }}
            className=""
          />
        </div>
      </div>

      {/* add/edit FAQ */}
      <Modal
        onCancel={() => {
          setOpenModal(false);
          setEditingFaq(null);
        }}
        onClose={() => {
          setOpenModal(false);
          setEditingFaq(null);
        }}
        open={openModal}
        width={{
          xs: "100%",
        }}
        footer={null}
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
              <ReactQuill theme="snow" placeholder="Enter content in Turkish" />
            </Form.Item>
            <Form.Item
              label="Content (English)"
              name="contentEn"
              rules={[{ required: true, message: "Content is required!" }]}
            >
              <ReactQuill theme="snow" placeholder="Enter content in English" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Content is required!" }]}
              label="Content (Russian)"
              name="contentRu"
            >
              <ReactQuill theme="snow" placeholder="Enter content in Russian" />
            </Form.Item>
          </div>
        </Form>

        <button
          onClick={() => form.submit()}
          type="button"
          className="ml-auto mt-4 px-6 py-2 rounded-md text-white cursor-pointer flex items-center justify-center bg-secondaryShade dark:bg-primaryShade border border-secondaryShade dark:border-primaryShade hover:bg-transparent hover:text-secondaryShade dark:hover:bg-transparent dark:hover:text-primaryShade transition-colors duration-300"
        >
          <p className="uppercase font-medium">
            {editingFaq ? "Save" : "Submit"}
          </p>
        </button>
      </Modal>
    </>
  );
};

export default page;
