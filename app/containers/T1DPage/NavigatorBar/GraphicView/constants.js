/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const MODULE_NAME = 'GraphicView';

export const SELECT_CATEGORY = 'boilerplate/T1DPage/NavigatorBar/GraphicView/SELECT_CATEGORY';
export const SELECT_ACTION = 'boilerplate/T1DPage/NavigatorBar/GraphicView/SELECT_ACTION';
export const UPDATE_RSD_DATA = 'boilerplate/T1DPage/NavigatorBar/GraphicView/UPDATE_RSD_DATA';