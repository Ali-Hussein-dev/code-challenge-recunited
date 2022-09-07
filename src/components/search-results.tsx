import * as React from "react";
import { DoctorT } from "../types";
import { FormDrawer } from "./form-drawer";

const Card = (props: DoctorT) => {
  const { firstName, areaOfExpertise, email, lastName, facility, city } = props;
  return (
    <div className="w-full px-3 py-4 rounded bg-base-200 text-neutral shadow-none ">
      <div className="space-y-3">
        <div className="">
          <h2 className="card-title">
            {firstName} {lastName}
          </h2>
          <div className="row-between gap-x-2">
            <span className="italic ">{areaOfExpertise}</span>
            <span className="text-gray-500">{city}</span>
          </div>
          <div className="col-start mt-2">
            <a></a>
            <span className="">{email}</span>
            <span className="">{facility}</span>
          </div>
        </div>

        <div className="row-end gap-x-3">
          <button type="button" className="btn btn-outline btn-sm btn-error">
            Delete
          </button>
          <FormDrawer type="modify" defaultValues={{ ...props }} />
        </div>
      </div>
    </div>
  );
};
//======================================
export const SearchResults = ({ list }: { list: DoctorT[] }) => {
  //======================================return
  return (
    <div className="space-y-3 ">
      <h2 className="text-center" hidden={list.length < 1}>
        Results {list.length}
      </h2>
      <div className="space-y-3">
        {list.map((doctor) => (
          <Card key={doctor.id} {...doctor} />
        ))}
      </div>
      <div className="divider"></div>
      <div className="row-center">
        <FormDrawer type="create" />
      </div>
    </div>
  );
};
