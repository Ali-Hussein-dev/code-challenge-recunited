import * as React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { DoctorT } from "../types";
import { useModify } from "../hooks";

const areaOfExpertiseList = [
  { value: "Allergy and Immunology", label: "Allergy and Immunology" },
  { value: "Anesthesiology", label: "Anesthesiology" },
  { value: "Colon and Rectal surgery", label: "Colon and Rectal surgery" },
  { value: "Dermoatology", label: "Dermoatology" },
  { value: "Emergency Medicine", label: "Emergency Medicine" },
];

//======================================
export function FormDrawer({
  type,
  defaultValues,
}: {
  type: "modify" | "create";
  defaultValues?: DoctorT;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { methods, onSubmit } = useModify({
    method: type === "create" ? "POST" : "PATCH",
    defaultValues,
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitted },
  } = methods;
  return (
    <>
      <button onClick={onOpen} type="button" className="btn btn-outline btn-sm">
        {type}
      </button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>{type} </DrawerHeader>
            <DrawerBody>
              <fieldset className="space-y-2">
                <span className="text-sm border-l pl-2">
                  Doctor ID: {defaultValues?.id}
                </span>
                <input
                  type="email"
                  placeholder="Email"
                  className="input bg-base-200  w-full"
                  {...register("email", { required: true })}
                />
                <input
                  placeholder="First name"
                  className="input bg-base-200  w-full"
                  {...register("firstName", { required: true })}
                />
                <input
                  placeholder="Last name"
                  className="input bg-base-200  w-full"
                  {...register("lastName", { required: true })}
                />
                <input
                  placeholder="City"
                  className="input bg-base-200  w-full"
                  {...register("city", { required: true })}
                />
                <input
                  placeholder="Facility"
                  className="input bg-base-200  w-full"
                  {...register("facility", { required: true })}
                />
              </fieldset>
              <div className="divider"></div>
              <div className="">
                <h2 className="text-center font-semibold">Area Of Expertise</h2>
                {areaOfExpertiseList.map((item) => (
                  <label
                    key={item.label}
                    className="label cursor-pointer mb-0 pb-0"
                  >
                    <span className="label-text">{item.label}</span>
                    <input
                      type="radio"
                      className="radio checked:bg-emerald-400"
                      value={item.value}
                      {...register("areaOfExpertise", { required: true })}
                    />
                  </label>
                ))}
              </div>
              <div className="divider"></div>
            </DrawerBody>

            <DrawerFooter>
              <div className="row-between w-full">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button className="btn btn-success text-base-100" type="submit">
                  {isSubmitted ? "submitted" : "submit"}
                </button>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}
