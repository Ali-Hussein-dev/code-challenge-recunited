import type { NextPage } from "next";
import Head from "next/head";
import { FilterDrawer, SearchResults } from "../components";
import { useFilter } from "../hooks";
import { FormProvider } from "react-hook-form";

const Home: NextPage = () => {
  const filterObj = useFilter();
  const {
    methods,
    onSubmit,
    res: { data },
  } = filterObj;
  const { handleSubmit, register, watch } = methods;
  return (
    <>
      <Head>
        <title>Doctors </title>
      </Head>
      <main className="min-h-screen  place-items-start grid py-10 ">
        <section className="mx-auto space-y-5 bg-base-300 py-10 px-4 rounded-xl shadow-xl max-w-[550px] w-full">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="form-control space-y-3"
            >
              <div className="input-group">
                <input
                  type="text"
                  placeholder="City"
                  className="input w-full"
                  {...register("city", { required: true })}
                />
                <FilterDrawer />
              </div>
              <button
                disabled={!watch("city")}
                type="submit"
                className="btn  btn-success text-white"
              >
                submit
              </button>
            </form>
            <SearchResults list={data?.list || []} />
          </FormProvider>
        </section>
      </main>
    </>
  );
};

export default Home;
