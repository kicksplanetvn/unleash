import UIContext, { themeMode } from 'contexts/UIContext';
import { useContext } from 'react';
import { setLocalStorageItem } from 'utils/storage';
import mainTheme from 'themes/theme';
import darkTheme from 'themes/dark-theme';
import { Theme } from '@emotion/react';
import useUiConfig from './api/getters/useUiConfig/useUiConfig';

interface IUseThemeModeOutput {
    resolveTheme: () => Theme;
    onSetThemeMode: () => void;
    themeMode: themeMode;
}

export const useThemeMode = (): IUseThemeModeOutput => {
    const { themeMode, setThemeMode } = useContext(UIContext);
    const { uiConfig } = useUiConfig();
    const key = `${uiConfig.baseUriPath}:unleash-theme`;

    const resolveTheme = () => {
        if (themeMode === 'light') {
            return mainTheme;
        }

        return darkTheme;
    };

    const onSetThemeMode = () => {
        setThemeMode((prev: themeMode) => {
            if (prev === 'light') {
                setLocalStorageItem(key, 'dark');
                return 'dark';
            }
            setLocalStorageItem(key, 'light');
            return 'light';
        });
    };

    return { resolveTheme, onSetThemeMode, themeMode };
};
