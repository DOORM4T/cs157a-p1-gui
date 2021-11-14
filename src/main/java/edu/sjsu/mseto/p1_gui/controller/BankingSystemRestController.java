package edu.sjsu.mseto.p1_gui.controller;

import edu.sjsu.mseto.p1_gui.p1.BankingSystem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BankingSystemRestController {
    @GetMapping("/api/accountSummary")
    public String accountSummary(@RequestParam(value = "cusID", defaultValue = "-1") String cusID) {
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
    public String reportB(@RequestParam(value = "minAge", defaultValue = "-1") String min, @RequestParam(value = "maxAge", defaultValue = "-1") String max) {
        try {
            if (Integer.parseInt(min) <= -1) throw new Exception("Invalid minAge");
            if (Integer.parseInt(max) <= -1) throw new Exception("Invalid maxAge");
            return BankingSystem.reportB(min, max);
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }
}
