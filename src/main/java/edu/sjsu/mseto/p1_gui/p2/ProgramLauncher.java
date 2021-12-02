package edu.sjsu.mseto.p1_gui.p2;

/**
 * Main entry to program.
 */
public class ProgramLauncher {

    public static void initBankingSystem(String argv[]) throws BankingSystemException {
        System.out.println(":: PROGRAM START");

        if (argv.length < 1) {
            throw new BankingSystemException("PROGRAM", "Need database properties filename");
        } else {
            BankingSystem.init(argv[0]);
        }

        System.out.println(":: PROGRAM END");
    }
}