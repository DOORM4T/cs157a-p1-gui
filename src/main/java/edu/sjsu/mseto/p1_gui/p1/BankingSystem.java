package edu.sjsu.mseto.p1_gui.p1;

import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Properties;

/**
 * Manage connection to database and perform SQL statements.
 */
public class BankingSystem {
    // Database schema constants
    // it for each statement.
    private static final String SCHEMA_NAME = "P1";

    private static final String ACCOUNT_TABLE = "ACCOUNT";
    private static final String CUSTOMER_TABLE = "CUSTOMER";

    private static final String CUSTOMER_ATTR_ID = "ID";
    private static final String CUSTOMER_ATTR_NAME = "NAME";
    private static final String CUSTOMER_ATTR_GENDER = "GENDER";
    private static final String CUSTOMER_ATTR_AGE = "AGE";
    private static final String CUSTOMER_ATTR_PIN = "PIN";

    private static final String ACCOUNT_ATTR_NUMBER = "NUMBER";
    private static final String ACCOUNT_ATTR_ID = "ID";
    private static final String ACCOUNT_ATTR_BALANCE = "BALANCE";
    private static final String ACCOUNT_ATTR_TYPE = "TYPE";
    private static final String ACCOUNT_ATTR_STATUS = "STATUS";

    // Other constants
    private static final int CHECK_CONSTRAINT_VIOLATION_ERROR_CODE = -545;

    // Connection properties
    private static String driver;
    private static String url;
    private static String username;
    private static String password;

    // JDBC Objects
    private static Connection con;
    private static Statement stmt;
    private static ResultSet rs;

    /**
     * Initialize database connection given properties file.
     *
     * @param filename name of properties file
     */
    public static void init(String filename) {
        try {
            Properties props = new Properties(); // Create a new Properties object
            FileInputStream input = new FileInputStream(filename); // Create a new FileInputStream object using our
            // filename parameter
            props.load(input); // Load the file contents into the Properties object
            driver = props.getProperty("jdbc.driver"); // Load the driver
            url = props.getProperty("jdbc.url"); // Load the url
            username = props.getProperty("jdbc.username"); // Load the username
            password = props.getProperty("jdbc.password"); // Load the password

            setupConnection();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Test database connection.
     */
    public static void testConnection() {
        System.out.println(":: TEST - CONNECTING TO DATABASE");
        try {
            Class.forName(driver);
            setupConnection();

            System.out.println(":: TEST - SUCCESSFULLY CONNECTED TO DATABASE");
        } catch (Exception e) {
            System.out.println(":: TEST - FAILED CONNECTED TO DATABASE");
            e.printStackTrace();
        }
    }

    /**
     * Create a new customer.
     *
     * @param name   customer name
     * @param gender customer gender
     * @param age    customer age
     * @param pin    customer pin
     * @return Returns the new customer's ID. Returns -1 if the operation failed.
     */
    public static int newCustomer(String name, String gender, String age, String pin) {
        System.out.println(":: CREATE NEW CUSTOMER - RUNNING");

        try {
            String sql = String.format("INSERT INTO %s (%s, %s, %s, %s) VALUES (?, ?, ?, ?)", CUSTOMER_TABLE,
                    CUSTOMER_ATTR_NAME, CUSTOMER_ATTR_GENDER, CUSTOMER_ATTR_AGE, CUSTOMER_ATTR_PIN);

            // Use the RETURN_GENERATED_KEYS option so we can get the automatically
            // generated ID of the new customer
            PreparedStatement insertCustomer = con.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            insertCustomer.setString(1, name);
            insertCustomer.setString(2, gender);

            setPSInt(insertCustomer, 3, age, "CREATE NEW CUSTOMER", "INVALID AGE");
            setPSInt(insertCustomer, 4, pin, "CREATE NEW CUSTOMER", "INVALID PIN");

            stmt = insertCustomer;
            int result = insertCustomer.executeUpdate();

            // Get the auto-generated customer ID
            rs = insertCustomer.getGeneratedKeys();
            rs.next();
            int newCustomerId = rs.getInt(1);
            stmt.close();

            if (result == 0)
                throw new Exception();

            System.out.println(":: CREATE NEW CUSTOMER - SUCCESS");
            return newCustomerId;
        } catch (BankingSystemException e) {
            System.out.println(e.getMessage());
        } catch (Exception e) {
            System.out.println(":: CREATE NEW CUSTOMER - FAILED");
        }
        return -1;
    }

    /**
     * Open a new account.
     *
     * @param id     customer id
     * @param type   type of account
     * @param amount initial deposit amount
     * @return returns the New account ID. Returns -1 upon failure.
     */
    public static int openAccount(String id, String type, String amount) {
        System.out.println(":: OPEN ACCOUNT - RUNNING");

        try {
            String sql = String.format("INSERT INTO %s (%s, %s, %s, %s) VALUES (?, ?, ?, ?)", ACCOUNT_TABLE,
                    ACCOUNT_ATTR_ID, ACCOUNT_ATTR_TYPE, ACCOUNT_ATTR_BALANCE, ACCOUNT_ATTR_STATUS);
            PreparedStatement openAcc = con.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            setPSInt(openAcc, 1, id, "OPEN ACCOUNT", "INVALID ID");
            openAcc.setString(2, type);
            setPSInt(openAcc, 3, amount, "OPEN ACCOUNT", "INVALID AMOUNT");
            openAcc.setString(4, "A"); // The created account will be (A)ctive

            stmt = openAcc;
            int result = openAcc.executeUpdate();
            // Get the auto-generated account ID
            rs = openAcc.getGeneratedKeys();
            rs.next();
            int newAccId = rs.getInt(1);
            stmt.close();

            if (result == 0)
                throw new Exception();
            System.out.println(":: OPEN ACCOUNT - SUCCESS");
            return newAccId;
        } catch (BankingSystemException e) {
            System.out.println(e.getMessage());
        } catch (Exception e) {
            System.out.println(":: OPEN ACCOUNT - FAILED");
        }

        return -1;
    }

    /**
     * Close an account.
     *
     * @param accNum account number
     * @return result String
     */
    public static String closeAccount(String accNum) {
        System.out.println(":: CLOSE ACCOUNT - RUNNING");

        String result = ":: CLOSE ACCOUNT - SUCCESS";
        try {
            PreparedStatement closeAccount = con.prepareStatement(String.format("UPDATE %s SET %s = 'I' WHERE %s = ?",
                    ACCOUNT_TABLE, ACCOUNT_ATTR_STATUS, ACCOUNT_ATTR_NUMBER));

            setPSInt(closeAccount, 1, accNum, "CLOSE ACCOUNT", "INVALID ACCOUNT NUMBER");

            stmt = closeAccount;
            int numChanged = closeAccount.executeUpdate();
            stmt.close();

            if (numChanged == 0)
                throw new Exception();
        } catch (BankingSystemException e) {
            result = e.getMessage();
        } catch (Exception e) {
            result = ":: CLOSE ACCOUNT - FAILED";
        }
        return result;
    }

    /**
     * Deposit into an account.
     *
     * @param accNum account number
     * @param amount deposit amount
     * @return result String
     */
    public static String deposit(String accNum, String amount) {
        System.out.println(":: DEPOSIT - RUNNING");

        String result = ":: DEPOSIT - SUCCESS";
        try {
            handleDeposit(accNum, amount);
        } catch (BankingSystemException e) {
            result = e.getMessage();
        } catch (Exception e) {
            result = ":: DEPOSIT - FAILED";
        }

        return result;
    }

    /**
     * Handle a deposit
     * <p>
     * Error handling should be managed by the code calling this method.
     *
     * @param accNum
     * @param amount
     * @throws Exception
     */
    private static void handleDeposit(String accNum, String amount) throws Exception {
        PreparedStatement deposit = con.prepareStatement(String.format("UPDATE %s SET %s = %s + ? WHERE %s = ?",
                ACCOUNT_TABLE, ACCOUNT_ATTR_BALANCE, ACCOUNT_ATTR_BALANCE, ACCOUNT_ATTR_NUMBER));

        setPSInt(deposit, 1, amount, "DEPOSIT", "INVALID AMOUNT");
        setPSInt(deposit, 2, accNum, "DEPOSIT", "INVALID ACCOUNT NUMBER");

        stmt = deposit;
        int result = deposit.executeUpdate();
        stmt.close();

        if (result == 0)
            throw new Exception("0 accounts were updated by the deposit.");
    }

    /**
     * Withdraw from an account.
     *
     * @param accNum account number
     * @param amount withdraw amount
     * @return result String
     */
    public static String withdraw(String accNum, String amount) {
        System.out.println(":: WITHDRAW - RUNNING");
        String result = ":: WITHDRAW - SUCCESS";
        try {
            handleWithdraw(accNum, amount);
        } catch (BankingSystemException e) {
            result = e.getMessage();
        } catch (Exception e) {
            result = ":: WITHDRAW - FAILED";
        }

        return result;
    }

    /**
     * Handle a withdrawal
     * <p>
     * Error handling should be managed by the code calling this method.
     *
     * @param accNum
     * @param amount
     * @throws Exception
     */
    private static void handleWithdraw(String accNum, String amount) throws Exception {
        PreparedStatement withdraw = con.prepareStatement(String.format("UPDATE %s SET %s = %s - ? WHERE %s = ?",
                ACCOUNT_TABLE, ACCOUNT_ATTR_BALANCE, ACCOUNT_ATTR_BALANCE, ACCOUNT_ATTR_NUMBER));

        setPSInt(withdraw, 1, amount, "WITHDRAW", "INVALID AMOUNT");
        setPSInt(withdraw, 2, accNum, "WITHDRAW", "INVALID ACCOUNT NUMBER");

        stmt = withdraw;

        int result;
        try {
            result = withdraw.executeUpdate();
        } catch (SQLException e) {
            // Upon SQLException, look for a CHECK constraint violation error
            // An SQLException may have multiple SQLExceptions, so we iterate through them!
            SQLException ex = e;
            while (ex != null) {
                // Error Code -545 indicates a CHECK constraint violation
                // In this case, the withdrawal would violate the constraint where balance must
                // be >= 0
                // Reference: https://www.ibm.com/docs/en/db2-for-zos/11?topic=codes-545
                if (ex.getErrorCode() == CHECK_CONSTRAINT_VIOLATION_ERROR_CODE)
                    throw new BankingSystemException("WITHDRAW", "NOT ENOUGH FUNDS");
                ex = e.getNextException();
            }

            // Otherwise, throw the Exception for handling elsewhere
            throw e;
        }

        if (result == 0)
            throw new Exception("0 accounts were updated by the withdrawal.");

        stmt.close();

    }

    /**
     * Transfer amount from source account to destination account.
     *
     * @param srcAccNum  source account number
     * @param destAccNum destination account number
     * @param amount     transfer amount
     * @return string result
     */
    public static String transfer(String srcAccNum, String destAccNum, String amount) {
        System.out.println(":: TRANSFER - RUNNING");

        String result = ":: TRANSFER - SUCCESS";
        try {
            handleWithdraw(srcAccNum, amount);
            handleDeposit(destAccNum, amount);
        } catch (BankingSystemException e) {
            result = e.getMessage();
        } catch (Exception e) {
            result = ":: TRANSFER - FAILED";
        }

        System.out.println(result);
        return result;
    }

    /**
     * Display account summary.
     *
     * @param cusID customer ID
     * @return account summary
     */
    public static String accountSummary(String cusID) {
        System.out.println(":: ACCOUNT SUMMARY - RUNNING");

        ArrayList<Integer> accNums = new ArrayList<>();
        ArrayList<Integer> accBals = new ArrayList<>();
        int totalBalance = 0;

        try {
            PreparedStatement getAccountById = con.prepareStatement(
                    String.format("SELECT %s, %s FROM %s WHERE %s = ? AND %s = 'A'", ACCOUNT_ATTR_NUMBER,
                            ACCOUNT_ATTR_BALANCE, ACCOUNT_TABLE, ACCOUNT_ATTR_ID, ACCOUNT_ATTR_STATUS));

            setPSInt(getAccountById, 1, cusID, "ACCOUNT SUMMARY", "INVALID CUSTOMER ID");

            stmt = getAccountById;
            ResultSet rs = getAccountById.executeQuery();

            // Get values from the results set
            while (rs.next()) {
                int accNum = rs.getInt(1);
                int accBal = rs.getInt(2);
                accNums.add(accNum);
                accBals.add(accBal);
            }

            // Calculate total balance
            for (int bal : accBals) {
                totalBalance += bal;
            }

            stmt.close();

            if (accNums.size() == 0)
                throw new BankingSystemException("ACCOUNT SUMMARY", "NO RESULTS FOUND");

            String result = "";
            result += String.format("%s %11s\n", "NUMBER", "BALANCE");
            result += "---------- ----------\n";
            for (int i = 0; i < accNums.size(); i++) {
                result += String.format("%10d %10d\n", accNums.get(i), accBals.get(i));
            }
            result += "---------------------\n";
            result += String.format("%s %15s\n", "TOTAL", totalBalance);

            System.out.println(":: ACCOUNT SUMMARY - SUCCESS");

            return result;
        } catch (

                BankingSystemException e) {
            System.out.println(e.getMessage());
        } catch (Exception e) {
            System.out.println(e);
            System.out.println(":: ACCOUNT SUMMARY - FAILED");
        }

        return "No results found";
    }

    /**
     * Display Report A - Customer Information with Total Balance in Decreasing
     * Order.
     *
     * @return formatted reportA String
     */
    public static String reportA() {
        System.out.println(":: REPORT A - RUNNING");

        ArrayList<Integer> ids = new ArrayList<>();
        ArrayList<String> names = new ArrayList<>();
        ArrayList<String> genders = new ArrayList<>();
        ArrayList<Integer> ages = new ArrayList<>();
        ArrayList<Integer> totals = new ArrayList<>();

        try {
            stmt = con.createStatement();
            rs = stmt.executeQuery(String.format(
                    "SELECT C.%s, C.%s, C.%s, C.%s, A.total  FROM %s C, (SELECT %s, SUM(%s) as total from %s WHERE %s = 'A' GROUP BY %s, %s HAVING %s = 'A') A  WHERE C.%s = A.%s ORDER BY A.total DESC",
                    CUSTOMER_ATTR_ID, CUSTOMER_ATTR_NAME, CUSTOMER_ATTR_GENDER, CUSTOMER_ATTR_AGE, CUSTOMER_TABLE,
                    ACCOUNT_ATTR_ID, ACCOUNT_ATTR_BALANCE, ACCOUNT_TABLE, ACCOUNT_ATTR_STATUS, ACCOUNT_ATTR_ID,
                    ACCOUNT_ATTR_STATUS, ACCOUNT_ATTR_STATUS, CUSTOMER_ATTR_ID, ACCOUNT_ATTR_ID));

            // Get values from the results set
            while (rs.next()) {
                ids.add(rs.getInt(1));
                names.add(rs.getString(2));
                genders.add(rs.getString(3));
                ages.add(rs.getInt(4));
                totals.add(rs.getInt(5));
            }

            stmt.close();

            if (ids.size() == 0)
                throw new Exception("No reportA results.");

            String result = "";
            result += String.format("%s %13s %17s %3s %13s\n", "ID", "NAME", "GENDER", "AGE", "TOTAL");
            result += "----------- --------------- ------ ----------- -----------\n";

            for (int i = 0; i < ids.size(); i++) {
                result += String.format("%11s %15s %6s %11s %11s\n", ids.get(i), names.get(i), genders.get(i),
                        ages.get(i), totals.get(i));
            }
            return result;
        } catch (BankingSystemException e) {
            System.out.println(e.getMessage());
        } catch (Exception e) {
            System.out.println(":: REPORT A - FAILED");
        }

        System.out.println(":: REPORT A - SUCCESS");
        return "No results found";
    }

    /**
     * Display Report B - Average balance of customers within an age range
     *
     * @param min minimum age
     * @param max maximum age
     * @return formatted reportB String
     */
    public static String reportB(String min, String max) {
        System.out.println(":: REPORT B - RUNNING");

        int avgResult;
        try {
            PreparedStatement reportB = con.prepareStatement(String.format(
                    "SELECT AVG(ASUM.total) FROM p1.%s C, (SELECT %s, SUM(%s) as total FROM %s WHERE %s = 'A' GROUP BY %s) ASUM WHERE C.%s >= ? AND C.%s <= ? AND C.%s = ASUM.%s",
                    CUSTOMER_TABLE, ACCOUNT_ATTR_ID, ACCOUNT_ATTR_BALANCE, ACCOUNT_TABLE, ACCOUNT_ATTR_STATUS,
                    ACCOUNT_ATTR_ID, CUSTOMER_ATTR_AGE, CUSTOMER_ATTR_AGE, CUSTOMER_ATTR_ID, ACCOUNT_ATTR_ID));

            setPSInt(reportB, 1, min, "REPORT B", "INVALID MIN AGE");
            setPSInt(reportB, 2, max, "REPORT B", "INVALID MAX AGE");

            stmt = reportB;
            rs = reportB.executeQuery();

            // This query should return one value: the average of the accounts belonging to
            // customers within the age range
            rs.next();
            avgResult = rs.getInt(1);
            stmt.close();

            String result = "";
            result += String.format("%11s\n", "AVERAGE");
            result += "-----------\n";
            result += String.format("%11d\n", avgResult);

            return result;

        } catch (BankingSystemException e) {
            System.out.println(e.getMessage());
        } catch (Exception e) {
            System.out.println(":: REPORT B - FAILED");
        }

        System.out.println(":: REPORT B - SUCCESS");
        return "No results found";
    }

    /**
     * "Login" a customer by ID and PIN
     * <p>
     * This method actually just checks if a user's inputted ID and PIN match an
     * entry in the DB. If it does, that means they can "log in"
     *
     * @param id  customer ID
     * @param pin customer PIN
     * @return boolean value indicating that the user is "logged in" or not.
     */
    public static boolean login(String id, String pin) {
        System.out.println(":: LOGIN - RUNNING");

        try {
            PreparedStatement findCustomer = con
                    .prepareStatement(String.format("SELECT %s FROM %s WHERE %s = ? AND %s = ? LIMIT 1",
                            CUSTOMER_ATTR_ID, CUSTOMER_TABLE, CUSTOMER_ATTR_ID, CUSTOMER_ATTR_PIN));

            setPSInt(findCustomer, 1, id, "LOGIN", "INVALID CUSTOMER ID");
            setPSInt(findCustomer, 2, pin, "LOGIN", "INVALID PIN");

            stmt = findCustomer;
            rs = findCustomer.executeQuery();

            // This query should return one row containing the customer's ID
            rs.next();
            int result = rs.getInt(1);
            boolean canLogin = String.valueOf(result).equals(id);
            stmt.close();

            return canLogin;
        } catch (BankingSystemException e) {
            System.out.println(e.getMessage());
        } catch (Exception e) {
            System.out.println(":: LOGIN - FAILED");
        }
        return false;
    }

    /**
     * Checks if an account belongs to the specified customer
     *
     * @param accNum account number
     * @param cusID  customer ID
     * @return boolean value indicating that the account belongs to the customer or
     * not.
     */
    public static boolean doesOwnAccount(String accNum, String cusID) {
        System.out.println(":: ACCOUNT OWNERSHIP CHECK - RUNNING");
        try {
            PreparedStatement findAccount = con
                    .prepareStatement(String.format("SELECT %s FROM %s WHERE %s = ? AND %s = ? LIMIT 1",
                            ACCOUNT_ATTR_NUMBER, ACCOUNT_TABLE, ACCOUNT_ATTR_NUMBER, ACCOUNT_ATTR_ID));

            setPSInt(findAccount, 1, accNum, "ACCOUNT OWNERSHIP CHECK", "INVALID ACCOUNT NUMBER");
            setPSInt(findAccount, 2, cusID, "ACCOUNT OWNERSHIP CHECK", "INVALID CUSTOMER ID");

            stmt = findAccount;
            rs = findAccount.executeQuery();

            // This query should return one row containing the account number
            rs.next();
            int result = rs.getInt(1);
            boolean doesOwnAccount = String.valueOf(result).equals(accNum);
            stmt.close();

            return doesOwnAccount;
        } catch (BankingSystemException e) {
            System.out.println(e.getMessage());
        } catch (Exception e) {
            System.out.println(":: ACCOUNT OWNERSHIP CHECK - FAILED");
        }
        return false;
    }

    /**
     * Set up the DB connection
     * <p>
     * 1. Gets the DB connection
     * <p>
     * 2. Set the schema (this way statements don't need to worry about explicitly
     * setting schema name -- e.g. can use ACCOUNT instead of P1.ACCOUNT by setting
     * the schema to P1)
     *
     * @throws SQLException
     */
    private static void setupConnection() throws SQLException {
        con = DriverManager.getConnection(url, username, password);
        con.setSchema(SCHEMA_NAME);
    }

    /**
     * Parses a String to an Integer and sets it at a specified index of a prepared
     * statement
     *
     * @param ps
     * @param index
     * @param toParse
     * @param methodName
     * @param errReason
     * @throws BankingSystemException with a custom method name and error reason
     */
    private static void setPSInt(PreparedStatement ps, int index, String toParse, String methodName, String errReason)
            throws BankingSystemException {
        try {
            ps.setInt(index, Integer.parseInt(toParse));
        } catch (Exception e) {
            throw new BankingSystemException(methodName, errReason);
        }
    }
}

/**
 * Creates errors in a special Banking System format
 * <p>
 * For example...
 * <p>
 * :: CREATE NEW CUSTOMER - ERROR - INVALID PIN
 * <p>
 * CREATE NEW CUSTOMER is the methodName
 * <p>
 * INVALID PIN is the reason
 */
class BankingSystemException extends Exception {
    public BankingSystemException(String methodName, String reason) {
        super(String.format(":: %s - ERROR - %s", methodName, reason));
    }
}