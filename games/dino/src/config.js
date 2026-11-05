// Single switch for the shareware-demo restrictions. DELIBERATE DEVIATION from the exe (see FORMATS.md "DEVIATION: UNLOCK_ALL").
// true  = no "DEMO VERSION / MIN. LEFT" text, no 60-minute timer, no BUY NOW / DEMO menu items, no nag screens, every level selectable (38), sequential progression crosses pack borders.
// false = shareware demo behaviour (timer, nags, lock by pass count).
export const UNLOCK_ALL = true;
// Attract/demo playback. CONFIRMED FUN_0043e710 (0x43e8f0..): the list is every level (pack order, then level order) for which "<levelname>.rec" exists (FUN_0043dd00 existence test); DAT_0061cd94 = count.
// Here: the 8 .rec files shipped with the demo (public/assets/demos). Entry from the 'demo' menu item (FUN_00413fa0 -> FUN_00413a70: index = rand() % count) and end of a demo (FUN_00413fe0: index = (cur + 1 + (count<2 ? 0 : rand()&1)) % count).
export const DEMOS = ['p02_l04', 'p02_l05', 'p02_l10', 'p03_l01', 'p03_l02', 'p03_l08', 'p03_l11', 'p04_l03'];
export const demoUrl = (i) => '?level=' + DEMOS[i] + '&demo=1';
