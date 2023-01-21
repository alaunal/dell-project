import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import Datatables from "@/components/Datatables";
import { debounce } from "lodash";

import api from "../../helpers/api";

export async function getServerSideProps() {
  const [cartsRes] = await Promise.all([api.get(`carts`)]);

  const [data] = await Promise.all([cartsRes?.data]);

  const carts: Array<object> = [];

  data.carts.map((item: any, index: number) => {
    carts.push({
      id: item.id,
      total: item.total,
      discountedTotal: item.discountedTotal,
      userId: item.userId,
      totalProducts: item.totalProducts,
      totalQuantity: item.totalQuantity,
      username: `users-${item.userId}`,
      cartNumber: `cart-id-${item.id}`,
    });
  });

  return {
    props: {
      carts: carts,
    },
  };
}

const ActionLink = ({ value }: any) => {
  return (
    <Link href={`/carts/${value}`} className="text-green-500 hover:text-green-700">
      Detial
    </Link>
  );
};

const Carts = (props: any) => {
  const columns = useMemo(
    () => [
      {
        Header: "Cart Number",
        accessor: "cartNumber",
      },
      {
        Header: "Username",
        accessor: "username",
      },
      {
        Header: "Total Pruduct",
        accessor: "totalProducts",
      },
      {
        Header: "Disc. total",
        accessor: "discountedTotal",
      },
      {
        Header: "Total",
        accessor: "total",
        Cell: ({ value }: any) => (
          <span className="font-semibold">${value}</span>
        ),
      },
      {
        Header: "Total Qty.",
        accessor: "totalQuantity",
      },
      {
        Header: "Action",
        accessor: "id",
        Cell: ActionLink,
      },
    ],
    []
  );

  const [data, setData] = useState<any[]>(props.carts);

  const [keywords, setKeywords] = useState<string>("");

  const changeHandler = (event: any) => {
    setKeywords(event.target.value);
  };

  const filterArray = (array: any, filters: any) => {
    const filterKeys = Object.keys(filters);
    return array.filter((item: any) => {
      return filterKeys.every((key) => {
        if (!filters[key].length) return true;
        return filters[key].find(
          (filter: any) =>
            item[key].toLowerCase().indexOf(filter.toLowerCase()) !== -1
        );
      });
    });
  };

  const handlerFilters = () => {
    const filter: any = {};

    if (keywords.length) {
      filter["username"] = [keywords];
      filter["cartNumber"] = [keywords];
    }

    const result: any = filterArray(props.carts, filter);

    setData(result);
  };

  useEffect(() => {
    if (keywords.length >= 2) {
      handlerFilters();
    } else if (keywords.length === 0) {
      setData(props.carts);
    }
  }, [keywords]);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 350),
    []
  );

  return (
    <Layout>
      <div className="w-full bg-violet-700 rounded-3xl">
        <div className="px-8 py-8">
          <h1 className="text-3xl font-semibold text-violet-100">Carts</h1>
          <p className="text-violet-200">
            list of carts with a simple datatables.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-8">
            <div className="">
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="Search by name..."
                onChange={(e: any) => debouncedChangeHandler(e)}
              />
            </div>
          </div>

          <Datatables columns={columns} data={data} />
        </div>
      </div>
    </Layout>
  );
};

export default Carts;
