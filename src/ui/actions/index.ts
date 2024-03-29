import { Place } from "@app/ui/types";

export type Action =
  | ClickCellAction
  | ClickPrevAction
  | ClickPassAction
  | LaunchAiAction;

export interface BoardAction {
  type: string;
  place?: Place;
}

export interface ClickCellAction extends BoardAction {
  type: "click_cell";
  place: Place;
}
export function clickCell(place: Place): ClickCellAction {
  return { type: "click_cell", place };
}

export interface ClickPrevAction extends BoardAction {
  type: "click_prev";
}
export const clickPrev: ClickPrevAction = { type: "click_prev" };

export interface ClickPassAction extends BoardAction {
  type: "click_pass";
}
export const clickPass: ClickPassAction = { type: "click_pass" };

export interface LaunchAiAction extends BoardAction {
  type: "launch_ai";
}
export const aiMove: LaunchAiAction = { type: "launch_ai" };
