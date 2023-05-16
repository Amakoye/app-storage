import { Button, Col, Form, Row, Icon, Select, Input, Spin } from "antd";
import { useState } from "react";

let id = 1;
function DynamicFormPrac({ form }) {
  const [keys, setKeys] = useState([0]);
  const [loading, setLoading] = useState(false);

  const requestTypes = [
    {
      name: "Laboratory",
      value: "laboratory",
    },
    {
      name: "Radiology",
      value: "radiology",
    },
    {
      name: "Procedure",
      value: "procedure",
    },
  ];
  const { getFieldDecorator } = form;

  const removeField = (k) => {
    console.log(k);
    setKeys((prev) => [...prev].filter((key) => key !== k));
    if (keys.length === 1) {
      return;
    }
  };

  const addField = () => {
    const nextKeys = [...keys, id++];
    setKeys(nextKeys);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let requestData = [];
    form.validateFields((err, values) => {
      if (!err) {
        const { requestType, service, cost, notes, location } = values;
        keys.forEach((k) => {
          requestData = [
            ...requestData,
            {
              requestType: requestType[k],
              service: service[k],
              cost: cost[k],
              notes: notes[k],
            },
          ];
        });
        setLoading(true);
        console.log({
          location,
          requestData,
        });
        /*  setTimeout(() => {
          form.resetFields();
          setLoading(false);
        }, 2000); */
      }
    });
  };

  getFieldDecorator("keys", { initialValue: [{}] });

  const formItems = keys.map((k, i) => (
    <div
      key={k}
      style={{
        border: "1px solid #ccc",
        borderStyle: "dashed",
        borderRadius: "1em",
        padding: "1em",
        marginTop: "5px",
        marginBottom: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item label={i === 0 ? "Request Type" : ""}>
              {getFieldDecorator(`requestType[${k}]`, {
                validateTrigger: ["onChange", "onBlur"],
                rules: [
                  {
                    required: true,
                    message: "Please select request type or delete this field.",
                  },
                ],
              })(
                <Select placeholder="Select Request Type">
                  {requestTypes.map((type) => (
                    <Select.Option key={type.value} value={type.value}>
                      {type.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={i === 0 ? "Service" : ""}>
              {getFieldDecorator(`service[${k}]`, {
                validateTrigger: ["onChange", "onBlur"],
                rules: [
                  {
                    required: true,
                    message: "This field is required",
                  },
                ],
              })(
                <Input
                  disabled={!form.getFieldValue(`requestType[${k}]`)}
                  placeholder="Service"
                />
              )}
            </Form.Item>
          </Col>
        </Row>

        {form.getFieldValue(`service[${k}]`) && (
          <Row gutter={12}>
            <Col span={12}>
              <Form.Item label={i === 0 ? "Cost" : ""}>
                {getFieldDecorator(`cost[${k}]`, {
                  validateTrigger: ["onChange", "onBlur"],
                  rules: [
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ],
                })(<Input type="number" placeholder="Cost" />)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={i === 0 ? "Notes" : ""}>
                {getFieldDecorator(`notes[${k}]`, {
                  validateTrigger: ["onChange", "onBlur"],
                  rules: [
                    {
                      required: true,
                      message: "This field is required",
                    },
                  ],
                })(<Input.TextArea rows={6} placeholder="Notes" />)}
              </Form.Item>
            </Col>
          </Row>
        )}
      </div>
      <Button type="danger" onClick={() => removeField(k)}>
        <Icon type="minus-circle-o" />
      </Button>
    </div>
  ));

  return (
    <Form
      style={{ width: 600, padding: "1em" }}
      layout="vertical"
      onSubmit={handleSubmit}
    >
      {loading && (
        <div style={{ display: "grid", placeItems: "center" }}>
          <Spin />
        </div>
      )}
      <Form.Item label="Location">
        {getFieldDecorator(`location`, {
          validateTrigger: ["onChange", "onBlur"],
          rules: [
            {
              required: true,
            },
          ],
        })(<Input placeholder="Location" />)}
      </Form.Item>
      {formItems}
      <Row>
        <Col span={4}>
          <Form.Item>
            <Button type="dashed" onClick={addField}>
              <Icon type="plus" /> Add
            </Button>
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

const WrappedDynamicFormPrac = Form.create({ name: "dynamic_form_prac" })(
  DynamicFormPrac
);

export default WrappedDynamicFormPrac;
