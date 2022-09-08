import type { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { Doctor } from "../../../db/doctors";
import { faunaQuery } from "../../../db/fauna";
import { DoctorT } from "../../../types";

const getDoctorsHandler = nc<NextApiRequest, NextApiResponse>()
  //------------------------------------------------------------
  .patch(async (req, res) => {
    const { query, body } = req;
    // schema validation && user input sensitization
    const parsedBody = JSON.parse(body);
    const id = query.id as string;
    console.log({ id, parsedBody });
    // avoid overriding docotor id
    delete parsedBody.id;
    const dbRes = await faunaQuery<{ data: DoctorT }>(
      Doctor.Update(id, parsedBody),
      {
        debugInfo: `update doctor with ${id} failed`,
      }
    );
    if (!dbRes?.data) {
      res.status(500).json({ status: "error" });
    } else return res.status(200).json({ status: "success" });
  })
  //------------------------------------------------------------
  .delete(async (req, res) => {
    const { query } = req;
    console.log(query, req.url);
    const id = query.id as string;
    if (!id) {
      return res.status(401).json({ status: "error" });
    }
    const dbRes = await faunaQuery<{ data: any }>(Doctor.Drop(id), {
      debugInfo: `delete doctor with ${req.url} failed `,
    });
    if (!dbRes?.data) {
      return res.status(500).json({ status: "error" });
    }
    res.status(200).json({ status: "success" });
  });

export default getDoctorsHandler;
