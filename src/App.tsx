import React, { useState } from "react";
import "./App.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Input, Space, Typography, Checkbox } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
const { Title } = Typography;

// Define types for the list items 
type List = {
  text: string;
  checked: boolean;
};

type FormData = {
  listItem: string;
};

const App: React.FC = () => {
  const { control, handleSubmit, reset, setValue } = useForm<FormData>();
  const [listItem, setListItem] = useState<List[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);


  // Add item after submission 
  //editing, update the existing item
  const onSubmit: SubmitHandler<FormData> = (data: FormData) => {
    if (editingIndex !== null) {
      setListItem((prevList: List[]) =>
        prevList.map((item: List, i: number) =>
          i === editingIndex ? { ...item, text: data.listItem } : item
        )
      );
      setEditingIndex(null);
    } else {
      setListItem([...listItem, { text: data.listItem, checked: false }]);
    }
// Reset the form after submission
    reset();
  };

  // delete Functionality
  const handleDelete = (index: number) => {
    setListItem((prevList) =>
      prevList.filter((item, i: number) => i !== index)
    );
  };

  // checked item
  const onChange = (index: number, e: any) => {
    setListItem((prevList) =>
      prevList.map((item, i) =>
        i === index ? { ...item, checked: e.target.checked } : item
      )
    );
  };

    // Handler to selected item for editing
  const editTodo = (index: number) => {
    const itemToEdit: string = listItem[index].text;
    setValue("listItem", itemToEdit);
    setEditingIndex(index);
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
            <Button
              type="primary"
              htmlType="submit"
              size="large"
            >
              {editingIndex !== null ? "Update" : "Submit"}
            </Button>
          </Space.Compact>
        </form>
        <div className="list">
          {listItem.map((item: List, index) => (
            <div key={index} className="innerList">
              <div className="text">
                <Checkbox
                  checked={item.checked}
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
