import { Response } from "express";

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any
) => {
  return res.status(statusCode).json({
    success: true,
    statusCode,
    message,
    data,
    timeStamp: new Date()
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  name: string,
  message: string,
  stack?: string
) => {
  return res.status(statusCode).json({
    success: false,
    statusCode,
    name,
    message,
    stack,
    timeStamp: new Date()
  });
};