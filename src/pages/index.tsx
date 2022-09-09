import type { NextPage } from "next";
import Head from "next/head";
import { FilterDrawer, SearchResults } from "../components";
import { SearchProv, useFilter } from "../hooks";
import { FormProvider } from "react-hook-form";
import * as React from "react";
const Home: NextPage = () => {
  const filterObj = useFilter();
  const {
    methods,
    onSubmit,
    res: { data, refetch, fetchStatus },
  } = filterObj;
  const { handleSubmit, register, watch } = methods;
  return (
    <>
      <Head>
        <title>Doctors </title>
      </Head>
      <main className="grid min-h-screen py-10 place-items-start ">
        <section className="mx-auto space-y-5 bg-base-300 py-10 px-4 rounded-xl shadow-xl max-w-[550px] w-full">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-3 form-control"
            >
              <div className="input-group">
                <input
                  type="text"
                  placeholder="City e.g Hamburg or Berlin"
                  className="w-full input"
                  {...register("city", { required: true })}
                />
                <FilterDrawer />
              </div>
              <button
                disabled={!watch("city")}
                type="submit"
                className="btn text-white btn-success"
              >
                {fetchStatus == "fetching" ? "searching..." : "search"}
              </button>
            </form>
            <SearchProv state={{ refreshResults: refetch }}>
              <SearchResults list={data?.list || []} />
            </SearchProv>
          </FormProvider>
        </section>
      </main>
    </>
  );
};

export default Home;
