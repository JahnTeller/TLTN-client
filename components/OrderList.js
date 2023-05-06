import styled from "styled-components";
import Table from "./Table";
import Link from "next/link";

const TableOrder = styled.table`
  border-collapse: collapse;
  width: 100%;
  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  th {
    background-color: lightgray;
    text-align: center;
  }
  tr {
    &:hover {
      background-color: #ccccff;
    }
  }
`;
export default function OrderTable({ orderList }) {
  console.log(orderList);
  return (
    <>
      <TableOrder>
        <thead>
          <th>Người nhận hàng</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Địa Chỉ</th>
          <th>Tình trạng thanh toán</th>
          <th>Sản phẩm</th>
        </thead>
        <tbody>
          {orderList &&
            orderList.map((order) => (
              <tr>
                <td>{order.name}</td>
                <td>{order.email}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.address}</td>
                <td>{order.paid ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                <td>
                  {order.line_items.map((item) => (
                    <p>
                      <Link href="">{item.price_data.product_data.name}</Link> x{" "}
                      {item.quantity}
                    </p>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </TableOrder>
    </>
  );
}
