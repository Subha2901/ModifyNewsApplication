import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import  useInfiniteScroll  from "react-infinite-scroll-hook";
import FetchNews from "./FetchNews";

const List = styled.ul`
  list-style: none;
  font-size: 16px;
  margin: 0;
  padding: 6px;
`;

const ListItem = styled.li`
  background-color: #fafafa;
  border: 1px solid #99b4c0;
  padding: 8px;
  margin: 4px;
`;

const ARRAY_SIZE = 20;
const RESPONSE_TIME = 1000;

function PrintImg(props) {
  return (
    <FetchNews category='general' loading={props.loading} setLoading={props.setLoading} />
  );
}

function loadItems(prevArray = [], startCursor = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      let newArray = prevArray;

      for (let i = startCursor; i < startCursor + ARRAY_SIZE; i++) {
        const newItem = {
          key: i,
          value: `This is item ${i}`
        };
        newArray = [...newArray, newItem];
      }

      resolve(newArray);
    }, RESPONSE_TIME);
  });
}

function InfiniteList(props, { scrollContainer }) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  function handleLoadMore() {
    setLoading(true);
    loadItems(items, items.length).then(newArray => {
      setLoading(false);
      setItems(newArray);
    });
  }

  const infiniteRef = useInfiniteScroll({
    loading,
    // This value is set to "true" for this demo only. You will need to
    // get this value from the API when you request your items.
    hasNextPage: true,
    threshold: 400,
    onLoadMore: handleLoadMore,
    scrollContainer
  });

  return (
    <List ref={infiniteRef}>
      {items.map(item => (
        <ListItem key={item.key}>
          {item.value}
          <PrintImg props={props}/>
        </ListItem>
      ))}
      {loading && <ListItem>Loading...</ListItem>}
    </List>
  );
}

InfiniteList.propTypes = {
  scrollContainer: PropTypes.oneOf(["window", "parent"])
};

export default InfiniteList;
