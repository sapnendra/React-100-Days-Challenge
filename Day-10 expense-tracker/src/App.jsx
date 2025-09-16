import React, { useState } from "react";
import { useExpense } from "./zustand/useExpense";
import moment from "moment";
import { nanoid } from "nanoid";
import "@ant-design/v5-patch-for-react-19";
import { Delete, Edit, Plus, Trash2 } from "lucide-react";
import {
  Button,
  DatePicker,
  Empty,
  Form,
  Input,
  InputNumber,
  Modal,
} from "antd";

const App = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const { expenses, setExpense, deleteExpense, updateExpense } = useExpense();

  const createExpense = (values) => {
    values.id = nanoid();
    values.date = moment(values.data).toDate();
    setExpense(values);
    setOpen(false);
    form.resetFields();
  };

  const saveExpense = (values) => {
    values.date = moment(values.date).toDate();
    updateExpense(editId, values);
    handleClose();
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    item.date = moment(item.date);
    setOpen(true);
    form.setFieldsValue(item);
  };

  const handleClose = () => {
    setEditId(null);
    setOpen(false);
    form.resetFields();
  };

  return (
    <div className="bg-slate-900 min-h-screen pb-10">
      <header className="w-full text-xl text-center bg-black sticky bottom-0 py-4 mb-10">
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
      <div className="w-9/12 mx-auto bg-white rounded-xl">
        <div className="p-8 flex flex-col gap-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Expense Tracker</h1>
            <button
              onClick={() => setOpen(true)}
              className="flex items-center px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-300"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add new
            </button>
          </div>
          <input
            placeholder="Search these expenses"
            className="w-full p-3 rounded-lg bg-gray-200 focus:outline-none"
          />
          <table className="w-full mt-5">
            <thead className="bg-indigo-500 text-white text-left">
              <tr>
                <th className="py-2.5 pl-4">Title</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            {expenses.map((item, idx) => (
              <tbody key={idx} className="border-b border-b-gray-200">
                <tr>
                  <td className="py-2.5 pl-4">{item.title}</td>
                  <td>{item.desc}</td>
                  <td>{item.amount}</td>
                  <td>{moment(item.date).format("DD/MM/YYYY, hh:mm A")}</td>
                  <td>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="w-8 h-8 bg-green-600 text-white flex items-center justify-center rounded"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteExpense(item.id)}
                        className="w-8 h-8 bg-rose-500 text-white flex items-center justify-center rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
          <div className="flex items-center justify-end">
            <h1 className="text-xl font-medium">
              Total Expenses - ₹
              {expenses
                .reduce((acc, item) => acc + item.amount, 0)
                .toLocaleString()}
            </h1>
          </div>
        </div>
      </div>
      <Modal open={open} footer={null} onCancel={handleClose}>
        <Form
          layout="vertical"
          onFinish={editId ? saveExpense : createExpense}
          form={form}
        >
          <Form.Item
            label="Expense title"
            name="title"
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Expense name here..." />
          </Form.Item>
          <Form.Item
            label="Expense description"
            name="desc"
            rules={[{ required: true }]}
          >
            <Input.TextArea
              size="large"
              placeholder="Expense description here..."
              rows={4}
            />
          </Form.Item>
          <Form.Item
            label="Expense amount"
            name="amount"
            rules={[{ required: true }]}
            className="!w-full"
          >
            <InputNumber
              size="large"
              placeholder="Expense amount..."
              className="!w-full"
            />
          </Form.Item>
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true }]}
            className="!w-full"
          >
            <DatePicker
              size="large"
              placeholder="Choose expense date..."
              className="!w-full"
            />
          </Form.Item>

          <Form.Item>
            {editId ? (
              <Button size="large" type="primary" htmlType="submit" danger>
                Save Changes
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
