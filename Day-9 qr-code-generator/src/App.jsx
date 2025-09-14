import React, { useRef, useState } from "react";
import { Button, Form, Input, Modal, QRCode } from "antd";
import { Download, SquareMousePointer } from "lucide-react";

const App = () => {
  const [form] = Form.useForm()
  const divRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState("");

  const [qr, setQr] = useState({
    value: "https://sapnendra.onrender.com",
    icon: "",
    bgColor: "white",
    color: "black",
  });

  const downloadNow = () => {
    const div = divRef.current;
    const canvas = div.querySelector("canvas");
    const base64String = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = base64String;
    a.download = "qr-code.png";
    a.click();
    a.remove();
  };

  const generateQR = (values) => {
    values.bgColor = values.bgColor || "white";
    values.color = values.color || "black";
    values.icon = icon;
    setOpen(false);
    setQr((prev) => ({
      ...prev,
      ...values,
    }));
  };

  const chooseFile = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setIcon(url);
  };

  const handleClose =() => {
    setOpen(false)
    form.resetFields()
    setIcon("")
  }

  return (
    <div className="bg-gray-200 h-screen py-12 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-12">Generate - QR CODE</h1>
      <div
        ref={divRef}
        className="mb-12 rounded-xl p-4 bg-white shadow-lg w-fit hover:scale-105 tansition-transform duration-200 hover:shadow-2xl"
      >
        <QRCode
          value={qr.value}
          size={300}
          icon={qr.icon}
          bgColor={qr.bgColor}
          color={qr.color}
        />
      </div>

      <div className="flex gap-5">
        <Button
          size="large"
          type="primary"
          className="!bg-gradient-to-br from-green-700 via-green-600 to-green-700"
          icon={<SquareMousePointer className="w-4 h-4" />}
          onClick={() => setOpen(true)}
        >
          Generate QR
        </Button>
        <Button
          size="large"
          type="primary"
          className="!bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600"
          icon={<Download className="w-4 h-4" />}
          onClick={downloadNow}
        >
          Download Now
        </Button>
      </div>

      <Modal open={open} onCancel={handleClose} footer={null}>
        <h1 className="text-lg font-medium">Generate Your QR</h1>
        <Form onFinish={generateQR} form={form}>
          <Form.Item
            label="URL"
            rules={[{ required: true, type: "url" }]}
            name="url"
          >
            <Input size="large" placeholder="https://example.com" />
          </Form.Item>
          <Form.Item label="BG Color" name="bgColor">
            <Input type="color" size="large" />
          </Form.Item>
          <Form.Item label="Color" name="color">
            <Input type="color" size="large" />
          </Form.Item>
          <Form.Item label="Logo" name="logo">
            <Input
              type="file"
              size="large"
              accept="image/*"
              onChange={chooseFile}
            />
          </Form.Item>
          <Form.Item>
            <Button size="large" type="primary" htmlType="submit">
              Generate
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
