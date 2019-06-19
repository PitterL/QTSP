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
export const MODULE_NAME = 'NavigatorBar';
export const CLICK_ICON = 'boilerplate/T1DPage/NavigatorBar/CLICK_ICON';

export const INFO_ICON = 'info';
export const GRAPHIC_ICON = 'graphic';
export const TUNE_ICON = 'tune';
