import { Response } from "express";

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any
) => {
  return res.status(statusCode).json({
    success: true,
    statusCode:res.statusCode,
    message:res.statusMessage,
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
    statusCode:res.statusCode,
    name:res.constructor.name,
    message:res.statusMessage,
    stack,
    timeStamp: new Date()
  });
};