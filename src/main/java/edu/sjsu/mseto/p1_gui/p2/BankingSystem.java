package edu.sjsu.mseto.p1_gui.p2;

import java.io.FileInputStream;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Types;
import java.util.ArrayList;
import java.util.Properties;

/**
 * Manage connection to database and perform SQL statements.
 */
public class BankingSystem {
    // Database schema constants
    // it for each statement.
    private static final String SCHEMA_NAME = "P2";

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
    public static boolean testConnection() {
        System.out.println(":: TEST - CONNECTING TO DATABASE");
        try {
            Class.forName(driver);
            setupConnection();

            System.out.println(":: TEST - SUCCESSFULLY CONNECTED TO DATABASE");
            return true;
        } catch (Exception e) {
            System.out.println(":: TEST - FAILED CONNECTED TO DATABASE");
            e.printStackTrace();
        }

        return false;
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
            // 1. IN p_name CHAR(15)
            // 2. IN p_gender CHAR(1)
            // 3. IN p_age INTEGER
            // 4. IN p_pin INTEGER
            // 5. OUT id INTEGER
            // 6. OUT sql_code INTEGER
            // 7. OUT err_msg CHAR(100)

            CallableStatement insertCustomer = con.prepareCall("CALL P2.CUST_CRT(?, ?, ?, ?, ?, ?, ?)");

            insertCustomer.setString(1, name);
            insertCustomer.setString(2, gender);
            setPSInt(insertCustomer, 3, age, "CREATE NEW CUSTOMER", "INVALID AGE");
            setPSInt(insertCustomer, 4, pin, "CREATE NEW CUSTOMER", "INVALID PIN");
            insertCustomer.registerOutParameter(5, Types.INTEGER);
            insertCustomer.registerOutParameter(6, Types.INTEGER);
            insertCustomer.registerOutParameter(7, Types.CHAR);

            stmt = insertCustomer;
            insertCustomer.executeUpdate();

            int newCustomerId = insertCustomer.getInt(5);
            int sql_code = insertCustomer.getInt(6);
            String err_msg = insertCustomer.getString(7);

            stmt.close();

            if (sql_code != 0)
                throw new BankingSystemException("CREATE NEW CUSTOMER", err_msg);

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
     * @return returns the New account number. Returns -1 upon failure.
     */
    public static int openAccount(String id, String type, String amount) {
        System.out.println(":: OPEN ACCOUNT - RUNNING");

        try {
            // 1. IN p_id INTEGER
            // 2. IN p_balance INTEGER
            // 3. IN p_type CHAR(1)
            // 4. OUT number INTEGER
            // 5. OUT sql_code INTEGER
            // 6. OUT err_msg CHAR(100)
            CallableStatement openAccount = con.prepareCall("CALL P2.ACCT_OPN(?, ?, ?, ?, ?, ?)");

            setPSInt(openAccount, 1, id, "OPEN ACCOUNT", "INVALID ID");
            setPSInt(openAccount, 2, amount, "OPEN ACCOUNT", "INVALID AMOUNT");
            openAccount.setString(3, type);
            openAccount.registerOutParameter(4, Types.INTEGER);
            openAccount.registerOutParameter(5, Types.INTEGER);
            openAccount.registerOutParameter(6, Types.CHAR);

            stmt = openAccount;
            openAccount.executeUpdate();

            int newAccountNum = openAccount.getInt(4);
            int sql_code = openAccount.getInt(5);
            String err_msg = openAccount.getString(6);

            stmt.close();

            if (sql_code != 0)
                throw new BankingSystemException("OPEN ACCOUNT", err_msg);

            System.out.println(":: OPEN ACCOUNT - SUCCESS");
            return newAccountNum;
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
     */
    public static String closeAccount(String accNum) {
        System.out.println(":: CLOSE ACCOUNT - RUNNING");

        String result;
        try {
            // 1. IN p_number INTEGER
            // 2. OUT sql_code INTEGER
            // 3. OUT err_msg CHAR(100)
            CallableStatement closeAccount = con.prepareCall("CALL P2.ACCT_CLS(?, ?, ?)");

            setPSInt(closeAccount, 1, accNum, "CLOSE ACCOUNT", "INVALID ACCOUNT NUMBER");
            closeAccount.registerOutParameter(2, Types.INTEGER);
            closeAccount.registerOutParameter(3, Types.CHAR);

            stmt = closeAccount;
            closeAccount.executeUpdate();

            int sql_code = closeAccount.getInt(2);
            String err_msg = closeAccount.getString(3);

            stmt.close();

            if (sql_code != 0)
                throw new BankingSystemException("CLOSE ACCOUNT", err_msg);

            result = ":: CLOSE ACCOUNT - SUCCESS";
        } catch (BankingSystemException e) {
            result = e.getMessage();
        } catch (Exception e) {
            result = ":: CLOSE ACCOUNT - FAILED";
        }

        System.out.println(result);
        return result;
    }

    /**
     * Deposit into an account.
     *
     * @param accNum account number
     * @param amount deposit amount
     */
    public static String deposit(String accNum, String amount) {
        System.out.println(":: DEPOSIT - RUNNING");

        String result;
        try {
            // 1. IN p_number INTEGER
            // 2. IN p_amt INTEGER
            // 3. OUT sql_code INTEGER
            // 4. OUT err_msg CHAR(100)
            CallableStatement deposit = con.prepareCall("CALL P2.ACCT_DEP(?, ?, ?, ?)");

            setPSInt(deposit, 1, accNum, "DEPOSIT", "INVALID ACCOUNT NUMBER");
            setPSInt(deposit, 2, amount, "DEPOSIT", "INVALID AMOUNT");
            deposit.registerOutParameter(3, Types.INTEGER);
            deposit.registerOutParameter(4, Types.CHAR);

            stmt = deposit;
            deposit.executeUpdate();

            int sql_code = deposit.getInt(3);
            String err_msg = deposit.getString(4);

            stmt.close();

            if (sql_code != 0)
                throw new BankingSystemException("DEPOSIT", err_msg);

            result = ":: DEPOSIT - SUCCESS";
        } catch (BankingSystemException e) {
            result = e.getMessage();
        } catch (Exception e) {
            result = ":: DEPOSIT - FAILED";
        }

        System.out.println(result);
        return result;
    }

    /**
     * Withdraw from an account.
     *
     * @param accNum account number
     * @param amount withdraw amount
     */
    public static String withdraw(String accNum, String amount) {
        System.out.println(":: WITHDRAW - RUNNING");

        String result;
        try {
            // 1. IN p_number INTEGER
            // 2. IN p_amt INTEGER
            // 3. OUT sql_code INTEGER
            // 4. OUT err_msg CHAR(100)
            CallableStatement withdraw = con.prepareCall("CALL P2.ACCT_WTH(?, ?, ?, ?)");

            setPSInt(withdraw, 1, accNum, "WITHDRAW", "INVALID ACCOUNT NUMBER");
            setPSInt(withdraw, 2, amount, "WITHDRAW", "INVALID AMOUNT");
            withdraw.registerOutParameter(3, Types.INTEGER);
            withdraw.registerOutParameter(4, Types.CHAR);

            stmt = withdraw;
            withdraw.executeUpdate();

            int sql_code = withdraw.getInt(3);
            String err_msg = withdraw.getString(4);

            stmt.close();

            if (sql_code != 0)
                throw new BankingSystemException("WITHDRAW", err_msg);
            result = ":: WITHDRAW - SUCCESS";
        } catch (BankingSystemException e) {
            result = e.getMessage();
        } catch (Exception e) {
            result = ":: WITHDRAW - FAILED";
        }

        System.out.println(result);
        return result;
    }

    /**
     * Transfer amount from source account to destination account.
     *
     * @param srcAccNum  source account number
     * @param destAccNum destination account number
     * @param amount     transfer amount
     */
    public static String transfer(String srcAccNum, String destAccNum, String amount) {
        System.out.println(":: TRANSFER - RUNNING");

        String result;
        try {
            // 1. IN p_number_src INTEGER
            // 2. IN p_number_dest INTEGER
            // 3. IN p_amt INTEGER
            // 4. OUT sql_code INTEGER
            // 5. OUT err_msg CHAR(100))
            CallableStatement transfer = con.prepareCall("CALL P2.ACCT_TRX(?, ?, ?, ?, ?)");

            setPSInt(transfer, 1, srcAccNum, "TRANSFER", "INVALID SOURCE ACCOUNT NUMBER");
            setPSInt(transfer, 2, destAccNum, "TRANSFER", "INVALID DESTINATION ACCOUNT NUMBER");
            setPSInt(transfer, 3, amount, "TRANSFER", "INVALID AMOUNT");
            transfer.registerOutParameter(4, Types.INTEGER);
            transfer.registerOutParameter(5, Types.CHAR);

            stmt = transfer;
            transfer.executeUpdate();

            int sql_code = transfer.getInt(4);
            String err_msg = transfer.getString(5);

            stmt.close();

            if (sql_code != 0)
                throw new BankingSystemException("TRANSFER", err_msg);

            result = ":: TRANSFER - SUCCESS";
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
                    "SELECT AVG(ASUM.total) FROM %s C, (SELECT %s, SUM(%s) as total FROM %s WHERE %s = 'A' GROUP BY %s) ASUM WHERE C.%s >= ? AND C.%s <= ? AND C.%s = ASUM.%s",
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
            // 1. IN p_id INTEGER
            // 2. IN p_pin INTEGER
            // 3. OUT valid INTEGER
            // 4. OUT sql_code INTEGER
            // 5. OUT err_msg CHAR(100)
            CallableStatement loginCustomer = con.prepareCall("CALL P2.CUST_LOGIN(?, ?, ?, ?, ?)");

            setPSInt(loginCustomer, 1, id, "LOGIN", "INVALID ID");
            setPSInt(loginCustomer, 2, pin, "LOGIN", "INVALID PIN");
            loginCustomer.registerOutParameter(3, Types.INTEGER);
            loginCustomer.registerOutParameter(4, Types.INTEGER);
            loginCustomer.registerOutParameter(5, Types.CHAR);

            stmt = loginCustomer;
            loginCustomer.executeUpdate();

            int valid = loginCustomer.getInt(3);
            int sql_code = loginCustomer.getInt(4);
            String err_msg = loginCustomer.getString(5);

            stmt.close();

            if (sql_code != 0)
                throw new BankingSystemException("LOGIN", err_msg);

            // Can login if valid == 1
            return valid == 1 ? true : false;
        } catch (BankingSystemException e) {
            System.out.println(e.getMessage());
        } catch (Exception e) {
            System.out.println(":: LOGIN - FAILED");
        }
        return false;
    }

    /**
     * Add interest to all active accounts. Different account types may have
     * different rates.
     *
     * @param savingsRate
     * @param checkingRate
     */
    public static String addInterest(String savingsRate, String checkingRate) {
        System.out.println(":: ADD INTEREST - RUNNING");

        String result;
        try {
            // 1. IN p_savings_rate REAL
            // 2. IN p_checking_rate REAL
            // 3. OUT sql_code INTEGER
            // 4. OUT err_msg CHAR(100))
            CallableStatement addInterest = con.prepareCall("CALL P2.ADD_INTEREST(?, ?, ?, ?)");

            setPSFloat(addInterest, 1, savingsRate, "ADD INTEREST", "INVALID SAVINGS RATE");
            setPSFloat(addInterest, 2, checkingRate, "ADD INTEREST", "INVALID CHECKING RATE");
            addInterest.registerOutParameter(3, Types.INTEGER);
            addInterest.registerOutParameter(4, Types.CHAR);

            stmt = addInterest;
            addInterest.executeUpdate();

            int sql_code = addInterest.getInt(3);
            String err_msg = addInterest.getString(4);

            stmt.close();

            if (sql_code != 0)
                throw new BankingSystemException("ADD INTEREST", err_msg);

            result = ":: ADD INTEREST - SUCCESS";
        } catch (BankingSystemException e) {
            result = e.getMessage();
        } catch (Exception e) {
            result = ":: ADD INTEREST - FAILED";
        }
        System.out.println(result);
        return result;
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

    /**
     * Parses a String to a Float and sets it at a specified index of a prepared
     * statement
     *
     * @param ps
     * @param index
     * @param toParse
     * @param methodName
     * @param errReason
     * @throws BankingSystemException with a custom method name and error reason
     */
    private static void setPSFloat(PreparedStatement ps, int index, String toParse, String methodName, String errReason)
            throws BankingSystemException {
        try {
            ps.setFloat(index, Float.parseFloat(toParse));
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