import React, { useEffect, useState } from "react";
import "animate.css";
import {
  Badge,
  Button,
  Card,
  DatePicker,
  Empty,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Tag,
} from "antd";
import { Delete, Plus, Trash } from "lucide-react";
import { usePlanner } from "./store/usePlanner";
import "@ant-design/v5-patch-for-react-19";
import moment from "moment";

const desc =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta id ad facere assumenda magnam debitis laborum cupiditate odit quod. Possimus.";
const App = () => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState(new Date().toLocaleTimeString());
  const {
    tasks,
    addTask,
    deleteTask,
    updateStatus,
    deleteAllTasks,
    filterStatusTasks,
  } = usePlanner();
  const highesttasks = tasks.filter((item) => item.priority === "highest");
  const mediumtasks = tasks.filter((item) => item.priority === "medium");
  const lowesttasks = tasks.filter((item) => item.priority === "lowest");

  let pending = 0;
  const pendingTasks = tasks.filter((item) =>
    item.status === "pending" ? pending++ : ""
  );
  let inProgress = 0;
  const inProgressTasks = tasks.filter((item) =>
    item.status === "inProgress" ? inProgress++ : ""
  );
  let completed = 0;
  const completedTasks = tasks.filter((item) =>
    item.status === "completed" ? completed++ : ""
  );

  const createTask = (value) => {
    value.status = "pending";
    value.id = Date.now();
    value.createdAt = Date.now();
    addTask(value);
    handleModelClose(value);
  };

  const handleModelClose = () => {
    setOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(new Date().toLocaleTimeString());
    }, 1000);

    // cleaner function
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="bg-gray-400 h-screen overflow-hidden">
      <nav className="!bg-gradient-to-r !from-rose-500 !via-slate-700 !via-slate-800 !to-slate-900 text-white flex items-center justify-between px-8 h-[60px] fixed top-0 left-0 w-full">
        <div className="flex items-center">
          <button className="w-10 h-10 rounded-full text-white font-bold bg-[radial-gradient(circle_at_center,_#00c6ff_0%,_#0072ff_100%)]">
            PL
          </button>
          <h1 className="text-2xl font-bold ml-1">anner</h1>
        </div>

        <div className="flex gap-8 item-center justify-center">
          <button onClick={() => printTasks()}></button>
          <h1 className="text-2xl font-bold lg:block hidden">{timer}</h1>
          <DatePicker classNames="!py-1.5 !cursor-pointer" />
          <button
            onClick={() => setOpen(true)}
            className="hover:scale-105 transition-translate duration-300 py-2 px-3 rounded text-sm bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 text-white flex items-center gap-1 font-medium cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add task
          </button>

          <Popconfirm
            title="Do you want to delete all tasks?"
            onConfirm={deleteAllTasks}
          >
            <button className="hover:scale-105 transition-translate duration-300 py-2 px-3 rounded text-sm bg-gradient-to-br from-rose-600 via-rose-500 to-rose-600 text-white flex items-center gap-1 font-medium cursor-pointer">
              <Trash className="w-4 h-4" />
              Delete all tasks
            </button>
          </Popconfirm>
        </div>
      </nav>

      <section className="h-[calc(100%-120px)] w-full p-8 fixed top-[60px] left-0 overflow-x-auto overflow-y-visible grid lg:grid-cols-3 gap-8">
        <div className="lg:h-full lg:min-h-0 h-[300px]">
          <Badge.Ribbon
            text="Highest"
            className="!bg-gradient-to-br !from-rose-600 !via-pink-500 !to-rose-600 !font-semibold !z-[99]"
          />
          <div className="scrollbar bg-white rounded-lg h-full min-h-0 overflow-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Filter status</h3>
              <Select
                size="small"
                // onChange={(status) => filterStatusTasks(status)}
                placeholder="Choose status"
                style={{ width: 150 }}
              >
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="inProgress">inProgress</Select.Option>
                <Select.Option value="completed">Completed</Select.Option>
              </Select>
            </div>
            <div className="flex flex-col gap-8">
              {highesttasks.length === 0 && (
                <>
                  <Empty description="There is no tasks added here as highest priority." />
                  <button
                    onClick={() => setOpen(true)}
                    className="w-fit mx-auto hover:scale-105 transition-translate duration-300 py-2 px-3 rounded text-sm bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 text-white flex items-center gap-1 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add task
                  </button>
                </>
              )}
              {highesttasks.map((item, idx) => (
                <Card hoverable key={idx}>
                  <Card.Meta
                    title={item.title}
                    description={item.description}
                  />
                  <div className="mt-4 flex justify-between items-center">
                    <div className="">
                      {item.status === "pending" && (
                        <Tag className="capitalize" color="red">
                          {item.status}
                        </Tag>
                      )}
                      {item.status === "inProgress" && (
                        <Tag className="capitalize" color="yellow">
                          {item.status}
                        </Tag>
                      )}
                      {item.status === "completed" && (
                        <Tag className="capitalize" color="green">
                          {item.status}
                        </Tag>
                      )}
                      <Tag
                        className="!bg-rose-500 !border-rose-500 !text-white"
                        onClick={() => deleteTask(item.id)}
                      >
                        Delete
                      </Tag>
                    </div>
                    <Select
                      size="small"
                      placeholder="Change status"
                      onChange={(status) => updateStatus(item.id, status)}
                    >
                      <Select.Option value="pending">Pending</Select.Option>
                      <Select.Option value="inProgress">
                        inProgress
                      </Select.Option>
                      <Select.Option value="completed">Completed</Select.Option>
                    </Select>
                  </div>
                  <label className="text-xs text-gray-400 flex mt-3">
                    {moment(item.createdAt).format("DD MMM YYYY hh:mm A")}
                  </label>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:h-full lg:min-h-0 h-[300px]">
          <Badge.Ribbon
            text="Medium"
            className="!bg-gradient-to-br !from-indigo-600 !via-blue-500 !to-indigo-600 !font-semibold !z-[99]"
          />
          <div className="scrollbar bg-white rounded-lg h-full min-h-0 overflow-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Filter status</h3>
              <Select
                size="small"
                // onChange={(status) => filterStatusTasks(status)}
                placeholder="Choose status"
                style={{ width: 150 }}
              >
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="inProgress">inProgress</Select.Option>
                <Select.Option value="completed">Completed</Select.Option>
              </Select>
            </div>
            <div className="flex flex-col gap-8">
              {mediumtasks.length === 0 && (
                <>
                  <Empty description="There is no tasks added here as medium priority." />
                  <button
                    onClick={() => setOpen(true)}
                    className="w-fit mx-auto hover:scale-105 transition-translate duration-300 py-2 px-3 rounded text-sm bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 text-white flex items-center gap-1 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add task
                  </button>
                </>
              )}
              {mediumtasks.map((item, idx) => (
                <Card hoverable key={idx}>
                  <Card.Meta
                    title={item.title}
                    description={item.description}
                  />
                  <div className="mt-4 flex justify-between items-center">
                    <div className="">
                      {item.status === "pending" && (
                        <Tag className="capitalize" color="red">
                          {item.status}
                        </Tag>
                      )}
                      {item.status === "inProgress" && (
                        <Tag className="capitalize" color="yellow">
                          {item.status}
                        </Tag>
                      )}
                      {item.status === "completed" && (
                        <Tag className="capitalize" color="green">
                          {item.status}
                        </Tag>
                      )}
                      <Tag
                        className="!bg-rose-500 !border-rose-500 !text-white"
                        onClick={() => deleteTask(item.id)}
                      >
                        Delete
                      </Tag>
                    </div>
                    <Select
                      size="small"
                      placeholder="Change status"
                      onChange={(status) => updateStatus(item.id, status)}
                    >
                      <Select.Option value="pending">Pending</Select.Option>
                      <Select.Option value="inProgress">
                        inProgress
                      </Select.Option>
                      <Select.Option value="completed">Completed</Select.Option>
                    </Select>
                  </div>
                  <label className="text-xs text-gray-400 flex mt-3">
                    {moment(item.createdAt).format("DD MMM YYYY hh:mm A")}
                  </label>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:h-full lg:min-h-0 h-[300px]">
          <Badge.Ribbon
            text="Lowest"
            className="!bg-gradient-to-br !from-orange-600 !via-orange-500 !to-orange-600 !font-semibold !z-[99]"
          />
          <div className="scrollbar bg-white rounded-lg h-full min-h-0 overflow-auto p-6 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Filter status</h3>
              <Select
                size="small"
                // onChange={(status) => filterStatusTasks(status)}
                placeholder="Choose status"
                style={{ width: 150 }}
              >
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="inProgress">inProgress</Select.Option>
                <Select.Option value="completed">Completed</Select.Option>
              </Select>
            </div>
            <div className="flex flex-col gap-8">
              {lowesttasks.length === 0 && (
                <>
                  <Empty description="There is no tasks added here as lowest priority." />
                  <button
                    onClick={() => setOpen(true)}
                    className="w-fit mx-auto hover:scale-105 transition-translate duration-300 py-2 px-3 rounded text-sm bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600 text-white flex items-center gap-1 font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add task
                  </button>
                </>
              )}
              {lowesttasks.map((item, idx) => (
                <Card hoverable key={idx}>
                  <Card.Meta
                    title={item.title}
                    description={item.description}
                  />
                  <div className="mt-4 flex justify-between items-center">
                    <div className="">
                      {item.status === "pending" && (
                        <Tag className="capitalize" color="red">
                          {item.status}
                        </Tag>
                      )}
                      {item.status === "inProgress" && (
                        <Tag className="capitalize" color="yellow">
                          {item.status}
                        </Tag>
                      )}
                      {item.status === "completed" && (
                        <Tag className="capitalize" color="green">
                          {item.status}
                        </Tag>
                      )}
                      <Tag
                        className="!bg-rose-500 !border-rose-500 !text-white"
                        onClick={() => deleteTask(item.id)}
                      >
                        Delete
                      </Tag>
                    </div>
                    <Select
                      size="small"
                      placeholder="Change status"
                      onChange={(status) => updateStatus(item.id, status)}
                    >
                      <Select.Option value="pending">Pending</Select.Option>
                      <Select.Option value="inProgress">
                        inProgress
                      </Select.Option>
                      <Select.Option value="completed">Completed</Select.Option>
                    </Select>
                  </div>
                  <label className="text-xs text-gray-400 flex mt-3">
                    {moment(item.createdAt).format("DD MMM YYYY hh:mm A")}
                  </label>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-l from-rose-900 via-slate-700 via-slate-800 to-slate-900 text-white h-[60px] fixed bottom-0 left-0 w-full flex items-center justify-between px-8">
        <div className="flex items-center text-sm">
          <p>
            <a className="hover:underline" href="https://github.com/sapnendra">
              www.sapnendra.github.io
            </a>{" "}
            | All rights reserved
          </p>
        </div>
        <div className="flex items-center justify-center gap-5">
          <h3 className="text-sm font-bold">Total tasks - {tasks.length}</h3>
          <h3 className="text-sm font-bold text-red-300">
            Pending - {pending}
          </h3>
          <h3 className="text-sm font-bold text-yellow-300">
            InProgress - {inProgress}
          </h3>
          <h3 className="text-sm font-bold text-green-300">
            Completed - {completed}
          </h3>
        </div>
      </footer>

      <Modal
        open={open}
        footer={null}
        onCancel={handleModelClose}
        maskClosable={false}
      >
        <h1 className="text-xl mb-3 font-medium">Add new task</h1>
        <Form
          onFinish={createTask}
          form={form}
          initialValues={{ description: desc }}
        >
          <Form.Item name="title" rules={[{ required: true }]}>
            <Input placeholder="Task name" size="large" />
          </Form.Item>

          <Form.Item name="description" rules={[{ required: true }]}>
            <Input.TextArea placeholder="Task description goes here" rows={5} />
          </Form.Item>

          <Form.Item name="priority" rules={[{ required: true }]}>
            <Select size="large" placeholder="Choose priority">
              <Select.Option value="highest">Highest</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="lowest">Lowest</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary" size="large">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
