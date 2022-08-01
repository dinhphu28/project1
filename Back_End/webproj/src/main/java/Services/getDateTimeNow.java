package Services;

import java.time.LocalDate;
import java.time.LocalTime;

public class getDateTimeNow {
    public String resultDateTimeString() {
        String resultStr = "";

        resultStr = "" + LocalDate.now() + LocalTime.now();

        resultStr = resultStr.replace(" ", "");
        resultStr = resultStr.replace(":", "");
        resultStr = resultStr.replace(".", "");
        resultStr = resultStr.replace("-", "");

        return resultStr;
    }
}
