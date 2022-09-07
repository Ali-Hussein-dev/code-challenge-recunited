import * as React from "react";
import { DoctorT } from "../types";

const Card = ({
  firstName,
  areaOfExpertise,
  email,
  lastName,
  facility,
  city,
}: DoctorT) => {
  return (
    <div className="w-full pb-2 border-b border-gray-300 text-neutral shadow-none ">
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
    </div>
  );
};
//======================================
export const SearchResults = ({ list }: { list: DoctorT[] }) => {
  //======================================return
  return (
    <div className="space-y-3 md:px-3">
      <h2 className="text-center ">Results {list.length}</h2>
      <div className="space-y-3">
        {list.map((doctor) => (
          <Card key={doctor.id} {...doctor} />
        ))}
      </div>
    </div>
  );
};
