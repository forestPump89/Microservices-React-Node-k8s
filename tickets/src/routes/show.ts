import { NotFoundError } from "@tsavlis/common";
import express, { Request, Response } from "express";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get("/api/tickets/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const ticketFound = await Ticket.findById(id);

  if (!ticketFound) {
    throw new NotFoundError();
  }

  res.send(ticketFound);
});

export { router as showTicketRouter };
