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

export const MODULE_NAME = 'MapParser';

export const OPEN_FILE = 'boilerplate/T1DPage/ContentZone/MapParser/OPEN_FILE';
export const RECV_FILE = 'boilerplate/T1DPage/ContentZone/MapParser/RECV_FILE';

export const UPDATE_REGADDR = 'boilerplate/T1DPage/ContentZone/MapParser/UPDATE_REGADDR';
export const UPDATE_REGCFG = 'boilerplate/T1DPage/ContentZone/MapParser/UPDATE_REGCFG';
export const UPDATE_RSD_FORMAT = 'boilerplate/T1DPage/ContentZone/MapParser/UPDATE_RSD_FORMAT';