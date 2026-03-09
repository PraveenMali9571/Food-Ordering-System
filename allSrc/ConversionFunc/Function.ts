
import MenuObj from "../MenuSrc/MenuServices/Menu.service";

// <=========================== FUNCTION FOR GIVING AN MEAL AS A TIME ==================>

export const getMealTypeByTime = async (Time: any) => {
    try {
        const Menumeal = paraMeal(Time);
        const menudt = await MenuObj.readMenu(Menumeal);

        if (!menudt) {
            throw new Error('No menu data found for the requested time');
        }
        return menudt;
    }
    catch (err: any) {
        throw new Error('failed to fetched the Menu Data');
    }


}

export function paraMeal(Tm: any) {
    let now = new Date(Tm);
    let Hr = now.getHours();
    let Mn = now.getMinutes();

    const HourToMinutes = (Hour: any, Minute: any) => {
        return Hour * 60 + Minute;
    }
    let UserCametime = HourToMinutes(Hr, Mn);
    let breakfastStartTime: number = HourToMinutes(7, 30);
    let breakfastEndTime: number = HourToMinutes(11, 30);
    let lunchEndTime: number = HourToMinutes(18, 30);
    let dinnerEndTime: number = HourToMinutes(20, 30);

    if (breakfastStartTime <= UserCametime && UserCametime <= breakfastEndTime) {

        console.log("breakfast");
        return `breakfast`;

    }
    else if (breakfastEndTime < UserCametime && UserCametime <= lunchEndTime) {

        console.log(`lunch`);
        return `lunch`;

    }
    else if (lunchEndTime < UserCametime && UserCametime <= dinnerEndTime) {
        console.log("dinner");
        return `dinner`;
    }
    else {
        console.log("default");
        return `default`;
    }
}
