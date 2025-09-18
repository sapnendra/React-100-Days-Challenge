import {
  DatePicker,
  Empty,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import { BookDown, Plus, Send } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { CSVLink } from "react-csv";

const App = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();

  const handleClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const createRecord = (values) => {
    values.date = moment(values.date).format("YYYY-MM-DD hh:mm A");
    setData([...data, values]);
    handleClose();
  };
  return (
    <div className="bg-gray-200 min-h-screen space-y-6">
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

      <h1 className="text-3xl font-bold underline text-center">
        Export to CSV Example
      </h1>

      <div className="bg-white rounded-lg p-4 w-9/12 mx-auto flex items-center justify-between gap-5">
        <button
          onClick={() => setOpen(true)}
          className="cursor-pointer bg-blue-500 text-white font-medium px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-1"
        >
          <Plus className="w-5 h-5" />
          New Record
        </button>
        <CSVLink data={data} filename={"new-data.csv"}>
          <button className="cursor-pointer bg-green-600 text-white font-medium px-4 py-2 rounded hover:bg-green-700 flex items-center gap-1">
            <BookDown className="w-5 h-5" />
            Export to CSV
          </button>
        </CSVLink>
      </div>
      <div className="bg-white rounded-lg p-4 w-9/12 mx-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-500 text-white text-left rounded">
              <th className="px-4 py-2 text-left">Customer's name</th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-b border-gray-300">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.mobile}</td>
                  <td className="px-4 py-2">{item.email}</td>
                  <td className="px-4 py-2">{item.product}</td>
                  <td className="px-4 py-2">{item.amount}</td>
                  <td className="px-4 py-2">{item.status}</td>
                  <td className="px-4 py-2">{item.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-8">
                  <Empty description="Data not found" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <footer className="text-center mt-20">
        <p>
          &copy; 2023{" "}
          <a className="text-blue-500 text-lg" href="https://sapnendra.com">
            sapnendra.com
          </a>
        </p>
      </footer>

      <Modal open={open} footer={null} width={500} onCancel={handleClose}>
        <Form
          layout="vertical"
          onFinish={createRecord}
          className="p-4"
          form={form}
        >
          <h1 className="text-xl text-center text-gray-700 font-bold mb-4">
            Create New Record
          </h1>
          <Form.Item
            label="Customer's Name"
            name="name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter customer's name" size="large" />
          </Form.Item>
          <Form.Item
            label="Customer's Mobile"
            name="mobile"
            rules={[{ required: true, type: "string" }]}
          >
            <Input placeholder="Enter customer's mobile" size="large" />
          </Form.Item>
          <Form.Item
            label="Customer's Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input placeholder="example@gmail.com" size="large" />
          </Form.Item>
          <Form.Item
            label="Product"
            name="product"
            rules={[{ required: true, type: "string" }]}
          >
            <Input placeholder="Enter product name" size="large" />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, type: "number" }]}
          >
            <InputNumber
              placeholder="Enter amount"
              size="large"
              className="!w-full"
            />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, type: "string" }]}
          >
            <Select placeholder="Select status" size="large">
              <Select.Option value="cold">Cold</Select.Option>
              <Select.Option value="hot">Hot</Select.Option>
              <Select.Option value="closed">Closed</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date" rules={[{ required: true }]}>
            <DatePicker
              placeholder="Enter date"
              size="large"
              className="!w-full"
            />
          </Form.Item>
          <Form.Item>
            <button className="bg-indigo-500 text-white font-semibold px-4 py-2 rounded hover:bg-indigo-600 w-full">
              Submit
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
