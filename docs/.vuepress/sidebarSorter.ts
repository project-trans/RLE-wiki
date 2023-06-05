import { SidebarInfo } from "vuepress-theme-hope";

export const mySidebarTitleSorter = (
    infoA: SidebarInfo,
    infoB: SidebarInfo
): number => {
    const infoANFC = infoA.title.normalize('NFC');
    const infoBNFC = infoB.title.normalize('NFC');
    return infoANFC.localeCompare(infoBNFC, 'zh', {
        numeric: true,
    })
};