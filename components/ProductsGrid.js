import styled from "styled-components";
import ProductBox from "@/components/ProductBox";
import { Category } from "@/models/Category";
import { useState, useEffect } from "react";
import { mongooseConnect } from "@/lib/mongoose";
import axios from "axios";
const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
const Select = styled.select`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  appearance: none;
  outline: none;
  background-color: white;
  background-image: linear-gradient(to bottom, #f9f9f9, #e9e9e9);
  background-repeat: no-repeat;
  background-position: right 0.7rem top 50%, 0 0;
  margin-bottom: 10px;
  &:focus {
    border-color: #0070f3;
    box-shadow: 0 0 0 2px rgba(163, 157, 160, 0.8);
  }
`;
const Option = styled.option`
  font-size: 1rem;
  outline: none;
  background-color: white;
`;
const Label = styled.label`
  fontsize: "1rem";
  fontweight: "bold";
  margin-right: 5px;
`;
const Label1 = styled.label`
  fontsize: "1rem";
  fontweight: "bold";
  margin-right: 5px;
  margin-left: 10px;
`;

export default function ProductsGrid({ products }) {
  const [products1, setProducts] = useState(products);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("init");

  const handleSelected = (event) => {
    setSelected(event.target.value);
  };
  const handleSort = (event) => {
    if (event.target.value == "highest") {
      const sortedArr = [...products1].sort((a, b) => b.price - a.price);
      setProducts(sortedArr);
    } else if (event.target.value == "lowest") {
      const sortedArr = [...products1].sort((a, b) => a.price - b.price);
      setProducts(sortedArr);
    } else {
      const sortedArr = [...products1].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setProducts(sortedArr);
    }
  };

  useEffect(() => {
    axios.post("api/category").then((res) => setCategories(res.data));
  }, []);

  return (
    <>
      <Label>Bộ lọc </Label>
      <Select onChange={(event) => handleSelected(event)} defaultValue={"init"}>
        <Option key="init" value="init">
          Tất cả
        </Option>
        {categories.length > 0 &&
          categories.map((category) => (
            <Option key={category._id} value={category._id}>
              {category.name}
            </Option>
          ))}
      </Select>

      <Label1>Xếp theo </Label1>
      <Select onChange={(event) => handleSort(event)} defaultValue={"initsort"}>
        <Option key="initsort" value="initsort">
          Mật định
        </Option>
        <Option value="highest" key="highest">
          Giá từ cao đến thấp
        </Option>
        <Option value="lowest" key="lowest">
          Giá từ thấp đến cao
        </Option>
      </Select>

      <StyledProductsGrid>
        {products1?.length > 0 &&
          products1.map((product) =>
            product.category == selected ? (
              <ProductBox key={product._id} {...product} />
            ) : (
              selected == "init" && (
                <ProductBox key={product._id} {...product} />
              )
            )
          )}
      </StyledProductsGrid>
    </>
  );
}
