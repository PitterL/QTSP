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

export const MODULE_NAME = 'ContentZone';

export const OPEN_PORT = 'boilerplate/T1DPage/ContentZone/OPEN_PORT';
export const CLOSE_PORT = 'boilerplate/T1DPage/ContentZone/CLOSE_PORT';
export const SET_COMPORT = 'boilerplate/T1DPage/ContentZone/SET_COMPORT';
export const SET_BAUDRATE = 'boilerplate/T1DPage/ContentZone/SET_BAUDRATE';
export const SELECT_DEVICE = 'boilerplate/T1DPage/ContentZone/SELECT_DEVICE';

export const PLACEHOLDER_COMPORT_NAME = 'COM Port';
export const PLACEHOLDER_BAURATE_NAME = 'Baudrate';
export const PLACEHOLDER_DEVICE_NAME = 'Chip';
