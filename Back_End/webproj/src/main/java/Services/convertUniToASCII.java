package Services;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class convertUniToASCII {
    public String removeAccent(String s) {
        String temp = Normalizer.normalize(s, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(temp).replaceAll("");
    }

    public static String execSpaceChar(String s) {
        String temp = "";
        temp = s.replace("?", "");
        temp = temp.replace(' ', '-');
        return temp;
    }

    public String finalArticleUrl(String s) {
        String temp = "";

        temp = removeAccent(s);
        temp = execSpaceChar(temp);
        temp = temp.toLowerCase();

        return temp;
    }
}
