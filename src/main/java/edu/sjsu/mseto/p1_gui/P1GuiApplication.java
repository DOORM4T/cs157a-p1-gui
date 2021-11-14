package edu.sjsu.mseto.p1_gui;

import edu.sjsu.mseto.p1_gui.p1.ProgramLauncher;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class P1GuiApplication {

    public static void main(String[] args) {
        try {
            ProgramLauncher.initBankingSystem(args);
            SpringApplication.run(P1GuiApplication.class, args);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
