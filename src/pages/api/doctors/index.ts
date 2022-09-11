import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { DoctorT, FilterParamsT } from "../../../types";
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
      await Doctor.docotors_by(params),
      {
        debugInfo: `get docotor with ${req.url} failed`,
      }
    );
    const doctors_by = dbRes?.data.map((doc) => doc?.data);

    res.status(200).json({ list: doctors_by, status: "success" });
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
