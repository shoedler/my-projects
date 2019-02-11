/******************************************************************************
** Copyright (c) Studer AG  -  Postfach  -  CH-3602 Thun  -  www.studerag.ch **
*******************************************************************************
** MODUL       : PMC-Ladder-Funktionen
** NAME        : $Workfile: fc12092.h $
** SOFTWARE-NR : 12092
** DATUM       : $Date: 20.11.17 15:13 $
** VERSION     : $Revision: 6 $
** PROJEKT     : Projekt NC90
** AUTOR       : A.Schödler
** SYSTEM      : Fanuc MODEL-31i-A  / Studer-Ladder-Compiler/Linker
*******************************************************************************
** $Log: /Development_F/StuderNC/FanucPMC/inc/fc12092.h $
**
** 6     20.11.17 15:13 Rle
** NEW: SUB460
**
** 5     29.10.14 14:13 Asc
** NEW: CTRB SUB56.
**
** 4     24.03.14 13:53 Ast
** Definition rückgängig gemacht, da der Kompiler die Schlüsselwörter
** direkt kennt.
**
** 2     31.07.08 14:00 Hwe
** CHG: TMB_ADR und CTR_ADR ins fc10297.mdf verschoben
**
** 1     29.05.08 16:03 Asc
** Kopie von fc10092.h Rev. 9.
******************************************************************************/


#ifndef     __FC12092__
#define     __FC12092__

/***************************************************************************
** Definitionen gemäss:
** Fanuc PMC-Model Serie 31i Modell A PMC Programmierhandbuch  B-63983GE/02
**
***************************************************************************/

#define END1        SUB1                // First level program end
#define END2        SUB2                // Second level program end
#define END3        SUB48               // Third level program end

#define SUBEND      SUB64               // End of subprogramms
#define SUBCALL     SUB65               // Conditional call of subprogramms
#define SUBCALLU    SUB66               // Unconditional call of subprogramms
#define SUBPRG      SUB71               // Subprogramm
#define SUBE        SUB72               // End of a Subprogramm

#define TMR         SUB3                // Timer processing
#define TMRB        SUB24               // Fixed timer processing
#define TMRC        SUB54               // Timer processing
#define TMRBF       SUB77               // Fixed off-delay timer (Timer Nr. = TMRB)

// DEC wird nicht ersetzt               // Decoding
#define DECB        SUB25               // Binary decoding

#define CTR         SUB5                // Counter
#define CTRC        SUB55               // Counter processing
#define CTRB        SUB56               // Fixed counter processing

#define ROT         SUB6                // Rotation control
#define ROTB        SUB26               // Binary rotation control

#define COD         SUB7                // Code conversion
#define CODB        SUB27               // Binary code conversion

#define MOVE        SUB8                // Data transfer after conjunction
#define MOVOR       SUB28               // Data transfer after disjunction

#define COM         SUB9                // Common line control
#define COME        SUB29               // Common line control end

#define JMP         SUB10               // Jump
#define JMPE        SUB30               // Jump end
#define JMPB        SUB68               // Label Jump
#define JMPC        SUB73               // Label Jump to Mainladder
#define LBL         SUB69               // Set Label

#define PARI        SUB11               // Parity check

#define DCNV        SUB14               // Data conversion
#define DCNVB       SUB31               // Extended data conversion

#define COMP        SUB15               // Comparision
#define COMPB       SUB32               // Binary comparision

#define COIN        SUB16               // Coincidence check
#define SFT         SUB33               // Shift register

#define DSCH        SUB17               // Data search
#define DSCHB       SUB34               // Binary data search

#define XMOV        SUB18               // Indexed data transfer
#define XMOVB       SUB35               // Binary indexed data transfer

#define ADD         SUB19               // Addition
#define ADDB        SUB36               // Binary addition

#define SUB         SUB20               // Subtraction
#define SUBB        SUB37               // Binary subtraction

#define MUL         SUB21               // Multiplication
#define MULB        SUB38               // Binary multiplication

#define DIV         SUB22               // Division
#define DIVB        SUB39               // Binary division

#define NUME        SUB23               // Definition of constant
#define NUMEB       SUB40               // Definition of binary constant

#define DISP        SUB49               // Message display
#define DISPB       SUB41               // Extended message display

#define EXIN        SUB42               // External data input

#define MOVB        SUB43               // One-byte Transfer
#define MOVW        SUB44               // Two-byte Transfer
#define MOVN        SUB45               // Arbitrary number of byte Transfer

#define WINDR       SUB51               // Window data read
#define WINDW       SUB52               // Window data write

#define DIFU        SUB57               // Detect rising edge
#define DIFD        SUB58               // Detect falling edge

#define AXCTL       SUB53               // Axiscontrol by PMC

#define EXOR        SUB59               // Exclusive OR
#define LOGAND      SUB60               // Logical AND
#define LOGOR       SUB61               // Logical OR
#define LOGNOT      SUB62               // Logical NOT

#define FNC90       SUB90               // Arbitrary functional instruction
#define FNC91       SUB91               // Arbitrary functional instruction
#define FNC92       SUB92               // Arbitrary functional instruction
#define FNC93       SUB93               // Arbitrary functional instruction
#define FNC94       SUB94               // Arbitrary functional instruction
#define FNC95       SUB95               // Arbitrary functional instruction
#define FNC96       SUB96               // Arbitrary functional instruction
#define FNC97       SUB97               // Arbitrary functional instruction

#define MMC3R       SUB88               // Reading MMCiii window data
#define MMC3W       SUB89               // Writing MMCiii window data
#define MMCWR       SUB98               // Reading MMC window data
#define MMCWW       SUB99               // Writing MMC window data
#define PID         SUB460

#define SWITCH      SUB74               // CS Function: Case Start
#define CASE        SUB75               // CM Function: Case Call
#define ENDCASE     SUB76               // CE Function: End Case

#define EQB         SUB200              // Signed Binary Comparison (=) 1 byte length
#define EQW         SUB201              // ... 2 bytes length
#define EQD         SUB202              // ... 4 bytes length
#define NEB         SUB203              // Signed Binary Comparison (<>) 1 byte length
#define NEW         SUB204              // ... 2 bytes length
#define NED         SUB205              // ... 4 bytes length
#define GTB         SUB206              // Signed Binary Comparison (>) 1 byte length
#define GTW         SUB207              // ... 2 bytes length
#define GTD         SUB208              // ... 4 bytes length
#define LTB         SUB209              // Signed Binary Comparison (<) 1 byte length
#define LTW         SUB210              // ... 2 bytes length
#define LTD         SUB211              // ... 4 bytes length
#define GEB         SUB212              // Signed Binary Comparison (>=) 1 byte length
#define GEW         SUB213              // ... 2 bytes length
#define GED         SUB214              // ... 4 bytes length
#define LEB         SUB215              // Signed Binary Comparison (<=) 1 byte length
#define LEW         SUB216              // ... 2 bytes length
#define LED         SUB217              // ... 4 bytes length

/***************************************************************************
** Parameter-Definitionen
***************************************************************************/
#define PMC_BYTE        1
#define PMC_WORD        2
#define PMC_DWORD       4
#define PMC_CONST_BYTE  0001
#define PMC_CONST_WORD  0002
#define PMC_CONST_DWORD 0004
#define PMC_ADR_BYTE    1001
#define PMC_ADR_WORD    1002
#define PMC_ADR_DWORD   1004

#define DEC_HIGH        01
#define DEC_LOW         10
#define DEC_BOTH        11
#define DEC_INSTR(a,b)  a##b

#define IS_ADDRESS      1
#define IS_CONSTANT     0

#define SHIFT_LEFT      0
#define SHIFT_RIGHT     1

#define DIV_REMAINDER(a) Rlinear_byte(9002,4, a)


/***************************************************************************
** Window-Funktionen
***************************************************************************/
#ifndef CNC_PATH2
#define RD_SYSTEM_INFO          0
#define RD_TOOL_OFFSET          13
#define WRT_TOOL_OFFSET         14
#define RD_WST_OFFSET           15
#define WRT_WST_OFFSET          16
#define RD_PARAMETER            17
#define WRT_PARAMETER           18
#define RD_SETTING              19
#define WRT_SETTING             20
#define RD_CUSTOM               21
#define WRT_CUSTOM              22
#define RD_ALARM                23
#define RD_CURRENT_PRG_NR       24
#define RD_CURRENT_SEQ_NR       25
#define RD_ACT_AXIS_FEED        26
#define RD_ABS_POS              27
#define RD_MASCH_POS            28
#define RD_SKIP_POS             29
#define RD_DIAGNOSE             33
#define RD_LOAD_CURRENT         34
#endif

#ifdef CNC_PATH2
#define RD_SYSTEM_INFO          1000
#define RD_TOOL_OFFSET          1013
#define WRT_TOOL_OFFSET         1014
#define RD_WST_OFFSET           1015
#define WRT_WST_OFFSET          1016
#define RD_PARAMETER            1017
#define WRT_PARAMETER           1018
#define RD_SETTING              1019
#define WRT_SETTING             1020
#define RD_CUSTOM               1021
#define WRT_CUSTOM              1022
#define RD_ALARM                1023
#define RD_CURRENT_PRG_NR       1024
#define RD_CURRENT_SEQ_NR       1025
#define RD_ACT_AXIS_FEED        1026
#define RD_ABS_POS              1027
#define RD_MASCH_POS            1028
#define RD_SKIP_POS             1029
#define RD_LOAD_CURRENT         1034
#endif
/***************************************************************************
** Macro-Definitionen
***************************************************************************/
#define CLEAR_BIT(bit)              RST bit
#define CLEAR_BYTE(byte)            NUMEB PMC_BYTE   0 byte
#define CLEAR_WORD(byte)            NUMEB PMC_WORD   0 byte
#define CLEAR_DWORD(byte)           NUMEB PMC_DWORD  0 byte

#define SET_BYTE(byte, wert)        NUMEB PMC_BYTE   wert byte
#define SET_WORD(byte, wert)        NUMEB PMC_WORD   wert byte
#define SET_DWORD(byte, wert)       NUMEB PMC_DWORD  wert byte

#define SET(bit)                    SET bit

#define RESET(bit)                  RESET bit

#define COPY_BYTE(von, nach)        MOVB\
                                    von\
                                    nach

#define COPY_WORD(von, nach)        MOVW\
                                    von\
                                    nach

#define COPY_DWORD(von, nach)       MOVN\
                                    4\
                                    von\
                                    nach

#define COPY_XBYTE(x, von, nach)    MOVN\
                                    x\
                                    von\
                                    nach

#define IMPULS(taste, impuls, hilfs) RD      taste\
                                     AND.NOT hilfs\
                                     WRT     impuls\
                                     RD      taste\
                                     WRT     hilfs

#define IMPULS2(taste1, taste2, impuls, hilfs) RD      taste1\
                                               OR      taste2\
                                               AND.NOT hilfs\
                                               WRT     impuls\
                                               RD      taste1\
                                               OR      taste2\
                                               WRT     hilfs

#define IMPULS_NEG(taste, impuls, hilfs) RD.NOT  taste\
                                         AND.NOT hilfs\
                                         AND.NOT POWER_ON\
                                         WRT     impuls\
                                         RD.NOT  taste\
                                         WRT     hilfs

#define SCHRITT(taste, status, hilfs1, hilfs2) RD.NOT  status\
                                               AND.NOT hilfs1\
                                               OR      hilfs2\
                                               AND     taste\
                                               WRT     hilfs2\
                                               RD      status\
                                               AND.NOT hilfs2\
                                               OR      hilfs1\
                                               AND     taste\
                                               WRT     hilfs1\
                                               RD.NOT  hilfs1\
                                               AND     status\
                                               OR      hilfs2\
                                               WRT     status

#define IF(frm, a, op, b) RD      LOG_1\
                          COMPB\
                          frm\
                          a\
                          b\
                          RD      op

#define IS_NOT_EQUAL  ALWAYS_1\
                      AND.NOT IS_EQUAL\
                      AND.NOT IS_LESS\
                      OR      IS_LESS

#define IS_GREATER  ALWAYS_1\
                    AND.NOT IS_EQUAL\
                    AND.NOT IS_LESS

/*
                     +-+
MCMDein_IMP         -+ +------------------------------..
                     +---------------------+
MCMDein             -+                     +----------..
                     +-----------+
MCMDein_DOING       -+           +--------------------..
                                           +-+
MCMDaus_IMP         -----------------------+ +--------..
                    -+                     +----------..
MCMDaus              +---------------------+
                                           +-------+
MCMDaus_DOING       -----------------------+       +--..

*/

#define MCMD_ON_OFF(mein, maus)  \
    RD MCMD_IMP(mein)   AND.NOT MCMD_IMP(maus)   RESET(MCMD(maus))\
    RD MCMD_IMP(maus)                            SET(MCMD(maus))\
    RD MCMD_IMP(mein)   AND.NOT MCMD_IMP(maus)   SET(MCMD(mein))\
    RD MCMD(maus)       AND     MCMD(mein)       RESET(MCMD(mein))\
    RD MCMD_DOING(mein) AND     MCMD_DOING(maus) RESET(MCMD_DOING(mein))\
    RD MCMD_IMP(maus)   AND     MCMD_DOING(mein) RESET(MCMD_DOING(mein))


#endif
