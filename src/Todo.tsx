import React, { useState } from "react";
import "./App.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Input, Space, Typography, Checkbox } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
const { Title } = Typography;

type ListItem = {
  text: string;
  checked: boolean;
};

type FormData = {
  listItem: string;
};

const App: React.FC = () => {
  const { control, handleSubmit, reset, setValue } = useForm<FormData>();

  const [listItem, setListItem] = useState<ListItem[]>([]);

  //data add
  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    setListItem([...listItem, { text: data.listItem, checked: false }]);
    reset();
  };

  // data delete functionality
  const handleDelete = (index: number) => {
    setListItem((prevList) =>
      prevList.filter((item, i: number) => i !== index)
    );
  };

  // read  functionality
  const onChange = (index: number, e: any) => {
    setListItem((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, checked: e.target.checked } : item
      )
    );
  };

  //edit functionality
  const editTodo = (index: number) => {
    //  const updateItem :any = index === index ?listItem[index].text : null ;
    //  console.log(updateItem);
    //   return updateItem;

    const itemToEdit: string = listItem[index].text;
    setValue("listItem", itemToEdit);
  };

  return (
    <div className="app-container">
      <div className="box">
        <Title level={2}>Task List</Title>
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
          <Space.Compact style={{ width: "100%" }}>
            <Controller
              name="listItem"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Your List Item"
                  style={{ fontSize: "15px" }}
                />
              )}
            />
            <Button type="primary" htmlType="submit" size="large">
              Submit
            </Button>
          </Space.Compact>
        </form>
        <div className="list">
          {listItem.map((item: ListItem, index) => (
            <div key={index} className="innerList">
              <div className="text">
                <Checkbox
                  defaultChecked={false}
                  onChange={(e) => onChange(index, e)}
                ></Checkbox>
                <h3
                  style={{
                    color: item.checked ? "gray" : "black",
                    textDecoration: item.checked ? "line-through" : "none",
                  }}
                >
                  {item.text}
                </h3>
              </div>
              <div className="icon">
                <DeleteFilled onClick={() => handleDelete(index)} />
                <EditFilled onClick={() => editTodo(index)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
