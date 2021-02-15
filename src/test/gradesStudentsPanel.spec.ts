import { getId } from "../assets/ts/gradesStudentsPanel";
import { UsersInterface } from "../assets/ts/models/gradesStudentsPanel"
import { mockDataArray } from "./mocks/gradesStudentsPanel.mock"

describe("Tests for getId function", () => {
    const usersData : Array<UsersInterface> = mockDataArray;
    const false1 : string = "";
    const false2 : string = "Too long to get good result";
    const false3 : string = "Still should be bad";
    const true1 : string = "kSP5";
    const true2 : string = "rSA4";
    const true3 : string = "mLE6";

    test("false1 should return false", () => {
        expect(getId(false1, usersData)).toBe(false);
    });

    test("false2 should return false", () => {
        expect(getId(false2, usersData)).toBe(false);
    });

    test("false3 should return false", () => {
        expect(getId(false3, usersData)).toBe(false);
    });

    test("true1 should return 0", () => {
        expect(getId(true1, usersData)).toEqual(usersData[3].user_id);
    });

    test("true2 should return 1", () => {
        expect(getId(true2, usersData)).toEqual(usersData[2].user_id);
    });

    test("true3 should return 2", () => {
        expect(getId(true3, usersData)).toEqual(usersData[4].user_id);
    });
});