export const discounts = (numberOfUnits, numberOfDays, price) => {
    let tariff = "1 Day+";
    if (numberOfDays >= 7 && numberOfDays < 30)
        tariff = "1 Week+";
    if (numberOfDays >= 30)
        tariff = "1 Month+";

    switch(tariff) {
        case "1 Day+": 
            if (numberOfUnits == 1)
                return price * numberOfDays;
            if (numberOfUnits >= 2 && numberOfUnits < 6)
                return (price - price * 0.05) * numberOfDays;
            if (numberOfUnits >= 6 && numberOfUnits < 11)
                return (price - price * 0.15) * numberOfDays;
            if (numberOfUnits >= 11 && numberOfUnits < 50)
                return (price - price * 0.25) * numberOfDays;
        case "1 Week+": 
            if (numberOfUnits == 1)
                return (price - price * 0.1) * numberOfDays;
            if (numberOfUnits >= 2 && numberOfUnits < 6)
                return (price - price * 0.1 - price * 0.05) * numberOfDays;
            if (numberOfUnits >= 6 && numberOfUnits < 11)
                return (price - price * 0.1 - price * 0.15) * numberOfDays;
            if (numberOfUnits >= 11 && numberOfUnits < 50)
                return (price - price * 0.1 - price * 0.25) * numberOfDays;
        case "1 Month+": 
            if (numberOfUnits == 1)
                return (price - price * 0.2) * numberOfDays;
            if (numberOfUnits >= 2 && numberOfUnits < 6)
                return (price - price * 0.2 - price * 0.05) * numberOfDays;
            if (numberOfUnits >= 6 && numberOfUnits < 11)
                return (price - price * 0.2 - price * 0.15) * numberOfDays;
            if (numberOfUnits >= 11 && numberOfUnits < 50)
                return (price - price * 0.2 - price * 0.25) * numberOfDays;
        default: return 0;
    }
};