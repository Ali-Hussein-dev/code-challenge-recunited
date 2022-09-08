import * as React from "react";
import { DoctorT } from "../types";
import { useDelete } from "../hooks";
import { FormDrawer } from "./form-drawer";

type CardPropsT = DoctorT;
const Card = (props: CardPropsT) => {
  const { id, firstName, areaOfExpertise, email, lastName, facility, city } =
    props;
  const { mutate } = useDelete(id);
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
            {/* // todo add proper element for email */}
            <span className="">{email}</span>
            <span className="">{facility}</span>
          </div>
        </div>

        <div className="row-end gap-x-3">
          <button
            onClick={() => {
              const confirm = prompt("Type DELETE to confirm deletion");
              if (confirm === "DELETE") {
                mutate();
                console.info("deletion is confirmed with", confirm);
              } else {
                console.info("deletion wasn't confirmed", confirm);
              }
            }}
            type="button"
            className="btn btn-outline btn-sm btn-error"
          >
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
