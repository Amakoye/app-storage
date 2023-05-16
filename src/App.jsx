import { Button, Col, List, Row } from "antd";
import { useEffect, useState } from "react";
import AddItem from "./components/AddItem";
import WrappedDynamicForm from "./components/DynamicForm";
import WrappedDynamicFormPrac from "./components/DynamicFormPrac";

const StyledRow = ({ children }) => {
  return (
    <Row style={{ display: "flex", justifyContent: "center" }}>{children}</Row>
  );
};

function App() {
  const [items, setItems] = useState([]);
  /* 
  const localData = useCallback(() => {
    const data = JSON.parse(localStorage.getItem("items"));
    if (data) {
      console.log(data);
      setItems((prev) => [...prev, ...data]);
    }
  }, []);;
 */

  /***
   * sort obj[] on a property
   *
   */
  function sorted() {
    const arr = [...items];
    const sortedArr = [...arr].sort((item1, item2) => {
      return item1.id - item2.id;
    });

    console.log(
      "loging unsorted arr \n",
      arr.map((item) => item.name)
    );
    console.log(
      "loging sorted arr \n",
      sortedArr.map((item) => item.name)
    );
  }

  /**
   * find(), //find an obj in an array by property
   */
  function searchByName(name) {
    const res = items.find(
      (item) => item.name?.toLowerCase() === name?.toLowerCase()
    );

    return res;
  }

  /**
   * indeOf() // return an index of an item in an arr[]
   */

  function findIndex(arr, item) {
    return arr.indexOf(item);
  }

  /**
   * some () //tests if an element  in the [] passes the test implemented
   */

  function caseTest(arr, str) {
    const lowerCaseTest = (obj) => obj?.name.includes(str); //checks whether an []|string includes a certain value
    return arr.some(lowerCaseTest);
  }

  /**
   *
   * @param {*} itemId
   * @returns
   */

  const onDelete = (itemId) => {
    const filteredItems = items.filter((item) => item.id !== itemId);

    setItems([...filteredItems]);

    localStorage.setItem("items", JSON.stringify(filteredItems));

    return;
  };

  if (items) {
    //sorted();
    console.log(searchByName("test 3"));
    console.log(caseTest(items, "3"));
    console.log(findIndex(["banana", "apples", "oranges"], "apples"));
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("items"));
    if (data) {
      setItems([...data].reverse());
    }
  }, []);

  return (
    <div
      className="App"
      style={{
        padding: "2em",
      }}
    >
      <WrappedDynamicFormPrac />
      {/* 
      <StyledRow style={{ display: "flex", justifyContent: "center" }}>
        <Col xs={24} sm={24} lg={10}>
          <AddItem updateUIItems={setItems} />
        </Col>
      </StyledRow>
      <StyledRow>
        <Col xs={24} lg={10}>
          <List
            itemLayout="horizontal"
            dataSource={items}
            rowKey={(item) => item.id}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={item?.name}
                  description={item.description}
                />
                <Button onClick={() => onDelete(item.id)} type="danger">
                  Delete
                </Button>
              </List.Item>
            )}
          />
        </Col>
      </StyledRow> */}
    </div>
  );
}

export default App;
