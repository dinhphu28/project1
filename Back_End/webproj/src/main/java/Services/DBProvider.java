package Services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DBProvider {
    private static String DB_URL = "jdbc:sqlserver://localhost:1433;databaseName=itproject1";
    private static String USER_NAME = "sa";
    private static String PASSWORD = "Ndpfree@192";

    /**
     *
     * @return
     */
    private static Connection getConnection() {
        String meomeo = "";
        Connection conn = null;
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            conn = DriverManager.getConnection(DB_URL, USER_NAME, PASSWORD);
            if (conn != null) {
                meomeo = "connection OK";
            }
            else {
                meomeo = "connection FAIL";
            }
            System.out.print(meomeo);
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        return conn;
    }

    /**
     *
     * @param query
     * @return
     */
    public ResultSet dbExecuteQuery(String query) {
        ResultSet rSet = null;
        Connection conn = getConnection();
        try {
            Statement stmt = conn.createStatement();
            rSet = stmt.executeQuery(query);
            //conn.close();
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        return rSet;
    }

    /**
     *
     * @param query
     */
    public void dbExecuteUpdate(String query) {
        Connection conn = getConnection();
        try {
            Statement stmt = conn.createStatement();
            stmt.executeUpdate(query);
            //conn.close();
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    /**
     *
     * @param query
     * @return
     */
    public Statement dbExecuteScalar(String query) {
        Statement stmt = null;
        Connection conn = getConnection();
        try {
            stmt = conn.createStatement();
            stmt.execute(query);
            //conn.close();
        }
        catch (Exception ex) {
            ex.printStackTrace();
        }
        return stmt;
    }
}
