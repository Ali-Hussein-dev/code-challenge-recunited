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
import { useFormContext } from "react-hook-form";
import { FiFilter } from "react-icons/fi";

const areaOfExpertiseList = [
  { value: "Allergy and Immunology", label: "Allergy and Immunology" },
  { value: "Anesthesiology", label: "Anesthesiology" },
  { value: "Colon and Rectal surgery", label: "Colon and Rectal surgery" },
  { value: "Dermoatology", label: "Dermoatology" },
  { value: "Emergency Medicine", label: "Emergency Medicine" },
];

const RadioList = ({ list }: { list: { label: string; value: string }[] }) => {
  const { register } = useFormContext();
  return (
    <div className="">
      <h2 className="text-center mb-2 ">Area Of Expertise</h2>
      {list.map((item) => (
        <label key={item.label} className="label cursor-pointer">
          <span className="label-text">{item.label}</span>
          <input
            type="radio"
            // name="radio-6"
            className="radio checked:bg-emerald-400"
            value={item.value}
            {...register("areaOfExpertise", { required: true })}
            // checked
          />
        </label>
      ))}
    </div>
  );
};
//======================================
export function FilterDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { register } = useFormContext();

  return (
    <>
      <button onClick={onOpen} type="button" className="btn btn-square">
        <FiFilter />
        <span className="sr-only">open filter drawer</span>
      </button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Get more relevant results</DrawerHeader>

          <DrawerBody>
            <RadioList list={areaOfExpertiseList} />
            <div className="divider">Facility</div>
            <input
              placeholder="e.g. DRK Klinik"
              className="input bg-base-200  w-full"
              {...register("facility")}
            />
          </DrawerBody>

          <DrawerFooter>
            <div className="row-between w-full">
              <button className="btn btn-outline">Cancel</button>
              <button
                className="btn btn-success text-base-100"
                onClick={onClose}
              >
                save
              </button>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
