import React, { useMemo } from "react";
import Layout from "@/components/Layout";
import Datatables from "@/components/Datatables";

import { HiArrowSmLeft } from "react-icons/hi";

import dayjs from "dayjs";

import api from "../../helpers/api";
import Link from "next/link";

export async function getServerSideProps(ctx: any) {
  let { params } = ctx;

  const [cartRes] = await Promise.all([api.get(`carts/${params.id}`)]);

  const [data] = await Promise.all([cartRes?.data]);

  return {
    props: {
      cart: data,
    },
  };
}

const CartDetail = (props: any) => {
  const { cart } = props;

  const columns = useMemo(
    () => [
      {
        Header: "name",
        accessor: "title",
      },
      {
        Header: "Qty.",
        accessor: "quantity",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Dics. (%)",
        accessor: "discountPercentage",
        Cell: ({ value }: any) => (
          <span className="font-semibold text-green-500">{value}%</span>
        ),
      },
      {
        Header: "Total",
        accessor: "total",
        Cell: ({ value }: any) => (
          <span className="font-semibold">${value}</span>
        ),
      },
    ],
    []
  );

  const data = React.useMemo(() => cart.products, []);

  return (
    <Layout>
      <div className="w-full bg-violet-700 rounded-3xl">
        <div className="px-8 py-8">
          <Link href="/carts" className="mb-3 text-gray-200 text-sm flex items-center">
            <HiArrowSmLeft className="mr-2" /> Back to carts
          </Link>
          <h1 className="text-3xl font-semibold text-violet-50">
            Cart Detail
          </h1>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6">
          <div className="grid grid-cols-4 gap-4 pb-8 mb-4 border-b border-gray-200">
            <div>
              <p className="text-gray-600">
                User: <br />
                <span className="text-slate-800 font-semibold text-lg">
                  user-{cart.userId}
                </span>
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                Added On: <br />
                <span className="text-slate-800 font-semibold text-lg">
                  {dayjs(new Date()).format("DD MMMM YYYY, HH:mm")}
                </span>
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                Total Item: <br />
                <span className="text-slate-800 font-semibold text-lg">
                  {cart.totalQuantity}
                </span>
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                Total Amount: <br />
                <span className="text-slate-800 font-semibold text-lg">
                  {cart.total}
                </span>
              </p>
            </div>
          </div>

          <h2 className="mb-6 text-lg font-bold text-slate-700">
            Products on cart
          </h2>
          <Datatables columns={columns} data={data} />
        </div>
      </div>
    </Layout>
  );
};

export default CartDetail;
