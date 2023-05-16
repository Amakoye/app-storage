import { Form, Input, Icon, Button } from "antd";
import { useState } from "react";

let id = 0;

function DynamicForm({ form }) {
  const [keys, setKeys] = useState([]);

  const { getFieldDecorator } = form;

  const remove = (k) => {
    setKeys((prev) => [...prev].filter((key) => key !== k));

    if (keys.length === 1) {
      return;
    }
  };

  const add = () => {
    const nextKeys = [...keys, id++];
    setKeys(nextKeys);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        console.log("Received values of form: ", values);
        /*   console.log(
          "Merged values:",
          keys.map((key) => names[key])
        ); */
      }
    });
  };

  getFieldDecorator("keys", { initialValue: [] });

  const formItems = keys?.map((k, index) => (
    <Form.Item>
      {getFieldDecorator(`names[${k}]`, {
        validateTrigger: ["onChange", "onBlur"],
        rules: [
          {
            required: true,
            whitespace: true,
            message: "please input passenger's name or delete this field.",
          },
        ],
      })(
        <Input
          placeholder="passenger name"
          style={{ width: "60%", marginRight: 8 }}
        />
      )}{" "}
      {keys.length > 1 ? (
        <Icon
          className="dynamic-delete-button"
          type="minus-circle-o"
          onClick={() => remove(k)}
        />
      ) : null}
    </Form.Item>
  ));

  return (
    <Form onSubmit={handleSubmit}>
      {formItems}
      <Form.Item>
        <Button type="dashed" onClick={add} style={{ width: "60%" }}>
          <Icon type="plus" /> Add field
        </Button>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

const WrappedDynamicForm = Form.create({ name: "dynamic_form" })(DynamicForm);

export default WrappedDynamicForm;
