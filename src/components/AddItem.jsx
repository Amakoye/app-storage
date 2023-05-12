import { Button, Form, Input } from "antd";
import { useState } from "react";

const ItemForm = ({ form, toggleAddForm, updateUIItems }) => {
  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    const items = JSON.parse(localStorage.getItem("items"));
    form.validateFields((err, values) => {
      const item = {
        id: Date.now(),
        ...values,
      };
      if (items) {
        localStorage.setItem("items", JSON.stringify([...items, item]));
        updateUIItems((prev) => [...items, item].reverse()); //return a sorted array in reverse
      } else {
        localStorage.setItem("items", JSON.stringify([item]));
        updateUIItems((prev) => [item]);
      }
      toggleAddForm();
    });
    return;
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator("name", {
          rules: [
            {
              required: true,
            },
          ],
        })(<Input type="text" placeholder="Item Name" />)}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator("description", {
          rules: [
            {
              required: true,
            },
          ],
        })(
          <Input.TextArea rows={8} type="text" placeholder="Item Description" />
        )}
      </Form.Item>
      <Form.Item style={{ float: "right" }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

const WrappedItemForm = Form.create({ name: "item_form" })(ItemForm);

const AddItem = ({ updateUIItems }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const toggleAddForm = () => {
    setShowAddForm((prev) => !prev);
  };

  return (
    <>
      <Button
        htmlType="button"
        onClick={toggleAddForm}
        type={showAddForm ? "danger" : "primary"}
        style={{ float: "right" }}
      >
        {showAddForm ? "Cancel" : "Add Item"}
      </Button>
      {showAddForm && (
        <WrappedItemForm
          updateUIItems={updateUIItems}
          toggleAddForm={toggleAddForm}
        />
      )}
    </>
  );
};

export default AddItem;
