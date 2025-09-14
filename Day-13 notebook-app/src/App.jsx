import React, { useState } from "react";
import { Edit, File, Plus, Trash2 } from "lucide-react";
import { Button, Divider, Empty, Form, Input, Modal } from "antd";
import "@ant-design/v5-patch-for-react-19";
import { useNote } from "./store/useNote";
import { nanoid } from "nanoid";
import moment from "moment";

const dummyText =
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam deserunt facilis, voluptas, alias qui ut quibusdam debitis quae suscipit porro atque repellat voluptates doloribus quidem cupiditate impedit incidunt! Temporibus iure aliquid unde porro. Praesentium tenetur ipsum sequi id eveniet eos?";

const App = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [read, setRead] = useState(null);
  const { notes, setNote, deleteNote, updateNote } = useNote();
  const [editFlag, setEditFlag] = useState(null);

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const createNote = (values) => {
    values.id = nanoid();
    values.date = new Date();
    setNote(values);
    handleClose();
  };

  const readData = (data) => {
    setRead(data);
  };

  const handleEdit = (id, data) => {
    setOpen(true);
    form.setFieldsValue(data);
    setEditFlag(id);
  };

  const handleDelete = (id) => {
    deleteNote(id);
    setRead(null);
  };

  const saveNote = (values) => {
    values.date = new Date();
    updateNote(editFlag, values);
    setRead(values);
    handleClose();
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <aside className="space-y-5 px-4 py-6 fixed top-0 left-0 h-full w-[300px]">
        <div className="bg-white p-3 rounded-lg space-y-3">
          {notes.map((item, idx) => (
            <button
              key={idx}
              onClick={() => readData(item)}
              className="flex items-center gap-2 border border-gray-300 w-full rounded-lg hover:shadow-lg hover:cursor-pointer p-1 hover:p-2 duration-200"
            >
              <div className="">
                <File className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <label className="font-medium text-sm text-gray-600 text-left capitalize text-nowrap">
                  {item.filename}
                </label>
                <label className="text-gray-500 text-xs text-left text-nowrap">
                  {moment(item.date).format("DD/MM/YYYY, hh:mm:ss A")}
                </label>
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={() => setOpen(true)}
          className=" cursor-pointer rounded-lg flex items-center justify-center gap-1 bg-rose-500 py-3 text-white font-medium w-full"
        >
          <Plus />
          New File
        </button>
      </aside>
      <section className="ml-[300px] space-y-5">
        <header className="w-full text-xl text-center bg-black sticky bottom-0 py-4">
          <p className="text-white">
            Designed and Managed by -{" "}
            <a
              href="https://github.com/sapnendra"
              className="text-yellow-600 font-semibold"
            >
              Sapnendra
            </a>
          </p>
        </header>
        {read ? (
          <div className="w-10/12 mx-auto bg-white rounded-lg">
            <div className="px-6 py-4 border-b border-gray-300 flex items-center justify-between">
              <div className="">
                <h1 className="text-lg font-medium capitalize">
                  {read.filename}
                </h1>
                <label className="text-gray-500 text-xs">
                  {moment(read.date).format("DD/MM/YYYY, hh:mm:ss A")}
                </label>
              </div>
              <div className="flex items-center justify-center gap-5">
                <button
                  onClick={() => handleEdit(read.id, read)}
                  className="bg-green-500 text-white p-2 rounded-lg cursor-pointer"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(read.id)}
                  className="bg-red-500 text-white p-2 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-500">{read.content}</p>
            </div>
          </div>
        ) : (
          <div className="w-10/12 mx-auto bg-white rounded-lg p-12">
            <Empty />
          </div>
        )}
      </section>
      <Modal
        open={open}
        onCancel={handleClose}
        footer={null}
        width={"60%"}
        maskClosable={false}
      >
        <h1 className="text-xl font-semibold">Create a new file</h1>
        <Divider />
        <Form
          layout="vertical"
          onFinish={editFlag ? saveNote : createNote}
          form={form}
          initialValues={{ content: dummyText }}
        >
          <Form.Item
            label="Filename"
            name="filename"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Enter file name" />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true }]}
          >
            <Input.TextArea
              size="large"
              title="Content of the file.."
              rows={8}
            />
          </Form.Item>

          <Form.Item>
            {editFlag ? (
              <Button size="large" type="primary" htmlType="submit" danger>
                Save
              </Button>
            ) : (
              <Button size="large" type="primary" htmlType="submit">
                Submit
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
