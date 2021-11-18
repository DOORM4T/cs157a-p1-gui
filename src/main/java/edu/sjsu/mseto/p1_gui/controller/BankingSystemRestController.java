package edu.sjsu.mseto.p1_gui.controller;

import edu.sjsu.mseto.p1_gui.p1.BankingSystem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class BankingSystemRestController {
    @GetMapping("/api/testConnection")
    public String testConnection() {
        return String.valueOf(BankingSystem.testConnection());
    }


    @GetMapping("/api/transfer")
    public String transfer(
            @RequestParam(value = "srcAccNum") String srcAccNum,
            @RequestParam(value = "destAccNum") String destAccNum,
            @RequestParam(value = "amount") String amount
    ) {
        try {
            String result = BankingSystem.transfer(srcAccNum, destAccNum, amount);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    @GetMapping("/api/withdraw")
    public String withdraw(
            @RequestParam(value = "accNum") String accNum,
            @RequestParam(value = "amount") String amount
    ) {
        try {
            String result = BankingSystem.withdraw(accNum, amount);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }


    @GetMapping("/api/deposit")
    public String deposit(
            @RequestParam(value = "accNum") String accNum,
            @RequestParam(value = "amount") String amount
    ) {
        try {
            String result = BankingSystem.deposit(accNum, amount);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    @GetMapping("/api/closeAccount")
    public String closeAccount(@RequestParam(value = "accNum") String accNum) {
        try {
            String result = BankingSystem.closeAccount(accNum);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    @GetMapping("/api/newCustomer")
    public String newCustomer(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "gender") String gender,
            @RequestParam(value = "age") String age,
            @RequestParam(value = "pin") String pin
    ) {
        try {
            int cusId = BankingSystem.newCustomer(name, gender, age, pin);
            return String.valueOf(cusId);
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    @GetMapping("/api/openAccount")
    public String openAccount(
            @RequestParam(value = "cusID") String cusID,
            @RequestParam(value = "type") String type,
            @RequestParam(value = "amount") String amount
    ) {
        try {
            int accId = BankingSystem.openAccount(cusID, type, amount);
            return String.valueOf(accId);
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }


    @GetMapping("/api/accountSummary")
    public String accountSummary(@RequestParam(value = "cusID") String cusID) {
        try {
            String result = BankingSystem.accountSummary(cusID);
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    @GetMapping("/api/reportA")
    public String reportA() {
        try {
            return BankingSystem.reportA();
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }


    @GetMapping("/api/reportB")
    public String reportB(@RequestParam(value = "minAge") String min, @RequestParam(value = "maxAge") String max) {
        try {
            if (Integer.parseInt(min) <= -1) throw new Exception("Invalid minAge");
            if (Integer.parseInt(max) <= -1) throw new Exception("Invalid maxAge");
            return BankingSystem.reportB(min, max);
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    // TODO: Remove this? Instead, perform necessary checks in close account & transfer
    @GetMapping("/api/doesOwnAccount")
    public String doesOwnAccount(@RequestParam(value = "accID") String accID, @RequestParam(value = "cusID") String cusID) {
        try {
            boolean result = BankingSystem.doesOwnAccount(accID, cusID);
            return String.valueOf(result);
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

    @GetMapping("/api/canLogin")
    public String canLogin(@RequestParam(value = "cusID") String cusID, @RequestParam(value = "pin") String pin) {
        try {
            boolean result = BankingSystem.login(cusID, pin);
            return String.valueOf(result);
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }
}
