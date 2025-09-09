import React from "react";
import "animate.css";
import "@ant-design/v5-patch-for-react-19";
import { Button, Card, Form, InputNumber, Select } from "antd";

const App = () => {
  const generateData = (values) => {
    console.log(values);
  };

  return (
    <div className="min-h-screen bg-gray-200 py-10">
      <div className="w-9/12 mx-auto space-y-8">
        <div className="">
          <h1 className="text-3xl font-bold text-center">
            Dummy Data(JSON) Generator
          </h1>
          <p className="text-center">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
            a rerum repudiandae deleniti assumenda consequatur. Lorem ipsum
            dolor sit, amet consectetur adipisicing. Lorem ipsum dolor sit amet
            consectetur. Lorem ipsum dolor sit amet.
          </p>
        </div>
        <Card>
          <Form
            className="flex gap-8"
            layout="vertical"
            onFinish={generateData}
          >
            <Form.Item
              label="Choose Data"
              name="data"
              rules={[{ required: true }]}
              className="w-full"
            >
              <Select size="large" placeholder="Choose data">
                <Select.Option value="users">User</Select.Option>
                <Select.Option value="products">Products</Select.Option>
                <Select.Option value="payments">Payments</Select.Option>
                <Select.Option value="employees">Employees</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Number of Data"
              name="noOfData"
              rules={[{ required: true }]}
              className="w-full"
            >
              <InputNumber
                size="large"
                placeholder="Enter number of data"
                className="!w-full"
              />
            </Form.Item>

            <Form.Item label=" ">
              <Button htmlType="submit" size="large" type="primary">
                Generate
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default App;
