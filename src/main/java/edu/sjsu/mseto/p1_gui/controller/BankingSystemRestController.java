package edu.sjsu.mseto.p1_gui.controller;

import edu.sjsu.mseto.p1_gui.p1.BankingSystem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BankingSystemRestController {
    @GetMapping("/hello")
    public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
        String result = BankingSystem.accountSummary("100");
        return result;
    }
}
