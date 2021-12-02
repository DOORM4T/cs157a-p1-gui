package edu.sjsu.mseto.p1_gui;

import edu.sjsu.mseto.p1_gui.p2.ProgramLauncher;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class P2GuiApplication {

    public static void main(String[] args) {
        try {
            ProgramLauncher.initBankingSystem(args);
            SpringApplication.run(P2GuiApplication.class, args);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
