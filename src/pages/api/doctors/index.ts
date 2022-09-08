import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { DoctorT, FilterParamsT } from "../../../types";
import { filterDoctors } from "../../../utils";
import { faunaQuery } from "../../../db/fauna";
import { Doctor } from "../../../db/doctors";

const searchHandler = nc<NextApiRequest, NextApiResponse>()
  //------------------------------------------------------------
  .get(async (req, res) => {
    const { query } = req;
    const params = {
      areaOfExpertise: query.areaOfExpertise,
      city: query.city,
      facility: query.facility,
    } as FilterParamsT;

    const dbRes = await faunaQuery<{ data: { data: DoctorT }[] }>(
      await Doctor.docotors_by(params.city),
      {
        debugInfo: `get docotor with ${req.url} failed`,
      }
    );
    if (!dbRes?.data) {
      res.status(500).json({ status: "error" });
    }
    const doctors_by_city = dbRes?.data.map((doc) => doc?.data);

    let filteredList = doctors_by_city;
    if (doctors_by_city && (params.areaOfExpertise || params.facility)) {
      filteredList = filterDoctors(params, doctors_by_city);
    }
    res.status(200).json({ list: filteredList, status: "success" });
  })
  //------------------------------------------------------------
  .post(async (req, res) => {
    const { query, body } = req;
    // schema validation && user input sensitization
    const parsedBody = JSON.parse(body);
    console.log(parsedBody, query.id);
    const dbRes = await faunaQuery<{ data: any }>(
      await Doctor.Create(parsedBody),
      {
        debugInfo: `create docotor with ${req.url} failed`,
      }
    );
    if (!dbRes?.data) {
      res.status(500).json({ status: "error" });
    } else return res.status(200).json({ status: "success" });
  });

export default searchHandler;
