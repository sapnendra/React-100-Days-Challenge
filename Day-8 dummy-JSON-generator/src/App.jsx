import React, { useState } from "react";
import "animate.css";
import "@ant-design/v5-patch-for-react-19";
import {
  Button,
  Card,
  Empty,
  Form,
  InputNumber,
  Select,
  Tooltip,
  message,
} from "antd";
import { Copy, Download } from "lucide-react";
import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const obj = {
  id: "SUk6VrCEYrn4P4SpdjdWT",
  fullName: "Dianna Rippin",
  email: "Ike14@hotmail.com",
  mobile: "+12484803268",
  gender: "Androgynous",
  address: "179 Eryn Rue",
  image:
    "https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/30.jpg",
  city: "South Jordan",
  state: "Rhode Island",
  country: "Gambia",
  pincode: 43964,
  createdAt: "2024-12-15T20:38:19.103Z",
};

const App = () => {
  const [payload, setPayload] = useState(JSON.stringify(obj, null, 4));

  const generateUser = () => {
    return {
      id: nanoid(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      mobile: faker.phone.number({ style: "international" }),
      gender: faker.person.gender(),
      address: faker.location.streetAddress(),
      image: faker.image.personPortrait({ sex: "male" }),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      pincode: Number(faker.location.zipCode()),
      createdAt: faker.date.anytime(),
    };
  };

  const generateProducts = () => {
    return {
      id: nanoid(),
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 98, max: 1000, dec: 0, symbol: "₹" }),
      discount: Number(faker.commerce.price({ min: 5, max: 50 })),
      rating: Number(faker.commerce.price({ min: 1, max: 5 })),
      category: faker.commerce.productAdjective(),
      brand: faker.company.buzzNoun(),
      image: faker.image.urlLoremFlickr({ category: "product", width: 1280 }),
      createdAt: faker.date.anytime(),
    };
  };

  const generatePayments = () => {
    return {
      id: nanoid(),
      user: {
        id: nanoid(),
        fullName: faker.person.fullName(),
        email: faker.internet.email(),
        mobile: faker.phone.number({ style: "international" }),
        gender: faker.person.gender(),
        address: faker.location.streetAddress(),
        image: faker.image.personPortrait({ sex: "male" }),
        city: faker.location.city(),
        state: faker.location.state(),
        country: faker.location.country(),
        pincode: Number(faker.location.zipCode()),
        createdAt: faker.date.anytime(),
      },
      product: {
        id: nanoid(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({
          min: 98,
          max: 1000,
          dec: 0,
          symbol: "₹",
        }),
        discount: Number(faker.commerce.price({ min: 5, max: 50 })),
        rating: Number(faker.commerce.price({ min: 1, max: 5 })),
        category: faker.commerce.productAdjective(),
        brand: faker.company.buzzNoun(),
        image: faker.image.urlLoremFlickr({ category: "product", width: 1280 }),
      },
      amount: Number(faker.commerce.price),
      orderid: `OID-${nanoid()}`,
      transactionId: `TID-${nanoid()}`,
      method: "UPI",
      tax: Number(faker.commerce.price({ min: 0, max: 18 })),
      createdAt: faker.date.anytime(),
    };
  };

  const generateEmployees = () => {
    return {
      id: nanoid(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      mobile: faker.phone.number({ style: "international" }),
      gender: faker.person.gender(),
      salary: Math.floor(
        Number(faker.commerce.price({ min: 30000, max: 100000 }))
      ),
      disignation: faker.person.jobTitle(),
      address: faker.location.streetAddress(),
      image: faker.image.personPortrait({ sex: "male", size: "128" }),
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      pincode: Number(faker.location.zipCode()),
      createdAt: faker.date.anytime(),
    };
  };

  const generateData = (values) => {
    const tmp = [];
    for (let i = 0; i < values.noOfData; i++) {
      if (values.data === "users") {
        tmp.push(generateUser());
      } else if (values.data === "products") {
        tmp.push(generateProducts());
      } else if (values.data === "payments") {
        tmp.push(generatePayments());
      } else if (values.data === "employees") {
        tmp.push(generateEmployees());
      }
    }
    const str = JSON.stringify(tmp, null, 4);
    setPayload(str);
  };

  const onCopy = (payload) => {
    navigator.clipboard.writeText(payload);
    message.success("Copied to clipboard!");
  };

  return (
    <>
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
      <div className="min-h-screen bg-gray-400 py-8">
        <div className="w-9/12 mx-auto flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-5xl font-bold text-center">
              Dummy JSON Generator — Premium Dev Tool
            </h1>
            <p className="text-lg text-center text-gray-900">
              This tool allows you to quickly generate dummy JSON data for
              testing and development purposes.
            </p>
          </div>
          <Card style={{ backgroundColor: "#f5f5f545", border: "none" }}>
            <Form
              className="flex gap-4"
              layout="vertical"
              onFinish={generateData}
              initialValues={{ data: "users", noOfData: "24" }}
            >
              <Form.Item
                style={{ color: "#fff" }}
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
                  max={100}
                />
              </Form.Item>

              <Form.Item className="flex items-center justify-center" label=" ">
                <Button
                  htmlType="submit"
                  size="large"
                  type="primary"
                  className="w-30"
                >
                  Generate
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <div className="flex gap-6">
            <div className="w-full">
              <div className="border-b rounded-t-lg w-full h-20 flex items-center justify-between bg-[#2B2B2B] text-white px-5 py-2">
                <h1 className="text-3xl font-bold">
                  Payload Preview
                </h1>
                <div className="flex gap-3">
                  <button className="flex items-center justify-center text-md gap-1 border px-4 py-2 rounded-lg">
                    <Tooltip title="Copy Data">
                      <Copy onClick={() => onCopy(payload)} />
                    </Tooltip>
                    Copy
                  </button>
                  <button className="flex items-center justify-center text-md gap-1 border px-4 py-2 rounded-lg">
                    <Tooltip title="Copy Data">
                      <Download onClick={() => onCopy(payload)} />
                    </Tooltip>
                    Download
                  </button>
                </div>
              </div>
              <div className="">
                <SyntaxHighlighter
                  language="javascript"
                  style={a11yDark}
                  customStyle={{
                    height: "400px", // fixed height
                    overflowY: "auto", // scroll when content exceeds height
                    scrollbarWidth: "none", // hide scrollbar in Firefox
                    msOverflowStyle: "auto",
                  }}
                  showLineNumbers
                >
                  {payload}
                </SyntaxHighlighter>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
