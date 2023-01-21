import React, { useMemo, useState, useEffect } from "react";
import Layout from "@/components/Layout";
import SelectBox from "@/components/SelectBox";
import Datatables from "@/components/Datatables";
import { debounce } from "lodash";

import api from "../helpers/api";

export async function getServerSideProps() {
  const [productRes] = await Promise.all([api.get(`products`)]);

  const [data] = await Promise.all([productRes?.data]);

  const category: any[] = [];
  const brand: any[] = [];
  const products: any[] = [];

  data.products.map((item: any, index: number) => {
    const checkCategory = category.filter(
      (category: any) => category.toUpperCase() === item.category.toUpperCase()
    );
    const checkBrand = brand.filter(
      (brand: any) => brand.toUpperCase() === item.brand.toUpperCase()
    );

    if (checkCategory.length < 1) {
      category.push(item.category);
    }

    if (checkBrand.length < 1) {
      brand.push(item.brand);
    }

    products.push({
      id: item.id,
      title: item.title,
      brand: item.brand,
      price: item.price,
      stock: item.stock,
      category: item.category,
    });
  });

  return {
    props: {
      products: products,
      categories: category,
      brand: brand,
    },
  };
}

const index = (props: any) => {
  const columns = useMemo(
    () => [
      {
        Header: "Product name",
        accessor: "title",
      },
      {
        Header: "Brand",
        accessor: "brand",
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ value }: any) => (
          <span className="font-semibold">${value}</span>
        ),
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
      {
        Header: "Categories",
        accessor: "category",
      },
    ],
    []
  );

  const [data, setData] = useState<any[]>(props.products);

  const [keywords, setKeywords] = useState<string>("");

  const [category, setcategory] = useState<string>("");

  const [brand, setBrand] = useState<string>("");

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
      filter["title"] = [keywords];
    }

    if (brand.length) {
      filter["brand"] = [brand];
    }

    if (category.length) {
      filter["category"] = [category];
    }

    const result: any = filterArray(props.products, filter);

    setData(result);
  };

  useEffect(() => {
    if (keywords.length >= 2) {
      handlerFilters();
    } else if (keywords.length === 0) {
      setData(props.products);
    }
  }, [keywords]);

  useEffect(() => {
    handlerFilters();
  }, [category, brand]);

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
          <h1 className="text-3xl font-semibold text-violet-100">Products</h1>
          <p className="text-violet-200">
            list of production with a simple datatables.
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
            <div className="">
              <SelectBox
                data={props.brand}
                placeholder="Select brand"
                onChange={(e: any) => setBrand(e.target.value)}
              />
            </div>
            <div className="">
              <SelectBox
                data={props.categories}
                placeholder="Select categories"
                onChange={(e: any) => setcategory(e.target.value)}
              />
            </div>
          </div>

          <Datatables columns={columns} data={data} />
        </div>
      </div>
    </Layout>
  );
};

export default index;
