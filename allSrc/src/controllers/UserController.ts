import type { NextFunction, Request, Response } from "express";
import UserObj from "../services/UserServices";
import { Usertype } from "../../interface/Interface";
import { InternalServerError } from "../../utils/errorClasses";
import { successResponse } from "../../utils/responseObj";

const UserCreate = async (req: Request<{}, {}, Usertype>, res: Response, next: NextFunction) => {
    try {
        const dt = new Date();
        const indianTime = new Date(
            dt.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
        );
        const body = Object.assign(req.body, { Time: indianTime });

        const createData = await UserObj.Create(body);

        if (!createData) {
            throw new InternalServerError(`something wrong in the class side`);
        }
        successResponse(res, 200, "creation of user successfully", createData);
    }

    catch (err) {
        next(err)
    }
}

export { UserCreate };